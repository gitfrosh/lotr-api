"use strict";

const React = require("react");

class LayoutView extends React.Component {
  render() {
    return (
      <body className="index">
        <link rel="stylesheet" href="assets/css/main.css" />
        <noscript>
          <link rel="stylesheet" href="assets/css/noscript.css" />
        </noscript>
        <div id="page-wrapper">
          <header id="header" className="alt">
            <h1 id="logo">
              <a href="index.html">
                Twenty <span>by HTML5 UP</span>
              </a>
            </h1>
            <nav id="nav">
              <ul>
                <li className="current">
                  <a href="index.html">Welcome</a>
                </li>
                <li className="submenu">
                  <a href="#">Layouts</a>
                  <ul>
                    <li>
                      <a href="left-sidebar.html">Left Sidebar</a>
                    </li>
                    <li>
                      <a href="right-sidebar.html">Right Sidebar</a>
                    </li>
                    <li>
                      <a href="no-sidebar.html">No Sidebar</a>
                    </li>
                    <li>
                      <a href="contact.html">Contact</a>
                    </li>
                    <li className="submenu">
                      <a href="#">Submenu</a>
                      <ul>
                        <li>
                          <a href="#">Dolore Sed</a>
                        </li>
                        <li>
                          <a href="#">Consequat</a>
                        </li>
                        <li>
                          <a href="#">Lorem Magna</a>
                        </li>
                        <li>
                          <a href="#">Sed Magna</a>
                        </li>
                        <li>
                          <a href="#">Ipsum Nisl</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#" className="button primary">
                    Sign Up
                  </a>
                </li>
              </ul>
            </nav>
          </header>
          {this.props.children}
          <hr />
          <footer id="footer">
            <ul className="icons">
              <li>
                <a href="#" className="icon circle fa-twitter">
                  <span className="label">Twitter</span>
                </a>
              </li>
              <li>
                <a href="#" className="icon circle fa-facebook">
                  <span className="label">Facebook</span>
                </a>
              </li>
              <li>
                <a href="#" className="icon circle fa-google-plus">
                  <span className="label">Google+</span>
                </a>
              </li>
              <li>
                <a href="#" className="icon circle fa-github">
                  <span className="label">Github</span>
                </a>
              </li>
              <li>
                <a href="#" className="icon circle fa-dribbble">
                  <span className="label">Dribbble</span>
                </a>
              </li>
            </ul>

            <ul className="copyright">
              <li>&copy; Untitled</li>
              <li>
                Design: <a href="http://html5up.net">HTML5 UP</a>
              </li>
            </ul>
          </footer>
          <script src="assets/js/jquery.min.js" />
          <script src="assets/js/jquery.dropotron.min.js" />
          <script src="assets/js/jquery.scrolly.min.js" />
          <script src="assets/js/jquery.scrollex.min.js" />
          <script src="assets/js/browser.min.js" />
          <script src="assets/js/breakpoints.min.js" />
          <script src="assets/js/util.js" />
          <script src="assets/js/main.js" />
        </div>
      </body>
    );
  }
}

module.exports = LayoutView;
