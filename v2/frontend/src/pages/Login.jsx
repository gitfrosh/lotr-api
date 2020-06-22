import React from 'react';

function Login() {

  return (
    <div>
      <form>
  <fieldset>
    <legend>Simple form</legend>
    <label for="username">Username</label>
    <input type="text" id="Username" placeholder="Username"/>
    <label for="password">Password</label>
    <input type="password" id="password" placeholder="Password"/>
  </fieldset>
</form>
    </div>
  );
}

export default Login;
