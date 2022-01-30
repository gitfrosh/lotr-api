var express = require("express");
var authController = require("./../controllers/auth");
var passportHelpers = require("./../helpers/passport");

var router = express.Router();

const authLimiter = require("../middleware/auth.limiter");

router.route("/login").post([passportHelpers.login, authController.login]);
//allow only 25 calls per 15 mins to this endpoint
router.route("/register").post([authLimiter({ windowMs: 15 * 60 * 1000, max: 25 }), authController.register]);
router.route("*").get(async function (req, res) {
  return res.status(404).send("Endpoint does not exist.");
});
module.exports = router;
