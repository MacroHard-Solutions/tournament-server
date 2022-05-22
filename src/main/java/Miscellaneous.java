import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URL;
import java.net.URLClassLoader;
import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;

public class Miscellaneous {
    public static String getGameFileName(String gameName) throws IOException {
        String fileName = null;

        if (Program.gameFiles != null)
            fileName = Program.gameFiles.get(gameName);

        if (fileName == null){
            // try updating from database again
            Program.gameFiles = DatabaseHelper.getGameFileNames();
            if (Program.gameFiles != null)
                fileName = Program.gameFiles.get(gameName);

            if (fileName == null) {
                return null;
            }
        }

        fileName = fileName.substring(0, fileName.length() - 5);
        return fileName;
    }


    public static Class getClassFromFile(File classFile, String fullClassName) throws Exception {
        // Convert File to a URL
        URL url = classFile.toURI().toURL();
        URL[] urls = new URL[]{url};
        URLClassLoader loader = new URLClassLoader(urls);
        return loader.loadClass(fullClassName);
    }

    public static String getCurrentDateTime(){
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        return dtf.format(now);
    }

    public static Class loadGameClass(String className) throws Exception {
        Miscellaneous m = new Miscellaneous();
        File jarFile = new File(m.getClass().getProtectionDomain().getCodeSource().getLocation().toURI());
        File directory = jarFile.getParentFile().getParentFile();
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

    public static void logError(String errorMessage) {
        try {
            FileWriter errorFile = new FileWriter("error_log.txt", true);
            String currentDateTime = getCurrentDateTime();
            errorFile.write(currentDateTime + " ");
            errorFile.write(errorMessage + "\n");
            errorFile.close();
        }
        catch (IOException e){
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
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
}
