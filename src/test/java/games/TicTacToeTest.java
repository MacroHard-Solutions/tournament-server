package games;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TicTacToeTest {
    @Test
    public void testGameLogic() {
        // Arrange
        String fakeUsername = "Jackson Browne";
        String fakeIpAddress = "127.0.0.1";
        int fakePort = 6666;

        Player fakePlayer = new Player(fakeUsername, fakeIpAddress, fakePort);
        TicTacToe ticTacToe = new TicTacToe();

        // Act
        ticTacToe.board[0][0] = "X";
        ticTacToe.board[1][1] = "O";
        ticTacToe.board[0][2] = "X";
        ticTacToe.board[1][2] = "O";

        String fakePlayerMoves = "0 1 X";
        ticTacToe.step(fakePlayer, fakePlayerMoves);

        // Assert
        Player winner = ticTacToe.asynchronousGameOver(fakePlayer, fakePlayerMoves);
        assertEquals(fakeUsername, winner.username);
    }
}