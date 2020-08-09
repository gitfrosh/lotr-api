var express = require('express');
var authController = require('./../controllers/auth');
var passportHelpers = require('./../helpers/passport');

var router = express.Router();


router.route('/login').post([passportHelpers.login, authController.login]);
router.route('/register').post(authController.register);

module.exports = router;