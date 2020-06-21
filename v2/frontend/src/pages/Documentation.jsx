import React from 'react';

function Documentation() {

  return (
    <main>
    <section>
      <div className="row" style={{ marginTop: "5rem" }}>
        <div className="box col-2" />
        <div className="box col-8">
          <div className="panel dark">
            <div className="panel-head">Documentation</div>
            <div className="panel-body">
              <ul>
                <li>
                  <a href="#1">What is an API?</a>
                </li>
                <li>
                  <a href="#2">
                    Which data does the "one API to rule them all"
                    provide?
                  </a>
                </li>
                <li>
                  <a href="#3">
                    What about response formats and authentication?
                  </a>
                </li>
                <li>
                  <a href="#4">Which routes are available?</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="box col-2" />
      </div>
      <div className="row" id="1">
        <div className="box col-2" />
        <div className="box col-8">
          <div className="panel dark">
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
            </div>
          </div>
        </div>
        <div className="box col-2" />
      </div>
      <div className="row" id="2">
        <div className="box col-2" />
        <div className="box col-8">
          <div className="panel dark">
            <div className="panel-body">
              <h3>
                Which data does the "one API to rule them all" provide?
              </h3>
              <p>
                {" "}
                Well, if you don't know or neither like "The Lord of the
                Rings", the epic masterpiece epos by J.R.R. Tolkien then
                this API is most likely not for you. But if you do, this
                massive database will provide you with information about
                the books, the movie trilogy, many characters and quotes. You
                are welcome to use the data in your own apps, mixups and
                (fun) projects — like I did with creating this API.
              </p>
            </div>
          </div>
        </div>
        <div className="box col-2" />
      </div>
      <div className="row" id="3">
        <div className="box col-2" />
        <div className="box col-8">
          <div className="panel dark">
            <div className="panel-body">
              <h3>What about response formats and authentication?</h3>
              <p>
                The response format for all datasets is JSON. The API
                requires an access key for most routes. You can obtain an
                access token by signing up for an account{" "}
                <a href="/sign-up">here</a>. All you need for setting up
                an account is a valid email address. <br />
                You need to send the access key as a bearer token in every
                request you make to the api. Bearer tokens must be
                included in the authorization header in the following
                format:
                <div className="alert dark">
                  <em>Authorization: Bearer your-api-key-123</em>
                </div>
                (
                <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication">
                  More information on authorization headers?
                </a>
                ) Access for authenticated users to all endpoints is{" "}
                <em>limited</em> to 100 requests every 10 minutes. Be
                fair!
                <br />
              </p>
            </div>
          </div>
        </div>
        <div className="box col-2" />
      </div>
      <div className="row" id="4">
        <div className="box col-2" />
        <div className="box col-8">
          <div className="panel dark">
            <div className="panel-body">
              <h3>Which routes are available?</h3>
              All routes must be prefixed with{" "}
              <em>https://the-one-api.herokuapp.com/v1</em>. Only the <strong>/book</strong> endpoint is
              available without authentication.
              <br />
              <br />
              <table className="table">
                <thead>
                  <tr>
                    <th width="20%">Endpoint</th>
                    <th width="60%">Response</th>
                    <th width="20%">Token required</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>/book</strong>
                    </td>
                    <td>List of all "The Lord of the Rings" books</td>
                    <td>no</td>
                  </tr>
                  <tr>
                    <td>
                    /book/&#123;id&#125;
                    </td>
                    <td>Request one specific book</td>
                    <td>no</td>
                  </tr>
                  <tr>
                    <td>
                    /book/&#123;id&#125;/chapter
                    </td>
                    <td>Request all chapters of one specific book</td>
                    <td>no</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>/movie</strong>
                    </td>
                    <td>
                      List of all movies, including the "The Lord of the
                      Rings" and the "The Hobbit" trilogies
                    </td>
                    <td>yes</td>
                  </tr>
                  <tr>
                    <td>/movie/&#123;id&#125;</td>
                    <td>Request one specific movie</td>
                    <td>yes</td>
                  </tr>
                  <tr>
                    <td>/movie/&#123;id&#125;/quote</td>
                    <td>
                      Request all movie quotes for one specific movie
                      (only working for the LotR trilogy)
                    </td>
                    <td>yes</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>/character</strong>
                    </td>
                    <td>
                      List of characters including metadata like name,
                      gender, realm, race and more
                    </td>
                    <td>yes</td>
                  </tr>
                  <tr>
                    <td>/character/&#123;id&#125;</td>
                    <td>Request one specific character</td>
                    <td>yes</td>
                  </tr>
                  <tr>
                    <td>/character/&#123;id&#125;/quote</td>
                    <td>
                      Request all movie quotes of one specific character
                    </td>
                    <td>yes</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>/quote</strong>
                    </td>
                    <td>List of all movie quotes</td>
                    <td>yes</td>
                  </tr>
                  <tr>
                    <td>/quote/&#123;id&#125;</td>
                    <td>Request one specific movie quote</td>
                    <td>yes</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>/chapter</strong>
                    </td>
                    <td>List of all book chapters</td>
                    <td>yes</td>
                  </tr>
                  <tr>
                    <td>/chapter/&#123;id&#125;</td>

                    <td>Request one specific book chapter</td>
                    <td>yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="box col-2" />
      </div>
    </section>
  </main>
  );
}

export default Documentation;
