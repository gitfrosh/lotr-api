// api/hello.js
const Path = require('path');
const Joi = require("joi");
const RestHapi = require("rest-hapi");

module.exports = function(server, mongoose, logger) {
  // Registration endpoint
  (function() {
    const Log = logger.bind("Public");
    Log.note("Generating Public endpoint");

    server.route({
      method: "GET",
      path: "/public/{path*}",
      config: {
        handler: {
          directory: {
            path: Path.join(__dirname, "..", "public"),
            index: true,
            redirectToSlash: false
          }
        },
        auth: false,
        tags: ["api", "public"],
        plugins: {
          "hapi-swagger": {}
        }
      }
    });
  })();
};