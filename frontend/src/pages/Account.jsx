import React, { useState, useEffect } from "react";
import { getUserInfo } from "../helpers/api";
import { useHistory } from "react-router-dom";
import Helmet from "react-helmet";

function Account() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    getUserInfo().then((user) => {
      if (user) setUserInfo(user);
      if (!user) history.push("/login");
    });
    setLoading(false);
  }, []);
  if (loading) return <span>Loading..</span>;
  return (
    <div>
      <Helmet>
        <title>The Lord of the Rings API - The one API | Account</title>
      </Helmet>
      <br />
      <div class="card fluid">
        <div class="section">
          <h3>Welcome to your user account!</h3>

          <p>
            <b>Registered email address</b>: {userInfo && userInfo.email}
          </p>

          <p>
            <b>Access token:</b>{" "}
            <span style={{ whiteSpace: "nowrap" }}>
              {userInfo && userInfo.access_token}
            </span>
            <em> (Include this in your API calls!)</em>
          </p>
      </div>
      </div>
    </div>
  );
}

export default Account;
