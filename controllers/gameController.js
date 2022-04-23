const db = require('../util/db');

exports.getAllGames = async (req, res) => {
  const RETRIEVE_ALL_GAMES = 'SELECT * FROM `GAME`';

  await db
    .execute(RETRIEVE_ALL_GAMES)
    .then(([rows, fields]) => {
      res
        .status(200)
        .json({
          status: 'OK',
          message: 'Games retrieved successfully',
          gamseList: rows,
        });
    })
    .catch((err) => {
      dbErrorLogger.logError(
        res,
        err,
        'Unable to retrieve all games from the database'
      );
    });
};

exports.addNewGame = async (req, res) => {};

exports.updateGame = async (req, res) => {};
