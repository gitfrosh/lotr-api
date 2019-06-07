"use strict";

const React = require("react");
const Layout = require("./layout.jsx");
const { Formik } = require("formik");
const Yup = require("yup");

class RegistrationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {}
    };
  }

  signUp(values) {
    // e.preventDefault();
    var url = process.env.APP_ENV === "prod" ? process.env.APP_URL : "" + "/v1/register";
    let status = undefined;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        password: values.password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        status = res.status;
        return res.json();
      })
      .then(response => {
        // console.log("Response:", JSON.stringify(response));
        // console.log(status);
        if (status === 200) {
          this.setState({
            response: {
              type: "SUCCESS"
            }
          });
        } else {
          this.setState({
            response: {
              type: "ERROR",
              response: response
            }
          });
        }

        return;
      })
      .catch(error => {
        this.setState({
          response: {
            type: "ERROR",
            response: error
          }
        });
      });
  }

  changeEmail(event) {
    this.setState({ email: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <Layout title="Home">
        <main>
          <center>
            <section>
              <div className="row" style={{ marginTop: "5rem" }}>
                <div className="box col-2" />
                <div className="box col-8">
                  {this.state.response.type !== "SUCCESS" && (
                    <div className="panel dark">
                      <div className="panel-head">
                        Sign up to get your access token
                      </div>
                      <div className="panel-body">
                        <Formik
                          initialValues={{
                            email: "",
                            password: "",
                            passwordConfirm: ""
                          }}
                          onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                              this.signUp(values);
                              setSubmitting(false);
                            }, 500);
                          }}
                          validationSchema={Yup.object().shape({
                            email: Yup.string()
                              .email()
                              .required("E-Mail required"),
                            password: Yup.string()
                              .trim()
                              .required("Password required"),
                            passwordConfirm: Yup.string()
                              .required("Password confirm required")
                              .oneOf(
                                [Yup.ref("password"), null],
                                "Passwords don't match"
                              )
                          })}
                        >
                          {props => {
                            const {
                              values,
                              touched,
                              errors,
                              dirty,
                              isSubmitting,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              handleReset
                            } = props;
                            return (
                              <form onSubmit={handleSubmit}>
                                <label
                                  htmlFor="email"
                                  // style={{ display: "block" }}
                                >
                                  E-Mail
                                </label>
                                <input
                                  id="email"
                                  type="text"
                                  value={values.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.email && touched.email
                                      ? "text-input error"
                                      : "text-input"
                                  }
                                />
                                <br />
                                <label
                                  htmlFor="password"
                                  // style={{ display: "block" }}
                                >
                                  Choose a Password
                                </label>
                                <input
                                  id="password"
                                  type="password"
                                  value={values.password}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.password && touched.password
                                      ? "text-input error"
                                      : "text-input"
                                  }
                                />{" "}
                                <br />
                                <label
                                  htmlFor="password"
                                  // style={{ display: "block" }}
                                >
                                  Confirm Password
                                </label>
                                <input
                                  id="passwordConfirm"
                                  type="password"
                                  value={values.passwordConfirm}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.passwordConfirm &&
                                    touched.passwordConfirm
                                      ? "text-input error"
                                      : "text-input"
                                  }
                                />
                                {errors.email && touched.email && (
                                  <p>{errors.email}</p>
                                )}
                                {errors.password && touched.password && (
                                  <p> {errors.password}</p>
                                )}
                                {errors.passwordConfirm &&
                                  touched.passwordConfirm && (
                                    <p> {errors.passwordConfirm}</p>
                                  )}
                                <br />
                                <button
                                  type="button"
                                  className="btn default clean"
                                  onClick={handleReset}
                                  disabled={!dirty || isSubmitting}
                                >
                                  Reset
                                </button>{" "}
                                <button
                                  className="btn default dark"
                                  type="submit"
                                  disabled={isSubmitting}
                                >
                                  Submit
                                </button>
                              </form>
                            );
                          }}
                        </Formik>
                      </div>
                    </div>
                  )}
                  {this.state.response.type === "ERROR" && (
                    <div class="alert error">
                      {this.state.response.response.message}
                    </div>
                  )}
                  {this.state.response.type === "SUCCESS" && (
                    <div class="alert success">
                      Your new user account has been created. You can{" "}
                      <a href="/login">login</a> and grab your access token now.
                    </div>
                  )}
                </div>
                <div className="box col-2" />
              </div>
            </section>
          </center>
        </main>
      </Layout>
    );
  }
}

module.exports = RegistrationView;
