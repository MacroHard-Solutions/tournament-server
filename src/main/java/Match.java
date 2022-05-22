import java.io.IOException;
import java.lang.reflect.Constructor;
import java.util.ArrayList;
import java.util.Arrays;

public class Match {
    private Agent agent1, agent2;
    private final String gameName;
    private String fileName;
    private final String tournamentID;
    private GameServer server;
    // 1 - successful
    // 0 - unable to get agent (presumably does not exist or the server is down)
    // -1 - game name is not recognised
    int failed = 1;

    public Match(String agent1ID, String agent2ID, String gameName, String tournamentID){
        this.gameName = gameName;
        this.tournamentID = tournamentID;

        //TODO annoying to check both result and exception. Just use one to handle errors
        try {
            this.agent1 = DatabaseHelper.getAgent(agent1ID);
            if (this.agent1 == null) {
                Miscellaneous.logError("Unable to get agent to create match");
                failed = 0;
                return;
            }

            this.agent2 = DatabaseHelper.getAgent(agent2ID);
            if (this.agent2 == null) {
                Miscellaneous.logError("Unable to get agent to create match");
                failed = 0;
                return;
            }
        }
        catch (IOException e){
            Miscellaneous.logError("Unable to get agent(s) to create match");
            Miscellaneous.logError(e.getMessage());
            failed = 0;
            return;
        }

        try {
            fileName = Miscellaneous.getGameFileName(gameName);
            if (fileName == null) {
                Miscellaneous.logError("Unable to recognise the game by the name of \"" + gameName + "\"");
                failed = 1;
            }
        }
        catch (Exception e){
            Miscellaneous.logError("Error with getting file name from game name");
            Miscellaneous.logError(e.getMessage());
            failed = 1;
        }
    }

    // -1 - server could not be established
    // 0 - agent did not confirm match
    // 1 - success
    public int setUpMatch(){
        server = new GameServer(agent1, agent2);
        // if server is immediately set to inactive then there was an error in creating the connections
        // won't log any error here because the error would've been logged by the GameServer class
        if (!server.active) return -1;

        // send match information to both agents. The agent should respond with "ok" if it is ready and willing to play the match
        StringBuilder matchInfoJson = new StringBuilder("{");
        matchInfoJson.append("\"game\":").append("\"").append(gameName).append("\",");
        // the order matters. Agents will use it to deduce who starts
        matchInfoJson.append("\"agents\":").append("[").append("\"").append(agent1.agentName).append("\",").append("\"").append(agent2.agentName).append("\"]}");

        String agent1Response = server.sendAndReceiveMessage(agent1, matchInfoJson.toString());
        if (!agent1Response.equals("ok")){
            Miscellaneous.logError("Agent did not confirm match. Agent's ID is " + agent1.agentID);
            return 0;
        }

        String agent2Response = server.sendAndReceiveMessage(agent2, matchInfoJson.toString());
        if (!agent2Response.equals("ok")){
            Miscellaneous.logError("Agent did not confirm match. Agent's ID is " + agent2.agentID);
            return 0;
        }

        return 1;
    }

    public Game getGame(){
        Constructor constructor;
        Game game;

        // code to load the user-defined class dynamically
        try {
            Class dynamicClass = Miscellaneous.loadGameClass(fileName);
            constructor = dynamicClass.getDeclaredConstructor();
        }
        catch (Exception e) {
            Miscellaneous.logError("Unable to load constructor of " + fileName + ".class");
            Miscellaneous.logError(e.getMessage());
            return null;
        }
        // create instance of the user-defined class
        try {
            game = (Game) constructor.newInstance();
        }
        catch (Exception e) {
            Miscellaneous.logError("Unable to construct instance of " + fileName + ".class");
            Miscellaneous.logError(e.getMessage());
            return null;
        }

        return game;
    }

    public boolean startMatch(String matchLogID, String directory) throws Exception {
        ArrayList<Agent> agents = new ArrayList<>();
        agents.add(agent1);
        agents.add(agent2);

        Game game = getGame();
        //TODO figure out how to tell if synchronous or asynchronous
        String[] gameInfo = game.createAsynchronousGame(agents, server, directory);
        System.out.println(gameInfo[1]);

        if (gameInfo[0].equals("failed"))
            return false;

        ArrayList<Agent> rankings = new ArrayList<>();
        boolean draw = false;

        // if gameInfo[0] = "0" then the agent with agent1ID won
        if (gameInfo[0].equals("0")){
            rankings.add(agent1);
            rankings.add(agent2);
        }
        else if (gameInfo[0].equals("1")){
            rankings.add(agent2);
            rankings.add(agent1);
        }
        else {
            rankings.add(agent1);
            rankings.add(agent2);
            draw = true;
        }

        return DatabaseHelper.closeLiveMatch(matchLogID, gameInfo[1], rankings, draw);
    }
}
