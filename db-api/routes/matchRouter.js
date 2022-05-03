const express = require('express');

const matchController = require('../controllers/matchController');

const router = express.Router();

router
  .route('/')
  .get(matchController.getAllMatchResults)
  .post(matchController.getTournamentMatches)
  .put(matchController.insertMatch);

module.exports = router;
