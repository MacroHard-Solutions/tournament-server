USE `db_tourney_server`;

DROP PROCEDURE IF EXISTS get_latest_id;
DROP PROCEDURE IF EXISTS get_latest_game_id;
DROP PROCEDURE IF EXISTS get_latest_user_id;
DROP PROCEDURE IF EXISTS get_latest_tournament_id;
DROP PROCEDURE IF EXISTS get_latest_match_log_id;
DROP PROCEDURE IF EXISTS get_latest_agent_id;
DROP PROCEDURE IF EXISTS get_latest_address_id;

DELIMITER //

CREATE PROCEDURE get_latest_id(IN getStmt text, IN fieldID varchar(45))
BEGIN
  -- SET @getID = CONCAT('SELECT ? FROM ', getStmt);
  SET @offsetVal = LAST_INSERT_ID();
  SET @limitCount = 1;
  
  PREPARE limitStmt FROM getStmt;
  EXECUTE limitStmt USING @offsetVal, @limitCount;
  DEALLOCATE PREPARE limitStmt;
END //

CREATE PROCEDURE get_latest_user_id()
BEGIN
  set @newIDStmt = 'SELECT * FROM `USER` LIMIT ?,?';
  CALL get_latest_id(@newIDStmt, "USER_ID");
END //

CREATE PROCEDURE get_latest_address_id()
BEGIN
  set @newIDStmt = 'SELECT * FROM `ADDRESS` LIMIT ?,?';
  CALL get_latest_id(@newIDStmt, "ADDRESS_ID");
END //

CREATE PROCEDURE get_latest_game_id()
BEGIN
  set @newIDStmt = 'SELECT * FROM `GAME` LIMIT ?,?';
  CALL get_latest_id(@newIDStmt, "GAME_ID");
END //

CREATE PROCEDURE get_latest_tournament_id()
BEGIN
  set @newIDStmt = 'SELECT * FROM `TOURNAMENT` LIMIT ?,?';
  CALL get_latest_id(@newIDStmt, "TOURNAMENT_ID");
END //

CREATE PROCEDURE get_latest_match_log_id()
BEGIN
  set @newIDStmt = 'SELECT * FROM `MATCH_LOG` LIMIT ?,?';
  CALL get_latest_id(@newIDStmt, "MATCH_LOG_ID");
END //

CREATE PROCEDURE get_latest_agent_id()
BEGIN
  set @newIDStmt = 'SELECT * FROM `AGENT` LIMIT ?,?';
  CALL get_latest_id(@newIDStmt);
END //


DELIMITER ;