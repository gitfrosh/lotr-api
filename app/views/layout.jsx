"use strict";

const React = require("react");

class LayoutView extends React.Component {
  render() {
    return (
      <body>
        <header>
          <nav className="nav bar thick dark">
            <ul>
              <li className="collapse">
                <a href="#" className="menu">
                  <i className="fa fa-bars" />
                </a>
              </li>

              <li className="brand">
                <a href="/home">
                  <i className="fa fa-ring" /> The
                  <strong>The Lord of the Rings</strong> API
                </a>
              </li>

              <ul className="right">
                <li>
                  <a href="/about">about</a>
                </li>
                <li>
                  <a href="/documentation">docs</a>
                </li>
                <li className="dropdown">
                  <a href="#" className="dropdownitem">
                    <strong>welcome, john!</strong>
                  </a>
                  <ul>
                    <li>
                      <a href="/account">account</a>
                    </li>
                    <li>
                      <a href="/logout">logout</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </ul>
          </nav>
        </header>
        {this.props.children}
        <footer>
          <center>Made with &hearts; and #Hapi.js in 2019.</center>
        </footer>
      </body>
    );
  }
}

module.exports = LayoutView;
