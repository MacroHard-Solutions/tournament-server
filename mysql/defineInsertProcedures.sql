USE `db_tourney_server`;

DROP FUNCTION IF EXISTS encrypt_data;
DROP FUNCTION IF EXISTS decrypt_data;

DROP PROCEDURE IF EXISTS retrieve_row_entry;
DROP PROCEDURE IF EXISTS insert_user;
DROP PROCEDURE IF EXISTS insert_agent;
DROP PROCEDURE IF EXISTS insert_agent_address;
DROP PROCEDURE IF EXISTS insert_tournament;
DROP PROCEDURE IF EXISTS insert_game;
DROP PROCEDURE IF EXISTS insert_ranking;
DROP PROCEDURE IF EXISTS insert_match_log;

SET @key_str = SHA2('password tourney server',512);
-- SET @init_vector = RANDOM_BYTES(16);
SET @encrypt_str = "";
SET @decrypt_str = "";

DELIMITER //

CREATE FUNCTION encrypt_data(currData varchar(100))
RETURNS blob
BEGIN
 -- SET @encrypt_str = AES_ENCRYPT(currData,@key_str,@init_vector);
  RETURN @encrypt_str;
END //

CREATE FUNCTION decrypt_data(encodedData TEXT)
RETURNS blob
BEGIN
 -- SET @decrypt_str = AES_DECRYPT(encodedData,@key_str,@init_vector);
  RETURN @decrypt_str;
END //

--
-- Retrieve the rows from the tables
-- 
CREATE PROCEDURE retrieve_row_entry(IN tableName VARCHAR(45), IN fieldName VARCHAR(45), IN fieldValue VARCHAR(45))
BEGIN
  SET @stmt = CONCAT("SELECT * FROM ", tableName, " WHERE ", fieldName, " = ", fieldValue);

  PREPARE queryID FROM @stmt;
  EXECUTE queryID;
  DEALLOCATE PREPARE queryID;
END //

--
-- insert into tables
-- 

CREATE PROCEDURE insert_user(IN userID varchar(45), IN fName VARCHAR(45), IN lName VARCHAR(45), IN userName varchar(45), IN userEmail VARCHAR(45), IN userPass VARCHAR(100), IN isAdmin TINYINT, IN wantsNotifications tinyint)
COMMENT 'TODO: Will need to find a fix for encrypting passwords...'
MODIFIES SQL DATA
BEGIN
  INSERT INTO `USER`(USER_ID, USER_FNAME, USER_LNAME, USERNAME, USER_EMAIL, USER_PASSWD, USER_IS_ADMIN, USER_NOTIFICATIONS)
  VALUES (userID, fName, lName, userName, userEmail, userPass, isAdmin, wantsNotifications);
END //

CREATE PROCEDURE insert_agent(IN userID VARCHAR(45), IN addressID VARCHAR(45), IN tournamentID VARCHAR(45), IN eloRating FLOAT)
MODIFIES SQL DATA
BEGIN
  INSERT INTO `AGENT`(AGENT_ID, USER_ID, ADDRESS_ID, TOURNAMENT_ID, AGENT_ELO)
  VALUES (UUID(), userID, addressID, tournamentID, eloRating);

  CALL retrieve_row_entry("AGENT", "ADDRESS_ID", CONCAT("'",addressID,"'"));
END //

CREATE PROCEDURE insert_agent_address(IN addressIP VARCHAR(15), IN portNum INT)
MODIFIES SQL DATA
BEGIN
  INSERT INTO `ADDRESS`(ADDRESS_ID, ADDRESS_IP, ADDRESS_PORT)
  VALUES (UUID(), addressIP, portNum);

  CALL retrieve_row_entry("AGENT", "ADDRESS_IP", CONCAT("'",addressIP,"'"));
END //

CREATE PROCEDURE insert_tournament(IN tournamentName VARCHAR(100), IN gameID VARCHAR(45))
MODIFIES SQL DATA
BEGIN
  INSERT INTO `TOURNAMENT`(TOURNAMENT_ID, TOURNAMENT_NAME, GAME_ID)
  VALUES (UUID(), tournamentName, gameID);

  CALL retrieve_row_entry("AGENT", "TOURNAMENT_NAME", CONCAT("'",tournamentName,"'"));
END //

CREATE PROCEDURE insert_game(IN gameName VARCHAR(100), IN fileName VARCHAR(100))
MODIFIES SQL DATA
BEGIN
  INSERT INTO `GAME`(GAME_ID, GAME_NAME, FILE_NAME)
  VALUES (UUID(), gameName, fileName);

  CALL retrieve_row_entry("AGENT", "GAME_NAME", CONCAT("'",gameName,"'"));
END //

CREATE PROCEDURE insert_ranking(IN matchLogID VARCHAR(45), IN agentID VARCHAR(45), IN ranking INT)
MODIFIES SQL DATA
BEGIN
  INSERT INTO `RANKING`(MATCH_LOG_ID, AGENT_ID, `RANK`)
  VALUES (matchLogID, agentID, ranking);
END //

CREATE PROCEDURE insert_match_log(IN tournamentID VARCHAR(45), IN MATCH_LOG_TIME TIMESTAMP, IN gameLog BLOB)
MODIFIES SQL DATA
BEGIN
  INSERT INTO `MATCH_LOG`(MATCH_LOG_ID, TOURNAMENT_ID, MATCH_LOG_TIME, GAME_LOG)
  VALUES (UUID(), tournamentID, matchLogTime, gameLog);

  CALL retrieve_row_entry("MATCH_LOG", "MATCH_LOG_TIME", CONCAT("'",matchLogTime,"'"));
END //

DELIMITER ;