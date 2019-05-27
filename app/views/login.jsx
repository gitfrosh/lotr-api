"use strict";

const React = require("react");
const Layout = require("./layout.jsx");
var XMLHttpRequest = require('xhr2');
var xhr = new XMLHttpRequest();

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      response: {}
    };
  }

  login(e) {
    // e.preventDefault();
    var url = "http://localhost:8088/api/login";
    let status = undefined;
    fetch(url, {
      method: "POST",
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
          console.log("logged in!");
          console.log(response);
          // window.localStorage.setItem("JWT_KEY", response.token);
          window.location.href = "http://localhost:8088/account";
        } else {
          console.log(response)
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
        console.log(error)
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
                        Password:
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
                          onClick={this.login.bind(this)}
                          className="btn default dark"
                        >
                          Login
                        </button>
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
