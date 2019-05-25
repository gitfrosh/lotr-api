"use strict";

const React = require("react");
const Layout = require("./layout.jsx");

class RegistrationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      response: {}
    };
  }

  signUp(e) {
    // e.preventDefault();
    var url = "http://localhost:8088/api/register";
    let status = undefined;
    fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
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
        console.log("Response:", JSON.stringify(response));
        console.log(status);
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
    console.log(this.state.response)
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
                        E-Mail address:
                        <br />
                        <input
                          required
                          onChange={this.changeEmail.bind(this)}
                          value={this.state.email}
                          type="email"
                          name="email"
                        />
                        <br />
                        Choose a password:
                        <br />
                        <input
                          required
                          onChange={this.changePassword.bind(this)}
                          value={this.state.password}
                          type="password"
                          name="password"
                        />
                        <br />
                        <button
                          onClick={this.signUp.bind(this)}
                          className="btn default dark"
                        >
                          Sign up
                        </button>
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
                      <a href="/login">login</a>{" "}
                      and grab your access token now.
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
