import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.awt.image.BufferedImage;
import java.io.*;
import java.lang.reflect.Constructor;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.ArrayList;

public class MyHttpHandler implements HttpHandler {
    private int renderNumber = 0;
    private int liveMatchNumber = 0;
    private String[] liveMatchIDs = new String[]{"", "", "", "", "", "", "", "", "", ""};
    private final String unrecognisedGameError = "Game name is not recognised. Unable to process render request";
    private final String renderRequestError = "Unable to process render request";
    private final String matchRequestError = "Unable to start match";
    private final String matchSetupError = "Unable to set up match between agents";
    private final String unrecognisedMatchLogID = "Match Log ID is not recognised. Unable to process Poll request";
    private final String offlineAgentError = "Server could not reach agent. Unable to start match";
    private final String agentDoesNotExist = "Agent data could not be retrieved. Either the agent does not exist or the database server is down";

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("GET".equals(exchange.getRequestMethod())){
            handleGETRequest(exchange);
        }
        else if ("POST".equals(exchange.getRequestMethod())) {
            try {
                handlePOSTRequest(exchange);
            }
            catch (Exception e) {
                e.printStackTrace();
            }
        }
        else if ("OPTIONS".equals(exchange.getRequestMethod())){
            handleOPTIONSRequest(exchange);
        }
        else {
            Miscellaneous.logError("Undefined request");
        }
    }

    private void handleOPTIONSRequest(HttpExchange httpExchange) throws IOException {
        setHttpExchangeResponseHeaders(httpExchange);
        httpExchange.sendResponseHeaders(204, -1); // -1 means no content-body is being sent
        OutputStream outputStream = httpExchange.getResponseBody();
        outputStream.close();
    }

    private void handleGETRequest(HttpExchange httpExchange) throws IOException {
        URI requestURI = httpExchange.getRequestURI();
        String uri = requestURI.toString();
        // remove "/game-server/" from uri
        uri = uri.substring(13);

        // set the Content-Type header to image/gif
        Headers responseHeaders = httpExchange.getResponseHeaders();
        ArrayList<String> contentType = new ArrayList<>();
        contentType.add("image");
        contentType.add("gif");
        responseHeaders.put("Content-Type", contentType);
        setHttpExchangeResponseHeaders(httpExchange);

        File image = new File(uri);
        httpExchange.sendResponseHeaders(200, image.length());
        OutputStream outputStream = httpExchange.getResponseBody();

        Files.copy(image.toPath(), outputStream);
        outputStream.close();
    }

    private void handlePOSTRequest(HttpExchange httpExchange) throws Exception {
        InputStream inputStream = httpExchange.getRequestBody();

        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObject = (JSONObject) jsonParser.parse(new InputStreamReader(inputStream, StandardCharsets.UTF_8));

        // this is how Kian wants his requests to be
        JSONObject data = (JSONObject) jsonObject.get("data");
        String type = (String) data.get("type");

        setHttpExchangeResponseHeaders(httpExchange);
        if (type.equals("render")){
            handleRenderRequest(httpExchange, data);
        }
        else if (type.equals("match")){
            handleLiveMatchRequest(httpExchange, data);
        }
        else if (type.equals("poll")){
            handlePollRequest(httpExchange, data);
        }
    }

    private void handleRenderRequest(HttpExchange httpExchange, JSONObject jsonObject) throws IOException, ParseException {
        String gameName = (String) jsonObject.get("game");
        String fileName = Miscellaneous.getGameFileName(gameName);

        if (fileName == null) {
            Miscellaneous.logError("Unable to recognise the game by the name of \"" + gameName + "\"");
            handleRequestError(httpExchange, unrecognisedGameError);
            return;
        }

        // flag used for synchronous game
        //Todo need to get the moves stored in a smarter way
        boolean flag = gameName.equals("Rock-Paper-Scissors-Lizard-Spock");

        JSONArray gameLog = (JSONArray) jsonObject.get("moves");
        String directory = "images/game" + renderNumber;
        File folder = new File(directory);

        // clear folder of previous game images
        File[] files = folder.listFiles();
        if(files != null) {  // some JVMs return null for empty dirs
            for(File f: files) {
                if (!f.delete())
                    Miscellaneous.logError("Could not delete file " + f.getName());
            }
        }

        Constructor constructor;

        // code to load the user-defined class dynamically
        try {
            Class dynamicClass = Miscellaneous.loadGameClass(fileName);
            constructor = dynamicClass.getDeclaredConstructor();
        }
        catch (Exception e) {
            Miscellaneous.logError("Unable to load constructor of " + fileName + ".class");
            Miscellaneous.logError(e.getMessage());
            handleRequestError(httpExchange, renderRequestError);
            return;
        }

        // create dummy players to instantiate a new Game object
        ArrayList<Agent> dummyAgents = new ArrayList<>();
        dummyAgents.add(new Agent("1234", "Dummy 1", "Jimbo","1234", "", 69));
        dummyAgents.add(new Agent("12345", "Dummy 2", "Timbo", "12345", "", 4));
        Game game;

        try {
            game = (Game) constructor.newInstance();
        }
        catch (Exception e) {
            Miscellaneous.logError("Unable to construct instance of " + fileName + ".class");
            Miscellaneous.logError(e.getMessage());
            handleRequestError(httpExchange, renderRequestError);
            return;
        }

        ArrayList<String> imageLocations = new ArrayList<>();
        for (int i = 0; i < gameLog.size(); i++){
            Agent currAgent = game.getNextPlayer(dummyAgents);

            //TODO check and error message if move is invalid (particularly if it is of the wrong format)
            String move = (String) gameLog.get(i);

            if (flag){
                String[] moves = move.split(" ");
                game.step(currAgent, moves[0]);

                currAgent = game.getNextPlayer(dummyAgents);

                game.step(currAgent, moves[1]);
            }
            else {
                game.step(currAgent, move);
            }

            BufferedImage gameState = game.render();
            Miscellaneous.writeImage(gameState, directory + "/" + i + ".jpg", "JPG");

            String imageLocation = directory + "/" + i + ".jpg";
            imageLocations.add(imageLocation);
        }

        renderNumber = (renderNumber + 1) % 100;

        String jsonResponse = asJsonArray(imageLocations, false);
        // this line is a must
        httpExchange.sendResponseHeaders(200, jsonResponse.length());

        OutputStream outputStream = httpExchange.getResponseBody();
        outputStream.write(jsonResponse.getBytes(StandardCharsets.UTF_8));
        outputStream.close();
    }

    private void handleLiveMatchRequest(HttpExchange httpExchange, JSONObject jsonObject) throws Exception {
        String gameName = (String) jsonObject.get("game");
        String tournamentID = (String) jsonObject.get("tournamentID");
        JSONArray agentIDs = (JSONArray) jsonObject.get("agentIDs");
        String agent1ID = (String) agentIDs.get(0);
        String agent2ID = (String) agentIDs.get(1);

        // create match
        Match match = new Match(agent1ID, agent2ID, gameName, tournamentID);

        // won't log error here because it would be done inside the Match class
        if (match.failed == -1) {
            handleRequestError(httpExchange, unrecognisedGameError);
            return;
        }
        else if (match.failed == 0) {
            handleRequestError(httpExchange, agentDoesNotExist);
            return;
        }

        int setUpStatus = match.setUpMatch();

        if (setUpStatus == 0) {
            handleRequestError(httpExchange, matchSetupError);
            return;
        }
        else if (setUpStatus == -1){
            handleRequestError(httpExchange, offlineAgentError);
            return;
        }

        // record new live match in database with live status
        String matchLogID = DatabaseHelper.recordLiveMatch(tournamentID);
        if (matchLogID.equals("")){
            handleRequestError(httpExchange, matchRequestError);
            return;
        }

        // respond with match log ID so front end knows the match has begun
        httpExchange.sendResponseHeaders(200, matchLogID.length());

        OutputStream outputStream = httpExchange.getResponseBody();
        outputStream.write(matchLogID.getBytes(StandardCharsets.UTF_8));
        outputStream.close();

        // TODO if 10 games are running at once then the next one will override the first element. Need to handle this. Maybe have map of matchLogIDs and Match objets
        liveMatchIDs[liveMatchNumber] = matchLogID;
        String directory = "liveMatches/game" + liveMatchNumber;
        File folder = new File(directory);

        // clear live match folder of previous match images
        File[] files = folder.listFiles();
        if(files != null) {  // some JVMs return null for empty dirs
            for(File f: files) {
                if (!f.delete())
                    Miscellaneous.logError("Could not delete file " + f.getName());
            }
        }

        if (!match.startMatch(matchLogID, directory))
            Miscellaneous.logError("Error in closing live match. Match Log ID " + matchLogID);

        // TODO remove MatchLogID in a better way
        for (int i = 0; i < 10; i++){
            if (liveMatchIDs[i].equals(matchLogID)) {
                liveMatchIDs[i] = "";
                break;
            }
        }
        liveMatchNumber = (liveMatchNumber + 1) % 10;
    }

    private void handlePollRequest(HttpExchange httpExchange, JSONObject jsonObject) throws IOException {
        String matchLogID = (String) jsonObject.get("matchLogID");

        // find directory which is being requested
        int directoryIndex = -1;
        for (int i = 0; i < 10; i++){
            if (liveMatchIDs[i].equals(matchLogID)) {
                directoryIndex = i;
                break;
            }
        }

        // matchLogID not recognised
        if (directoryIndex == -1){
            Miscellaneous.logError("Match Log ID " + matchLogID + " not recognised");
            handleRequestError(httpExchange, unrecognisedMatchLogID);
            return;
        }

        String directory = "liveMatches/game" + directoryIndex;
        File folder = new File(directory);
        ArrayList<String> imageLocations = new ArrayList<>();

        // load image URIs into arrayList
        File[] files = folder.listFiles();
        if (files != null) {  // some JVMs return null for empty dirs
            int i = 0;
            for (File f: files) {
                String imageLocation = directory + "/" + i + ".jpg";
                imageLocations.add(imageLocation);
                i++;
            }
        }

        String jsonResponse = asJsonArray(imageLocations, true);
        // this line is a must
        httpExchange.sendResponseHeaders(200, jsonResponse.length());

        OutputStream outputStream = httpExchange.getResponseBody();
        outputStream.write(jsonResponse.getBytes(StandardCharsets.UTF_8));
        outputStream.close();
    }

    // used to return the image locations as a json array in the http response
    private String asJsonArray(ArrayList<String> list, boolean live){
        StringBuilder output;
        if (live){
            output = new StringBuilder("{\"numberOfStates\":" + list.size() + ",\"imageURIs\":[");
        }
        else {
            output = new StringBuilder("{\"imageURIs\":[");
        }

        for (String s: list){
            output.append('"').append(s).append('"').append(",");
        }

        // remove the final comma
        output = new StringBuilder(output.substring(0, output.length() - 1));

        output.append("]}");
        return output.toString();
    }

    public void handleRequestError(HttpExchange httpExchange, String errorMsg) throws IOException {
        httpExchange.sendResponseHeaders(400, errorMsg.length());

        OutputStream outputStream = httpExchange.getResponseBody();
        outputStream.write(errorMsg.getBytes(StandardCharsets.UTF_8));
        outputStream.close();
    }

    private static void setHttpExchangeResponseHeaders(HttpExchange httpExchange) {
        // Set common response headers
        httpExchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        httpExchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
        httpExchange.getResponseHeaders().add("Access-Control-Allow-Headers", "*");
        httpExchange.getResponseHeaders().add("Access-Control-Allow-Credentials", "true");
        httpExchange.getResponseHeaders().add("Access-Control-Allow-Credentials-Header", "*");
    }
}
