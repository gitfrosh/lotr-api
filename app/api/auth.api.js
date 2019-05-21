const Joi = require("joi");
const RestHapi = require("rest-hapi");

module.exports = function(server, mongoose, logger) {
  // Registration endpoint
  (function() {
    const Log = logger.bind("Register");
    const User = mongoose.model("user");

    Log.note("Generating Registration endpoint");

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
      let response = {};

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

      response = {
        user,
        token
      };

      return response;
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
        tags: ["api","auth",  "login"],
        plugins: {
          "hapi-swagger": {}
        }
      }
    });
  })();
};
