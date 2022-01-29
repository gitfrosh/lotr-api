var express = require("express");
var authController = require("./../controllers/auth");
var passportHelpers = require("./../helpers/passport");

var router = express.Router();

const authLimiter = require("../middleware/auth.limiter");

router.route("/login").post([passportHelpers.login, authController.login]);
router.route("/register").post([authLimiter, authController.register]);
router.route("*").get(async function (req, res) {
  return res.status(404).send("Endpoint does not exist.");
});
module.exports = router;
