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
            socket1 = new Socket();
            SocketAddress socketAddress = new InetSocketAddress(agent1.ipAddress, agent1.port);
            // 30 000 milliseconds = 30 seconds
            socket1.connect(socketAddress, 30*1000);
            in1 = new DataInputStream(new BufferedInputStream(socket1.getInputStream()));
            out1 = new DataOutputStream(socket1.getOutputStream());
            System.out.println("Agent 1 has joined...");

            this.agent1 = agent1;
        }
        catch(IOException i) {
            Miscellaneous.logError("Unable to connect to agent. Match cancelled. Agent's ID is " + agent1.agentID);
            Miscellaneous.logError(i.getMessage());
            System.out.println("Unable to connect to agent 1. Cancelling match...");
            closeServer();
            return;
        }

        try {
            socket2 = new Socket();
            SocketAddress socketAddress = new InetSocketAddress(agent2.ipAddress, agent2.port);
            // 30 000 milliseconds = 30 seconds
            socket2.connect(socketAddress, 30*1000);
            in2 = new DataInputStream(new BufferedInputStream(socket2.getInputStream()));
            out2 = new DataOutputStream(socket2.getOutputStream());
            System.out.println("Agent 2 has joined...");

            this.agent2 = agent2;
        }
        catch(IOException i) {
            Miscellaneous.logError("Unable to connect to agent. Match cancelled. Agent's ID is " + agent2.agentID);
            Miscellaneous.logError(i.getMessage());
            System.out.println("Unable to connect to agent 2. Cancelling match...");
            // alert agent 1 that the match is cancelled
            sendMessage(agent1, "cancel");
            closeServer();
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
                Miscellaneous.logError("Unknown agent " + agent.agentID);
            }
        }
        catch(IOException i){
            Miscellaneous.logError("Error in agent communication");
            Miscellaneous.logError(i.getMessage());
            return "";
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
            if (socket1 != null)
                socket1.close();
            if (in1 != null)
                in1.close();
            if (out1 != null)
                out1.close();
        }
        catch(IOException i){
            Miscellaneous.logError("Error in closing socket connections");
            Miscellaneous.logError(i.getMessage());
        }

        try {
            if (socket2 != null)
                socket2.close();
            if (in2 != null)
                in2.close();
            if (out2 != null)
                out2.close();
        }
        catch(IOException i){
            Miscellaneous.logError("Error in closing socket connections");
            Miscellaneous.logError(i.getMessage());
        }
    }
}
