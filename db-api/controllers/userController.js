const db = require('../util/db');
const dbErrorLogger = require('../util/dbErrorLogger');
// const keyMapping = require('../util/renameEntityKey');

exports.checkLogin = async (req, res, next) => {
  clientInput = req.body;

  if (!clientInput.username_email || clientInput.username_email === '') {
    return res.status(400).json({
      status: 'failed',
      message: 'Missing username/email required',
      fName: clientInput.username_email,
    });
  }

  next();
};
exports.checkBody = async (req, res, next) => {
  clientInput = req.body;

  if (!clientInput.fName || clientInput.fName == '') {
    return res.status(400).json({
      status: 'failed',
      message: 'Missing fName required',
      fName: clientInput.fName,
    });
  }

  next();
};

exports.checkUsername = async (req, res) => {
  const clientInput = req.body;
  const CHECK_IF_USERNAME_EXISTS = `CALL check_existing_user("${clientInput.username}");`;

  await db
    .execute(CHECK_IF_USERNAME_EXISTS)
    .then(([rows, fields]) => {
      if (rows[0][0]['USER_COUNT'] === 0)
        return res
          .status(202)
          .json({ status: 'OK', message: 'You may use this username' });
      else
        return res.status(409).json({
          status: 'NOT OK',
          message: 'There is an existing user with this username',
        });
    })
    .catch((err) => {
      dbErrorLogger(
        res,
        err,
        "Error when checking for the username's existence"
      );
    });
};

exports.getAllUsers = async (req, res) => {
  const RETRIEVE_USERS = 'SELECT * FROM `USER`;';

  await db
    .execute(RETRIEVE_USERS)
    .then(([rows, fields]) => {
      keyMapping(rows);

      return res.status(200).json({
        status: 'success',
        message: 'List of registered users has been retrieved',
        usersList: rows,
      });
    })
    .catch((err) => {
      dbErrorLogger(res, err, 'Unable to retrieve users');
    });
};

exports.insertUser = async (req, res) => {
  const clientInput = req.body;
  const INSERT_USER = `CALL insert_user ("${clientInput.fName}", "${
    clientInput.lName
  }", 
     "${clientInput.username}", "${clientInput.userEmail}", "${
    clientInput.userPass
  }", ${clientInput.isAdmin === 'true' || clientInput.isAdmin ? 1 : 0}, ${
    clientInput.wantsNotifications === 'true' || clientInput.wantsNotifications
      ? 1
      : 0
  }, "${
    clientInput.userDP == null || clientInput.userDP === ''
      ? 'default.png'
      : clientInput.userDP
  }")`;

  await db
    .execute(INSERT_USER)
    .then(([rows, fields]) => {
      console.log(rows[0]);

      return res.status(201).json({
        status: 'success',
        message: 'The user has been successfully inserted',
        newUser: rows[0][0],
      });
    })
    .catch((err) => {
      dbErrorLogger(res, err, 'Unable to add new user to the database');
    });
};

exports.getUser = async (req, res) => {
  const clientInput = req.body;
  const RETRIEVE_USER = `CALL get_user("${clientInput.username_email}", "${clientInput.username_email}", "${clientInput.passwd}");`;

  await db
    .execute(RETRIEVE_USER)
    .then(([rows, fields]) => {
      if (rows[0].length > 0)
        return res.status(200).json({
          status: 'success',
          message: 'User retrieved',
          user: rows[0][0],
        });
      else
        return res
          .status(404)
          .json({ status: 'Not Found', message: 'User not found' });
    })
    .catch((err) => {
      dbErrorLogger(res, err, 'Unable to retrieve user from the database');
    });
};

exports.updateUser = async (req, res) => {
  const clientInput = req.body;
  // TODO: This
};
