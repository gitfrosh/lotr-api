"use strict";

const React = require("react");

class Html extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>The LOTR API</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
          <link
            rel="stylesheet"
            href="http://maxbeier.github.io/tawian-frontend/tawian-frontend.css"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Cousine:400,400i,700,700i"
          />
           <link rel="stylesheet" href="assets/css/main.css" />
        {/*  <noscript>
            <link rel="stylesheet" href="assets/css/noscript.css" />
          </noscript> */}
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
        </body>
      </html>
    );
  }
}

module.exports = Html;
