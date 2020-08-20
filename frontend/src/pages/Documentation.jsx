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
        </ul>
      </p>
      <br />
      <div id="1" class="card fluid">
        <div class="section">
          <h3>What is an API?</h3>
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
      <div id="1" class="card fluid">
        <div class="section">
          <h3>Which data does the "one API to rule them all" provide?</h3>
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
      <div id="3" class="card fluid">
        <div class="section">
          <h3>What about response formats and authentication?</h3>
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
          <div class="card large">
            <div class="section dark">
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
      <div id="4" class="card fluid">
        <div class="section">
          <h3>Which routes are available?</h3>
          <p>
            All routes must be prefixed with{" "}
            <b>https://the-one-api.dev/v2</b>. Only the{" "}
            /book endpoint is available without authentication.
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
                <td  data-label="Response">List of all "The Lord of the Rings" books</td>
                <td  data-label="Token required">no</td>
              </tr>
              <tr>
                <td data-label="Endpoint">/book/&#123;id&#125;</td>
                <td data-label="Response">Request one specific book</td>
                <td data-label="Token required">no</td>
              </tr>
              <tr>
                <td data-label="Endpoint">/book/&#123;id&#125;/chapter</td>
                <td data-label="Response">Request all chapters of one specific book</td>
                <td data-label="Token required"></td>
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
                <td data-label="Response">Request all movie quotes of one specific character</td>
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
      <div class="card fluid">
        <div class="section">
          <h3>May I use pagination, sorting and filtering?</h3>
          <p>
            Yes, you can add pagination and sorting options to your API
            requests. Filtering is not available though.
          </p>
          <br />
          <h4>Pagination</h4>
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
                <td>/characters?limit=100</td>
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
          <h4>Sorting</h4>{" "}
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
        </div>
      </div>
    </>
  );
}

export default Documentation;
