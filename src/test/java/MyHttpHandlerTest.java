import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.junit.Test;
import static org.junit.Assert.assertEquals;

import java.io.IOException;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class MyHttpHandlerTest {
    @Test
    public void testHandleGetRequest() throws IOException {
        Program.startServer();

        URL url = new URL("http://localhost:8001/game-server/images/game0/0.jpg");
        HttpURLConnection connection = (HttpURLConnection)url.openConnection();
        connection.setRequestMethod("GET");
        connection.connect();
        int responseCode = connection.getResponseCode();

        assertEquals(responseCode, 200);
    }

    @Test
    public void testRenderRequest() throws IOException {
        URL url = new URL("http://localhost:8001/game-server/images/game0/0.jpg");
        HttpURLConnection connection = (HttpURLConnection)url.openConnection();
        connection.setRequestMethod("POST");

        // create JSON request body
        String jsonBody = "{\"data\":{\"type\":\"render\",\"game\":\"Tic-Tac-Toe\",\"moves\":[\"0 0 X\",\"1 1 O\",\"0 1 X\",\"2 0 O\",\"0 2 X\"]},\"signal\":{}}";

        /*JSONObject data = new JSONObject();
        data.put("type", "render");
        data.put("game", "Tic-Tac-Toe");

        JSONArray moves = new JSONArray();
        moves.add("0 0 X");
        moves.add("1 1 O");

        data.put("moves", moves);

        JSONObject inputData = new JSONObject();
        inputData.put("data", data);
        inputData.put("signal", new JSONObject());*/

        connection.setRequestProperty("Content-Type", "application/json; utf-8");
        connection.setRequestProperty("Accept", "application/json");
        connection.setDoOutput(true);

        try(OutputStream os = connection.getOutputStream()) {
            byte[] input = jsonBody.getBytes(StandardCharsets.UTF_8);
            os.write(input, 0, input.length);
        }

        int responseCode = connection.getResponseCode();

        assertEquals(responseCode, 400);
    }
}
