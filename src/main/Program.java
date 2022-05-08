import com.sun.net.httpserver.HttpServer;

import java.net.InetSocketAddress;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;

public class Program {
    public static void main(String[] args) throws Exception {
        // Backlogging value set to 100 meaning the server can queue up to 100 requests 8001
        HttpServer server = HttpServer.create(new InetSocketAddress("172.31.24.197", 8001), 100);

        ThreadPoolExecutor threadPoolExecutor = (ThreadPoolExecutor) Executors.newFixedThreadPool(10);

        server.createContext("/game-server", new MyHttpHandler());
        server.setExecutor(threadPoolExecutor);
        server.start();
        System.out.println("Server started on port 8001");
    }
}
