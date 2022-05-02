const express = require('express');

const matchController = require('../controllers/matchController');

const router = express.Router();

router
  .route('/')
  .post(matchController.getMatches)
  .put(matchController.insertMatch);

module.exports = router;
