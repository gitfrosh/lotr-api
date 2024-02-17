import React from "react";
import toast from 'react-hot-toast';
import { useHistory } from "react-router-dom";
import { useForm, useField } from "react-form";
import { register } from "../helpers/api";
import Helmet from "react-helmet";

const textCenter = {
  'textAlign': 'center'
};

async function validateRequired(field) {
  if (!field) {
    return "Required";
  } else {
    return false
  }
}

function EmailField() {
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("email", {
    validate: validateRequired,
  });

  return (
    <>
      <input type="email" {...getInputProps()}/>{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
}

function PasswordField() {
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("password", {
    validate: validateRequired
  });

  return (
    <>
      <input type="password" {...getInputProps()} />{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
}

function PasswordValidateField() {
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("passwordValidate", {
    validate: validateRequired
  });

  return (
    <>
      <input type="password" {...getInputProps()} />{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
}

function SignUp() {
  const history = useHistory();

  const {
    Form,
    meta: { error, isSubmitting, canSubmit },
  } = useForm({
    validate: (values) => {
      if (values.password !== values.passwordValidate) {
        return "The passwords don't match.";
      }
      return false;
    },
    onSubmit: async (values, instance) => {
      await sendToServer(values);
    },
    debugForm: false,
  });

  async function sendToServer(values) {
    const response = await register(values);
    if (response.message) {
      toast.error(response.message);
    } else {
      toast.success("Registered successfully");
      history.push("/login");
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
      <Form>
          <div className="input-group fluid">
            <label>
              E-Mail: <EmailField />
            </label>
          </div>
          <div className="input-group fluid">
            <label>
              Password: <PasswordField />
            </label>
          </div>
          <div className="input-group fluid">
            <label>
              Repeat Password: <PasswordValidateField />
            </label>
          </div>
          <div className="input-group fluid">
            <button className="primary" type="submit" disabled={!canSubmit}>
              Submit
            </button>
          </div>
          <div style={textCenter}>
            <em>{error ? error : null}</em>
            <em>{isSubmitting ? "Submitting..." : null}</em>
          </div>
      </Form>
    </div>
  );
}

export default SignUp;
