-- DROP DATABASE IF EXISTS `db_tourney_server` ;
-- CREATE DATABASE IF NOT EXISTS `db_tourney_server` DEFAULT CHARACTER SET utf8 ;

-- -----------------------------------------------------
-- DATABASE db_tourney_server
-- -----------------------------------------------------
USE `db_tourney_server` ;

-- -----------------------------------------------------
-- Table `db_tourney_server`.`USER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_tourney_server`.`RANKING` ;
DROP TABLE IF EXISTS `db_tourney_server`.`MATCH_LOG` ;
DROP TABLE IF EXISTS `db_tourney_server`.`AGENT` ;
DROP TABLE IF EXISTS `db_tourney_server`.`ADDRESS` ;
DROP TABLE IF EXISTS `db_tourney_server`.`TOURNAMENT` ;
DROP TABLE IF EXISTS `db_tourney_server`.`GAME` ;
DROP TABLE IF EXISTS `db_tourney_server`.`USER` ;

CREATE TABLE IF NOT EXISTS `db_tourney_server`.`USER` (
  `USER_ID` VARCHAR(128) NOT NULL COMMENT 'The user\'s unique UUID generated each time a new user is registered',
  `USER_FNAME` VARCHAR(45) NOT NULL,
  `USER_LNAME` VARCHAR(45) NOT NULL,
  `USERNAME` VARCHAR(45) NOT NULL COMMENT 'The user\'s username',
  `USER_EMAIL` VARCHAR(45) NOT NULL,
  `USER_PASSWD` BLOB NOT NULL COMMENT 'The user\'s password, stored as an SHA-256 hash',
  `USER_IS_ADMIN` TINYINT NOT NULL COMMENT 'Whether the user is a player or administrator',
  `USER_NOTIFICATIONS` TINYINT NOT NULL DEFAULT 0 COMMENT 'Whether the user would like to recieve notifications',
  PRIMARY KEY (`USER_ID`),
  UNIQUE INDEX `USER_ID_UNIQUE` (`USER_ID` ASC) ,
  UNIQUE INDEX `USERNAME_UNIQUE` (`USERNAME` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_tourney_server`.`ADDRESS`
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS `db_tourney_server`.`ADDRESS` (
  `ADDRESS_ID` VARCHAR(45) NOT NULL COMMENT 'The UUID of an agent\'s address',
  `ADDRESS_IP` VARCHAR(15) NOT NULL COMMENT 'Agent\'s IP address',
  `ADDRESS_PORT` INT(5) NOT NULL COMMENT 'Agent\'s port #',
  PRIMARY KEY (`ADDRESS_ID`),
  UNIQUE INDEX `ADDRESS_ID_UNIQUE` (`ADDRESS_ID` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_tourney_server`.`GAME`
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS `db_tourney_server`.`GAME` (
  `GAME_ID` VARCHAR(45) NOT NULL COMMENT 'The UUID of the game',
  `GAME_NAME` VARCHAR(100) NOT NULL,
  `FILE_NAME` VARCHAR(100) NOT NULL COMMENT 'Location of the game file, stored in the games directory',
  PRIMARY KEY (`GAME_ID`),
  UNIQUE INDEX `GAME_ID_UNIQUE` (`GAME_ID` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_tourney_server`.`TOURNAMENT`
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS `db_tourney_server`.`TOURNAMENT` (
  `TOURNAMENT_ID` VARCHAR(45) NOT NULL COMMENT 'The UUID of the tournament',
  `TOURNAMENT_NAME` VARCHAR(100) NOT NULL,
  `GAME_ID` VARCHAR(45) NOT NULL COMMENT 'The UUID of the game this tournament falls under',
  PRIMARY KEY (`TOURNAMENT_ID`),
  UNIQUE INDEX `TOURNAMENT_ID_UNIQUE` (`TOURNAMENT_ID` ASC) ,
  INDEX `GAME_ID_idx` (`GAME_ID` ASC) ,
  CONSTRAINT `GAME_ID_TOURNAMENT`
    FOREIGN KEY (`GAME_ID`)
    REFERENCES `db_tourney_server`.`GAME` (`GAME_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_tourney_server`.`AGENT`
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS `db_tourney_server`.`AGENT` (
  `AGENT_ID` VARCHAR(45) NOT NULL COMMENT 'UUID of the player\'s agent',
  `USER_ID` VARCHAR(128) NOT NULL COMMENT 'The player\'s UUID',
  `ADDRESS_ID` VARCHAR(45) NOT NULL COMMENT 'The agent\'s address UUID',
  `TOURNAMENT_ID` VARCHAR(45) NOT NULL COMMENT 'The tournament UUID',
  `AGENT_ELO` FLOAT NOT NULL COMMENT 'The ELO rating of the agent',
  PRIMARY KEY (`AGENT_ID`),
  UNIQUE INDEX `AGENT_ID_UNIQUE` (`AGENT_ID` ASC) ,
  INDEX `USER_ID_idx` (`USER_ID` ASC) ,
  INDEX `ADDRESS_ID_idx` (`ADDRESS_ID` ASC) ,
  UNIQUE INDEX `ADDRESS_ID_UNIQUE` (`ADDRESS_ID` ASC) ,
  INDEX `TOURNAMENT_ID_idx` (`TOURNAMENT_ID` ASC) ,
  CONSTRAINT `USER_ID_AGENT`
    FOREIGN KEY (`USER_ID`)
    REFERENCES `db_tourney_server`.`USER` (`USER_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `ADDRESS_ID_AGENT`
    FOREIGN KEY (`ADDRESS_ID`)
    REFERENCES `db_tourney_server`.`ADDRESS` (`ADDRESS_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `TOURNAMENT_ID_AGENT`
    FOREIGN KEY (`TOURNAMENT_ID`)
    REFERENCES `db_tourney_server`.`TOURNAMENT` (`TOURNAMENT_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_tourney_server`.`MATCH_LOG`
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS `db_tourney_server`.`MATCH_LOG` (
  `MATCH_LOG_ID` VARCHAR(45) NOT NULL COMMENT 'THE UUID of the match to be logged from a tournament',
  `TOURNAMENT_ID` VARCHAR(45) NOT NULL COMMENT 'The UUID of the tournament this match was played in',
  `GAME_LOG` BLOB NOT NULL COMMENT 'Details of the match',
  PRIMARY KEY (`MATCH_LOG_ID`),
  INDEX `TOURNAMENT_ID_idx` (`TOURNAMENT_ID` ASC) ,
  UNIQUE INDEX `MATCH_LOG_ID_UNIQUE` (`MATCH_LOG_ID` ASC) ,
  CONSTRAINT `TOURNAMENT_ID_MATCH_LOG`
    FOREIGN KEY (`TOURNAMENT_ID`)
    REFERENCES `db_tourney_server`.`TOURNAMENT` (`TOURNAMENT_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_tourney_server`.`RANKING`
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS `db_tourney_server`.`RANKING` (
  `MATCH_LOG_ID` VARCHAR(45) NOT NULL COMMENT 'The UUID of the game played',
  `AGENT_ID` VARCHAR(45) NOT NULL COMMENT 'The UUID of the player\'s agent',
  `RANK` INT NOT NULL COMMENT 'The agent\'s ranking in a match',
  PRIMARY KEY (`MATCH_LOG_ID`, `AGENT_ID`),
  INDEX `AGENT_ID_idx` (`AGENT_ID` ASC) ,
  CONSTRAINT `MATCH_LOG_ID_RANKING`
    FOREIGN KEY (`MATCH_LOG_ID`)
    REFERENCES `db_tourney_server`.`MATCH_LOG` (`MATCH_LOG_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `AGENT_ID_RANKING`
    FOREIGN KEY (`AGENT_ID`)
    REFERENCES `db_tourney_server`.`AGENT` (`AGENT_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;