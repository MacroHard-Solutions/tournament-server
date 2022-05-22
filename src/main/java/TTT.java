import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

public class TTT implements Game{
    // The game designer decides on how the game information should be stored, in this case I've decided to go with a 2D array to represent the board
    String[][] board = new String[3][3];
    int i = 0;

    //---------------------------------------------------------------------
    // Move Format:
    // <row> <col> <piece>
    // eg. 0 2 X
    //---------------------------------------------------------------------

    // MUST HAVE CONSTRUCTOR
    //TODO better way to handle the designer getting the players
    public TTT(){
        for (int i = 0; i < 3; i++){
            for (int j = 0; j < 3; j++){
                board[i][j] = " ";
            }
        }
    }

    public void setPositionValue(int row, int col, String value)
    {
        board[row][col] = value;
    }

    public boolean fullBoard(){
        for (int i = 0; i < 3; i++){
            for (int j = 0; j < 3; j++){
                if (board[i][j].equals(" "))
                    return false;
            }
        }

        return true;
    }

    // null if game is not over; otherwise return the winner
    // board will already be updated
    @Override
    public Agent asynchronousGameOver(Agent agent, String move) {
        String[] data = move.split(" ");
        int x = Integer.parseInt(data[0]);
        int y = Integer.parseInt(data[1]);
        String piece = data[2];

        boolean winner = true;
        // Check row:
        for (int c = 0; c < 3; c++){
            if (!board[x][c].equals(piece)){
                winner = false;
                break;
            }
        }

        if (!winner){
            winner = true;
            // Check column:
            for (int r = 0; r < 3; r++){
                if (!board[r][y].equals(piece)){
                    winner = false;
                    break;
                }
            }
        }

        if (!winner){
            // Check both diagonals
            if (x == 1 && y == 1){
                winner = true;
                for (int i = 0; i < 3; i++){
                    if (!board[i][i].equals(piece)){
                        winner = false;
                        break;
                    }
                }

                if (!winner){
                    winner = true;
                    int c = 2;
                    for (int r = 0; r < 3; r++){
                        if (!board[r][c].equals(piece)){
                            winner = false;
                            break;
                        }
                        c--;
                    }
                }
            }
            // Check main diagonal
            else if (x == y) {
                winner = true;
                for (int r = 0; r < 3; r++) {
                    if (!board[r][r].equals(piece)) {
                        winner = false;
                        break;
                    }
                }
            }
            // Check other diagonal
            else if ((x + y) == 2){
                winner = true;
                int c = 2;
                for (int r = 0; r < 3; r++){
                    if (!board[r][c].equals(piece)){
                        winner = false;
                        break;
                    }
                    c--;
                }
            }
        }

        if (winner)
            return agent;
        else if (fullBoard())
            return draw;
        else
            return null;
    }

    @Override
    public Agent getNextPlayer(ArrayList<Agent> agents) {
        Agent out = agents.get(i);
        i = (i + 1) % 2;
        return out;
    }

    // True if valid. False if invalid
    @Override
    public boolean validMove(Agent agent, String move){
        // TODO could check more, like if move is not empty string, the format is correct, etc.
        String[] data = move.split(" ");
        int x = Integer.parseInt(data[0]);
        int y = Integer.parseInt(data[1]);
        String piece = data[2];

        // valid coordinates; square is free; valid piece
        if (x >= 0 && x < board.length && y >= 0 && y < board[0].length) {
            if (board[x][y].equals(" ")) {
                return (piece.equals("X") || piece.equals("O"));
            }
        }

        return false;
    }

    // Update board
    @Override
    public void step(Agent agent, String move) {
        String[] data = move.split(" ");
        int x = Integer.parseInt(data[0]);
        int y = Integer.parseInt(data[1]);
        String piece = data[2];
        board[x][y] = piece;
    }

    /**
     * This method reads an image from the file
     * @param fileLocation -- > eg. "C:/testImage.jpg"
     * @return BufferedImage of the file read
     */
    public static BufferedImage readImage(String fileLocation) {
        BufferedImage img = null;
        try {
            img = ImageIO.read(new File(fileLocation));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return img;
    }

    @Override
    public BufferedImage render(){
        BufferedImage backgroundImage = readImage("images/TicTacToe/board.png");

        //Create a Graphics  from the background image
        Graphics2D g = backgroundImage.createGraphics();

        //Set Antialias Rendering
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        // Draw background image at location (0,0)
        g.drawImage(backgroundImage, 0, 0, null);

        for (int r = 0; r < 3; r++){
            for (int c = 0; c < 3; c++){
                int x = 40 + (c * 250);
                int y = 20 + (r * 190);

                BufferedImage pieceImage = null;
                if (board[r][c].equals("X"))
                    pieceImage = readImage("images/TicTacToe/X.png");
                else if (board[r][c].equals("O"))
                    pieceImage = readImage("images/TicTacToe/O.png");

                if (pieceImage != null)
                    // Draw piece image at specially designated locations
                    g.drawImage(pieceImage, x, y, null);
            }
        }

        g.dispose();
        return backgroundImage;
    }
}

