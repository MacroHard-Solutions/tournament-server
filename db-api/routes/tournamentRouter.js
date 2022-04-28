const express = require('express');

const tournamentController = require('../controllers/tournamentController');

const router = express.Router();

router.route('/').get(tournamentController.getTournaments);
router.route('/add').post(tournamentController.insertTournament);
// router.route('/').delete(tournamentController.deleteTournament);

module.exports = router;
