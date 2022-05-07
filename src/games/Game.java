package games;

import java.awt.image.BufferedImage;
import java.util.ArrayList;

public interface Game {
    // Return this in the gameOver methods if the game ends in a draw.
    Player draw = new Player("draw", "", -1);

    // returns null if the game is not over, else it returns the winning player
    default Player asynchronousGameOver(Player player, String move){
        return null;
    }

    // returns null if the game is not over, else it returns the winning player
    // each move in the moves arraylist corresponds to the player in the players arrayList in the same index
    default Player synchronousGameOver(ArrayList<Player> players, ArrayList<String> moves){
        return null;
    }

    Player getNextPlayer(ArrayList<Player> players);

    // updates the board object
    void step(Player player, String move);

    // checks that the move the player wants to play is valid
    boolean validMove(Player player, String move);

    // produces an image of the current game state
    BufferedImage render();

    default void logMove(String move){
    }

    // This method allows the game creator to handle invalid moves in lots of ways
    // A default move could be returned instead (like in snake)
    // The creator could even skip this player's turn by creating a null move string since he controls validMove, playMove and the player agents
    default String handleInvalidMove(Player player, String invalidMove, GameServer server){
        return server.sendAndReceiveMessage(player, "move");
    }

    default void broadcastMove(ArrayList<Player> players, Player playerWhoMoved, String move, GameServer server){
        for (Player player: players){
            if (player != playerWhoMoved)
                server.sendMessage(player, move);
        }
    }

    default void createAsynchronousGame(ArrayList<Player> players){
        System.out.println("Initialising game...");
        // this is the initial game state before any move has been played (think chess)
        //TODO save this image to a live game folder, and in synchronous game
        BufferedImage initialGameState = render();
        System.out.println("Creating game...");

        GameServer gameServer = new GameServer(players.get(0), players.get(1));

        if (!gameServer.active){
            System.out.println("Unable to set up game.");
            return;
        }

        Player winner = null;

        System.out.println("Starting game... ");

        while (winner == null){
            Player currPlayer = getNextPlayer(players);
            System.out.println(currPlayer.username);
            String move = gameServer.sendAndReceiveMessage(currPlayer, "move");
            System.out.println(move);

            // if the move is invalid, the way to handle this is defined by the game designer
            while (!validMove(currPlayer, move)){
                move = handleInvalidMove(currPlayer, move, gameServer);
            }

            logMove(move);
            broadcastMove(players, currPlayer, move, gameServer);
            step(currPlayer, move);

            //TODO save this image to a live game folder, and in synchronous game
            BufferedImage gameState = render();

            winner = asynchronousGameOver(currPlayer, move);
        }

        System.out.println("Winner... " + winner.username);
        for (Player player: players){
            gameServer.sendMessage(player, "winner_" + winner.username);
        }

        System.out.println("games.Game over...");
        gameServer.closeServer();
    }

    default void createSynchronousGame(ArrayList<Player> players){
        System.out.println("Initialising game...");
        System.out.println("Creating game...");

        GameServer gameServer = new GameServer(players.get(0), players.get(1));

        if (!gameServer.active){
            System.out.println("Unable to set up game.");
            return;
        }

        Player winner = null;

        System.out.println("Starting game... ");

        while (winner == null){
            ArrayList<String> moves = new ArrayList<>();

            for (int i = 0; i < players.size(); i++) {
                // Doesn't make sense to have some weird order for a synchronous game
                Player currPlayer = getNextPlayer(players);
                String move = gameServer.sendAndReceiveMessage(currPlayer, "move");

                // if the move is invalid, the way to handle this is defined by the game designer
                while (!validMove(currPlayer, move)) {
                    move = handleInvalidMove(currPlayer, move, gameServer);
                }

                moves.add(move);
            }

            for (int j = 0; j < players.size(); j++) {
                logMove(moves.get(j));
                broadcastMove(players, players.get(j), moves.get(j), gameServer);
                step(players.get(j), moves.get(j));
            }

            render();
            winner = synchronousGameOver(players, moves);
        }

        System.out.println("Winner... " + winner.username);
        for (Player player: players){
            gameServer.sendMessage(player, "winner_" + winner.username);
        }

        System.out.println("games.Game over...");
        gameServer.closeServer();
    }
}
