let Hapi = require("hapi");
const Inert = require("@hapi/inert");
const Path = require("path");
let mongoose = require("mongoose");
let RestHapi = require("rest-hapi");
const AuthBearer = require("hapi-auth-bearer-token");
let AuthJwt = require("hapi-auth-jwt2");

async function api() {
  try {
    let server = Hapi.Server({
      port: 8080,
      host: "localhost",
      routes: {
        validate: {
          failAction: async (request, h, err) => {
            RestHapi.logger.error(err);
            throw err;
          }
        },
        files: {
          relativeTo: Path.join(__dirname, "public")
        }
      }
    });

    let config = {
      appTitle: "lotr-api",
      enableTextSearch: true,
      logRoutes: true,
      docExpansion: "list",
      swaggerHost: "localhost:8080",
      mongo: {
        URI: "mongodb://localhost:27017/lotr"
      }
      // authStrategy: AuthJwt.strategy
    };

    await server.register(Inert);
    await server.register(AuthBearer);
    await server.register(AuthJwt);
    // await server.register(AuthJwt);

    server.auth.strategy("simple", "bearer-access-token", {
      allowQueryToken: true, // optional, false by default
      validate: async (request, token, h) => {
        // here is where you validate your token
        // comparing with token from your database for example
        const isValid = token === "1234";

        const credentials = { token };
        const artifacts = { test: "info" };

        return { isValid, credentials, artifacts };
      }
    });

    const validate = (decodedToken, request, h) => {
      let { user } = decodedToken;
      if (!user) {
        return { isValid: false };
      }
      /* check for additional auth requirements if necessary */
      return {
        isValid: true,
        credentials: { user }
      };
    };

    function createToken(user) {
      const Jwt = require("jsonwebtoken");

      const { email, _id } = user;

      token = Jwt.sign({ user: { email, _id } }, jwtSecret, {
        algorithm: "HS256",
        expiresIn: "1m"
      });

      return token;
    }

    server.auth.strategy("jwt", "jwt", {
      key: "NeverShareYourSecret",
      validate,
      verifyOptions: { algorithms: ["HS256"] }
    });

    server.auth.default("simple");

    server.method("createToken", createToken, {});

    await server.register({
      plugin: RestHapi,
      options: {
        mongoose: mongoose,
        config: config
      }
    });

    await server.start();

    RestHapi.logUtil.logActionComplete(
      RestHapi.logger,
      "Server Initialized",
      server.info
    );

    return server;
  } catch (err) {
    console.log("Error starting server:", err);
  }
}

module.exports = api();
