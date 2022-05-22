import org.junit.Test;
import static org.junit.Assert.assertEquals;

public class TicTacToeTest {
    @Test
    public void testGameLogic() {
        // Arrange
        String fakeUsername = "Jackson Browne";
        String fakeIpAddress = "127.0.0.1";
        int fakePort = 6666;

        Agent fakePlayer = new Agent(fakeUsername, fakeIpAddress, fakePort);
        TicTacToe ticTacToe = new TicTacToe();

        // Act
        ticTacToe.setPositionValue(0, 0, "X");
        ticTacToe.setPositionValue(1, 1, "O");
        ticTacToe.setPositionValue(0, 2, "X");
        ticTacToe.setPositionValue(1, 2, "O");

        String fakePlayerMoves = "0 1 X";
        ticTacToe.step(fakePlayer, fakePlayerMoves);

        // Assert
        Agent winner = ticTacToe.asynchronousGameOver(fakePlayer, fakePlayerMoves);
        assertEquals(fakeUsername, winner.getUsername());
    }
}
