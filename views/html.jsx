"use strict";

const React = require("react");

class Html extends React.Component {
  render() {
    return (
      <html lang="en">
        <head>
          <title>The LOTR API</title>
          <link
            rel="icon"
            type="image/gif"
            href="assets/images/icon_gandalf.gif"
          />
          <link rel="manifest" href="assets/manifest.json" />
          <meta charSet="utf-8" />
          <meta
            name="Description"
            content="This is the API that serves your needs
                    regarding data about The Lord of the Rings,
                    the epic books by J. R. R. Tolkien and the official movie
                    adaptions by Peter Jackson."
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=yes"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
            integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Quicksand&display=swap"
          />
          <link rel="stylesheet" href="assets/css/main.css" />
        </head>
        <body>
          <div
            id="app-mount"
            dangerouslySetInnerHTML={{ __html: this.props.children }}
          />
          <script
            id="app-state"
            dangerouslySetInnerHTML={{ __html: this.props.state }}
          />
          <script src="assets/js/client.js" />
          <script src="assets/js/jquery.min.js" />
          <script src="assets/js/caramel.min.js" />
        </body>
      </html>
    );
  }
}

module.exports = Html;
