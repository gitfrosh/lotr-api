const Joi = require("joi");
const RestHapi = require("rest-hapi");
var aguid = require("aguid"); // https://github.com/ideaq/aguid

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
          return h.response({ response: "Bye" }).unstate("token", cookie_options);
        },
        auth: false,
        tags: ["api", "auth", "logout"],
        plugins: {
          "hapi-swagger": {}
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
          return await RestHapi.create(User, { email, password }, Log);
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
          "hapi-swagger": {}
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
      var session = {
        valid: true, // this will be set to false when the person logs out
        id: aguid(), // a random session id
        exp: new Date().getTime() + 30 * 60 * 1000 // expires in 30 minutes time
      };

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

      // response = {
      //   user,
      //   token
      // };

      return h
        .response({ response: "Hello Cookie, njam." })
        .header("Authorization", token)
        .state("token", token, cookie_options);
      // .redirect('http://localhost:8088/account');

      // return response;
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
          "hapi-swagger": {}
        }
      }
    });
  })();
};
