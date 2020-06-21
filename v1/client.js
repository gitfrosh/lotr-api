/* global window document */
"use strict";

const React = require("react");
const ReactDOM = require("react-dom");
const url = window.location.pathname;
const filter = url.substring(url.lastIndexOf("/") + 1);
let AppComponent = undefined;

// switch routes
switch (filter) {
  case "home":
    AppComponent = require("./views/home.jsx");
    break;
  case "about":
    AppComponent = require("./views/about.jsx");
    break;
  case "documentation":
    AppComponent = require("./views/documentation.jsx");
    break;
  case "account":
    AppComponent = require("./views/account.jsx");
    break;
  case "sign-up":
    AppComponent = require("./views/sign-up.jsx");
    break;
  case "login":
    AppComponent = require("./views/login.jsx");
    break;
  default:
    AppComponent = require("./views/home.jsx");
}

const App = React.createFactory(AppComponent);
const mountNode = document.getElementById("app-mount");
const serverState = window.state;

ReactDOM.hydrate(App(serverState), mountNode);
