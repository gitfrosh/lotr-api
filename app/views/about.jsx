"use strict";

const React = require("react");
const Layout = require("./layout.jsx");

class AboutView extends React.Component {
  render() {
    return (
      <Layout title="About Page">
        <h1>About the plotdadasd device.</h1>
        <a href="#" className="image featured"><img src="assets/images/pic03.jpg" alt="" /></a>
      </Layout>
    );
  }
}

module.exports = AboutView;
