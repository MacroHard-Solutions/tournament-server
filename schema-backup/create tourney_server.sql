-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema tourney_server
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema tourney_server
-- -----------------------------------------------------
USE `tourney_server` ;

-- -----------------------------------------------------
-- Table `tourney_server`.`ADDRESS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tourney_server`.`ADDRESS` ;

CREATE TABLE IF NOT EXISTS `tourney_server`.`ADDRESS` (
  `ADDRESS_ID` VARCHAR(45) NOT NULL COMMENT 'The UUID of an agent\'s address',
  `ADDRESS_IP` VARCHAR(15) NOT NULL COMMENT 'Agent\'s IP address',
  `ADDRESS_PORT` INT UNSIGNED NOT NULL COMMENT 'Agent\'s port #',
  PRIMARY KEY (`ADDRESS_ID`),
  UNIQUE INDEX `ADDRESS_ID_UNIQUE` (`ADDRESS_ID` ASC) VISIBLE,
  UNIQUE INDEX `ADDRESS_IP_UNIQUE` (`ADDRESS_IP` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tourney_server`.`GAME`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tourney_server`.`GAME` ;

CREATE TABLE IF NOT EXISTS `tourney_server`.`GAME` (
  `GAME_ID` VARCHAR(45) NOT NULL COMMENT 'The UUID of the game',
  `GAME_NAME` VARCHAR(100) NOT NULL,
  `FILE_NAME` VARCHAR(100) NOT NULL COMMENT 'Location of the game file, stored in the games directory',
  PRIMARY KEY (`GAME_ID`),
  UNIQUE INDEX `GAME_ID_UNIQUE` (`GAME_ID` ASC) VISIBLE,
  UNIQUE INDEX `GAME_NAME_UNIQUE` (`GAME_NAME` ASC) VISIBLE,
  UNIQUE INDEX `FILE_NAME_UNIQUE` (`FILE_NAME` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tourney_server`.`TOURNAMENT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tourney_server`.`TOURNAMENT` ;

CREATE TABLE IF NOT EXISTS `tourney_server`.`TOURNAMENT` (
  `TOURNAMENT_ID` VARCHAR(45) NOT NULL COMMENT 'The UUID of the tournament',
  `TOURNAMENT_NAME` VARCHAR(100) NOT NULL,
  `GAME_ID` VARCHAR(45) NOT NULL COMMENT 'The UUID of the game this tournament falls under',
  PRIMARY KEY (`TOURNAMENT_ID`),
  UNIQUE INDEX `TOURNAMENT_ID_UNIQUE` (`TOURNAMENT_ID` ASC) VISIBLE,
  INDEX `GAME_ID_idx` (`GAME_ID` ASC) VISIBLE,
  UNIQUE INDEX `TOURNAMENT_NAME_UNIQUE` (`TOURNAMENT_NAME` ASC) VISIBLE,
  CONSTRAINT `GAME_ID_TOURNAMENT`
    FOREIGN KEY (`GAME_ID`)
    REFERENCES `tourney_server`.`GAME` (`GAME_ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tourney_server`.`USER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tourney_server`.`USER` ;

CREATE TABLE IF NOT EXISTS `tourney_server`.`USER` (
  `USER_ID` VARCHAR(128) NOT NULL COMMENT 'The user\'s unique UUID generated each time a new user is registered',
  `USER_FNAME` VARCHAR(45) NOT NULL,
  `USER_LNAME` VARCHAR(45) NOT NULL,
  `USERNAME` VARCHAR(45) NOT NULL COMMENT 'The user\'s username',
  `USER_EMAIL` VARCHAR(45) NOT NULL,
  `USER_PASSWD` VARCHAR(256) NOT NULL COMMENT 'The user\'s password, stored as an SHA-256 hash',
  `USER_IS_ADMIN` TINYINT NOT NULL DEFAULT 0 COMMENT 'Whether the user is a player or administrator',
  `USER_NOTIFICATIONS` TINYINT NOT NULL DEFAULT 0 COMMENT 'Whether the user would like to recieve notifications',
  PRIMARY KEY (`USER_ID`),
  UNIQUE INDEX `USER_ID_UNIQUE` (`USER_ID` ASC) VISIBLE,
  UNIQUE INDEX `USERNAME_UNIQUE` (`USERNAME` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tourney_server`.`AGENT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tourney_server`.`AGENT` ;

CREATE TABLE IF NOT EXISTS `tourney_server`.`AGENT` (
  `AGENT_ID` VARCHAR(45) NOT NULL COMMENT 'UUID of the player\'s agent',
  `USER_ID` VARCHAR(45) NOT NULL COMMENT 'The player\'s UUID',
  `ADDRESS_ID` VARCHAR(45) NOT NULL COMMENT 'The agent\'s address UUID',
  `TOURNAMENT_ID` VARCHAR(45) NOT NULL COMMENT 'The tournament UUID',
  `AGENT_ELO` FLOAT UNSIGNED NOT NULL COMMENT 'The ELO rating of the agent',
  PRIMARY KEY (`AGENT_ID`),
  UNIQUE INDEX `AGENT_ID_UNIQUE` (`AGENT_ID` ASC) VISIBLE,
  UNIQUE INDEX `ADDRESS_ID_UNIQUE` (`ADDRESS_ID` ASC) VISIBLE,
  INDEX `ADDRESS_ID_idx` (`ADDRESS_ID` ASC) VISIBLE,
  INDEX `TOURNAMENT_ID_idx` (`TOURNAMENT_ID` ASC) VISIBLE,
  INDEX `USER_ID_idx` (`USER_ID` ASC) VISIBLE,
  CONSTRAINT `ADDRESS_ID_AGENT`
    FOREIGN KEY (`ADDRESS_ID`)
    REFERENCES `tourney_server`.`ADDRESS` (`ADDRESS_ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `TOURNAMENT_ID_AGENT`
    FOREIGN KEY (`TOURNAMENT_ID`)
    REFERENCES `tourney_server`.`TOURNAMENT` (`TOURNAMENT_ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `USER_ID_AGENT`
    FOREIGN KEY (`USER_ID`)
    REFERENCES `tourney_server`.`USER` (`USER_ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tourney_server`.`MATCH_LOG`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tourney_server`.`MATCH_LOG` ;

CREATE TABLE IF NOT EXISTS `tourney_server`.`MATCH_LOG` (
  `MATCH_LOG_ID` VARCHAR(45) NOT NULL COMMENT 'THE UUID of the match to be logged from a tournament',
  `TOURNAMENT_ID` VARCHAR(45) NOT NULL COMMENT 'The UUID of the tournament this match was played in',
  `GAME_LOG` BLOB NOT NULL COMMENT 'Details of the match',
  `MATCH_LOG_TIME` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Date and time of  recording the past match',
  PRIMARY KEY (`MATCH_LOG_ID`),
  UNIQUE INDEX `MATCH_LOG_ID_UNIQUE` (`MATCH_LOG_ID` ASC) VISIBLE,
  UNIQUE INDEX `UK_MATCH_LOG_MATCH_LOG_TIME` (`MATCH_LOG_TIME` ASC) VISIBLE,
  INDEX `TOURNAMENT_ID_idx` (`TOURNAMENT_ID` ASC) VISIBLE,
  CONSTRAINT `TOURNAMENT_ID_MATCH_LOG`
    FOREIGN KEY (`TOURNAMENT_ID`)
    REFERENCES `tourney_server`.`TOURNAMENT` (`TOURNAMENT_ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `tourney_server`.`RANKING`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tourney_server`.`RANKING` ;

CREATE TABLE IF NOT EXISTS `tourney_server`.`RANKING` (
  `MATCH_LOG_ID` VARCHAR(45) NOT NULL COMMENT 'The UUID of the game played',
  `AGENT_ID` VARCHAR(45) NOT NULL COMMENT 'The UUID of the player\'s agent',
  `RANKING` INT UNSIGNED NOT NULL COMMENT 'The agent\'s ranking in a match.\n0 indicates an undefined ranking',
  PRIMARY KEY (`MATCH_LOG_ID`, `AGENT_ID`),
  INDEX `AGENT_ID_idx` (`AGENT_ID` ASC) VISIBLE,
  CONSTRAINT `AGENT_ID_RANKING`
    FOREIGN KEY (`AGENT_ID`)
    REFERENCES `tourney_server`.`AGENT` (`AGENT_ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `MATCH_LOG_ID_RANKING`
    FOREIGN KEY (`MATCH_LOG_ID`)
    REFERENCES `tourney_server`.`MATCH_LOG` (`MATCH_LOG_ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

USE `tourney_server` ;

-- -----------------------------------------------------
-- procedure check_existing_user
-- -----------------------------------------------------

USE `tourney_server`;
DROP procedure IF EXISTS `tourney_server`.`check_existing_user`;

DELIMITER $$
USE `tourney_server`$$
CREATE DEFINER=`admin`@`%` PROCEDURE `check_existing_user`(IN userName varchar(45))
COMMENT 'Checks if a user exists given the username'
BEGIN

  SET @uName = userName;

  PREPARE existingUserCheck FROM 'SELECT * FROM `USER` WHERE USERNAME = ?';

  EXECUTE existingUserCheck USING @uName;

  DEALLOCATE PREPARE existingUserCheck;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure delete_query
-- -----------------------------------------------------

USE `tourney_server`;
DROP procedure IF EXISTS `tourney_server`.`delete_query`;

DELIMITER $$
USE `tourney_server`$$
CREATE DEFINER=`admin`@`%` PROCEDURE `delete_query`(IN tblName VARCHAR(45), IN whereCondition TEXT)
    MODIFIES SQL DATA
BEGIN

  SET @stmt = CONCAT("DELETE FROM ", tblName, " WHERE ", whereCondition);

  

  CALL execute_stmt();

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure execute_stmt
-- -----------------------------------------------------

USE `tourney_server`;
DROP procedure IF EXISTS `tourney_server`.`execute_stmt`;

DELIMITER $$
USE `tourney_server`$$
CREATE PROCEDURE `execute_stmt` ()
COMMENT 'Simply executes the current statement stored in @stmt'
BEGIN
  PREPARE queryStmt FROM @stmt;
  EXECUTE queryStmt;
  DEALLOCATE PREPARE queryStmt;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure insert_agent
-- -----------------------------------------------------

USE `tourney_server`;
DROP procedure IF EXISTS `tourney_server`.`insert_agent`;

DELIMITER $$
USE `tourney_server`$$
CREATE DEFINER=`admin`@`%` PROCEDURE `insert_agent`(IN userID VARCHAR(45), IN addressID VARCHAR(45), IN tournamentID VARCHAR(45), IN eloRating FLOAT)
    MODIFIES SQL DATA
COMMENT 'Creates a new agent entry with the given userID, addressID, tournamentID and eloRating'
BEGIN

  INSERT INTO `AGENT`(AGENT_ID, USER_ID, ADDRESS_ID, TOURNAMENT_ID, AGENT_ELO)

  VALUES (UUID(), userID, addressID, tournamentID, eloRating);



  CALL retrieve_row_entry("AGENT", "ADDRESS_ID", CONCAT("'",addressID,"'"));

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure insert_agent_address
-- -----------------------------------------------------

USE `tourney_server`;
DROP procedure IF EXISTS `tourney_server`.`insert_agent_address`;

DELIMITER $$
USE `tourney_server`$$
CREATE DEFINER=`admin`@`%` PROCEDURE `insert_agent_address`(IN addressIP VARCHAR(15), IN portNum INT)
    MODIFIES SQL DATA
COMMENT 'Creates a new address entry with the given addressIP and portNum'
BEGIN

  INSERT INTO `ADDRESS`(ADDRESS_ID, ADDRESS_IP, ADDRESS_PORT)

  VALUES (UUID(), addressIP, portNum);



  CALL retrieve_row_entry("ADDRESS", "ADDRESS_IP", CONCAT("'",addressIP,"'"));

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure insert_game
-- -----------------------------------------------------

USE `tourney_server`;
DROP procedure IF EXISTS `tourney_server`.`insert_game`;

DELIMITER $$
USE `tourney_server`$$
CREATE DEFINER=`admin`@`%` PROCEDURE `insert_game`(IN gameName VARCHAR(100), IN fileName VARCHAR(100))
    MODIFIES SQL DATA
COMMENT 'Creates a new game entry with its gameName and associated path to the fileName'
BEGIN

  INSERT INTO `GAME`(GAME_ID, GAME_NAME, FILE_NAME)

  VALUES (UUID(), gameName, fileName);



  CALL retrieve_row_entry("GAME", "GAME_NAME", CONCAT("'",gameName,"'"));

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure insert_match_log
-- -----------------------------------------------------

USE `tourney_server`;
DROP procedure IF EXISTS `tourney_server`.`insert_match_log`;

DELIMITER $$
USE `tourney_server`$$
CREATE DEFINER=`admin`@`%` PROCEDURE `insert_match_log`(IN tournamentID VARCHAR(45), IN matchLogTime TIMESTAMP, IN gameLog BLOB)
    MODIFIES SQL DATA
COMMENT 'Creates a new match log entry with the associated tournamentID, match log time and gameLog'
BEGIN

  INSERT INTO `MATCH_LOG`(MATCH_LOG_ID, TOURNAMENT_ID, MATCH_LOG_TIME, GAME_LOG)

  VALUES (UUID(), tournamentID, matchLogTime, gameLog);



  CALL retrieve_row_entry("MATCH_LOG", "MATCH_LOG_TIME", CONCAT("'",matchLogTime,"'"));

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure insert_ranking
-- -----------------------------------------------------

USE `tourney_server`;
DROP procedure IF EXISTS `tourney_server`.`insert_ranking`;

DELIMITER $$
USE `tourney_server`$$
CREATE DEFINER=`admin`@`%` PROCEDURE `insert_ranking`(IN matchLogID VARCHAR(45), IN agentID VARCHAR(45), IN ranking INT)
    MODIFIES SQL DATA
COMMENT 'Creates a new ranking to a particular match for an agent'
BEGIN

  INSERT INTO `RANKING`(MATCH_LOG_ID, AGENT_ID, `RANK`)

  VALUES (matchLogID, agentID, ranking);

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure insert_tournament
-- -----------------------------------------------------

USE `tourney_server`;
DROP procedure IF EXISTS `tourney_server`.`insert_tournament`;

DELIMITER $$
USE `tourney_server`$$
CREATE DEFINER=`admin`@`%` PROCEDURE `insert_tournament`(IN tournamentName VARCHAR(100), IN gameID VARCHAR(45))
    MODIFIES SQL DATA
COMMENT 'Creates a new tournament entry with the associated tournament name and the gameID it belongs to'
BEGIN

  INSERT INTO `TOURNAMENT`(TOURNAMENT_ID, TOURNAMENT_NAME, GAME_ID)

  VALUES (UUID(), tournamentName, gameID);



  CALL retrieve_row_entry("AGENT", "TOURNAMENT_NAME", CONCAT("'",tournamentName,"'"));

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure insert_user
-- -----------------------------------------------------

USE `tourney_server`;
DROP procedure IF EXISTS `tourney_server`.`insert_user`;

DELIMITER $$
USE `tourney_server`$$
CREATE DEFINER=`admin`@`%` PROCEDURE `insert_user`(IN userID varchar(45), IN fName VARCHAR(45), IN lName VARCHAR(45), IN userName varchar(45), IN userEmail VARCHAR(45), IN userPass VARCHAR(100), IN isAdmin TINYINT, IN wantsNotifications tinyint)
    MODIFIES SQL DATA
    COMMENT 'Creates a new user with its associated values'
BEGIN

  INSERT INTO `USER`(USER_ID, USER_FNAME, USER_LNAME, USERNAME, USER_EMAIL, USER_PASSWD, USER_IS_ADMIN, USER_NOTIFICATIONS)

  VALUES (userID, fName, lName, userName, userEmail, userPass, isAdmin, wantsNotifications);

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure get_user
-- -----------------------------------------------------

USE `tourney_server`;
DROP procedure IF EXISTS `tourney_server`.`get_user`;

DELIMITER $$
USE `tourney_server`$$
CREATE DEFINER=`admin`@`%` PROCEDURE `get_user`(IN userName varchar(45), IN userEmail varchar(45), IN userPass text)
COMMENT 'Checks if a user with the exact username or email and associated password exists, returning their dataset'
BEGIN

  SET @uName = userName;

  SET @uPass = userPass;

  SET @uEmail = userEmail;

   PREPARE loginCheck FROM 'SELECT * FROM `USER` WHERE  (USERNAME = ? AND USER_PASSWD = ?) OR (USER_EMAIL = ? AND USER_PASSWD = ?)';

   EXECUTE loginCheck USING @uName, @uPass, @uEmail, @uPass;

   DEALLOCATE PREPARE loginCheck;
   
   CALL retrieve_row_entry("`USER`", "USERNAME", CONCAT("'",userName,"'"));

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure retrieve_row_entry
-- -----------------------------------------------------

USE `tourney_server`;
DROP procedure IF EXISTS `tourney_server`.`retrieve_row_entry`;

DELIMITER $$
USE `tourney_server`$$
CREATE DEFINER=`admin`@`%` PROCEDURE `retrieve_row_entry`(IN tableName VARCHAR(45), IN fieldName VARCHAR(45), IN fieldValue VARCHAR(45))
COMMENT 'Retrieves a row entry from a particular table, using a candidate key with the requested value'
BEGIN

  SET @stmt = CONCAT("SELECT * FROM ", tableName, " WHERE ", fieldName, " = ", fieldValue);



  PREPARE queryID FROM @stmt;

  EXECUTE queryID;

  DEALLOCATE PREPARE queryID;

END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure update_query
-- -----------------------------------------------------

USE `tourney_server`;
DROP procedure IF EXISTS `tourney_server`.`update_query`;

DELIMITER $$
USE `tourney_server`$$
CREATE DEFINER=`admin`@`%` PROCEDURE `update_query`(IN tblName VARCHAR(45), IN setValues TEXT, IN whereCondition TEXT)
    MODIFIES SQL DATA
COMMENT 'Performs an update to a particular set of values'
BEGIN

  SET @stmt = CONCAT("UPDATE ", tblName, " SET ", setValues, " WHERE ", whereCondition);

  

  CALL execute_stmt();

  

END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
