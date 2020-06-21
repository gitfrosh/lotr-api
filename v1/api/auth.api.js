const Joi = require("joi");
const RestHapi = require("rest-hapi");
var nanoid = require("nanoid");
const Boom = require("boom");

var cookie_options = {
  ttl: 365 * 24 * 60 * 60 * 1000, // expires a year from today
  encoding: "none", // we already used JWT to encode
  isSecure: false, // warm & fuzzy feelings
  isHttpOnly: false, // prevent client alteration
  clearInvalid: false, // remove invalid cookies
  strictHeader: true, // don't allow violations of RFC 6265
  path: "/" // set the cookie for all routes
};

module.exports = function(server, mongoose, logger) {
  (function() {
    const Log = logger.bind("Logout");
    Log.note("Generating Logout endpoint");

    server.route({
      method: "GET",
      path: "/logout",
      config: {
        handler: async function(request, h) {
          return h
            .response({ response: "Bye" })
            .unstate("token", cookie_options);
        },
        auth: false,
        tags: ["api", "auth", "logout"],
        plugins: {
          "hapi-swagger": {},
          "hapi-rate-limit": {
            enabled: false
          }
        }
      }
    });
  })();

  // Registration endpoint
  (function() {
    const Log = logger.bind("Register");
    const User = mongoose.model("user");

    Log.note("Generating Registration endpoint");

    //return h.response('Bye').unstate('data');

    server.route({
      method: "POST",
      path: "/register",
      config: {
        handler: async function(request, h) {
          const { email, password } = request.payload;
          // create bearer token!!
          const access_token = nanoid(20);
          // send notification email via aws lambda
          await fetch(
            process.env.AWS_LAMBDA_NEWUSER_URL
          );
          return await RestHapi.create(
            User,
            { email, password, access_token },
            Log
          );
        },
        auth: false,
        validate: {
          payload: {
            email: Joi.string()
              .email()
              .lowercase()
              .required(),
            password: Joi.string().required()
          }
        },
        tags: ["api", "auth", "register"],
        plugins: {
          "hapi-swagger": {},
          "hapi-rate-limit": {
            enabled: false
          }
        }
      }
    });
  })();
  // get user
  (function() {
    const Log = logger.bind("Get user");
    const User = mongoose.model("user");

    Log.note("Generating Get user endpoint");

    server.route({
      method: "GET",
      path: "/get-user",
      config: {
        handler: async function(request, h) {
          const Jwt = require("jsonwebtoken");
          const jwtSecret = process.env.SECRET;
          let token = request.headers.cookie;
          if (token) {
            const requToken = token.split("=")[1];

            return Jwt.verify(requToken, jwtSecret, function(
              err,
              decodedToken
            ) {
              if (err) {
                console.log(err);
                throw Boom.unauthorized("Could not retrieve user.");
              } else {
                return h.response({ decodedToken });
              }
            });
          } else {
            throw Boom.unauthorized("Could not retrieve user.");
          }
        },
        auth: false,
        tags: ["api", "auth", "register"],
        plugins: {
          "hapi-swagger": {},
          "hapi-rate-limit": {
            enabled: false
          }
        }
      }
    });
  })();

  // Login Endpoint
  (function() {
    const Log = logger.bind("Login");
    const User = mongoose.model("user");

    const Boom = require("boom");

    Log.note("Generating Login endpoint");

    const loginHandler = async function(request, h) {
      let token = "";

      let user = await User.findByCredentials(
        request.payload.email,
        request.payload.password,
        Log
      );

      if (!user) {
        throw Boom.unauthorized("Invalid Email or Password.");
      }

      delete user.password;

      token = server.methods.createToken(user);

      return h
        .response({ response: "Hello Cookie, njam." })
        .header("Authorization", token)
        .state("token", token, cookie_options);
    };

    server.route({
      method: "POST",
      path: "/login",
      config: {
        handler: loginHandler,
        auth: false,
        validate: {
          payload: {
            email: Joi.string()
              .email()
              .lowercase()
              .required(),
            password: Joi.string().required()
          }
        },
        tags: ["api", "auth", "login"],
        plugins: {
          "hapi-swagger": {},
          "hapi-rate-limit": {
            enabled: false
          }
        }
      }
    });
  })();
};
