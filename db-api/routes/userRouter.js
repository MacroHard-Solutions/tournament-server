const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

// router.param('username', userController.checkUsername);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.checkReqBody, userController.insertUser);

router.route('/signupCheck').post(userController.checkUsername);
router.route('/login').post(userController.checkLogin, userController.getUser);
router.route('/update').patch(userController.updateUser); // FIXME: this

module.exports = router;
