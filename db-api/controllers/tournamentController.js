const db = require('../util/db');
const dbErrorLogger = require('../util/dbErrorLogger');

exports.getTournaments = async (req, res) => {
  const GET_ALL_TOURNAMENTS = 'SELECT * FROM `TOURNAMENT`';

  await db
    .execute(GET_ALL_TOURNAMENTS)
    .then(([rows, fields]) => {
      res.status(201).json({
        status: 'success',
        message: 'Retrieved tournaments successfully',
        newGame: rows,
      });
    })
    .catch((err) => {
      dbErrorLogger(res, err, 'Unable to add the tournament');
    });
};
exports.insertTournament = async (req, res) => {
  const clientInput = req.body;
  const INSERT_TOURNAMENT = `CALL insert_tournament("${clientInput.tournamentName}", "${clientInput.gameID}")`;

  db.execute(INSERT_TOURNAMENT)
    .then(([rows, fields]) => {
      res.status(201).json({
        status: 'success',
        message: 'Tournament added successfully',
        newGame: rows[0],
      });
    })
    .catch((err) => {
      dbErrorLogger(res, err, 'Unable to add the tournament');
    });
};
exports.deleteAgent = async (req, res) => {};
