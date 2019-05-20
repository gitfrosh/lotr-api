"use strict";

const React = require("react");
const Layout = require("./app.jsx");

class AboutView extends React.Component {
  render() {
    return (
      <Layout title="About Page">
        <h1>The doc.</h1>
      </Layout>
    );
  }
}

module.exports = AboutView;
