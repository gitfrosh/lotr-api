import React, { useState, useEffect } from "react";
import { getUserInfo } from "../helpers/api";
import { useHistory } from "react-router-dom";
import Helmet from "react-helmet";

export interface UserInfo {
  email: string;
  access_token: string;
}

const Account: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    getUserInfo().then((user: UserInfo | null) => {
      if (user) setUserInfo(user);
      if (!user) history.push("/login");
    });
    setLoading(false);
  }, [history]);

  if (loading) return <span>Loading..</span>;

  return (
    <div>
      <Helmet>
        <title>The Lord of the Rings API - The one API | Account</title>
      </Helmet>
      <br />
      <div className="card fluid">
        <div className="section">
          <h2>Welcome to your user account!</h2>

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
};

export default Account;
