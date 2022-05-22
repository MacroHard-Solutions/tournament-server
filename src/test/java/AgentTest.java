import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class AgentTest {
    String fakeAgentID = "012439078124";
    String fakeAgentName = "TicTacToeMaster";
    String fakeUsername = "NoobMaster69";
    String fakeUserID = "992732312";
    String fakeIpAddress = "192.183.154.15";
    int fakePort = 80;

    Agent fakeAgent = new Agent(fakeAgentID, fakeAgentName, fakeUsername, fakeUserID, fakeIpAddress, fakePort);

    @Test
    void getAgentID() {
        assertEquals(fakeAgent.getAgentID(), fakeAgentID);
    }

    @Test
    void getAgentName() {
        assertEquals(fakeAgent.getAgentName(), fakeAgentName);
    }

    @Test
    void getUsername() {
        assertEquals(fakeAgent.getUsername(), fakeUsername);
    }

    @Test
    void getUserID() {
        assertEquals(fakeAgent.getUserID(), fakeUserID);
    }

    @Test
    void getIpAddress() {
        assertEquals(fakeAgent.getIpAddress(), fakeIpAddress);
    }

    @Test
    void getPort() {
        assertEquals(fakeAgent.getPort(), fakePort);
    }
}