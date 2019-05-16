// api/hello.js
const Path = require("path");
const Joi = require("joi");
const RestHapi = require("rest-hapi");

module.exports = function(server, mongoose, logger) {
  // Registration endpoint
  (function() {
    const Log = logger.bind("Home");
    Log.note("Generating Frontend routes");

    server.route({
      method: "GET",
      path: "/home/{path*}",
      config: {
        handler: (request, h) => {
          // let response = await fetch(
          //   `http://localhost:8080/quote/5cd96e05de30eff6ebcce7e9`
          // );
          // let data = await response.json();
          const context = { foo: "baz" };
          context.state = `window.state = ${JSON.stringify(context)};`;
          return h.view("html", context);
        },
        // directory: {
        //   path: Path.join(__dirname, "..", "public"),
        //   index: true,
        //   redirectToSlash: false
        // }
        // },
        auth: false,
        tags: ["api", "home"],
        plugins: {
          "hapi-swagger": {}
        }
      }
    });
    server.route({
      method: "GET",
      path: "/about/{path*}",
      config: {
        handler: (request, h) => {
          return h.view("about");
        },
        auth: false,
        tags: ["api", "about"],
        plugins: {
          "hapi-swagger": {}
        }
      }
    });
    server.route({
      method: "GET",
      path: "/documentation/{path*}",
      config: {
        handler: (request, h) => {
          return h.view("documentation");
        },
        auth: false,
        tags: ["api", "documenation"],
        plugins: {
          "hapi-swagger": {}
        }
      }
    });
  })();
};
