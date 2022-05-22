import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertNull;

public class TTTTest {
    @Test
    public void testGameLogic() {
        // Arrange
        String fakeUsername = "Jackson Browne";
        String fakeIpAddress = "127.0.0.1";
        int fakePort = 6666;

        Agent fakePlayer = new Agent("", "", fakeUsername, "", fakeIpAddress, fakePort);
        TTT ticTacToe = new TTT();

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
        TTT ticTacToe = new TTT();

        for (int i = 0; i < 3; i++){
            for (int j = 0; j < 3; j++){
                ticTacToe.setPositionValue(i, j, "X");
            }
        }

        assertTrue(ticTacToe.fullBoard());
    }

    @Test
    public void testGameNotOver() {
        TTT ticTacToe = new TTT();

        Agent dummy = new Agent("", "", "", "", "", 0);
        ticTacToe.step(dummy, "0 0 O");
        Agent testDummy = ticTacToe.asynchronousGameOver(dummy, "1 1 X");

        assertNull(testDummy);
    }

    @Test
    public void testGameNotOver2() {
        TTT ticTacToe = new TTT();

        Agent dummy = new Agent("", "", "", "", "", 0);
        ticTacToe.step(dummy, "0 0 O");
        Agent testDummy = ticTacToe.asynchronousGameOver(dummy, "2 2 X");

        assertNull(testDummy);
    }

    @Test
    public void testGameNotOver3() {
        TTT ticTacToe = new TTT();

        Agent dummy = new Agent("", "", "", "", "", 0);
        ticTacToe.step(dummy, "0 0 O");
        Agent testDummy = ticTacToe.asynchronousGameOver(dummy, "2 0 X");

        assertNull(testDummy);
    }

    @Test
    public void testValidMove() {
        TTT ticTacToe = new TTT();

        Agent dummy = new Agent("", "", "", "", "", 0);
        ticTacToe.step(dummy, "0 0 O");

        assertTrue(ticTacToe.validMove(dummy, "1 1 X"));
    }
}
