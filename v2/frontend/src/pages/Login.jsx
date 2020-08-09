import React from "react";
import { useForm, useField } from "react-form";
import { login } from "../helpers/api";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";

async function validateRequired(field) {
  if (!field) {
    return "Required";
  }
}



function EmailField() {
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("email", {
    validate: validateRequired
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

function Login() {
  const { addToast } = useToasts();
  const history = useHistory();

  const {
    Form,
    meta: { isSubmitting, canSubmit },
  } = useForm({
    onSubmit: async (values, instance) => {
      await sendToServer(values);
    },
    debugForm: false,
  });



  async function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  async function sendToServer(values) {
    const response = await login(values);
    console.log(response);
    if (response.message) {
      addToast(response.message, { appearance: "error" });
    } else {
      addToast("Login successful", { appearance: "success" });
      setCookie("lotr-api", response.token, 7);
      history.push('/account')

    }
  }

  return (
    <>
      <div>
        <h2>Login</h2>
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
    </>
  );
}

export default Login;
