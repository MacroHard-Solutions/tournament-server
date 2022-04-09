USE `db_tourney_server`;

DROP PROCEDURE IF EXISTS login_user;
DROP PROCEDURE IF EXISTS check_existing_user;

DELIMITER //

CREATE PROCEDURE login_user(IN userName varchar(45), IN userEmail varchar(45), IN userPass blob)
BEGIN
   SELECT * FROM `USER` WHERE  (USERNAME = userName AND USER_PASSWD = userPass) OR (USER_EMAIL = userEmail AND USER_PASSWD = userPass);
END //

CREATE PROCEDURE check_existing_user(IN userName varchar(45))
BEGIN
  SELECT * FROM `USER` WHERE USERNAME = userName;
END //

DELIMITER ;