const db = require('../util/db');
const resultHandler = require('../util/resultHandler');

exports.getAllGames = async (req, res) => {
  const RETRIEVE_ALL_GAMES = 'SELECT * FROM `GAME`';

  await db
    .execute(RETRIEVE_ALL_GAMES)
    .then(([rows, fields]) => {
      return resultHandler.returnSuccess(
        res,
        200,
        'Games retrieved successfully',
        rows
      );
    })
    .catch((err) => {
      return resultHandler.returnError(
        res,
        502,
        err,
        'Unable to retrieve all games from the database'
      );
    });
};

exports.addNewGame = async (req, res) => {
  const clientInput = req.body.data;
  const INSERT_GAME = `CALL insert_game("${clientInput.gameName}", "${clientInput.fileName}", "${clientInput.gameIcon}");`;

  await db
    .execute(INSERT_GAME)
    .then(([rows, fields]) => {
      return resultHandler.returnSuccess(
        res,
        201,
        'Game added successfully',
        rows[0]
      );
    })
    .catch((err) => {
      resultHandler(res, err, 'Unable to insert and/or retire the game');
    });
};

exports.fetchGAme = async (req, res) => {
  res.end();
}; // TODO: implement

exports.updateGame = async (req, res) => {
  const clientInput = req.body.data;
  res.end(); // TODO: implement
};
