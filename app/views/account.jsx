"use strict";

const React = require("react");
const Layout = require("./layout.jsx");

class AccountView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    var url = "http://localhost:8088/api/get-user";
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
                    <div className="panel-body">
                      <p>
                        <strong>Welcome!</strong>
                      </p>
                      Your e-mail address: {this.state.user.email} <br />
                      You have signed up for an access token. Your access token:
                      <div className="alert dark">{this.state.user.access_token}</div>
                    </div>
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
