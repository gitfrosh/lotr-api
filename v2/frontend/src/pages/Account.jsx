import React, { useState, useEffect } from "react";
import {getUserInfo} from "../helpers/api";

function Account() {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserInfo().then(user => setUserInfo(user)) 
    setLoading(false);
  }, []);

  if (loading) return <span>Loading..</span>;

  return (
    <div>
      <h2>Account</h2>
      <p>Welcome to your user account!</p>
      <div class="card">
        <div class="section dark">
          <p>
            <b>Registered email adress</b>: {userInfo.email}
          </p>
        </div>

        <div class="section dark">
          <p>
            <b>Access token:</b> {userInfo.access_token}
            <em> (Include this in your API calls!)</em>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Account;
