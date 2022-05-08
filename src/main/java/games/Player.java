package games;

public class Player {
    String username;
    String ipAddress;
    int port;

    public Player(String username, String ipAddress, int port) {
        this.username = username;
        this.ipAddress = ipAddress;
        this.port = port;
    }
}
