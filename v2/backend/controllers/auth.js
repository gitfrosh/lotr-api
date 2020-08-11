const passport = require("passport");
const User = require("./../models/user.model");
const secret = process.env.SECRET || "top_secret";
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { nanoid } = require("nanoid");

function generatePasswordHash(password) {
  let hash = password;
  let salt = bcrypt.genSaltSync(10);
  hash = bcrypt.hashSync(password, salt);
  return hash;
}

module.exports = {
  login: async (req, res) => {
    const user = req.user;
    try {
      req.login(user, { session: false }, async (error) => {
        if (error) return res.status(500).send({
          success: false,
          message: "Login failed",
        });
        const body = {
          id: user.id,
          email: user.email,
          access_token: user.access_token,
        };
        const token = jwt.sign({ user: body }, secret);
        return res.json({
          token: token,
          email: user.email,
          access_token: user.access_token,
        });
      });
    } catch (e) {
      return res.status(500).send({
        success: false,
        message: "Login failed",
      });
    }
  },
  register: async (req, res) => {
    const { email, password } = req.body;
    const doesUserExit = await User.exists({ email: email });
    if (doesUserExit) {
      return res.status(500).send({
        success: false,
        message: "User already exists",
      });
    } else if (validator.isEmail(email) && !validator.isEmpty(password)) {
      const hash = generatePasswordHash(password);
      const access_token = nanoid(20);
      var newUser = new User({
        email: email,
        password: hash,
        access_token: access_token,
      });
      newUser.save(function (err) {
        if (err) return res.status(500).send(err);
        // send notification email via aws lambda
        // fetch(process.env.AWS_LAMBDA_NEWUSER_URL);
        return res.json({
          success: true,
        });
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "Something went wrong.",
      });
    }
  },
};