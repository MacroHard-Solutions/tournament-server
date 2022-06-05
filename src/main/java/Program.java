import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;

public class Program {
    public static Map<String, String> gameFiles = new HashMap<>();

    public static void main(String[] args) throws Exception {
        // Backlogging value set to 100 meaning the server can queue up to 100 requests 8001
        HttpServer server = HttpServer.create(new InetSocketAddress("0.0.0.0", 8001), 100);

        // up to 10 threads, each new request is handled on a new thread so if there is a crash on a thread the server should remain up
        ThreadPoolExecutor threadPoolExecutor = (ThreadPoolExecutor) Executors.newFixedThreadPool(10);

        server.createContext("/game-server", new MyHttpHandler());
        server.setExecutor(threadPoolExecutor);
        server.start();
        System.out.println("Server started on port 8001");

        // the server receives the name of a game in requests but not the name of the associated file, so we get this info from the database
        System.out.println("Getting game file data...");
        gameFiles = DatabaseHelper.getGameFileNames();

        if (gameFiles != null)
            System.out.println("Successfully retrieved game file data");
        else {
            Miscellaneous.logError("Unable to retrieve game file data");
            System.out.println("Unable to retrieve game file data");
        }
    }

    public static void startServer() {
        try {
            // Backlogging value set to 100 meaning the server can queue up to 100 requests 8001
            HttpServer server = HttpServer.create(new InetSocketAddress("0.0.0.0", 8001), 100);

            // up to 10 threads, each new request is handled on a new thread so if there is a crash on a thread the server should remain up
            ThreadPoolExecutor threadPoolExecutor = (ThreadPoolExecutor) Executors.newFixedThreadPool(10);

            server.createContext("/game-server", new MyHttpHandler());
            server.setExecutor(threadPoolExecutor);
            server.start();
            System.out.println("Server started on port 8001");

            // the server receives the name of a game in requests but not the name of the associated file, so we get this info from the database
            System.out.println("Getting game file data...");
            gameFiles = DatabaseHelper.getGameFileNames();

            if (gameFiles != null)
                System.out.println("Successfully retrieved game file data");
            else {
                Miscellaneous.logError("Unable to retrieve game file data");
                System.out.println("Unable to retrieve game file data");
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
