package games;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.lang.reflect.Constructor;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.ArrayList;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class MyHttpHandler implements HttpHandler {
    int renderNumber = 0;

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("GET".equals(exchange.getRequestMethod())) {
            handleGETRequest(exchange);
        } else if ("POST".equals(exchange.getRequestMethod())) {
            try {
                handlePOSTRequest(exchange);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        } else if ("OPTIONS".equals(exchange.getRequestMethod())) {
            System.out.println("OPTIONS request");
            handleOPTIONSRequest(exchange);
        } else {
            // TODO log error
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

    private void handlePOSTRequest(HttpExchange httpExchange) throws IOException, ParseException {
        InputStream inputStream = httpExchange.getRequestBody();

        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObject = (JSONObject) jsonParser
                .parse(new InputStreamReader(inputStream, StandardCharsets.UTF_8));

        // this is how Kian wants his requests to be
        JSONObject data = (JSONObject) jsonObject.get("data");
        String type = (String) data.get("type");

        setHttpExchangeResponseHeaders(httpExchange);
        if (type.equals("render")) {
            handleRenderRequest(httpExchange, data);
        } else if (type.equals("new-game")) {
            handleRenderRequest(httpExchange, data);
        }
    }

    private void handleRenderRequest(HttpExchange httpExchange, JSONObject jsonObject)
            throws IOException, ParseException {
        String gameName = (String) jsonObject.get("game");
        boolean flag = false;
        // TODO sync this properly with the database
        if (gameName.equals("Tic-Tac-Toe"))
            gameName = "TicTacToe";
        if (gameName.equals("Rock-Paper-Scissors-Lizard-Spock")) {
            gameName = "RockPaperScissorsLizardSpock";
            // Todo need to get the moves stored in a smarter way
            flag = true;
        }

        JSONArray gameLog = (JSONArray) jsonObject.get("moves");
        String directory = "images/game" + renderNumber;
        File folder = new File(directory);

        // clear folder of previous game images
        File[] files = folder.listFiles();
        if (files != null) { // some JVMs return null for empty dirs
            for (File f : files) {
                f.delete();
            }
        }

        Constructor constructor = null;

        // code to load the user-defined class dynamically
        try {
            Class dynamicClass = Program.getClassFromFile("games." + gameName);
            constructor = dynamicClass.getDeclaredConstructor();
        } catch (Exception e) {
            System.out.println(e);
        }

        // create dummy players to instantiate a new TicTacToe object
        ArrayList<Player> dummyPlayers = new ArrayList<>();
        dummyPlayers.add(new Player("Jimbo", "", 69));
        dummyPlayers.add(new Player("Timbo", "", 4));
        Game game = null;

        try {
            assert constructor != null;
            game = (Game) constructor.newInstance();
        } catch (Exception e) {
            System.out.println(e);
            handleInvalidGame(httpExchange);
            return;
        }

        ArrayList<String> imageLocations = new ArrayList<>();
        for (int i = 0; i < gameLog.size(); i++) {
            Player currPlayer = game.getNextPlayer(dummyPlayers);

            // TODO check and error message if move is invalid (particularly if it is of the
            // wrong format)
            String move = (String) gameLog.get(i);

            if (flag) {
                String[] moves = move.split(" ");
                game.step(currPlayer, moves[0]);

                currPlayer = game.getNextPlayer(dummyPlayers);

                game.step(currPlayer, moves[1]);
            } else {
                game.step(currPlayer, move);
            }

            BufferedImage gameState = game.render();
            ImageHelper.writeImage(gameState, directory + "/" + i + ".jpg", "JPG");

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

    private void handleNewGameRequest(HttpExchange httpExchange, JSONObject jsonObject) {

    }

    // used to return the image locations as a json array in the http response
    private String asJsonArray(ArrayList<String> list) {
        StringBuilder output = new StringBuilder("{\"imageURIs\":[");
        for (String s : list) {
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
