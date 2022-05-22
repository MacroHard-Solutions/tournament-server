public class Agent {
    String agentID;
    String agentName;
    String username;
    String userID;
    String ipAddress;
    int port;

    public Agent(String agentID, String agentName, String username, String userID, String ipAddress, int port) {
        this.agentID = agentID;
        this.agentName = agentName;
        this.username = username;
        this.userID = userID;
        this.ipAddress = ipAddress;
        this.port = port;
    }
}
