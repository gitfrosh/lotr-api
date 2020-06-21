import React from 'react';
import {
    Link
  } from "react-router-dom";

function Header({isLoggedIn}) {

    const logout = () => {
        // const url =
        //   process.env.APP_ENV === "prod" ? process.env.APP_URL : "" + "/v1/logout";
        // fetch(url, {
        //   method: "GET"
        // })
        //   .then(res => {
        //     return res.json();
        //   })
        //   .then(response => {
        //     //console.log("Response:", JSON.stringify(response));
        //     window.location.href =
        //       process.env.APP_ENV === "prod" ? process.env.APP_URL : "/";
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
      }

    return (
        <header>
        <nav className="nav bar thick dark">
          <ul>
            <li className="collapse">
              <a
                alt="This is the navigation"
                aria-label="This is the navigation"
                href="#"
                className="menu"
              >
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
              <Link to="/">home</Link>
              </li>
              <li>
              <Link to="/about">about</Link>
              </li>
              <li>
              <Link to="/documentation">documentation</Link>
              </li>
              {isLoggedIn && (
                <li className="dropdown">
                  <a href="#" className="dropdownitem">
                    <strong>welcome!</strong> <i class="fas fa-caret-down" />
                  </a>
                  <ul>
                    <li>
                      <Link to href="/account">account</Link>
                    </li>
                    <li>
                      <a onClick={logout()} href="#">
                        logout
                      </a>
                    </li>
                  </ul>
                </li>
              )}
              {!isLoggedIn && (
                <span>
                  <li>
                    <Link to="/login">login</Link>
                  </li>
                  <li>
                    <Link to="/sign-up">sign up</Link>
                  </li>
                </span>
              )}
            </ul>
          </ul>
        </nav>
      </header>
    )
}

export default Header;