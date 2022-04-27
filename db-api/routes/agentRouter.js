const express = require('express');

const agentController = require('../controllers/agentController');

const router = express.Router();

router.route('/').post(agentController.getUserAgents);
router.route('/add').post(agentController.insertAgent);
router.route('/').delete(agentController.deleteAgent);


module.exports = router;