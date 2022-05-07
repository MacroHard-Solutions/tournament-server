package games;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class RockPaperScissorsLizardSpock implements Game{
    ArrayList<String> playerMoves = new ArrayList<>(Arrays.asList("", ""));
    int nextPlayerIndex = 0;
    int stepIndex = 0;

    // MUST HAVE A CONSTRUCTOR
    public RockPaperScissorsLizardSpock(){}

    // null if game is not over; otherwise return the winner
    // board will already be updated
    @Override
    public Player synchronousGameOver(ArrayList<Player> players, ArrayList<String> moves) {
        // Check if it is a tie
        if (moves.get(0).equals(moves.get(1)))
            return null;

        Map<String, ArrayList<String>> matchUps = new HashMap<>();
        matchUps.put("Rock", new ArrayList<>(Arrays.asList("Scissors", "Lizard")));
        matchUps.put("Paper", new ArrayList<>(Arrays.asList("Rock", "Spock")));
        matchUps.put("Scissors", new ArrayList<>(Arrays.asList("Paper", "Lizard")));
        matchUps.put("Lizard", new ArrayList<>(Arrays.asList("Paper", "Spock")));
        matchUps.put("Spock", new ArrayList<>(Arrays.asList("Scissors", "Rock")));

        if (matchUps.get(moves.get(0)).contains(moves.get(1)))
            return players.get(0);
        else
            return players.get(1);
    }

    @Override
    public Player getNextPlayer(ArrayList<Player> players) {
        Player out = players.get(nextPlayerIndex);
        nextPlayerIndex = (nextPlayerIndex + 1) % 2;
        return out;
    }

    @Override
    public void step(Player player, String move) {
        System.out.println(player.username + " chose " + move);
        playerMoves.set(stepIndex, move);
        stepIndex = (stepIndex + 1) % 2;
    }

    @Override
    public boolean validMove(Player player, String move) {
        ArrayList<String> acceptableMoves = new ArrayList<>(Arrays.asList("Rock", "Paper", "Scissors", "Lizard", "Spock"));
        return acceptableMoves.contains(move);
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
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        return img;
    }

    @Override
    public BufferedImage render() {
        BufferedImage backgroundImage = readImage("images/RPS/board.jpg");

        //Create a Graphics  from the background image
        Graphics2D g = backgroundImage.createGraphics();

        //Set Antialias Rendering
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        // Draw background image at location (0,0)
        g.drawImage(backgroundImage, 0, 0, null);

        BufferedImage move1Image = readImage("images/RPS/" + playerMoves.get(0) + ".jpg");
        if (move1Image != null)
            // Draw piece image at specially designated location
            g.drawImage(move1Image, 50, 50, null);

        BufferedImage move2Image = readImage("images/RPS/" + playerMoves.get(1) + ".jpg");
        if (move2Image != null)
            // Draw piece image at specially designated location
            g.drawImage(move2Image, 550, 50, null);

        g.dispose();
        return backgroundImage;
    }
}
