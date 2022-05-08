import java.net.*;
import java.io.*;
import java.nio.charset.StandardCharsets;

public class GameServer {
    // initialize sockets, input and output streams
    private Socket socket1 = null;
    private Socket socket2 = null;
    private DataInputStream in1 = null;
    private DataInputStream in2 = null;
    private DataOutputStream out1 = null;
    private DataOutputStream out2 = null;

    Agent agent1 = null;
    Agent agent2 = null;

    boolean active = true;

    public GameServer(Agent agent1, Agent agent2){
        // starts server and waits for a connection
        try {
            socket1 = new Socket(agent1.ipAddress, agent1.port);
            in1 = new DataInputStream(new BufferedInputStream(socket1.getInputStream()));
            out1 = new DataOutputStream(socket1.getOutputStream());
            System.out.println("Agent 1 has joined...");

            this.agent1 = agent1;
        }
        catch(IOException i) {
            System.out.println("An error has occurred:");
            System.out.println(i);
            System.out.println("");
            System.out.println("Unable to connect to player 1. Cancelling game...");
            cancelGame();
        }

        try {
            socket2 = new Socket(agent2.ipAddress, agent2.port);
            in2 = new DataInputStream(new BufferedInputStream(socket2.getInputStream()));
            out2 = new DataOutputStream(socket2.getOutputStream());
            System.out.println("Agent 2 has joined...");

            this.agent2 = agent2;
        }
        catch(IOException i) {
            System.out.println("An error has occurred:");
            System.out.println(i);
            System.out.println("");
            System.out.println("Unable to connect to player 2. Cancelling game...");
            cancelGame();
        }
    }

    public String sendAndReceiveMessage(Agent agent, String message){
        StringBuilder response = new StringBuilder();

        try {
            if (agent == agent1) {
                // Using output.write(s.getBytes(StandardCharsets.UTF_8)) is more compatible with non-Java clients.
                // Python utf-8 decoding doesn't support the 2-byte length prefix added by writeUTF().
                out1.write(message.getBytes(StandardCharsets.UTF_8));
                // Using this instead of readUTF because that method caused issues with non-java agents
                while(true) {
                    int ch = in1.read();
                    if ((char)ch == '\n') break;
                    response.append((char) ch);
                }
            }
            else if (agent == agent2) {
                out2.write(message.getBytes(StandardCharsets.UTF_8));
                while(true) {
                    int ch = in2.read();
                    if ((char)ch == '\n') break;
                    response.append((char) ch);
                }
            }
            else {
                //TODO use logging instead of println
                System.out.println("Unknown Agent");
            }
        }
        catch(IOException i){
            System.out.println(i);
        }

        return response.toString();
    }

    public void sendMessage(Agent agent, String message){
        try {
            if (agent == agent1)
                out1.write(message.getBytes(StandardCharsets.UTF_8));
            else if (agent == agent2)
                out2.write(message.getBytes(StandardCharsets.UTF_8));
            else
                //TODO use logging instead of println
                System.out.println("Unknown Agent");
        }
        catch(IOException i){
            System.out.println(i);
        }
    }

    public void closeServer(){
        this.active = false;
        System.out.println("Closing connections");

        try {
            socket1.close();
            in1.close();
            out1.close();
        }
        catch(IOException i){
            System.out.println(i);
        }

        try {
            socket2.close();
            in2.close();
            out2.close();
        }
        catch(IOException i){
            System.out.println(i);
        }
    }

    public void cancelGame(){
        sendMessage(agent1, "cancel");
        sendMessage(agent2, "cancel");
        closeServer();
    }
}
