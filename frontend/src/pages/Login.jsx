import React, { useState } from 'react';
import { login } from '../helpers/api';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';

async function setCookie(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const handleInputChange = (field, value) => {
    if (field === 'email') {
      setEmail(value);
    }
    if (field === 'password') { 
      setPassword(value);
    }
    setIsTouched(true);
  };

  const validateField = (field) => {
    if (!field.trim()) {
      return 'Required'
    };
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateField(email);
    const passwordError = validateField(password);

    setErrors({ email: emailError, password: passwordError });

    if (emailError || passwordError) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await login({ email, password });
      if (response.message) {
        toast.error(response.message);
      } else {
        toast.success('Login successful');
        setCookie('lotr-api', response.token, 7);
        history.push('/account');
      }
    } catch (error) {
      toast.error('An error occurred while logging in');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div>
        <Helmet>
          <title>The Lord of the Rings API - The one API | Login</title>
        </Helmet>
        <form onSubmit={handleSubmit}>
          <div className='input-group fluid'>
            <label>
              E-Mail:{' '}
              <input
                type='email'
                value={email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={() => setErrors({ ...errors, email: validateField(email) })}
              />
              {((isTouched && !email.trim()) || errors.email) && <em>Required</em>}
            </label>
          </div>
          <div className='input-group fluid'>
            <label>
              Password:{' '}
              <input
                type='password'
                value={password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                onBlur={() => setErrors({ ...errors, password: validateField(password) })}
              />
              {((isTouched && !password.trim()) || errors.password) && <em>Required</em>}
            </label>
          </div>
          <div className='input-group fluid'>
            <button className='primary' type='submit' disabled={isSubmitting || !!errors.email || !!errors.password}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
