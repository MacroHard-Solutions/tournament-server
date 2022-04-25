const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

// router.param('username', userController.checkUsername);

router.route('/signupCheck').post(userController.checkUsername);
router.route('/').get(userController.getAllUsers);
router.route('/').post(userController.insertUser);
router.route('/login').post(userController.getUser);
router.route('/update').patch(userController.updateUser); // FIXME: this
// router.route('/:username').get(userController.fetchUser);

module.exports = router;
