let Hapi = require("hapi");
const Inert = require("@hapi/inert");
const Path = require("path");
let mongoose = require("mongoose");
let RestHapi = require("rest-hapi");
const AuthBearer = require("hapi-auth-bearer-token");
let AuthJwt = require("hapi-auth-jwt2");
const Vision = require("@hapi/vision");
const HapiReactViews = require("hapi-react-views");
require("babel-polyfill");

require("babel-core/register")({
  presets: ["react", "env"]
});

async function api() {
  try {
    // general settings
    let server = Hapi.Server({
      port: 8088,
      host: "localhost",
      debug: { request: ['*'] },
      routes: {
        validate: {
          failAction: async (request, h, err) => {
            RestHapi.logger.error(err);
            throw err;
          }
        }
      }
    });

    await server.register(Inert);
    await server.register(AuthBearer);
    await server.register(AuthJwt);
    await server.register(Vision);

    // set static view files and view engine hapi react views
    server.views({
      engines: {
        jsx: HapiReactViews
      },
      relativeTo: __dirname,
      path: "views",
      compileOptions: {
        renderMethod: "renderToString",
        layoutPath: Path.join(__dirname, "views"),
        layout: "html"
      }
    });

    // serve assets
    server.route({
      method: "GET",
      path: "/assets/{path*}",
      config: {
        auth: false
      },
      handler: {
        directory: {
          path: "./assets",
          index: false,
          listing: false
        }
      }
    });

    // config auth strategy #1 (access key!) for endpoints
    server.auth.strategy("simple", "bearer-access-token", {
      allowQueryToken: true, // optional, false by default
      validate: async (request, token, h) => {
        console.log("authorising bearer token...");
        // here is where you validate your token
        // comparing with token from your database for example
        //const isValid = token === "1234";
        const isValid = true;
        // const isValid = false;
        const credentials = { token };
        const artifacts = { test: "info" };

        return { isValid, credentials, artifacts };
      }
    });

    // auth strategy #2 (JWT) for user registration, login, logout
    const validate = (decodedToken, request, h) => {
      console.log("authorising jwt...");
      let { user } = decodedToken;
      if (!user) {
        return { isValid: false };
      }
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

    let config = {
      appTitle: "lotr-api",
      enableTextSearch: true,
      // logRoutes: true,
      loglevel: "INTERNAL",
      docExpansion: "list",
      swaggerHost: "localhost:8080",
      mongo: {
        URI: "mongodb://localhost:27017/lotr"
      },
      authStrategy: "simple" ///??????
    };

    await server.register({
      plugin: RestHapi,
      options: {
        mongoose,
        config
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
