var express = require("express");
var authController = require("./../controllers/auth");
var passportHelpers = require("./../helpers/passport");

var router = express.Router();

const authLimiter = require("../middleware/auth.limiter");
const { notFoundResponse } = require("../helpers/constants");

router.route("/login").post([passportHelpers.login, authController.login]);
//allow only 5 calls per hour to this endpoint
router.route("/register").post([authLimiter({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many requests, please try again later."
  }
}), authController.register]);
router.route("*").get(async function (req, res) {
  return res.status(404).send(notFoundResponse);
});
module.exports = router;
