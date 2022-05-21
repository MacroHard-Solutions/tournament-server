const express = require('express');

const matchController = require('../controllers/matchController');

const router = express.Router();

router
  .route('/')
  .post(matchController.processFilter, matchController.getFilteredMatches) // First process the filter query string
  .put(matchController.insertMatch, matchController.insertAgentResults);
router
  .route('/live')
  .put(matchController.startLiveMatch)
  .post(matchController.endLiveMatch, matchController.insertAgentResults);
router
  .route('/live/:tournamentID?')
  .get(matchController.getLiveMatches);

module.exports = router;
