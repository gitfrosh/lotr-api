import React, { useState, useEffect } from "react";
import { getUserInfo } from "../helpers/api";
import { Link } from "react-router-dom";

function Header({ isLoggedIn }) {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserInfo().then((user) => setUserInfo(user));
    setLoading(false);
  }, []);

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
  };

  if (loading) return <span>Loading..</span>;

  return (
    <header className="sticky row">
      <div className="col-sm-6 logo">The One API</div>
      <div style={{ textAlign: "right" }} class="col-sm-6">
        <label for="drawer-control" class="drawer-toggle persistent" />
      </div>

      <input type="checkbox" id="drawer-control" class="drawer persistent" />
      <div width="100%" id="drawer">
        <label for="drawer-control" class="drawer-close" />
        <nav>
          <Link to="/">home</Link>
          <br />
          <Link to="/about">about</Link>
          <br />
          <Link to="/documentation">documentation</Link> <br />
          {userInfo && (
            <>
              <br /> <Link to="/account">account</Link>
              <br />
              <a onClick={logout()} href="#">
                logout
              </a>{" "}
              <br />
            </>
          )}
          {!userInfo && (
            <>
              <Link to="/login">login</Link>
              <br />
              <Link to="/sign-up">sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
