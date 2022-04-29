const db = require('../util/db');
const resultHandler = require('../util/resultHandler');

const insertAgentAddress = async (ipAddress, portNum) => {
  return new Promise((resolve, reject) => {
    const INSERT_AGENT_ADDRESS = `CALL insert_agent_address("${ipAddress}", ${portNum} )`;

    db.execute(INSERT_AGENT_ADDRESS)
      .then(([rows, fields]) => {
        resolve(rows);
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
      console.log(rows);

      resultHandler.returnSuccess(
        res,
        200,
        "The user's agent(s) have been retrieved",
        rows
      );
      // res.status(200).json({
      //   status: 'success',
      //   message: ,
      //   agentsList: rows,
      // });
    })
    .catch((err) => {
      resultHandler(res, err, "Unable to retrieve the user's agents");
    });
};

exports.insertAgent = async (req, res) => {
  const clientInput = req.body;
  const INSERT_AGENT = `CALL insert_agent ("${clientInput.userID}", "${clientInput.addressIP}", "${clientInput.portNum}", "${clientInput.tournamentID}", 
     "${clientInput.eloRating}");`;

  try {
    const newAddress = await insertAgentAddress(
      clientInput.addressIP,
      clientInput.portNum
    );
    console.log(newAddress);
    res.json({ newADD: newAddress });
  } catch (err) {
    resultHandler(res, err, 'Unable to add agent address to the database');
  }

  // await db
  //   .execute(INSERT_AGENT)
  //   .then((result) => {
  //     console.log(result);

  //     res.status(201).json({
  //       status: 'success',
  //       message: "The user's agent has been successfully inserted",
  //     });
  //   })
  //   .catch((err) => {
  //     dbErrorLogger(res, err, 'Unable to add new agent to the database');
  //   });
};

exports.deleteAgent = async (req, res) => {
  const clientInput = req.body;
  const REMOVE_AGENT = `CALL remove_agent("${clientInput.agentID});`;

  await db.execute(REMOVE_AGENT).then((result) => {
    console.log(result);

    res
      .status(200)
      .json({
        status: 'success',
        message: 'The agent has been removed successfully',
      })
      .catch((err) => {
        resultHandler(res, err, 'Unable to remove the agent');
      });
  });
};
