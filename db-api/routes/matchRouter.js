const express = require('express');

const matchController = require('../controllers/matchController');

const router = express.Router();

router
  .route('/')
  .post(matchController.processFilter, matchController.getFilteredMatches)
  .put(matchController.insertMatch);

module.exports = router;
