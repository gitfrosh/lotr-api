var express = require('express');
var authController = require('./../controllers/auth');
var passportHelpers = require('./../helpers/passport');

var router = express.Router();


router.route('/login').post([passportHelpers.login, authController.login]);
// router.route('/logout').get(apiController.login);
// router.route('/register').get(apiController.login);

module.exports = router;