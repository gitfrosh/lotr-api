"use strict";

const React = require("react");
const Layout = require("./layout.jsx");

class AboutView extends React.Component {
  render() {
    return (
      <Layout>
        <main>
          <section>
            <div className="row" style={{ marginTop: "5rem" }}>
              <div className="box col-2" />
              <div className="box col-8">
                <div className="panel dark">
                  <div className="panel-head">Documentation</div>
                  <div className="panel-body">
                    <h3>What is an API?</h3>
                    <p>
                      An API is — in short — a set of dedicated URLs that return
                      pure data responses, in most cases in JSON format —
                      meaning the responses won’t contain the kind of
                      presentational overhead that you would expect in a
                      graphical user interface like a website.{" "}
                      <em>
                        I took that great definition from{" "}
                        <a href="https://www.freecodecamp.org/news/what-is-an-api-in-english-please-b880a3214a82/">
                          this
                        </a>{" "}
                        very understandable article. Please refer to it for more
                        information!
                      </em>
                    </p>
                    <h3>
                      Which data does the "one API to rule them all" provide?
                    </h3>
                    <p>
                      {" "}
                      Well, if you don't know or neither like "The Lord of the
                      Rings", the epic masterpiece literature by J.R.R. Tolkien
                      then this API is mostly likely not for you. But if you do,
                      this massive database will provide you with information
                      about the books, the movie trilogy, many characters and
                      quotes. You are welcome to use the data in your own apps,
                      mixups and (fun) projects — like I did with creating this
                      API.
                    </p>
                    <h3>What about response formats and authentication?</h3>
                    <p>
                      The response format for all datasets is JSON. The API
                      requires an access key for most routes. You can obtain an
                      access token by signing up for an account here. All you
                      need for setting up an account is a valid email address.{" "}
                      <br />
                      You need to send the access key as a bearer token in every
                      request you make to the api. Bearer tokens must be
                      included in the Authorization header in the following
                      format: <em>
                        Authorization: Bearer your-api-key-123
                      </em>{" "} < br />
                      Access for authenticated users to all endpoints is{" "}
                      <em>limited</em> to 100 requests every 10 minutes. Be
                      fair!
                      <br />
                    </p>
                    <h3>Which routes are available?</h3>
                    All routes must be prefixed with{" "}
                    <em>https://one-api/v1/</em>. There are 4 base urls:
                    <br />
                    * /movie <br />
                    * /book
                    <br />
                    * /character
                    <br />
                    * /quote
                    <br />
                    Only the first endpoint is available without authentication.
                  </div>
                </div>
              </div>
              <div className="box col-2" />
            </div>
          </section>
        </main>
      </Layout>
    );
  }
}

module.exports = AboutView;
