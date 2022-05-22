import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertFalse;

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

    @Test
    public void testFullBoard() {
        TicTacToe ticTacToe = new TicTacToe();

        for (int i = 0; i < 3; i++){
            for (int j = 0; j < 3; j++){
                ticTacToe.setPositionValue(i, j, "X");
            }
        }

        assertTrue(ticTacToe.fullBoard());
    }

    @Test
    public void testGameNotOver() {
        TicTacToe ticTacToe = new TicTacToe();

        Agent dummy = new Agent("", "", "", "", "", 0);

        ticTacToe.step(dummy, "1 0 X");

        assertEquals(ticTacToe.asynchronousGameOver, null);
    }
}
