const express = require('express');

const gameController = require('../controllers/gameController');

const router = express.Router();

router.route('/').get(gameController.getAllGames);
router.route('/').post(gameController.addNewGame);
router.route('/').patch(gameController.updateGame);

module.exports = router;
