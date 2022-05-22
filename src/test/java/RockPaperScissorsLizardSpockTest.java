import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class RockPaperScissorsLizardSpockTest {
    String fakeAgentID = "012439078124";
    String fakeAgentName = "TicTacToeMaster";
    String fakeUsername = "NoobMaster69";
    String fakeUserID = "992732312";
    String fakeIpAddress = "192.183.154.15";
    int fakePort = 80;

    Agent fakeAgent1 = new Agent(fakeAgentID, fakeAgentName, fakeUsername, fakeUserID, fakeIpAddress, fakePort);
    Agent fakeAgent2 = new Agent(fakeAgentID, fakeAgentName, fakeUsername, fakeUserID, fakeIpAddress, fakePort);

    ArrayList<Agent> fakeAgents = new ArrayList<>(Arrays.asList(
            fakeAgent1, fakeAgent2
    ));
    ArrayList<String> fakeAgentMoves = new ArrayList<>(Arrays.asList(
            "Rock", "Rock"
    ));

    RockPaperScissorsLizardSpock fakeRockPaperScissorsLizardSpock = new RockPaperScissorsLizardSpock();

    @Test
    void synchronousGameOver() {
        assertNull(fakeRockPaperScissorsLizardSpock.synchronousGameOver(fakeAgents, fakeAgentMoves));
    }

    @Test
    void getNextPlayer() {
        assertEquals(fakeRockPaperScissorsLizardSpock.getNextPlayer(fakeAgents), fakeAgent1);
    }

    @Test
    void step() {
        fakeRockPaperScissorsLizardSpock.step(fakeAgent1, "Rock");
        assertEquals(fakeRockPaperScissorsLizardSpock.getStepIndex(), 1);
    }

    @Test
    void validMove() {
        assertFalse(fakeRockPaperScissorsLizardSpock.validMove(fakeAgent1, "Water"));
        assertTrue(fakeRockPaperScissorsLizardSpock.validMove(fakeAgent1, "Lizard"));
        assertTrue(fakeRockPaperScissorsLizardSpock.validMove(fakeAgent1, "Rock"));
        assertFalse(fakeRockPaperScissorsLizardSpock.validMove(fakeAgent1, "Earthquake"));
    }
}