"use strict";

const React = require("react");
const Layout = require("./layout.jsx");

class LoginView extends React.Component {
  render() {
    return (
      <Layout title="About Page">
        <h1>login.</h1>
      </Layout>
    );
  }
}

module.exports = LoginView;
