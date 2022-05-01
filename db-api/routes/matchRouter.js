const express = require('express');

const matchController = require('../controllers/matchController');

const router = express.Router();

router.route('/:tournamentID').get(matchController.getMatches);
router.route('/').post(matchController.insertMatch);

module.exports = router;
