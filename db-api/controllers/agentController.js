const db = require('../util/db');
const responseHandler = require('../util/responseHandler');

const insertAgentAddress = async (ipAddress, portNum) =>
  new Promise((resolve, reject) => {
    const INSERT_AGENT_ADDRESS = `CALL insert_agent_address("${ipAddress}", ${portNum} )`;

    db.execute(INSERT_AGENT_ADDRESS)
      .then(([rows, fields]) => {
        resolve(rows[0][0].ADDRESS_ID);
      })
      .catch((err) => {
        reject(err);
      });
  });

const getSpecificAgent = async (agentID) => {
  const GET_AGENT = `CALL get_agent("${agentID}")`;

  let errorResult;
  let agentResult;

  await db
    .execute(GET_AGENT)
    .then(([rows, fields]) => {
      agentResult = rows[0][0];
    })
    .catch((err) => {
      errorResult = err;
    });

  return new Promise((resolve, reject) => {
    if (!errorResult) resolve(agentResult);
    else reject(errorResult);
  });
};

const getAgentTournaments = async (agentID) => {
  const GET_TOURNAMENT_AGENTS = `CALL get_agent_tournaments("${agentID}")`;

  let errorResult;
  let tournamentSet;

  await db
    .execute(GET_TOURNAMENT_AGENTS)
    // eslint-disable-next-line
    .then(([rows, fields]) => {
      tournamentSet = rows[0];
    })
    .catch((err) => {
      err.code = 502;
      errorResult = err;
    });

  return new Promise((resolve, reject) => {
    if (!errorResult) resolve(tournamentSet);
    else reject(errorResult);
  });
};

const getUserAgents = async (userID) => {
  const GET_USER_AGENTS = `CALL get_user_agents("${userID}")`;

  let errorResult;
  let agentsSet;

  await db
    .execute(GET_USER_AGENTS)
    .then(([rows, fields]) => {
      agentsSet = rows[0];
    })
    .catch((err) => {
      err.code = 502;
      errorResult = err;
    });

  return new Promise((resolve, reject) => {
    if (!errorResult) resolve(agentsSet);
    else reject(errorResult);
  });
};

exports.bindAgentTournament = async (req, res) => {
  const clientInput = req.body.data;
  const INSERT_AGENT_TOURNAMENT = `CALL insert_agent_tournament("${clientInput.agentID}", "${clientInput.tournamentID}")`;

  await db
    .execute(INSERT_AGENT_TOURNAMENT)
    .then((result) =>
      responseHandler.returnSuccess(
        res,
        201,
        'Bound agent to tournament successfully',
        null
      )
    )
    .catch((err) =>
      responseHandler.returnError(
        res,
        502,
        err,
        'Unable to save agent-tournament binding'
      )
    );
};

exports.getAgents = async (req, res) => {
  const clientInput = req.body.data;
  let successResult;
  let agentResult;
  let message;
  let tournamentsList;
  let errorResult;

  try {
    if (clientInput.userID) {
      successResult = await getUserAgents(clientInput.userID);

      message = `The user's agents have been successfully retrieved`;
    } else if (clientInput.agentID) {
      agentResult = await getSpecificAgent(clientInput.agentID);

      if (agentResult) {
        tournamentsList = await getAgentTournaments(clientInput.agentID);

        successResult = {
          agentData: agentResult,
          involvedTournaments: tournamentsList,
        };
        message = 'The agent has been retrieved';
      } else {
        message = 'No agent exists';
      }
    } else {
      errorResult = new Error('Invalid request made. Please enter a valid ID');
      errorResult.code = 400;
    }
  } catch (err) {
    console.log(err);
    return responseHandler.returnError(
      res,
      err.code,
      err,
      'Unable to retrieve agents'
    );
  }

  return responseHandler.returnSuccess(res, 200, message, successResult);
};

exports.getAgentPair = async (req, res) => {
  const clientInput = req.body.data;
  const GET_AGENT_PAIR = `CALL get_agent_pair('${clientInput.agentA}', '${clientInput.agentB}', '${clientInput.tournamentID}')`;

  await db
    .execute(GET_AGENT_PAIR)
    .then(([rows, fields]) => {
      responseHandler.returnSuccess(
        res,
        200,
        'Retrieved the agent pair',
        rows[0]
      );
    })
    .catch((err) => {
      responseHandler.returnError(
        res,
        502,
        err,
        'Unable to retrieve the agents of the specified tournament'
      );
    });
};

exports.getTournamentAgents = async (req, res) => {
  const { tournamentID } = req.params;
  const GET_TOURNAMENT_AGENTS = `CALL get_agents_from_tournament('${tournamentID}')`;

  await db
    .execute(GET_TOURNAMENT_AGENTS)
    .then(([rows, fields]) => {
      responseHandler.returnSuccess(
        res,
        200,
        'Retrieved all agents of the specified tournament',
        rows[0]
      );
    })
    .catch((err) => {
      responseHandler.returnError(
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
    return responseHandler.returnError(
      res,
      502,
      err,
      'Unable to insert user agent address'
    );
  }

  const INSERT_AGENT = `CALL insert_agent ("${
    !clientInput.agentName ? '' : clientInput.agentName
  }", "${clientInput.userID}", "${newAddressID}");`;

  await db
    .execute(INSERT_AGENT)
    .then(([rows, fields]) =>
      responseHandler.returnSuccess(
        res,
        201,
        "The user's agent has been inserted successfully",
        rows[0][0]
      )
    )
    .catch((err) =>
      responseHandler.returnError(
        res,
        502,
        err,
        'Unable to add new agent to the database'
      )
    );
};

exports.deleteAgent = async (req, res) => {
  const clientInput = req.body.data;
  const REMOVE_AGENT = `CALL remove_agent("${clientInput.agentID}");`;

  await db
    .execute(REMOVE_AGENT)
    .then(([rows, fields]) =>
      responseHandler.returnSuccess(
        res,
        200,
        `${rows[0][0].count} agent(s) have been removed successfully`,
        null
      )
    )
    .catch((err) =>
      responseHandler.returnError(res, 502, err, 'Unable to delete agent')
    );
};

exports.updateAgent = async (req, res) => {
  const clientInput = req.body.data;
  const UPDATE_AGENT = `CALL update_agent("${clientInput.agentID}", "${clientInput.tournamentID}",${clientInput.agentELO})`;

  await db
    .execute(UPDATE_AGENT)
    .then((result) => {
      responseHandler.returnSuccess(
        res,
        200,
        'Successfully updated the agent',
        null
      );
    })
    .catch((err) => {
      responseHandler.returnError(
        res,
        502,
        err,
        'Unable to update the specified agent'
      );
    });
};
