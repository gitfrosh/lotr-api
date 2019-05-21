"use strict";

const Path = require("path");

module.exports = {
  mode: "development",
  entry: [Path.join(__dirname, "./client.js")],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  output: {
    path: Path.resolve(__dirname),
    filename: "./assets/js/client.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        query: {
          presets: ["react", "env"]
        }
      }
    ]
  },
  plugins: []
};
