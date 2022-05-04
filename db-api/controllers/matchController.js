const db = require('../util/db');
const resultHandler = require('../util/responseHandler');

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

exports.processFilter = (req, res, next) => {
  const clientInput = req.body.data;

  let query = [];

  if (!clientInput.tournamentName || clientInput.tournamentName === '') {
    // skip
  } else query.push(`TOURNAMENT_NAME LIKE "%${clientInput.tournamentName}%"`);

  if (!clientInput.gameName || clientInput.gameName === '') {
    // skip
  } else query.push(`GAME_NAME LIKE "%${clientInput.gameName}%"`);

  if (clientInput.inProgress === undefined || clientInput.inProgress === '') {
    // skip
  } else
    query.push(
      `MATCH_LOG_IN_PROGRESS = ${
        clientInput.inProgress == 'true' || clientInput.inProgress ? 1 : 0
      }`
    );

  if (!clientInput.username || clientInput.username === '') {
    // skip
  } else
    query.push(
      `(U1.USERNAME LIKE "%${clientInput.username}%" OR U2.USERNAME LIKE "%${clientInput.username}%")`
    );

  if (!clientInput.date || clientInput.date === '') {
    // skip
  } else
    query.push(
      `DATE(MATCH_LOG_TIMESTAMP) ${clientInput.date.comparator} \"${clientInput.date.val}\"`
    );

  if (query.length === 0) clientInput.filter = 'true';
  else clientInput.filter = query.join(' AND ');

  next();
};

exports.getFilteredMatches = async (req, res) => {
  const clientInput = req.body.data;
  console.log(clientInput.filter);
  const GET_ALL_MATCH_RESULTS = `CALL get_match_results('${clientInput.filter}');`;

  await db
    .execute(GET_ALL_MATCH_RESULTS)
    .then(([rows, fields]) => {
      resultHandler.returnSuccess(
        res,
        200,
        'Successfully retrieved all match results',
        rows[0]
      );
    })
    .catch((err) => {
      resultHandler.returnError(
        res,
        502,
        err,
        'Unable to retrieve match results'
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
