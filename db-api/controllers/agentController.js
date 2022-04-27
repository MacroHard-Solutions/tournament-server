const cli = require('nodemon/lib/cli');
const db = require('../util/db');
const dbErrorLogger = require('../util/dbErrorLogger');

const insertAgentAddress = async (ipAddress, portNum) => {
  const INSERT_AGENT_ADDRESS = `CALL insert_agent_address("${ipAddress}", ${portNum})`;

  new Promise((resolve, reject) => {
    db.execute(INSERT_AGENT_ADDRESS)
      .then(([rows, fields]) => {
        resolve(rows);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.getUserAgents = async (req, res) => {};
exports.insertAgent = async (req, res) => {
  clientInput = req.body;

  const newAgentAddress = await insertAgentAddress(clientInput.ipAddress, clientInput.portNum);
 res.json(newAgentAddress);
  // const INSERT_AGENT = `CALL insertAgent("${clientInput.userID}", "${clientInput.addressID}", "${clientInput.tournamentID}", ${clientInput.eloRating})`

  // db.execute(INSERT_AGENT)
  // .then(([rows, fields])

  // )
};
exports.deleteAgent = async (req, res) => {};
