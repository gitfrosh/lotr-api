let Hapi = require("hapi");
const Inert = require("@hapi/inert");
const Path = require("path");
let mongoose = require("mongoose");
let RestHapi = require("rest-hapi");
const AuthBearer = require("hapi-auth-bearer-token");

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
      appTitle: "rest-hapi-demo",
      enableTextSearch: true,
      logRoutes: true,
      docExpansion: "list",
      swaggerHost: "localhost:8080",
      mongo: {
        URI: "mongodb://localhost:27017/lotr"
      },
      // authStrategy: Auth.strategy
    };

    await server.register(Inert);
    await server.register(AuthBearer);
    await server.register({
      plugin: RestHapi,
      options: {
        mongoose: mongoose,
        config: config
      }
    });

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

    server.auth.default("simple");

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
