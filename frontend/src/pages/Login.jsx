import React, { useState } from "react";
import { login } from "../helpers/api";
import toast from 'react-hot-toast';
import { useHistory } from "react-router-dom";
import Helmet from "react-helmet";

async function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setErrors({
        email: email ? null : "Required",
        password: password ? null : "Required"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await login({ email, password });
      if (response.message) {
        toast.error(response.message);
      } else {
        toast.success("Login successful");
        setCookie("lotr-api", response.token, 7);
        history.push('/account');
      }
    } catch (error) {
      toast.error("An error occurred while logging in");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div>
        <Helmet>
          <title>The Lord of the Rings API - The one API | Login</title>
        </Helmet>
        <form onSubmit={handleSubmit}>
          <div className="input-group fluid">
            <label>
              E-Mail: <input type="email" value={email} onChange={handleEmailChange} />
              {errors.email && <em>{errors.email}</em>}
            </label>
          </div>
          <div className="input-group fluid">
            <label>
              Password: <input type="password" value={password} onChange={handlePasswordChange} />
              {errors.password && <em>{errors.password}</em>}
            </label>
          </div>
          <div className="input-group fluid">
            <button className="primary" type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
          <div>
            <em>{isSubmitting ? "Submitting..." : null}</em>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
