const express = require('express');

const agentController = require('../controllers/agentController');

const router = express.Router();

router
  .route('/')
  .post(agentController.getUserAgents)
  .put(agentController.insertAgent)
  .delete(agentController.deleteAgent);

module.exports = router;
