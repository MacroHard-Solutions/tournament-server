const express = require('express');

const agentController = require('../controllers/agentController');

const router = express.Router();

router
  .route('/')
  .post(agentController.getUserAgents)
  .put(agentController.insertAgent)
  .delete(agentController.deleteAgent)
  .patch(agentController.updateAgent);
router.route('/pair').post(agentController.getAgentPair);
router.route('/participate').put(agentController.bindAgentTournament);
router.route('/:tournamentID').get(agentController.getTournamentAgents);

module.exports = router;
