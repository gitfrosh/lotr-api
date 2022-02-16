const User = require("./../models/user.model");
const secret = process.env.SECRET || "top_secret";
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { nanoid } = require("nanoid");
const lambda_func = process.env.AWS_LAMBDA_NEWUSER_URL || null;
const fetch = require('node-fetch');

const { errorResponse, HttpCode } = require('../helpers/constants');

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
        if (error)
          return res.status(HttpCode.SERVER_ERROR).send({
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
      return res.status(HttpCode.SERVER_ERROR).send({
        success: false,
        message: "Login failed",
      });
    }
  },
  register: async (req, res) => {
    const { email, password } = req.body;
    const doesUserExit = await User.exists({ email: email });
    if (doesUserExit) {
      return res.status(HttpCode.SERVER_ERROR).send({
        success: false,
        message: "User already exists",
      });
    } else if (validator.isEmail(email) && !validator.isEmpty(password)) {
      const hash = generatePasswordHash(password);
      const access_token = nanoid(20);
      try {
        await User.create({
          email: email,
          password: hash,
          access_token: access_token,
        });
        // send notification email via aws lambda in prod
        if (lambda_func) fetch(process.env.AWS_LAMBDA_NEWUSER_URL);
        return res.json({
          success: true,
        });
      } catch (err) {
        return res.status(HttpCode.SERVER_ERROR).send(err);
      }
    } else {
      return res.status(HttpCode.SERVER_ERROR).send(errorResponse);
    }
  }
};
