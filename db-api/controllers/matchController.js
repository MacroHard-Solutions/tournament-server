const db = require('../util/db');
const resultHandler = require('../util/resultHandler');

const insertMatchLog = async (tournamentID, matchLogTime, gameLog) => {
  const INSERT_MATCH_LOG = `CALL insert_match_log("${tournamentID}", "${matchLogTime}", "${gameLog}")`;

  return new Promise((resolve, reject) => {
    db.execute(INSERT_MATCH_LOG)
      .then(([rows, fields]) => {
        resolve(rows[0][0]['MATCH_LOG_ID']);
      })
      .catch((err) => reject(err));
  });
};
const insertAgentResult = async (matchLogID, agentID, ranking) => {
  const INSERT_AGENT_RESULT = `CALL insert_agent_result("${matchLogID}","${agentID}",${ranking})`;

  return new Promise((resolve, reject) => {
    db.execute(INSERT_AGENT_RESULT)
      .then(resolve())
      .catch((err) => reject(err));
  });
};

exports.getMatches = async (req, res) => {
  const tournamentID = req.body.data.tournamentID;
  const GET_TOURNAMENT_MATCHES = `CALL get_tournament_matches("${tournamentID}")`;

  await db
    .execute(GET_TOURNAMENT_MATCHES)
    .then(([rows, fields]) => {
      resultHandler.returnSuccess(
        res,
        200,
        'Successfully retrieved matches of the given tournament',
        rows[0]
      );
    })
    .catch((err) => {
      resultHandler.returnError(
        res,
        502,
        err,
        'Unable to retrieve tournament matches'
      );
    });
};

exports.insertMatch = async (req, res) => {
  const clientInput = req.body.data;
  const agentResults = clientInput.agentResults;
  let insertCount = 0;
  let errors = [];
  let matchLogID, agentCount;

  try {
    matchLogID = await insertMatchLog(
      clientInput.tournamentID,
      clientInput.matchLogTime,
      clientInput.gameLog
    );
  } catch (err) {
    resultHandler.returnError(res, 502, err, 'Unable to insert matchlog data');
  }

  agentCount = agentResults.length;
  agentResults.forEach(async (agent) => {
    try {
      insertAgentResult(matchLogID, agent.agentID, agent.ranking);
      ++insertCount;
    } catch (err) {
      errors.push(err);
    }
  });

  if (insertCount === agentCount)
    resultHandler.returnSuccess(
      res,
      201,
      `Successfully entered all ${insertCount} out of ${agentCount} agent results`,
      null
    );
  else
    resultHandler.returnError(
      res,
      417,
      `${insertCount} out of ${agentCount} agent result(s) have been successfully entered`
    );
};
