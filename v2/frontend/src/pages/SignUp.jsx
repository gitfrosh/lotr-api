import React from 'react';

function SignUp() {

  return (
    <div>
      <h2>Register</h2>
    <form>
      <fieldset>
          <div class="input-group fluid">
            <label for="username" >E-Mail Adress</label>
            <input type="email" id="username" placeholder="username" />
          </div>
          <div class="input-group fluid">
            <label for="pwd">Password</label>
            <input type="password" id="pwd" placeholder="password" />
          </div>
          <div class="input-group fluid">
            <button class="primary">Create an account</button>
          </div>
      </fieldset>
    </form>
  </div>
  );
}

export default SignUp;
