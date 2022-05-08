package games;

import com.sun.net.httpserver.HttpServer;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.net.InetSocketAddress;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.ArrayList;
import java.util.Scanner;
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

        //System.out.println("Starting game");
        //ewGame();
    }

    private static void newGame() throws Exception {
        System.out.println("Select game to be played:");
        System.out.println("0. Tic-Tac-Toe");
        System.out.println("1. Rock Paper Scissors");

        Scanner scanner = new Scanner(System.in);

        int gameIndex = Integer.parseInt(scanner.nextLine());
        ArrayList<Player> players = new ArrayList<>();

        try {
            File agentsFile = new File("agent_database.txt");
            Scanner scanner2 = new Scanner(agentsFile);

            while (scanner2.hasNextLine()){
                String agentLine = scanner2.nextLine();
                String[] agentInfo = agentLine.split(" ");
                players.add(new Player(agentInfo[0], agentInfo[1], Integer.parseInt(agentInfo[2])));
            }
        }
        catch (FileNotFoundException e){
            System.out.println("An error occurred.");
            e.printStackTrace();
        }

        System.out.println("Select 2 agents to play against each other:");
        for (int i = 0; i < players.size(); i++){
            System.out.println(i + ". " + players.get(i).username);
        }

        Player player1 = players.get(Integer.parseInt(scanner.nextLine()));
        Player player2 = players.get(Integer.parseInt(scanner.nextLine()));

        ArrayList<Player> selectedPlayers = new ArrayList<>();
        selectedPlayers.add(player1);
        selectedPlayers.add(player2);

        // Tic-Tac_Toe
        if (gameIndex == 0){
            Class dynamicClass = getClassFromFile("games.TicTacToe");
            Constructor constructor = dynamicClass.getDeclaredConstructor();

            Game game = (Game) constructor.newInstance();
            game.createAsynchronousGame(selectedPlayers);
        }
    }

    public static Class getClassFromFile(String fullClassName) throws Exception {
        URLClassLoader loader = new URLClassLoader(new URL[] {new URL("file://")});
        return loader.loadClass(fullClassName);
    }
}
