const db = require('../util/db');
const dbErrorLogger = require('../util/resultHandler');

exports.getAllGames = async (req, res) => {
  const RETRIEVE_ALL_GAMES = 'SELECT * FROM `GAME`';

  await db
    .execute(RETRIEVE_ALL_GAMES)
    .then(([rows, fields]) => {
      res.status(200).json({
        status: 'OK',
        message: 'Games retrieved successfully',
        gamseList: rows,
      });
    })
    .catch((err) => {
      dbErrorLogger(res, err, 'Unable to retrieve all games from the database');
    });
};

exports.addNewGame = async (req, res) => {
  const clientInput = req.body;
  const INSERT_GAME = `CALL insert_game("${clientInput.gameName}", "${clientInput.fileName}", "${clientInput.gameIcon}");`;

  await db
    .execute(INSERT_GAME)
    .then(([rows, fields]) => {
      res.status(201).json({
        status: 'success',
        message: 'Game added successfully',
        newGame: rows[0],
      });
    })
    .catch((err) => {
      dbErrorLogger(res, err, 'Unable to insert and/or retire the game');
    });
};

exports.fetchGAme = async (req, res) => {
  res.end();
}; // TODO: implement

exports.updateGame = async (req, res) => {
  const clientInput = req.body;
  res.end(); // TODO: implement
};
