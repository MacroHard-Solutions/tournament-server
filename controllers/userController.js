const res = require('express/lib/response');
const db = require('../util/db');

// receives data for inserting a new user
// need to check for existing user
// the check should return a user if it exists

const CHECK_USER = 'CALL check_existing_user(?);';
// const

async function fetchUser(username) {
  console.log(
    '----------------------------Username Check------------------------------------'
  );

  return;

  console.log(
    '----------------------------------------------------------------'
  );
}

exports.checkUsername = async (req, res) => {
  console.log('username is ' + req.body.username);

  await db
    .execute(`CALL check_existing_user(${req.body.username});`)
    .then(([rows, fields]) => {
      if (rows[0][0]['USER_COUNT'] === 0)
        res.status(202).json({status: 'OK', message: 'You may use this username' });
      else
        res
          .status(409)
          .json({status: 'NOT OK', message: 'There is an existing user with this username' });
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
  await db.execute('SELECT * FROM `USER`;')
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
  await db.execute(
    `CALL insert_user ("${req.body.userID}", "${req.body.fName}", "${
      req.body.lName
    }", 
       "${req.body.username}", "${req.body.userEmail}", "${req.body.userPass}", ${
      req.body.isAdmin === 'true' ? 1 : 0
    }, ${req.body.wantsNotifications === 'true' ? 1 : 0})`
  )
    .then((result) => {
      res.status(201).json({
        status: 'Inserted',
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

exports.getUser = async (req, res)=> {
  await db.execute()
}