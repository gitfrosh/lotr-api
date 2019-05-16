"use strict";

const React = require("react");

class LayoutView extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>

          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />

          <link rel="stylesheet" href="assets/css/main.css" />
          <noscript>
            <link rel="stylesheet" href="assets/css/noscript.css" />
          </noscript>
        </head>
        <body class="index is-preload">
          <div id="page-wrapper">
            <header id="header" class="alt">
              <h1 id="logo">
                <a href="index.html">
                  Twenty <span>by HTML5 UP</span>
                </a>
              </h1>
              <nav id="nav">
                <ul>
                  <li class="current">
                    <a href="index.html">Welcome</a>
                  </li>
                  <li class="submenu">
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
                      <li class="submenu">
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
                    <a href="#" class="button primary">
                      Sign Up
                    </a>
                  </li>
                </ul>
              </nav>
            </header>
            {this.props.children}
            <hr />
            <p>
              <a href="/">Home</a> | <a href="/about">About Us</a>
            </p>
            <footer id="footer">
              <ul class="icons">
                <li>
                  <a href="#" class="icon circle fa-twitter">
                    <span class="label">Twitter</span>
                  </a>
                </li>
                <li>
                  <a href="#" class="icon circle fa-facebook">
                    <span class="label">Facebook</span>
                  </a>
                </li>
                <li>
                  <a href="#" class="icon circle fa-google-plus">
                    <span class="label">Google+</span>
                  </a>
                </li>
                <li>
                  <a href="#" class="icon circle fa-github">
                    <span class="label">Github</span>
                  </a>
                </li>
                <li>
                  <a href="#" class="icon circle fa-dribbble">
                    <span class="label">Dribbble</span>
                  </a>
                </li>
              </ul>

              <ul class="copyright">
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
            <script src="assets/js/client.js" />
          </div>
        </body>
      </html>
    );
  }
}

module.exports = LayoutView;
