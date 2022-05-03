const express = require('express');

const matchController = require('../controllers/matchController');

const router = express.Router();

router
  .route('/')
  .post(matchController.getTournamentMatches)
  .put(matchController.insertMatch);

router.route('/filter').post(matchController.processFilter, matchController.getAllMatchResults);

module.exports = router;
