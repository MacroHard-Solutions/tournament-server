import java.awt.image.BufferedImage;
import java.util.ArrayList;

public interface Game {
    // Return this in the gameOver methods if the game ends in a draw.
    Agent draw = new Agent("draw", "", -1);

    // returns null if the game is not over, else it returns the winning agent
    default Agent asynchronousGameOver(Agent agent, String move){
        return null;
    }

    // returns null if the game is not over, else it returns the winning player
    // each move in the moves arraylist corresponds to the player in the agents arrayList in the same index
    default Agent synchronousGameOver(ArrayList<Agent> agents, ArrayList<String> moves){
        return null;
    }

    Agent getNextPlayer(ArrayList<Agent> agents);

    // updates the board object
    void step(Agent agent, String move);

    // checks that the move the agent wants to play is valid
    boolean validMove(Agent agent, String move);

    // produces an image of the current game state
    BufferedImage render();

    // This method allows the game creator to handle invalid moves in lots of ways
    // A default move could be returned instead (like in snake)
    // The creator could even skip this agent's turn by creating a null move string since he controls validMove, playMove and the agent agents
    default String handleInvalidMove(Agent agent, String invalidMove, GameServer server){
        return server.sendAndReceiveMessage(agent, "move");
    }

    default void broadcastMove(ArrayList<Agent> agents, Agent agentWhoMoved, String move, GameServer server){
        for (Agent agent : agents){
            if (agent != agentWhoMoved)
                server.sendMessage(agent, move);
        }
    }

    // returns game log
    default String[] createAsynchronousGame(ArrayList<Agent> agents){
        System.out.println("Initialising game...");
        // this is the initial game state before any move has been played (think chess)
        //TODO save this image to a live game folder, and in synchronous game
        BufferedImage initialGameState = render();
        System.out.println("Creating game...");

        GameServer gameServer = new GameServer(agents.get(0), agents.get(1));
        StringBuilder gameLog = new StringBuilder("|");
        String[] result = new String[2];

        if (!gameServer.active){
            System.out.println("Unable to set up game.");
            result[0] = "failed";
            return result;
        }

        Agent winner = null;

        System.out.println("Starting game... ");

        while (winner == null){
            Agent currAgent = getNextPlayer(agents);
            String move = gameServer.sendAndReceiveMessage(currAgent, "move");

            // if the move is invalid, the way to handle this is defined by the game designer
            while (!validMove(currAgent, move)){
                move = handleInvalidMove(currAgent, move, gameServer);
            }

            System.out.println(currAgent.username + " played " + move);
            gameLog.append(move).append("|");
            broadcastMove(agents, currAgent, move, gameServer);
            step(currAgent, move);

            //TODO save this image to a live game folder, and in synchronous game
            BufferedImage gameState = render();

            winner = asynchronousGameOver(currAgent, move);
        }

        if (winner != draw)
            System.out.println("Winner... " + winner.username);
        else
            System.out.println("Draw!");

        for (Agent agent : agents){
            if (winner != draw)
                gameServer.sendMessage(agent, "winner_" + winner.username);
            else
                gameServer.sendMessage(agent, "draw");
        }

        System.out.println("Game over...");
        gameServer.closeServer();

        // index of the winning agent
        if (winner == agents.get(0))
            result[0] = "0";
        else if (winner == agents.get(1))
            result[0] = "1";
        else
            result[0] = "draw";

        result[1] = gameLog.toString();

        return result;
    }

    default void createSynchronousGame(ArrayList<Agent> agents){
        System.out.println("Initialising game...");
        System.out.println("Creating game...");

        GameServer gameServer = new GameServer(agents.get(0), agents.get(1));
        StringBuilder gameLog = new StringBuilder("|");

        if (!gameServer.active){
            System.out.println("Unable to set up game.");
            return;
        }

        Agent winner = null;

        System.out.println("Starting game... ");

        while (winner == null){
            ArrayList<String> moves = new ArrayList<>();

            for (int i = 0; i < agents.size(); i++) {
                // Doesn't make sense to have some weird order for a synchronous game
                Agent currAgent = getNextPlayer(agents);
                String move = gameServer.sendAndReceiveMessage(currAgent, "move");

                // if the move is invalid, the way to handle this is defined by the game designer
                while (!validMove(currAgent, move)) {
                    move = handleInvalidMove(currAgent, move, gameServer);
                }

                moves.add(move);
            }

            for (int j = 0; j < agents.size(); j++) {
                gameLog.append(moves.get(j)).append(" ");
                broadcastMove(agents, agents.get(j), moves.get(j), gameServer);
                step(agents.get(j), moves.get(j));
            }
            gameLog.append("|");

            render();
            winner = synchronousGameOver(agents, moves);
        }

        System.out.println("Winner... " + winner.username);
        for (Agent agent : agents){
            gameServer.sendMessage(agent, "winner_" + winner.username);
        }

        System.out.println("Game over...");
        gameServer.closeServer();
    }
}
