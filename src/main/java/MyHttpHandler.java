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
    int renderNumber = 0;

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
            System.out.println("OPTIONS request");
            handleOPTIONSRequest(exchange);
        }
        else {
            //TODO log error
            System.out.println("Error");
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
        else if (type.equals("challenge")){
            handleChallengeRequest(httpExchange, data);
        }
    }

    private void handleRenderRequest(HttpExchange httpExchange, JSONObject jsonObject) throws IOException, ParseException {
        String gameName = (String) jsonObject.get("game");
        // flag used for synchronous game
        boolean flag = false;
        //TODO sync this properly with the database
        if (gameName.equals("Tic-Tac-Toe"))
            gameName = "TicTacToe";
        if (gameName.equals("Rock-Paper-Scissors-Lizard-Spock")) {
            gameName = "RockPaperScissorsLizardSpock";
            //Todo need to get the moves stored in a smarter way
            flag = true;
        }

        JSONArray gameLog = (JSONArray) jsonObject.get("moves");
        String directory = "images/game" + renderNumber;
        File folder = new File(directory);

        // clear folder of previous game images
        File[] files = folder.listFiles();
        if(files != null) {  //some JVMs return null for empty dirs
            for(File f: files) {
                f.delete();
            }
        }

        Constructor constructor = null;

        // code to load the user-defined class dynamically
        try {
            Class dynamicClass = Miscellaneous.loadGameClass(gameName);
            constructor = dynamicClass.getDeclaredConstructor();
        }
        catch (Exception e) {
            System.out.println(e);
        }

        // create dummy players to instantiate a new TicTacToe object
        ArrayList<Agent> dummyAgents = new ArrayList<>();
        dummyAgents.add(new Agent("Jimbo", "", 69));
        dummyAgents.add(new Agent("Timbo", "", 4));
        Game game = null;

        try {
            assert constructor != null;
            game = (Game) constructor.newInstance();
        }
        catch (Exception e) {
            System.out.println(e);
            handleInvalidGame(httpExchange);
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

        String jsonArrayString = asJsonArray(imageLocations);
        // this line is a must
        httpExchange.sendResponseHeaders(200, jsonArrayString.length());

        OutputStream outputStream = httpExchange.getResponseBody();
        outputStream.write(jsonArrayString.getBytes(StandardCharsets.UTF_8));
        outputStream.close();
    }

    private void handleChallengeRequest(HttpExchange httpExchange, JSONObject jsonObject) throws Exception {
        String gameName = (String) jsonObject.get("game");
        //TODO sync this properly with the database
        if (gameName.equals("Tic-Tac-Toe"))
            gameName = "TicTacToe";

        String tournamentID = (String) jsonObject.get("tournamentID");
        JSONArray agentIDs = (JSONArray) jsonObject.get("agentIDs");
        //TODO return message earlier

        boolean gameSuccessful = Miscellaneous.challenge(agentIDs.get(0).toString(), agentIDs.get(1).toString(), gameName, tournamentID);

        //TODO when successful send back gameID for live viewing potential - change return to string
        if (gameSuccessful)
            httpExchange.sendResponseHeaders(200, -1);
        else
            httpExchange.sendResponseHeaders(502, -1);

        OutputStream outputStream = httpExchange.getResponseBody();
        outputStream.close();
    }

    // used to return the image locations as a json array in the http response
    private String asJsonArray(ArrayList<String> list){
        StringBuilder output = new StringBuilder("{\"imageURIs\":[");
        for (String s: list){
            output.append('"').append(s).append('"').append(",");
        }

        // remove the final comma
        output = new StringBuilder(output.substring(0, output.length() - 1));

        output.append("]}");
        return output.toString();
    }

    private void handleInvalidGame(HttpExchange httpExchange) throws IOException {
        String errorMessage = "Invalid Game. Cannot process render request";
        httpExchange.sendResponseHeaders(400, errorMessage.length());

        OutputStream outputStream = httpExchange.getResponseBody();
        outputStream.write(errorMessage.getBytes(StandardCharsets.UTF_8));
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
