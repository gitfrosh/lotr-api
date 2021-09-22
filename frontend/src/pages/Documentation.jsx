import React from "react";
import Helmet from "react-helmet";

function Documentation() {
  return (
    <>
      <Helmet>
        <title>The Lord of the Rings API - The one API | Documentation</title>
      </Helmet>
      <p>
        <br />
        <ul>
          <li>
            <a href="#1">What is an API?</a>
          </li>
          <li>
            <a href="#6">I'm a total newbie to REST APIs. Is there a beginner-friendly introduction?</a>
          </li>
          <li>
            <a href="#2">
              Which data does the "one API to rule them all" provide?
            </a>
          </li>
          <li>
            <a href="#3">What about response formats and authentication?</a>
          </li>
          <li>
            <a href="#4">Which routes are available?</a>
          </li>
          <li>
            <a href="#5">May I use pagination, sorting and filtering?</a>
          </li>

        </ul>
      </p>
      <br />
      <div id="1" className="card fluid">
        <div className="section">
          <h2>What is an API?</h2>
          <p>
            An API is — in short — a set of dedicated URLs that return pure data
            responses, in most cases in JSON format — meaning the responses
            won’t contain the kind of presentational overhead that you would
            expect in a graphical user interface like a website.{" "}
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
      <div id="6" className="card fluid">
        <div className="section">
          <h2>I'm a total newbie to REST APIs. Is there a beginner-friendly introduction?</h2>
          <p>
            Yes, I wrote a blog post that explains in detail how REST APIs work and why you would use 
            them at all. It also covers authentication, JSON handling and a sample React app. {' '}
            <a href="https://rike.dev/2021/05/04/rest-apis-for-absolute-beginners/">
            This is the link to the blog post
              </a> and  <a href="https://github.com/gitfrosh/lotr-api/tree/release/sample-app">
              here you will find the according code base
              </a> for the 
            sample React app.
          </p>
        </div>
      </div>
      <div id="2" className="card fluid">
        <div className="section">
          <h2>Which data does the "one API to rule them all" provide?</h2>
          <p>
            Well, if you don't know or neither like "The Lord of the Rings", the
            epic masterpiece epos by J.R.R. Tolkien, then this API is most
            likely not for you. But if you do, this massive database will
            provide you with information about the books, the movie trilogy,
            many characters and quotes. You are welcome to use the data in your
            own apps, mixups and (fun) projects — like I did with creating this
            API.
          </p>
          <p>This project is totally non-profit and fan-made!</p>
        </div>
      </div>
      <div id="3" className="card fluid">
        <div className="section">
          <h2>What about response formats and authentication?</h2>
          <p>
            The response format for all datasets is JSON. The API requires an
            access key for most routes. You can obtain an access token by
            signing up for an account <a href="/sign-up">here</a>. All you need
            for setting up an account is a valid email address.
          </p>
          <p>
            You need to send the access key as a bearer token in every request
            you make to the api. Bearer tokens must be included in the
            authorization header (
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication">
              More information on authorization headers?
            </a>
            ) in the following format:
          </p>
          <div className="card large">
            <div className="section dark">
              <p>
                <em>Authorization: Bearer your-api-key-123</em> <br />
              </p>
            </div>
          </div>
          <p>
            Access for authenticated users to all endpoints is <em>limited</em>{" "}
            to 100 requests every 10 minutes. Be fair!
          </p>
        </div>
      </div>
      <div id="4" className="card fluid">
        <div className="section">
          <h2>Which routes are available?</h2>
          <p>
            All routes must be prefixed with <b>https://the-one-api.dev/v2</b>.
            Only the /book endpoint is available without authentication.
          </p>

          <table>
            <thead>
              <tr>
                <th width="20%">Endpoint</th>
                <th width="60%">Response</th>
                <th width="20%">Token required</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Endpoint">
                  <strong>/book</strong>
                </td>
                <td data-label="Response">
                  List of all "The Lord of the Rings" books
                </td>
                <td data-label="Token required">no</td>
              </tr>
              <tr>
                <td data-label="Endpoint">/book/&#123;id&#125;</td>
                <td data-label="Response">Request one specific book</td>
                <td data-label="Token required">no</td>
              </tr>
              <tr>
                <td data-label="Endpoint">/book/&#123;id&#125;/chapter</td>
                <td data-label="Response">
                  Request all chapters of one specific book
                </td>
                <td data-label="Token required"/>
              </tr>
              <tr>
                <td data-label="Endpoint">
                  <strong>/movie</strong>
                </td>
                <td data-label="Response">
                  List of all movies, including the "The Lord of the Rings" and
                  the "The Hobbit" trilogies
                </td>
                <td data-label="Token required">yes</td>
              </tr>
              <tr>
                <td data-label="Endpoint">/movie/&#123;id&#125;</td>
                <td data-label="Response">Request one specific movie</td>
                <td data-label="Token required">yes</td>
              </tr>
              <tr>
                <td data-label="Endpoint">/movie/&#123;id&#125;/quote</td>
                <td data-label="Response">
                  Request all movie quotes for one specific movie (only working
                  for the LotR trilogy)
                </td>
                <td data-label="Token required">yes</td>
              </tr>
              <tr>
                <td>
                  <strong>/character</strong>
                </td>
                <td data-label="Response">
                  List of characters including metadata like name, gender,
                  realm, race and more
                </td>
                <td data-label="Token required">yes</td>
              </tr>
              <tr>
                <td data-label="Endpoint">/character/&#123;id&#125;</td>
                <td data-label="Response">Request one specific character</td>
                <td data-label="Token required">yes</td>
              </tr>
              <tr>
                <td data-label="Endpoint">/character/&#123;id&#125;/quote</td>
                <td data-label="Response">
                  Request all movie quotes of one specific character
                </td>
                <td data-label="Token required">yes</td>
              </tr>
              <tr>
                <td data-label="Endpoint">
                  <strong>/quote</strong>
                </td>
                <td data-label="Response">List of all movie quotes</td>
                <td data-label="Token required">yes</td>
              </tr>
              <tr>
                <td data-label="Endpoint">/quote/&#123;id&#125;</td>
                <td data-label="Response">Request one specific movie quote</td>
                <td data-label="Token required">yes</td>
              </tr>
              <tr>
                <td data-label="Endpoint">
                  <strong>/chapter</strong>
                </td>
                <td data-label="Response">List of all book chapters</td>
                <td data-label="Token required">yes</td>
              </tr>
              <tr>
                <td data-label="Endpoint">/chapter/&#123;id&#125;</td>
                <td data-label="Response">Request one specific book chapter</td>
                <td data-label="Token required">yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="5" className="card fluid">
        <div className="section">
          <h2>May I use pagination, sorting and filtering?</h2>
          <p>
            Yes, you can add pagination, sorting and filtering options to your
            API requests.
          </p>
          <br />
          <h3>Pagination</h3>
          <table className="table">
            <thead>
              <tr>
                <th width="20%">Option</th>
                <th width="60%">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>limit</strong>
                </td>
                <td>/character?limit=100</td>
              </tr>
              <tr>
                <td>
                  <strong>page</strong>
                </td>
                <td>/character?page=2 (limit default is 10)</td>
              </tr>
              <tr>
                <td>
                  <strong>offset</strong>
                </td>
                <td>/character?offset=3 (limit default is 10)</td>
              </tr>
            </tbody>
          </table>
          <h3>Sorting</h3>{" "}
          <table className="table">
            <thead>
              <tr>
                <th width="60%">Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>/character?sort=name:asc</td>
              </tr>
              <tr>
                <td>/quote?sort=character:desc</td>
              </tr>
            </tbody>
          </table>
          <h3>Filtering</h3>{" "}
          <p>
            The filtering works by casting simple url parameter expressions to
            mongodb lookup expressions and can be applied to any available key
            on the data models.
          </p>
          <table className="table">
            <thead>
              <tr>
                <th width="20%">Option</th>
                <th width="60%">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>match, negate match</strong>
                </td>
                <td>/character?name=Gandalf</td>
                <td>/character?name!=Frodo</td>
              </tr>
              <tr>
                <td>
                  <strong>include, exclude</strong>
                </td>
                <td>/character?race=Hobbit,Human</td>
                <td>/character?race!=Orc,Goblin</td>
              </tr>
              <tr>
                <td>
                  <strong>exists, doesn't exists</strong>
                </td>
                <td>/character?name</td>
                <td>/character?!name</td>
              </tr>
              <tr>
                <td>
                  <strong>regex</strong>
                </td>
                <td>/character?name=/foot/i</td>
                <td>/character?name!=/foot/i</td>
              </tr>
              <tr>
                <td>
                  <strong>less than, greater than or equal to</strong>
                </td>
                <td>
                  <p>/movie?budgetInMillions{"<"}100</p>
                  <p>/movie?academyAwardWins{">"}0</p>
                  <p>/movie?runtimeInMinutes{">="}160</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Documentation;
