"use strict";

const Path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
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
  plugins: [
    // new webpack.DefinePlugin({
    //   "process.env": {
    //     APP_URL: JSON.stringify("http://localhost:8088")
    //   }
    // })
  ]
};
