"use strict";

const React = require("react");
const Layout = require("./layout.jsx");

class AccountView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
  }

  componentDidMount() {
    var url = process.env.APP_ENV === "prod" ? process.env.APP_URL : "" + "/v1/get-user";
    let status = undefined;
    fetch(url, {
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        this.setState({
          user: response.decodedToken.user
        });
        return;
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let content = "";
    if (!this.state.user) {
      content = (
        <div>
          <p>
            <strong>401</strong>
          </p>
          Unauthorized. Please login or register.
        </div>
      );
    } else {
      content = (
        <div>
          <p>
            <strong>Welcome!</strong>
          </p>
          Your e-mail address: {this.state.user.email} <br />
          You have signed up for an access token. Your access token:
          <div className="alert dark">{this.state.user.access_token}</div>
        </div>
      );
    }
    return (
      <Layout>
        <main>
          <center>
            <section>
              <div className="row" style={{ marginTop: "5rem" }}>
                <div className="box col-2" />
                <div className="box col-8">
                  <div className="panel dark">
                    <div className="panel-head">Account settings</div>
                    <div className="panel-body">{content} </div>
                  </div>
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

module.exports = AccountView;
