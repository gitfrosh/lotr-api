const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const server_port = process.env.PORT || 3002;

app.use(cors());

app.use(helmet());

app.get("/v1*", function (req, res) {
  return res.status(301).send({
    message:
      "This API URI is deprecated! Please update your API calls to https://the-one-api.dev/v2/.",
  });
});

app.get("*", function (req, res) {
  return res
    .status(200)
    .send(
      "<h1>The API to rule them all *has moved* to <a href='https://the-one-api.dev'>https://the-one-api.dev</a> </h1>"
    );
});

app.listen(server_port, () =>
  console.log(`Heroku forwarding running on ${server_port}!`)
);
