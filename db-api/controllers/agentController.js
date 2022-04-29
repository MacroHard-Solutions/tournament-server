const db = require('../util/db');
const resultHandler = require('../util/resultHandler');

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
  const clientInput = req.body;
  const GET_USER_AGENTS = `CALL retrieve_row_entry('AGENT', 'USER_ID', "${clientInput.userID}")`;

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

exports.insertAgent = async (req, res) => {
  const clientInput = req.body;

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

  const INSERT_AGENT = `CALL insert_agent ("${clientInput.userID}", "${newAddressID}", "${clientInput.tournamentID}");`;

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
  const clientInput = req.body;
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
