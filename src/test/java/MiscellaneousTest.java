import org.junit.Test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.junit.jupiter.api.Assertions.*;

public class MiscellaneousTest {

    @Test
    public void getGameFileName() {
        String fakeGameFileName = "TicTacToe";
        assertNull(Miscellaneous.getGameFileName(fakeGameFileName));
    }

    @Test
    public void getCurrentDateTime() {
        DateTimeFormatter testDate = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        String testDateOutput = testDate.format(now);
        assertEquals(Miscellaneous.getCurrentDateTime(), testDateOutput);
    }

    @Test
    public void loadGameClass() {
        try {
            Class testGameClass = Miscellaneous.loadGameClass("Sudoku");
            assertNull(testGameClass);
        } catch (Exception ignored) {
        }
    }

    @Test
    public void logError() {
        String testErrorTime = Miscellaneous.getCurrentDateTime();
        String testErrorMessage = "Incorrect input format";
        Miscellaneous.logError(testErrorMessage);
        String errorFileName = "error_log.txt";
        File file = new File(errorFileName);

        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line = br.readLine();

            while (line != null) {
                String nextLine = br.readLine();

                if (nextLine == null)
                    assertEquals(line, testErrorTime + " " + testErrorMessage);

                line = nextLine;
            }
        } catch (Exception ignored) {
        }
    }
}