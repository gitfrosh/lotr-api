"use strict";

const React = require("react");

class LayoutView extends React.Component {
  render() {
    return (
      <body>
        <div className="container">
          <header className="site-header dashed-bottom">
            <a className="site-title" href="#">
              The <strong>The Lord of the Rings</strong> API
            </a>
            <nav className="responsive-nav">
              {/* <label for="navigation-toggle">
               <svg className="i"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="icons.svg#i-menu"></use></svg>
            </label> */}
            </nav>
            <input type="checkbox" id="navigation-toggle" />
              <nav className="site-nav nav-separated">
                {/* <form className="site-search" action="." method="GET">
                  <input type="search" name="search" placeholder="search" />
                </form> */}
                <ul>
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Documentation</a>
                  </li>
                  <li>
                    <a href="#">Link</a>
                  </li>
                </ul>
              </nav>
          </header>
          {this.props.children}
          <footer className="site-footer dashed-top">
            Footer text –{" "}
            <a href="#" title="Link">
              Link
            </a>{" "}
            <a href="#" title="Link">
              Link
            </a>
          </footer>
        </div>
      </body>
    );
  }
}

module.exports = LayoutView;
