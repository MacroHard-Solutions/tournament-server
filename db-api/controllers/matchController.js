const db = require('../util/db');
const resultHandler = require('../util/responseHandler');

const insertMatchLog = async (tournamentID, matchLog) => {
  const INSERT_MATCH_LOG = `CALL insert_match_log("${tournamentID}", "${matchLog}")`;

  return new Promise((resolve, reject) => {
    db.execute(INSERT_MATCH_LOG)
      .then(([rows, fields]) => {
        resolve(rows[0][0]);
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

  if (clientInput.date && clientInput.date.comparator && clientInput.date.val) {
    if (clientInput.date.comparator === '=')
      query.push(
        `MATCH_LOG_TIMESTAMP >= DATE("${clientInput.date.val}") AND MATCH_LOG_TIMESTAMP < DATE_ADD(DATE("${clientInput.date.val}"), INTERVAL 1 DAY)`
      );
    else
      query.push(
        `(MATCH_LOG_TIMESTAMP ${clientInput.date.comparator} "${clientInput.date.val}")`
      );
  }

  if (query.length === 0) clientInput.filter = 'true';
  else clientInput.filter = query.join(' AND ');

  next();
};

exports.getFilteredMatches = async (req, res) => {
  // NOTE: SHOULD I RATHER PROVIDE A MIN AND MAX, CAUSE EQUALITY BASED ON TIME IS AN ISSUE?
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

exports.insertMatch = async (req, res, next) => {
  // TODO: IMPLEMENT TRANSACTIONS FOR THIS ONE... THERE'S MULTIPLE INSERTS
  // TODO: CHECK IF THE AGENT_ID IS PAIRED WITH THE TOURNAENT_ID
  // TODO: RETURN THE MATCH_LOG_ID
  const clientInput = req.body.data;

  try {
    clientInput.newMatch = await insertMatchLog(
      clientInput.tournamentID,
      clientInput.matchLog
    );
  } catch (err) {
    return resultHandler.returnError(
      res,
      502,
      err,
      'Unable to insert matchlog data'
    );
  }

  clientInput.message = 'Successfully recorded the match';
  next();
};

exports.startLiveMatch = async (req, res) => {
  const clientInput = req.body.data;
  const START_LIVE_MATCH = `CALL start_live_match('${clientInput.tournamentID}');`;

  await db
    .execute(START_LIVE_MATCH)
    .then(([rows, fields]) => {
      resultHandler.returnSuccess(
        res,
        201,
        'The live match has been inserted',
        rows[0]
      );
    })
    .catch((err) => {
      resultHandler.returnError(res, 502, err, 'Unable to insert live match');
    });
};

exports.endLiveMatch = async (req, res, next) => {
  const clientInput = req.body.data;
  const END_LIVE_MATCH = `CALL end_live_match('${clientInput.matchLogID}','${clientInput.matchLogData}');`;

  await db
    .execute(END_LIVE_MATCH)
    .then(([rows, fields]) => {
      clientInput.newMatch = rows[0][0];
      clientInput.message = 'The live match has ended and been logged';
    })
    .catch((err) => {
      return resultHandler.returnError(
        res,
        502,
        err,
        'Unable to end and log live match'
      );
    });

  if (!clientInput.newMatch)
    return resultHandler.returnError(
      res,
      404,
      new Error('Live match not found'),
      'There is no live match corresponding to the given ID'
    );

  next();
};

exports.insertAgentResults = async (req, res) => {
  const clientInput = req.body.data;
  const agentResults = clientInput.agentResults;
  const agentCount = agentResults.length;
  const newMatch = clientInput.newMatch;

  console.log(newMatch);
  const matchLogID = newMatch['MATCH_LOG_ID'];
  let insertCount = 0;
  let errors = [];

  agentResults.forEach((agent) => {
    try {
      insertAgentResult(matchLogID, agent.agentID, agent.ranking);
      ++insertCount;
    } catch (err) {
      errors.push(err);
    }
  });

  if (insertCount !== agentCount)
    return resultHandler.returnError(
      res,
      417,
      errors,
      `${clientInput.message}. ${insertCount} out of ${agentCount} agent result(s) have been successfully entered`
    );
  else
    return resultHandler.returnSuccess(
      res,
      201,
      `${clientInput.message}. ${insertCount} out of ${agentCount} agent result(s) have been successfully entered`,
      clientInput.newMatch
    );
};

exports.getLiveMatches = async (req, res) => {
  let tournamentID = req.params.tournamentID;

  if (!tournamentID) tournamentID = '';

  const GET_LIVE_MATCHES = `CALL get_live_matches('${tournamentID}')`;

  await db
    .execute(GET_LIVE_MATCHES)
    .then(([rows, fields]) => {
      return resultHandler.returnSuccess(
        res,
        200,
        'Successfully retrieved live matches',
        rows[0]
      );
    })
    .catch((err) => {
      return resultHandler.returnError(
        res,
        502,
        err,
        'Unable to check for live matches'
      );
    });
};
