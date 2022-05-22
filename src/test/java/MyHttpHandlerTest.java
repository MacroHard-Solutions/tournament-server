import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertNull;

import java.net.HttpURLConnection;
import java.net.URL;

public class MyHttpHandlerTest {
    @Test
    public void testHandleGetRequest() {
        URL url = new URL("http://localhost:8001/game-server/images/game0/0.jpg");
        HttpURLConnection connection = (HttpURLConnection)url.openConnection();
        connection.setRequestMethod("GET");
        connection.connect();
        int responseCode = connection.getResponseCode();

        assertEquals(responseCode, 200);
    }
}
