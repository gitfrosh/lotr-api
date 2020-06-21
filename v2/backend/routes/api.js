var express = require("express");
var apiController = require("./../controllers/api");

var router = express.Router();
var passportHelpers = require('./../helpers/passport');

router.route("/test").get(apiController.getTest);

router.route("/book").get(apiController.getBooks);
router.route("/book/:id").get(apiController.getBook);
router.route("/book/:id/chapter").get(apiController.getChaptersByBook);

router.route("/chapter").get([passportHelpers.authenticate, apiController.getChapters]);

module.exports = router;
