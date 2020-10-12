import React, { useState, useEffect } from "react";
import { getUserInfo } from "../helpers/api";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const { addToast } = useToasts();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    getUserInfo().then((user) => setUserInfo(user));
    setLoading(false);
  }, [location.pathname]);

  async function logout(e) {
    e.preventDefault();
    try {
      document.cookie = "lotr-api=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      addToast("Logout successful", { appearance: "success" });
      history.push("/login");
    } catch (e) {
      addToast(e, { appearance: "error" });
    }
  }

  const getH1 = () => {
    let h1 = "The One API";
    if (location.pathname === "/about") h1 = "About";
    if (location.pathname === "/documentation") h1 = "Documentation"
    if (location.pathname === "/login") h1 = "Login"
    if (location.pathname === "/sign-up") h1 = "Sign up"
    if (location.pathname === "/account") h1 = "Account"

    return h1;
  }

  const isHomepage = () => {
    if (location.pathname === "/") return true
    return false
  }

  if (loading) return <span>Loading..</span>;



  return (
    <header className="sticky row">
      <div className="col-sm-6 logo">{isHomepage() ? "" : <Link to="/">The One API</Link>}</div>
      <div style={{ textAlign: "right" }} className="col-sm-6">
        <label htmlFor="drawer-control" className="drawer-toggle persistent" />
      </div>

      <div id="flexy" className="col-sm-12 col-md-2 col-lg-3"></div>
      <div style={{ padding:"20px"}} className="col-sm-12 col-md-8 col-lg-6">
        <h1>{getH1()}</h1>
        {isHomepage() &&<div className="subtitle">to rule them all</div>}
      </div>
      <div className="col-sm-12 col-md-2 col-lg-3"></div>

      <input type="checkbox" id="drawer-control" className="drawer persistent" />
      <div width="100%" id="drawer">
        <label htmlFor="drawer-control" className="drawer-close" />
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
              <a onClick={(e) => logout(e)} href="/">
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
};

export default Header;
