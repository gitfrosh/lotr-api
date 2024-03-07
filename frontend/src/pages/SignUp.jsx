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
  const [formData, setFormData] = useState({ email: '', password: '', passwordValidate: '' });
  const [errors, setErrors] = useState({ email: '', password: '', passwordValidate: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    const validationResult = field === 'passwordValidate' 
      ? validatePasswordValidate(value) 
      : validateField(value);
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: validationResult });
  };

  const validateField = (field) => {
    if (!field.trim()) {
      return 'Required';
    }
    return '';
  };

  const validatePasswordValidate = (field) => {
    const result = validateField(field);
    if (result.length > 0) {
      return result;
    } else if (field !== formData.password) {
      return 'Passwords do not match';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, passwordValidate } = formData;
    const emailError = validateField(email);
    const passwordError = validateField(password);
    const passwordValidateError = validatePasswordValidate(passwordValidate);

    setErrors({ email: emailError, password: passwordError, passwordValidate: passwordValidateError });

    if (emailError || passwordError || passwordValidateError) {
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
  };

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
              E-Mail: <input type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={() => setErrors({ ...errors, email: validateField(formData.email) })} />
              {errors.email && <em>{errors.email}</em>}
            </label>
          </div>
          <div className="input-group fluid">
            <label>
              Password: <input type="password" 
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                onBlur={() => setErrors({ ...errors, password: validateField(formData.password) })} />
              {errors.password && <em>{errors.password}</em>}
            </label>
          </div>
          <div className="input-group fluid">
            <label>
              Repeat Password: <input type="password" 
                value={formData.passwordValidate}
                onChange={(e) => handleInputChange('passwordValidate', e.target.value)}
                onBlur={() => setErrors({ ...errors, passwordValidate: validateField(formData.passwordValidate) })} />
              {errors.passwordValidate && <em>{errors.passwordValidate}</em>}
            </label>
          </div>
          <div className="input-group fluid">
            <button className="primary" type="submit" disabled={isSubmitting || !!errors.email || !!errors.password || !!errors.passwordValidate}>
              Submit
            </button>
          </div>
          <div style={textCenter}>
            <em>{isSubmitting ? "Submitting..." : null}</em>
          </div>
      </form>
    </div>
  );
}

export default SignUp;