const db = require('../util/db');
const resultHandler = require('../util/responseHandler');

exports.getTournaments = async (req, res) => {
  const GET_ALL_TOURNAMENTS = 'CALL get_tournaments()';

  await db
    .execute(GET_ALL_TOURNAMENTS)
    .then(([rows, fields]) => {
      return resultHandler.returnSuccess(
        res,
        201,
        'Retrieved torunaments successfully',
        rows[0]
      );
    })
    .catch((err) => {
      return resultHandler.returnError(
        res,
        502,
        err,
        'Unable to add the tournament'
      );
    });
};
exports.insertTournament = async (req, res) => {
  const clientInput = req.body.data;
  const INSERT_TOURNAMENT = `CALL insert_tournament("${clientInput.tournamentName}", "${clientInput.gameID}", "${clientInput.tournamentDP}")`;

  db.execute(INSERT_TOURNAMENT)
    .then(([rows, fields]) => {
      return resultHandler.returnSuccess(
        res,
        201,
        'Tournament added successfully',
        rows[0][0]
      );
    })
    .catch((err) => {
      return resultHandler.returnError(
        res,
        502,
        err,
        'Unable to add the tournament'
      );
    });
};
exports.deleteTournament = async (req, res) => {
  // TODO: this
};
