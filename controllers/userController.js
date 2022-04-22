const db = require('../util/db');

exports.checkUsername = async (req, res) => {
  const CHECK_IF_USERNAME_EXISTS = `CALL check_existing_user("${req.body.username}");`;

  await db
    .execute(CHECK_IF_USERNAME_EXISTS)
    .then(([rows, fields]) => {
      if (rows[0][0]['USER_COUNT'] === 0)
        res
          .status(202)
          .json({ status: 'OK', message: 'You may use this username' });
      else
        res.status(409).json({
          status: 'NOT OK',
          message: 'There is an existing user with this username',
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(502).json({
        status: 'Failed',
        message: "Error when checking for the username's existence",
      });
    });
};

exports.getAllUsers = async (req, res) => {
  const RETRIEVE_USERS = 'SELECT * FROM `USER`;';

  await db
    .execute(RETRIEVE_USERS)
    .then(([rows, fields]) => {
      console.log(rows);
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res
        .status(502)
        .json({ status: 'Failed', message: 'Unable to retrieve users' });
    });
};

exports.insertUser = async (req, res) => {
  const INSERT_USER = `CALL insert_user ("${req.body.userID}", "${
    req.body.fName
  }", "${req.body.lName}", 
     "${req.body.username}", "${req.body.userEmail}", "${req.body.userPass}", ${
    req.body.isAdmin === 'true' ? 1 : 0
  }, ${req.body.wantsNotifications === 'true' ? 1 : 0})`;

  await db
    .execute(INSERT_USER)
    .then((result) => {
      console.log(result);

      res.status(201).json({
        status: 'Successful',
        message: 'The user has been successfully inserted',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: 'Failed',
        message: 'Unable to add new user to database',
      });
    });
};

exports.getUser = async (req, res) => {
  const RETRIEVE_USER = `CALL get_user("${req.body.username_email}", "${req.body.username_email}", "${req.body.passwd}");`;

  await db
    .execute(RETRIEVE_USER)
    .then(([rows, fields]) => {
      console.log(rows[0]);
      if (rows[0].length > 0)
        res.status(200).json({
          status: 'Success',
          message: 'User retrieved',
          user: rows[0][0],
        });
      else
        res
          .status(404)
          .json({ status: 'Not Found', message: 'User not found' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: 'Failed',
        message: 'Unable to check database',
      });
    });
};