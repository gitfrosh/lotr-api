var express = require("express");
var bookController = require("./../controllers/book.api");
var chapterController = require("./../controllers/chapter.api");
var characterController = require("./../controllers/character.api");
var movieController = require("./../controllers/movie.api");
var quoteController = require("./../controllers/quote.api");

var router = express.Router();
var passportHelpers = require('./../helpers/passport');

// router.route("/test").get(apiController.getTest);

router.route("/book").get(bookController.getBooks);
router.route("/book/:id").get(bookController.getBook);
router.route("/book/:id/chapter").get(bookController.getChaptersByBook);

router.route("/chapter").get([passportHelpers.authenticate, chapterController.getChapters]);
router.route("/chapter/:id").get([passportHelpers.authenticate, chapterController.getChapter]);

router.route("/movie").get([passportHelpers.authenticate, movieController.getMovies]);
router.route("/movie/:id").get([passportHelpers.authenticate, movieController.getMovie]);
router.route("/movie/:id/quote").get([passportHelpers.authenticate, movieController.getQuoteByMovie]);

router.route("/character").get([passportHelpers.authenticate, characterController.getCharacters]);
router.route("/character/:id").get([passportHelpers.authenticate, characterController.getCharacter]);
router.route("/character/:id/quote").get([passportHelpers.authenticate, characterController.getQuoteByCharacter]);

router.route("/quote").get([passportHelpers.authenticate, quoteController.getQuotes]);
router.route("/quote/:id").get([passportHelpers.authenticate, quoteController.getQuote]);


module.exports = router;
