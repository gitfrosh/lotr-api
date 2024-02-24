import React, { useState } from "react";
import toast from 'react-hot-toast';
import { useHistory } from "react-router-dom";
import { register } from "../helpers/api";
import Helmet from "react-helmet";

const textCenter = {
  'textAlign': 'center'
};

function SignUp() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValidate, setPasswordValidate] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handlePasswordValidateChange = (e) => {
    setPasswordValidate(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !passwordValidate) {
      setError("All fields are required");
      return;
    }

    if (password !== passwordValidate) {
      setError("The passwords don't match");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await register({ email, password });
      if (response.message) {
        toast.error(response.message);
      } else {
        toast.success("Registered successfully");
        history.push("/login");
      }
    } catch (error) {
      toast.error("An error occurred while registering");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Helmet>
        <title>The Lord of the Rings API - The one API | Sign up </title>
      </Helmet>
      <p>
        <br />
        Get your access token now by registering a free API account.
        </p>
      <form onSubmit={handleSubmit}>
          <div className="input-group fluid">
            <label>
              E-Mail: <input type="email" value={email} onChange={handleEmailChange} />
            </label>
          </div>
          <div className="input-group fluid">
            <label>
              Password: <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
          </div>
          <div className="input-group fluid">
            <label>
              Repeat Password: <input type="password" value={passwordValidate} onChange={handlePasswordValidateChange} />
            </label>
          </div>
          <div className="input-group fluid">
            <button className="primary" type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
          <div style={textCenter}>
            <em>{error}</em>
            <em>{isSubmitting ? "Submitting..." : null}</em>
          </div>
      </form>
    </div>
  );
}

export default SignUp;
