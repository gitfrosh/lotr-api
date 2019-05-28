let Hapi = require("hapi");
const Inert = require("@hapi/inert");
const Path = require("path");
let mongoose = require("mongoose");
let RestHapi = require("rest-hapi");
const AuthBearer = require("hapi-auth-bearer-token");
let AuthJwt = require("hapi-auth-jwt2");
const Vision = require("@hapi/vision");
const HapiReactViews = require("hapi-react-views");
const HapiRateLimit = require("hapi-rate-limit");
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
      debug: { request: ["*"] },
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
        auth: false,
        plugins: {
          "hapi-rate-limit": {
            enabled: false
          }
        }
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
        const User = mongoose.model("user");
        let isValid = false;
        let credentials = {};
        await User.findOne({ access_token: token }, function(err, user) {
          if (err) {
            console.log(err);
            isValid = false;
            credentials = {};
          }
          if (user) {
            isValid = true;
            credentials = { user };
          }
        });
        return { isValid, credentials };
      }
    });

    // auth strategy #2 (JWT) for user registration, login, logout
    const validate = (decodedToken, request, h) => {
      // console.log(decodedToken, request, h)
      console.log("authorising jwt...");
      let { user } = decodedToken;
      if (!user) {
        return { isValid: false, credentials: {} };
      }
      return {
        isValid: true,
        credentials: { user }
      };
    };

    function createToken(user) {
      const Jwt = require("jsonwebtoken");
      const jwtSecret = "NeverShareYourSecret";

      const { email, _id, access_token } = user;

      token = Jwt.sign({ user: { email, _id, access_token } }, jwtSecret, {
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

    server.ext("onPreResponse", (request, h) => {
      if (request.response.isBoom) {
        const err = request.response;
        const errName = err.output.payload.error;
        const statusCode = err.output.payload.statusCode;
        if (statusCode === 500) {
          return h
            .view("error", {
              statusCode: statusCode,
              errName: errName
            })
            .code(statusCode);
        }
      }
      return h.continue;
    });

    // routing
    server.route({
      method: "GET",
      path: "/",
      config: {
        handler: (request, h) => {
          // get initial data for frontend if necessary here
          // let response = await fetch(
          //   `http://localhost:8080/quote/5cd96e05de30eff6ebcce7e9`
          // );
          // let data = await response.json();
          const context = { foo: "baz" };
          context.state = `window.state = ${JSON.stringify(context)};`;
          return h.view("home", context);
        },
        auth: false,
        tags: ["api", "app", "home"],
        plugins: {
          "hapi-rate-limit": {
            enabled: false
          }
        }
      }
    });

    server.route({
      method: "GET",
      path: "/about",
      config: {
        handler: (request, h) => {
          return h.view("about");
        },
        auth: false,
        tags: ["api", "app", "about"],
        plugins: {
          "hapi-rate-limit": {
            enabled: false
          }
        }
      }
    });
    server.route({
      method: "GET",
      path: "/documentation",
      config: {
        handler: (request, h) => {
          return h.view("documentation");
        },
        auth: false,
        tags: ["api", "app", "documenation"],
        plugins: {
          "hapi-rate-limit": {
            enabled: false
          }
        }
      }
    });

    server.route({
      method: "GET",
      path: "/account",
      config: {
        handler: async function(request, h) {
          return h.view("account");
        },
        auth: {
          strategy: "jwt"
        },
        tags: ["api", "auth", "account"],
        plugins: {
          "hapi-swagger": {},
          "hapi-rate-limit": {
            enabled: false
          }
        }
      }
    });

    server.route({
      method: "GET",
      path: "/sign-up",
      config: {
        handler: async function(request, h) {
          return h.view("sign-up");
        },
        auth: false,
        tags: ["api", "auth", "sign-up"],
        plugins: {
          "hapi-rate-limit": {
            enabled: false
          }
        }
      }
    });

    server.route({
      method: "GET",
      path: "/login",
      config: {
        handler: async function(request, h) {
          return h.view("login");
        },
        auth: false,
        tags: ["api", "auth", "login"],
        plugins: {
          "hapi-swagger": {},
          "hapi-rate-limit": {
            enabled: false
          }
        }
      }
    });

    //  server route logout???

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
      authStrategy: "simple"
    };

    await server.register([
      {
        plugin: RestHapi,
        options: {
          mongoose,
          config
        },
        routes: {
          prefix: "/api"
        }
      }
    ]);

    await server.register([
      {
        plugin: HapiRateLimit,
        options: {
          enabled: true,
          userLimit: 100,
          userAttribute: "_id"
        }
      }
    ]);

    await server.start(err => {
      if (err) {
        throw err;
      }

      console.log(`Server started at: ${process.env.PORT}`);
    });

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
