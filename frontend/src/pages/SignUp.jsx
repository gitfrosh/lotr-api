import React from "react";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import { useForm, useField } from "react-form";
import { register } from "../helpers/api";
import Helmet from "react-helmet";

async function validateEmail(field) {
  if (!field) {
    return "Required";
  }
}

async function validatePassword(field) {
  if (!field) {
    return "Required";
  }
}

async function validatePasswordValidate(field) {
  if (!field) {
    return "Required";
  }
}

function EmailField() {
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("email", {
    validate: validateEmail,
  });

  return (
    <>
      <input type="email" {...getInputProps()} />{" "}
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
    validate: validatePassword,
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
    validate: validatePasswordValidate,
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
  const { addToast } = useToasts();
  const history = useHistory();

  const {
    Form,
    meta: { isSubmitting, isSubmitted, canSubmit, error },
  } = useForm({
    debugForm: true,

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
    console.log(response);
    if (response.message) {
      addToast(response.message, { appearance: "error" });
    } else {
      addToast("Registered successfully", { appearance: "success" });
      history.push("/login");
    }
  }

  return (
    <div>
      <Helmet>
        <title>The Lord of the Rings API - The one API | Sign up </title>
      </Helmet>
      <Form>
        <form>
          <div class="input-group fluid">
            <label>
              E-Mail: <EmailField />
            </label>
          </div>
          <div class="input-group fluid">
            <label>
              Password: <PasswordField />
            </label>
          </div>
          <div class="input-group fluid">
            <label>
              Repeat Password: <PasswordValidateField />
            </label>
          </div>
          <div class="input-group fluid">
            <button class="primary" type="submit" disabled={!canSubmit}>
              Submit
            </button>
          </div>
          <div>
            <em>{isSubmitting ? "Submitting..." : null}</em>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default SignUp;
