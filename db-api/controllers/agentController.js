const db = require('../util/db');
const resultHandler = require('../util/responseHandler');

const insertAgentAddress = async (ipAddress, portNum) => {
  return new Promise((resolve, reject) => {
    const INSERT_AGENT_ADDRESS = `CALL insert_agent_address("${ipAddress}", ${portNum} )`;

    db.execute(INSERT_AGENT_ADDRESS)
      .then(([rows, fields]) => {
        resolve(rows[0][0]['ADDRESS_ID']);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.getUserAgents = async (req, res) => {
  const clientInput = req.body.data;
  const GET_USER_AGENTS = `CALL get_user_agents("${clientInput.userID}")`;

  await db
    .execute(GET_USER_AGENTS)
    .then(([rows, fields]) => {
      return resultHandler.returnSuccess(
        res,
        200,
        "The user's agent(s) have been retrieved",
        rows[0]
      );
    })
    .catch((err) => {
      return resultHandler.returnError(
        res,
        502,
        err,
        "Unable to retrieve the user's agents"
      );
    });
};

exports.getTournamentAgents = async (req, res) => {
  const tournamentID = req.params.tournamentID;
  const GET_TOURNAMENT_AGENTS = `CALL get_agents_from_tournament('${tournamentID}')`;

  await db
    .execute(GET_TOURNAMENT_AGENTS)
    .then(([rows, fields]) => {
      resultHandler.returnSuccess(
        res,
        200,
        'Retrieved all agents of the specified tournament',
        rows[0]
      );
    })
    .catch((err) => {
      resultHandler.returnError(
        res,
        502,
        err,
        'Unable to retrieve the agents of the specified tournament'
      );
    });
};

exports.insertAgent = async (req, res) => {
  const clientInput = req.body.data;

  let newAddressID;

  try {
    newAddressID = await insertAgentAddress(
      clientInput.ipAddress,
      clientInput.portNum
    );
  } catch (err) {
    return resultHandler.returnError(
      res,
      502,
      err,
      'Unable to insert user agent address'
    );
  }

  const INSERT_AGENT = `CALL insert_agent ("${
    !clientInput.agentName ? '' : clientInput.agentName
  }", "${clientInput.userID}", "${newAddressID}", "${
    clientInput.tournamentID
  }");`;

  await db
    .execute(INSERT_AGENT)
    .then(([rows, fields]) => {
      return resultHandler.returnSuccess(
        res,
        201,
        "The user's agent has been inserted successfully",
        rows[0][0]
      );
    })
    .catch((err) => {
      return resultHandler.returnError(
        res,
        502,
        err,
        'Unable to add new agent to the database'
      );
    });
};

exports.deleteAgent = async (req, res) => {
  const clientInput = req.body.data;
  const REMOVE_AGENT = `CALL remove_agent("${clientInput.agentID}");`;

  await db
    .execute(REMOVE_AGENT)
    .then((result) => {
      return resultHandler.returnSuccess(
        res,
        200,
        'Agents of the specified id have been removed successfully',
        null
      );
    })
    .catch((err) => {
      return resultHandler.returnError(res, 502, err, 'Unable to delete agent');
    });
};

exports.updateAgent = async (req, res) => {
  const clientInput = req.body.data;
  const UPDATE_AGENT = `CALL update_agent("${clientInput.agentID}",${clientInput.agentELO})`
 
  await db
    .execute(UPDATE_AGENT)
    .then((result) => {
      resultHandler.returnSuccess(
        res,
        200,
        'Successfully updated the agent',
        null
      );
    })
    .catch((err) => {
      resultHandler.returnError(
        res,
        502,
        err,
        'Unable to update the specified agent'
      );
    });
}