USE `db_tourney_server`;

DROP PROCEDURE IF EXISTS login_user;
DROP PROCEDURE IF EXISTS check_existing_user;

DELIMITER //

CREATE PROCEDURE `login_user`(IN userName varchar(45), IN userEmail varchar(45), IN userPass text)
BEGIN
   PREPARE loginCheck FROM 'SELECT * FROM `USER` WHERE  (USERNAME = ? AND USER_PASSWD = ?) OR (USER_EMAIL = ? AND USER_PASSWD = ?)';
   EXECUTE loginCheck USING userName, userPass, userEmail, userPass;
   DEALLOCATE PREPARE loginCheck;
END //

CREATE PROCEDURE check_existing_user(IN userName varchar(45))
BEGIN
  PREPARE existingUserCheck FROM 'SELECT * FROM `USER` WHERE USERNAME = ?';
  EXECUTE existingUserCheck USING userName;
  DEALLOCATE PREPARE existingUserCheck;
END //

DELIMITER ;