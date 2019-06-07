"use strict";

const React = require("react");
const Cookies = require("js-cookie");
let isLoggedIn = false;

class LayoutView extends React.Component {
  componentWillMount() {
    if (typeof window !== "undefined") {
      isLoggedIn = !!Cookies.get("token");
      // console.log(isLoggedIn);
    }
  }

  logout() {
    const url = process.env.APP_ENV === "prod" ? process.env.APP_URL : "" + "/v1/logout";
    fetch(url, {
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        //console.log("Response:", JSON.stringify(response));
        window.location.href = process.env.APP_ENV === "prod" ? process.env.APP_URL : "";
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <header>
          <nav className="nav bar thick dark">
            <ul>
              <li className="collapse">
                <a href="#" className="menu">
                  <i className="fa fa-bars" />
                </a>
              </li>

              <li className="brand">
                <a href="/">
                  <i className="fa fa-ring" /> The
                  <strong>The Lord of the Rings</strong> API
                </a>
              </li>

              <ul className="right">
              <li>
                  <a href="/">home</a>
                </li>
                <li>
                  <a href="/about">about</a>
                </li>
                <li>
                  <a href="/documentation">docs</a>
                </li>
                {isLoggedIn && (
                  <li className="dropdown">
                    <a href="#" className="dropdownitem">
                      <strong>welcome!</strong> <i class="fas fa-caret-down" />
                    </a>
                    <ul>
                      <li>
                        <a href="/account">account</a>
                      </li>
                      <li>
                        <a onClick={this.logout.bind(this)} href="#">
                          logout
                        </a>
                      </li>
                    </ul>
                  </li>
                )}
                {!isLoggedIn && (
                  <span>
                    <li>
                      <a href="/login">login</a>
                    </li>
                    <li>
                      <a href="/sign-up">sign up</a>
                    </li>
                  </span>
                )}
              </ul>
            </ul>
          </nav>
        </header>
        {this.props.children}
        <footer>
          <center>Made with &hearts; and #Hapi.js in 2019.</center>
        </footer>
      </div>
    );
  }
}

module.exports = LayoutView;
