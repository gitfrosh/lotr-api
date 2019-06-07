"use strict";

const React = require("react");
const Layout = require("./layout.jsx");
const { Formik } = require("formik");
const Yup = require("yup");

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      response: {}
    };
  }

  login(values) {
    // e.preventDefault();
    var url = process.env.APP_ENV === "prod" ? process.env.APP_URL : "" + "/v1/login";
    let status = undefined;
    const data = values.values;
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
        //  console.log(status);
        if (status === 200) {
          // console.log("logged in!");
          // console.log(response);
          // window.localStorage.setItem("JWT_KEY", response.token);
          window.location.href = process.env.APP_ENV === "prod" ? process.env.APP_URL : "" + "/account";
        } else {
          // console.log(response);
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
        console.log(error);
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
                      <div className="panel-head">Login to your account</div>
                      <div className="panel-body">
                        <Formik
                          initialValues={{ email: "", password: "" }}
                          onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                              this.login(values);
                              setSubmitting(false);
                            }, 500);
                          }}
                          validationSchema={Yup.object().shape({
                            email: Yup.string()
                              .email()
                              .required("E-Mail required"),
                            password: Yup.string()
                              .trim()
                              .required("Password required")
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
                                  Password
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
                                />
                                {errors.email && touched.email && (
                                  <p>{errors.email}</p>
                                )}
                                {errors.password && touched.password && (
                                  <p> {errors.password}</p>
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

module.exports = LoginView;
