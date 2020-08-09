import React from 'react';
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import { useForm, useField } from "react-form";
import { register } from "../helpers/api";

function EmailField() {
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("email", {});

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
  } = useField("password", {});

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
    meta: { isSubmitting, canSubmit },
  } = useForm({
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
      history.push('/login')

    }
  }

  return (
    <div>
    <h2>Register</h2>
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
  );
}

export default SignUp;
