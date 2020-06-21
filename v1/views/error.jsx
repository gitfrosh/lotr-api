"use strict";

const React = require("react");
const Layout = require("./layout.jsx");

class ErrorView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <main>
          <center>
            <section>
              <div className="row" style={{ marginTop: "5rem" }}>
                <div className="box col-2" />
                <div className="box col-8">
                  <div className="panel dark">
                    <div className="panel-head">Error</div>
                    <div className="panel-body">
                      <div className="error">
                        <h2 className="emoji">&#x25D5; &#xFE35; &#x25D5;</h2>
                        <p>{this.props.errName}</p>
                        <p><strong>{this.props.statusCode}</strong></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="box col-2" />
              </div>
            </section>
          </center>
        </main>
    );
  }
}

module.exports = ErrorView;
