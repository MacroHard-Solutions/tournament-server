USE `db_tourney_server`;

-- At the moment alter routine commands are unauthorised

SET @stmt = "";

DROP PROCEDURE IF EXISTS execute_statement;
DROP PROCEDURE IF EXISTS update_query;
DROP PROCEDURE IF EXISTS delete_query;

DELIMITER //

CREATE PROCEDURE execute_statement()
MODIFIES SQL DATA
BEGIN
  PREPARE updateQuery FROM @stmt;
  EXECUTE updateQuery;
  DEALLOCATE PREPARE updateQuery;
END //

CREATE PROCEDURE update_query(IN tblName VARCHAR(45), IN setValues TEXT, IN whereCondition TEXT)
MODIFIES SQL DATA
BEGIN
  SET @stmt = CONCAT("UPDATE ", tblName, " SET ", setValues, " WHERE ", whereCondition);
  
  CALL execute_stmt();
  
END //

CREATE PROCEDURE delete_query(IN tblName VARCHAR(45), IN whereCondition TEXT)
MODIFIES SQL DATA
BEGIN
  SET @stmt = CONCAT("DELETE FROM ", tblName, " WHERE ", whereCondition);
  
  CALL execute_stmt();
END //

DELIMITER ;