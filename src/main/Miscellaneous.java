package main;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.Constructor;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.ArrayList;
import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;
import java.util.Arrays;

public class Miscellaneous {
    public static boolean challenge(String agent1ID, String agent2ID, String gameName, String tournamentID) throws Exception {
        ArrayList<Agent> agents = new ArrayList<>();
        agents.add(DatabaseHelper.getAgent(agent1ID));
        agents.add(DatabaseHelper.getAgent(agent2ID));

        Class dynamicClass = loadGameClass(gameName);
        Constructor constructor = dynamicClass.getDeclaredConstructor();

        String dateTime = getCurrentDateTime();
        Game game = (Game) constructor.newInstance();
        String[] gameInfo = game.createAsynchronousGame(agents);
        System.out.println(gameInfo[1]);

        if (gameInfo[0].equals("failed"))
            return false;

        ArrayList<Integer> rankings = new ArrayList<>();
        // if gameInfo[0] = "0" then the agent with agent1ID won
        if (gameInfo[0].equals("0")){
            rankings.add(0);
            rankings.add(1);
        }
        else if (gameInfo[0].equals("1")){
            rankings.add(1);
            rankings.add(0);
        }
        else {
            // draw
            rankings.add(0);
            rankings.add(0);
        }

        ArrayList<String> agentIDs = new ArrayList<>(Arrays.asList(agent1ID, agent2ID));

        return DatabaseHelper.recordMatch(tournamentID, dateTime, gameInfo[1], agentIDs, rankings);
    }

    public static Class loadGameClass(String className) throws Exception {
        Miscellaneous m = new Miscellaneous();
        File jarFile = new File(m.getClass().getProtectionDomain().getCodeSource().getLocation().toURI());
        File directory = jarFile.getParentFile();
        File[] contents = directory.listFiles();

        assert contents != null;
        for (File object: contents){
            // this is the folder where uploaded game classes will be stored
            if (object.getName().equals("uploaded-game-classes")){
                File[] classes = object.listFiles();
                assert classes != null;
                for (File classFile: classes){
                    if (classFile.getName().equals(className + ".class")){
                        Class dynamicClass = getClassFromFile(object, className);
                        return dynamicClass;
                    }
                }
            }
        }
        // couldn't find the class
        return null;
    }

    public static Class getClassFromFile(File classFile, String fullClassName) throws Exception {
        // Convert File to a URL
        URL url = classFile.toURI().toURL();
        URL[] urls = new URL[]{url};
        URLClassLoader loader = new URLClassLoader(urls);
        return loader.loadClass(fullClassName);
    }

    /**
     * This method writes a buffered image to a file
     * @param img -- > BufferedImage
     * @param fileLocation --> e.g. "C:/testImage.jpg"
     * @param extension --> e.g. "jpg","gif","png"
     */
    public static void writeImage(BufferedImage img, String fileLocation, String extension) {
        try {
            File outputFile = new File(fileLocation);
            ImageIO.write(img, extension, outputFile);
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static String getCurrentDateTime(){
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        return dtf.format(now);
    }
}
