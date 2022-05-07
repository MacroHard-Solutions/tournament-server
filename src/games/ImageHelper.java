package games;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

public class ImageHelper {
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
