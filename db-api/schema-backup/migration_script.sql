-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: tourney_server
-- Source Schemata: tourney_server
-- Created: Sun May  1 20:49:48 2022
-- Workbench Version: 8.0.29
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Schema tourney_server
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `tourney_server` ;
CREATE SCHEMA IF NOT EXISTS `tourney_server` ;

-- ----------------------------------------------------------------------------
-- Table tourney_server.ADDRESS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tourney_server`.`ADDRESS` (
  `ADDRESS_ID` VARCHAR(45) NOT NULL COMMENT 'The UUID of an agent\'s address',
  `ADDRESS_IP` VARCHAR(15) NOT NULL COMMENT 'Agent\'s IP address',
  `ADDRESS_PORT` INT UNSIGNED NOT NULL COMMENT 'Agent\'s port #',
  PRIMARY KEY (`ADDRESS_ID`),
  UNIQUE INDEX `ADDRESS_ID_UNIQUE` (`ADDRESS_ID` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table tourney_server.AGENT
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tourney_server`.`AGENT` (
  `AGENT_ID` VARCHAR(45) NOT NULL COMMENT 'UUID of the player\'s agent',
  `USER_ID` VARCHAR(45) NOT NULL COMMENT 'The player\'s UUID',
  `ADDRESS_ID` VARCHAR(45) NOT NULL COMMENT 'The agent\'s address UUID',
  `TOURNAMENT_ID` VARCHAR(45) NOT NULL COMMENT 'The tournament UUID',
  `AGENT_ELO` FLOAT UNSIGNED NOT NULL DEFAULT '600' COMMENT 'The ELO rating of the agent',
  `AGENT_STATUS` TINYINT(1) NOT NULL DEFAULT '-1' COMMENT 'Indicates the agent\'s availability -1:Offline 0:Inactive 1:Active',
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

-- ----------------------------------------------------------------------------
-- Table tourney_server.GAME
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tourney_server`.`GAME` (
  `GAME_ID` VARCHAR(45) NOT NULL COMMENT 'The UUID of the game',
  `GAME_NAME` VARCHAR(100) NOT NULL,
  `FILE_NAME` VARCHAR(100) NOT NULL COMMENT 'Location of the game file to be processed, stored in the games directory',
  `GAME_ICON` VARCHAR(100) NOT NULL COMMENT 'The URI of the game\'s icon',
  PRIMARY KEY (`GAME_ID`),
  UNIQUE INDEX `GAME_ID_UNIQUE` (`GAME_ID` ASC) VISIBLE,
  UNIQUE INDEX `GAME_NAME_UNIQUE` (`GAME_NAME` ASC) VISIBLE,
  UNIQUE INDEX `FILE_NAME_UNIQUE` (`FILE_NAME` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table tourney_server.MATCH_LOG
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tourney_server`.`MATCH_LOG` (
  `MATCH_LOG_ID` VARCHAR(45) NOT NULL COMMENT 'THE UUID of the match to be logged from a tournament',
  `TOURNAMENT_ID` VARCHAR(45) NOT NULL COMMENT 'The UUID of the tournament this match was played in',
  `MATCH_LOG_DATA` LONGTEXT NOT NULL COMMENT 'Details of the match',
  `MATCH_LOG_TIMESTAMP` TIMESTAMP NOT NULL COMMENT 'Date and time of  recording the past match',
  PRIMARY KEY (`MATCH_LOG_ID`),
  UNIQUE INDEX `MATCH_LOG_ID_UNIQUE` (`MATCH_LOG_ID` ASC) VISIBLE,
  UNIQUE INDEX `UK_MATCH_LOG_MATCH_LOG_TIME` (`MATCH_LOG_TIMESTAMP` ASC) VISIBLE,
  INDEX `TOURNAMENT_ID_idx` (`TOURNAMENT_ID` ASC) VISIBLE,
  CONSTRAINT `TOURNAMENT_ID_MATCH_LOG`
    FOREIGN KEY (`TOURNAMENT_ID`)
    REFERENCES `tourney_server`.`TOURNAMENT` (`TOURNAMENT_ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table tourney_server.RANKING
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tourney_server`.`RANKING` (
  `MATCH_LOG_ID` VARCHAR(45) NOT NULL COMMENT 'The UUID of the game played',
  `AGENT_ID` VARCHAR(45) NOT NULL COMMENT 'The UUID of the player\'s agent',
  `RANKING` INT UNSIGNED NOT NULL COMMENT 'The agent\'s ranking in a match.\\\\\\\\n0 indicates an undefined ranking',
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

-- ----------------------------------------------------------------------------
-- Table tourney_server.TOURNAMENT
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tourney_server`.`TOURNAMENT` (
  `TOURNAMENT_ID` VARCHAR(45) NOT NULL COMMENT 'The UUID of the tournament',
  `TOURNAMENT_NAME` VARCHAR(100) NOT NULL,
  `GAME_ID` VARCHAR(45) NOT NULL COMMENT 'The UUID of the game this tournament falls under',
  `TOURNAMENT_DP` VARCHAR(100) NOT NULL DEFAULT 'https://i.imgur.com/1RiwbPp.png',
  PRIMARY KEY (`TOURNAMENT_ID`),
  UNIQUE INDEX `TOURNAMENT_ID_UNIQUE` (`TOURNAMENT_ID` ASC) VISIBLE,
  UNIQUE INDEX `TOURNAMENT_NAME_UNIQUE` (`TOURNAMENT_NAME` ASC) VISIBLE,
  INDEX `GAME_ID_idx` (`GAME_ID` ASC) VISIBLE,
  CONSTRAINT `GAME_ID_TOURNAMENT`
    FOREIGN KEY (`GAME_ID`)
    REFERENCES `tourney_server`.`GAME` (`GAME_ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table tourney_server.USER
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tourney_server`.`USER` (
  `USER_ID` VARCHAR(128) NOT NULL COMMENT 'The user\'s unique UUID generated each time a new user is registered',
  `USER_FNAME` VARCHAR(45) NOT NULL,
  `USER_LNAME` VARCHAR(45) NOT NULL,
  `USERNAME` VARCHAR(45) NOT NULL COMMENT 'The user\'s username',
  `USER_EMAIL` VARCHAR(45) NOT NULL,
  `USER_PASSWD` VARCHAR(256) NOT NULL COMMENT 'The user\'s password, stored as an SHA-256 hash',
  `USER_IS_ADMIN` TINYINT NOT NULL DEFAULT '0' COMMENT 'Whether the user is a player or administrator',
  `USER_NOTIFICATIONS` TINYINT NOT NULL DEFAULT '0' COMMENT 'Whether the user would like to recieve notifications',
  `USER_DP` VARCHAR(100) NOT NULL DEFAULT 'https://i.imgur.com/CjnIMqJ.png' COMMENT 'User\'s display picture URL',
  `USER_DESCRIPTION` VARCHAR(100) NOT NULL DEFAULT 'I am a user',
  PRIMARY KEY (`USER_ID`),
  UNIQUE INDEX `USER_ID_UNIQUE` (`USER_ID` ASC) VISIBLE,
  UNIQUE INDEX `USERNAME_UNIQUE` (`USERNAME` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- View tourney_server.new_view
-- ----------------------------------------------------------------------------
USE `tourney_server`;
CREATE  OR REPLACE ALGORITHM=UNDEFINED DEFINER=`admin`@`%` SQL SECURITY DEFINER VIEW `tourney_server`.`new_view` AS select `T`.`TOURNAMENT_NAME` AS `TOURNAMENT_NAME`,`U`.`USERNAME` AS `USERNAME`,`A`.`AGENT_ELO` AS `AGENT_ELO`,avg(`R`.`RANKING`) AS `AVERAGE_RANKING` from ((((`tourney_server`.`TOURNAMENT` `T` join `tourney_server`.`USER` `U`) join `tourney_server`.`AGENT` `A`) join `tourney_server`.`MATCH_LOG` `M`) join `tourney_server`.`RANKING` `R`) where ((`M`.`MATCH_LOG_ID` = `R`.`MATCH_LOG_ID`) and (`M`.`TOURNAMENT_ID` = `T`.`TOURNAMENT_ID`) and (`T`.`TOURNAMENT_ID` = `A`.`TOURNAMENT_ID`) and (`A`.`AGENT_ID` = `R`.`AGENT_ID`) and (`A`.`USER_ID` = `U`.`USER_ID`) and ((`T`.`TOURNAMENT_ID` = 'e9e26b2a-c6f5-11ec-a02e-0ab3cd6d5505') or (`T`.`TOURNAMENT_ID` = '01934c61-c6f6-11ec-a02e-0ab3cd6d5505'))) group by `A`.`AGENT_ID`,`T`.`TOURNAMENT_NAME` order by `A`.`AGENT_ELO` desc,`AVERAGE_RANKING`;

-- ----------------------------------------------------------------------------
-- Routine tourney_server.check_existing_user
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `tourney_server`$$
CREATE DEFINER=`admin`@`%` PROCEDURE `check_existing_user`(IN userName varchar(45))
    COMMENT 'Checks if a user exists given the username'
BEGIN

  SET @uName = userName;

  PREPARE existingUserCheck FROM 'SELECT COUNT(*) AS USER_COUNT FROM `USER` WHERE USERNAME = ?';

  EXECUTE existingUserCheck USING @uName;

  DEALLOCATE PREPARE existingUserCheck;

END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine tourney_server.execute_stmt
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `tourney_server`$$
CREATE DEFINER=`admin`@`%` PROCEDURE `execute_stmt`()
    COMMENT 'Simply executes the current statement stored in @stmt'
BEGIN
  PREPARE queryStmt FROM @stmt;
  EXECUTE queryStmt;
  DEALLOCATE PREPARE queryStmt;
END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine tourney_server.get_user
-- ----------------------------------------------------------------------------
DELIMITER $$

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

END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine tourney_server.insert_agent
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `tourney_server`$$
CREATE DEFINER=`admin`@`%` PROCEDURE `insert_agent`(IN userID VARCHAR(45), IN addressID VARCHAR(45), IN tournamentID VARCHAR(45))
    MODIFIES SQL DATA
    COMMENT 'Creates a new agent entry with the given userID, addressID, tournamentID'
BEGIN

	SET @uID = userID;
    SET @addID = addressID;
    SET @tID = tournamentID;
    
  SET @insertAgent = 'INSERT INTO `AGENT`(AGENT_ID, USER_ID, ADDRESS_ID, TOURNAMENT_ID)
  VALUES (UUID(), ?, ?, ?);';
  PREPARE stmt FROM @insertAgent;
  EXECUTE stmt USING @uID, @addID, @tID;
  DEALLOCATE PREPARE stmt;

  -- No need for prepared statements at this point
  SELECT AGENT_ID, ADDRESS_IP, ADDRESS_PORT, TOURNAMENT_ID, AGENT_ELO 
  FROM AGENT AS AG, ADDRESS AS AD
  WHERE AG.ADDRESS_ID = AD.ADDRESS_ID;
  
END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine tourney_server.insert_agent_address
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `tourney_server`$$
CREATE DEFINER=`admin`@`%` PROCEDURE `insert_agent_address`(IN addressIP VARCHAR(15), IN portNum INT)
    MODIFIES SQL DATA
    COMMENT 'Creates a new address entry with the given addressIP and portNum'
BEGIN
  SET @ipAdd = addressIP;
  SET @pNum = portNum;
  SET @insertStmt = 'INSERT INTO `ADDRESS`(ADDRESS_ID, ADDRESS_IP, ADDRESS_PORT) VALUES (UUID(), ?, ?);';

  PREPARE stmt FROM @insertStmt;
  EXECUTE stmt USING @ipAdd, @pNum;
  DEALLOCATE PREPARE stmt;
  
  SET @retrieval = 'SELECT ADDRESS_ID FROM `ADDRESS` WHERE ADDRESS_IP = ? AND ADDRESS_PORT = ?';
  
  PREPARE stmt FROM @retrieval;
  EXECUTE stmt USING @ipAdd, @pNum;
  DEALLOCATE PREPARE stmt;
  
END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine tourney_server.insert_game
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `tourney_server`$$
CREATE DEFINER=`admin`@`%` PROCEDURE `insert_game`(IN gameName VARCHAR(100), IN fileName VARCHAR(100), IN gameIcon VARCHAR(100))
    MODIFIES SQL DATA
    COMMENT 'Creates a new game entry with its gameName and associated path to the fileName'
BEGIN

  INSERT INTO `GAME`(GAME_ID, GAME_NAME, FILE_NAME, GAME_ICON)
  VALUES (UUID(), gameName, fileName, gameIcon);

  CALL retrieve_row_entry("GAME", "GAME_NAME", gameName);

END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine tourney_server.insert_match_log
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `tourney_server`$$
CREATE DEFINER=`admin`@`%` PROCEDURE `insert_match_log`(IN tournamentID VARCHAR(45), IN matchLogTime TIMESTAMP, IN gameLog LONGTEXT)
    MODIFIES SQL DATA
    COMMENT 'Creates a new match log entry with the associated tournamentID, match log time and gameLog'
BEGIN

  -- SET @matchLogTime = CURRENT_TIMESTAMP();
  INSERT INTO `MATCH_LOG`(MATCH_LOG_ID, TOURNAMENT_ID, MATCH_LOG_TIME, GAME_LOG)

  VALUES (UUID(), tournamentID, @matchLogTime, gameLog);



  CALL retrieve_row_entry("MATCH_LOG", "MATCH_LOG_TIME", CONCAT("'",@matchLogTime,"'"));

END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine tourney_server.insert_ranking
-- ----------------------------------------------------------------------------
DELIMITER $$

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

-- ----------------------------------------------------------------------------
-- Routine tourney_server.insert_tournament
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `tourney_server`$$
CREATE DEFINER=`admin`@`%` PROCEDURE `insert_tournament`(IN tournamentName VARCHAR(100), IN gameID VARCHAR(45))
    MODIFIES SQL DATA
    COMMENT 'Creates a new tournament entry with the associated tournament name and the gameID it belongs to'
BEGIN

  INSERT INTO `TOURNAMENT`(TOURNAMENT_ID, TOURNAMENT_NAME, GAME_ID)

  VALUES (UUID(), tournamentName, gameID);

  CALL retrieve_row_entry("TOURNAMENT", "TOURNAMENT_NAME", tournamentName);

END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine tourney_server.insert_user
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `tourney_server`$$
CREATE DEFINER=`admin`@`%` PROCEDURE `insert_user`(IN fName VARCHAR(45), IN lName VARCHAR(45), IN username varchar(45), IN userEmail VARCHAR(45), IN userPass VARCHAR(100), IN isAdmin TINYINT, IN wantsNotifications tinyint, IN userDP VARCHAR(100))
    MODIFIES SQL DATA
    COMMENT 'Creates a new user with its associated values'
BEGIN

  INSERT INTO `USER`(USER_ID, USER_FNAME, USER_LNAME, USERNAME, USER_EMAIL, USER_PASSWD, USER_IS_ADMIN, USER_NOTIFICATIONS, USER_DP)

  VALUES (UUID(), fName, lName, username, userEmail, userPass, isAdmin, wantsNotifications, userDP);

  CALL retrieve_row_entry("`USER`", "USERNAME", username);
END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine tourney_server.remove_agent
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `tourney_server`$$
CREATE DEFINER=`admin`@`%` PROCEDURE `remove_agent`(IN agentID VARCHAR(45))
    MODIFIES SQL DATA
    COMMENT 'Removes the given agent'
BEGIN
	SET @agentID = agentID;
	SET @stmt = "DELETE FROM `AGENT` WHERE AGENT_ID = ?";
    
    PREPARE deleteQuery FROM @stmt;
    EXECUTE deleteQuery USING @agentID;
    DEALLOCATE PREPARE deleteQuery;
END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine tourney_server.retrieve_row_entry
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `tourney_server`$$
CREATE DEFINER=`admin`@`%` PROCEDURE `retrieve_row_entry`(IN tableName VARCHAR(45), IN fieldName VARCHAR(45), IN fieldValue VARCHAR(45))
    COMMENT 'Retrieves a row entry from a particular table, using a candidate key with the requested value'
BEGIN

  SET @fieldVal = fieldValue;
  SET @stmt = CONCAT('SELECT * FROM ',tableName, ' WHERE ', fieldName, ' = ?');

  PREPARE queryID FROM @stmt;

  EXECUTE queryID USING @fieldVal;

  DEALLOCATE PREPARE queryID;

END$$

DELIMITER ;

-- ----------------------------------------------------------------------------
-- Routine tourney_server.update_query
-- ----------------------------------------------------------------------------
DELIMITER $$

DELIMITER $$
USE `tourney_server`$$
CREATE DEFINER=`admin`@`%` PROCEDURE `update_query`(IN tblName VARCHAR(45), IN setValues TEXT, IN whereCondition TEXT)
    MODIFIES SQL DATA
    COMMENT 'Performs an update to a particular set of values'
BEGIN

  SET @tName = tblName;
  SET @sValues = setValues;
  SET @wClause = whereCondition;
    
  SET @stmt = CONCAT("UPDATE ? SET ? WHERE ?;");
  
  PREPARE updateStmt FROM @stmt;
  EXECUTE updateStmt USING @tName, @sValues, @wClause;
  DEALLOCATE PREPARE updateStmt;
  
END$$

DELIMITER ;
SET FOREIGN_KEY_CHECKS = 1;
