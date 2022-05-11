const express = require('express');

const tournamentController = require('../controllers/tournamentController');

const router = express.Router();

router
  .route('/')
  .get(tournamentController.getTournaments)
  .put(tournamentController.insertTournament)
  .delete(tournamentController.deleteTournament);

module.exports = router;
