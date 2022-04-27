const db = require('../util/db');
const dbErrorLogger = require('../util/dbErrorLogger');

const insertAgentAddress = async (ipAddress, portNum) => {
  const INSERT_AGENT_ADDRESS = `CALL insert_agent_address("${ipAddress}", ${portNum})`;
  let addressID;
  let errorMessage = false;

  await db
    .execute(INSERT_AGENT_ADDRESS)
    .then(([rows, fields]) => {
      addressID = rows[0][0]['ADDRESS_ID'];
    })
    .catch((err) => {
      errorMessage = err;
    });

  return new Promise((resolve, reject) => {
    if (errorMessage != false) reject(errorMessage);

    resolve(addressID);
  });
};

exports.getUserAgents = async (req, res) => {
  GET_ALL_AGENTS =
    'SELECT SELECT AGENT_ID, ADDRESS_IP, ADDRESS_PORT, TOURNAMENT_ID, AGENT_ELO FROM AGENT AS AG, ADDRESS AS AD WHERE AG.ADDRESS_ID = AD.ADDRESS_ID;';

  await db.execute(GET_ALL_AGENTS).then(([rows, fields]) => {
    res
      .status(200)
      .json({
        status: 'success',
        message: 'Retrieved all agents',
        agentsList: rows[0],
      });
  });
};
exports.insertAgent = async (req, res) => {
  clientInput = req.body;

  try {
    const newAgentAddress = await insertAgentAddress(
      clientInput.ipAddress,
      clientInput.portNum
    );

    const INSERT_AGENT = `CALL insert_agent("${clientInput.userID}", "${newAgentAddress}", "${clientInput.tournamentID}")`;

    await db.execute(INSERT_AGENT).then(([rows, fields]) => {
      res.status(201).json({
        status: 'success',
        message: 'The agent has successfully been recorded',
        agentDetails: rows[0][0],
      });
    });
  } catch (err) {
    dbErrorLogger(res, err, "FAILED to record the agent's information");
  }
};
exports.deleteAgent = async (req, res) => {};
