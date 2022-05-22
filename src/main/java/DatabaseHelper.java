import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class DatabaseHelper {
    static String databaseEndpoint = "https://tournament-server.herokuapp.com/api/v2";

    //TODO handle all these possible exceptions instead of just throwing them
    public static Agent getAgent(String agentID) throws IOException {
        String endpoint = databaseEndpoint + "/agent";
        URL dbURL = new URL(endpoint);

        HttpURLConnection dbConnection = (HttpURLConnection) dbURL.openConnection();

        //--------------------------------- POST request ------------------------------------------
        dbConnection.setRequestMethod("POST");
        dbConnection.setRequestProperty("Content-Type", "application/json; charset=utf-8");
        dbConnection.setRequestProperty("Accept", "application/json");

        // to write content to the connection output stream
        dbConnection.setDoOutput(true);

        // create json request body
        JSONObject postData = new JSONObject();
        postData.put("agentID", agentID);
        JSONObject inputData = new JSONObject();
        inputData.put("data", postData);
        inputData.put("signal", new JSONObject());

        // write JSON object
        try (OutputStream os = dbConnection.getOutputStream()) {
            byte[] input = inputData.toString().getBytes(StandardCharsets.UTF_8);
            os.write(input, 0, input.length);
        }

        // getting the response code
        int statusCode = dbConnection.getResponseCode();

        if (statusCode != 200){
            Miscellaneous.logError("The /agent POST request made to the database failed with a status code " + statusCode);
            dbConnection.disconnect();
            return null;
        }

        // reading the response
        BufferedReader inputStream = new BufferedReader(new InputStreamReader(dbConnection.getInputStream()));
        String responseBody = inputStream.readLine();
        dbConnection.disconnect();

        JSONParser parser = new JSONParser();
        JSONObject jsonResponse;
        try {
            jsonResponse = (JSONObject) parser.parse(responseBody);
        }
        catch (ParseException e){
            Miscellaneous.logError("Unable to parse string to JSON object. The string in question is \n" + responseBody);
            Miscellaneous.logError(e.getMessage());
            return null;
        }

        // if the agent does not exist in the database
        String responseMessage = (String) jsonResponse.get("message");
        if (responseMessage.equals("No agent exists")) return null;

        JSONObject jsonResultData = (JSONObject) jsonResponse.get("resultData");
        JSONObject jsonAgentData = (JSONObject) jsonResultData.get("agentData");
        String agentName = (String) jsonAgentData.get("AGENT_NAME");
        String username = (String) jsonAgentData.get("USERNAME");
        String userID = (String) jsonAgentData.get("USER_ID");
        String ipAddress = (String) jsonAgentData.get("ADDRESS_IP");
        int port = (int) (long) jsonAgentData.get("ADDRESS_PORT");

        return new Agent(agentID, agentName, username, userID, ipAddress, port);
    }

    // returns Match Log ID
    // TODO handle all these exceptions properly
    public static String recordLiveMatch(String tournamentID) throws IOException {
        String endpoint = databaseEndpoint + "/match/live";
        URL dbURL = new URL(endpoint);

        HttpURLConnection dbConnection = (HttpURLConnection) dbURL.openConnection();
        dbConnection.setRequestMethod("PUT");
        dbConnection.setRequestProperty("Content-Type", "application/json; charset=utf-8");
        dbConnection.setRequestProperty("Accept", "application/json");
        // to write content to the connection output stream
        dbConnection.setDoOutput(true);

        JSONObject data = new JSONObject();
        data.put("tournamentID", tournamentID);

        JSONObject inputData = new JSONObject();
        inputData.put("data", data);
        inputData.put("signal", new JSONObject());

        // write JSON object
        try (OutputStream os = dbConnection.getOutputStream()) {
            byte[] input = inputData.toString().getBytes(StandardCharsets.UTF_8);
            os.write(input, 0, input.length);
        }

        int statusCode = dbConnection.getResponseCode();
        if (statusCode != 201){
            Miscellaneous.logError("The /match/live PUT request made to the database failed with a status code " + statusCode);
            dbConnection.disconnect();
            return "";
        }

        BufferedReader inputStream = new BufferedReader(new InputStreamReader(dbConnection.getInputStream()));
        String responseBody = inputStream.readLine();
        dbConnection.disconnect();

        JSONParser parser = new JSONParser();
        JSONObject jsonResponse;
        try {
            jsonResponse = (JSONObject) parser.parse(responseBody);
        }
        catch (ParseException e){
            Miscellaneous.logError("Unable to parse string to JSON object. The string in question is \n" + responseBody);
            Miscellaneous.logError(e.getMessage());
            return "";
        }
        JSONObject resultData = (JSONObject) jsonResponse.get("resultData");

        return (String) resultData.get("MATCH_LOG_ID");
    }

    public static boolean closeLiveMatch(String matchLogID, String matchLog, ArrayList<Agent> rankings, boolean draw) throws IOException {
        String endpoint = databaseEndpoint + "/match/live";
        URL dbURL = new URL(endpoint);

        HttpURLConnection dbConnection = (HttpURLConnection) dbURL.openConnection();
        dbConnection.setRequestMethod("POST");
        dbConnection.setRequestProperty("Content-Type", "application/json; charset=utf-8");
        dbConnection.setRequestProperty("Accept", "application/json");
        // to write content to the connection output stream
        dbConnection.setDoOutput(true);

        // create JSON request body
        JSONObject data = new JSONObject();
        data.put("matchLogID", matchLogID);
        data.put("matchLogData", matchLog);

        JSONObject rank1 = new JSONObject();
        rank1.put("agentID", rankings.get(0).agentID);
        rank1.put("ranking", 0);

        JSONObject rank2 = new JSONObject();
        rank2.put("agentID", rankings.get(1).agentID);
        if (draw)
            rank2.put("ranking", 0);
        else
            rank2.put("ranking", 1);

        JSONArray agentResults = new JSONArray();
        agentResults.add(rank1);
        agentResults.add(rank2);

        data.put("agentResults", agentResults);
        JSONObject inputData = new JSONObject();
        inputData.put("data", data);
        inputData.put("signal", new JSONObject());

        // write JSON object
        try (OutputStream os = dbConnection.getOutputStream()) {
            byte[] input = inputData.toString().getBytes(StandardCharsets.UTF_8);
            os.write(input, 0, input.length);
        }

        int statusCode = dbConnection.getResponseCode();
        if (statusCode != 201){
            Miscellaneous.logError("The /match/live PATCH request made to the database failed with a status code " + statusCode);
            dbConnection.disconnect();
            return false;
        }

        dbConnection.disconnect();
        return true;
    }

    public static Map<String, String> getGameFileNames() throws IOException {
        String endpoint = databaseEndpoint + "/game";
        URL dbURL = new URL(endpoint);

        HttpURLConnection dbConnection = (HttpURLConnection) dbURL.openConnection();
        dbConnection.setRequestMethod("GET");

        // getting the response code
        int statusCode = dbConnection.getResponseCode();

        if (statusCode != 200){
            Miscellaneous.logError("The /game GET request made to the database failed with a status code " + statusCode);
            dbConnection.disconnect();
            return null;
        }

        BufferedReader inputStream = new BufferedReader(new InputStreamReader(dbConnection.getInputStream()));
        String responseBody = inputStream.readLine();
        dbConnection.disconnect();

        JSONParser parser = new JSONParser();
        JSONObject jsonResponse;
        try {
            jsonResponse = (JSONObject) parser.parse(responseBody);
        }
        catch (ParseException e){
            Miscellaneous.logError("Unable to parse string to JSON object. The string in question is \n" + responseBody);
            Miscellaneous.logError(e.getMessage());
            return null;
        }
        JSONArray resultData = (JSONArray) jsonResponse.get("resultData");
        Map<String, String> games = new HashMap<>();

        for (Object g: resultData){
            JSONObject game = (JSONObject) g;
            String gameName = (String) game.get("GAME_NAME");
            String fileName = (String) game.get("FILE_NAME");

            games.put(gameName, fileName);
        }

        return games;
    }
}
