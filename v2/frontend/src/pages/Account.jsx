import React, { useState, useEffect } from "react";
import {getUserInfo} from "../helpers/api";
import { useHistory } from "react-router-dom";

function Account() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    getUserInfo().then(user => {
      if (user) setUserInfo(user)
      if (!user) history.push('/login')
    } ) 
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
            <b>Registered email adress</b>: {userInfo && userInfo.email}
          </p>
        </div>

        <div class="section dark">
          <p>
            <b>Access token:</b> <span style={{ whiteSpace: "nowrap" }}>{userInfo && userInfo.access_token}</span>
            <em> (Include this in your API calls!)</em>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Account;
