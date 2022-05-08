import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

public class DatabaseHelper {
    static String databaseEndpoint = "https://tournament-server.herokuapp.com/api/v2";

    //TODO finish
    public static Agent getAgent(String agentID) throws IOException {
        /*String endpoint = databaseEndpoint + "/agent";
        URL dbURL = new URL(endpoint);

        HttpURLConnection dbConnection = (HttpURLConnection) dbURL.openConnection();

        //--------------------------------- POST request ------------------------------------------
        dbConnection.setRequestMethod("POST");
        dbConnection.setRequestProperty("Content-Type", "application/json; utf-8");
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
        try(OutputStream os = dbConnection.getOutputStream()) {
            byte[] input = inputData.toString().getBytes(StandardCharsets.UTF_8);
            os.write(input, 0, input.length);
        }


        // reading the response
        try(BufferedReader br = new BufferedReader(new InputStreamReader(dbConnection.getInputStream(), StandardCharsets.UTF_8))) {
            StringBuilder response = new StringBuilder();
            String responseLine;
            while ((responseLine = br.readLine()) != null) {
                response.append(responseLine.trim());
            }
        }

        //JSONObject postResponse*/

        if (agentID.equals("a0ea49b7-ce11-11ec-8a34-0ea680fee648"))
            return new Agent("Stalin", "3.231.164.164", 8001);
        else if (agentID.equals("e8955372-ce0e-11ec-8a34-0ea680fee648"))
            return new Agent("Magnus_Carlson", "54.157.20.63", 8000);

        return null;
    }

    public static boolean recordMatch(String tournamentID, String logTime, String gameLog, ArrayList<String> agentIDs, ArrayList<Integer> agentRanks) throws IOException {
        String endpoint = databaseEndpoint + "/match";
        URL dbURL = new URL(endpoint);

        HttpURLConnection dbConnection = (HttpURLConnection) dbURL.openConnection();
        dbConnection.setRequestMethod("PUT");
        // to write content to the connection output stream
        dbConnection.setDoOutput(true);
        dbConnection.setRequestProperty("Content-Type", "application/json");

        // create json request body
        JSONObject agent1 = new JSONObject();
        agent1.put("agentID", agentIDs.get(0));
        agent1.put("ranking", agentRanks.get(0));

        JSONObject agent2 = new JSONObject();
        agent2.put("agentID", agentIDs.get(1));
        agent2.put("ranking", agentRanks.get(1));

        JSONArray agentResultsJSON = new JSONArray();
        agentResultsJSON.add(agent1);
        agentResultsJSON.add(agent2);

        JSONObject data = new JSONObject();
        data.put("tournamentID", tournamentID);
        data.put("matchLogTime", logTime);
        data.put("gameLog", gameLog);
        data.put("agentResults", agentResultsJSON);

        JSONObject inputData = new JSONObject();
        inputData.put("data", data);
        inputData.put("signal", new JSONObject());

        // write JSON object
        try(OutputStream os = dbConnection.getOutputStream()) {
            byte[] input = inputData.toString().getBytes(StandardCharsets.UTF_8);
            os.write(input, 0, input.length);
        }

        // getting the response code
        int statusCode = dbConnection.getResponseCode();

        dbConnection.disconnect();
        return  (statusCode == 201);
    }
}
