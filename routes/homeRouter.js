const express = require('express');

const homeController = require('../controllers/homeController');

const router = express.Router();

router.route('/').get(homeController.welcome);

module.exports = router;
