import React from "react";
import Helmet from "react-helmet";

function Home() {
  return (
    <div>
      <Helmet>
        <title>The Lord of the Rings API - The one API </title>
      </Helmet>
      <br />
      <div class="card fluid">
        <div class="section">
          <h3>What is this?</h3>
          <p>
            <em>Mellon</em>, this is the one API (
            <a href="/documentation#1">
              What the hell is an Application Programming Interface?
            </a>
            ) <em>to rule them all</em>. No really, it serves your needs
            regarding data about <b>The Lord of the Rings</b>, the epic books by
            J. R. R. Tolkien and the official movie adaptions by Peter Jackson.
          </p>
          <p>
            There are many endpoints available, but you need to{" "}
            <a href="/sign-up">sign up</a> to obtain an access key. Get a
            glimpse into the <a href="/documentation">documentation</a> to check
            out all accessable datasets.
          </p>
        </div>
      </div>
      <div class="card fluid">
        <div class="section">
          <h3>What's new?</h3>
          <p>
            <b>Version 2.0 is out!</b> (August 2020) Please update your API
            calls from{" "}
            <p>
              {" "}
              https://the-one-api.herokuapp.com/v1/
            </p>
            <p>to </p>
            <p>
              https://the-one-api.dev/v2/.
            </p>
            We moved from Heroku to DigitalOcean, added some features and
            reimplemented a lot of backend code. You can now contribute to this
            Open Source Project on Github!{" "}
            <a href="/">Have a look into the Change Log!</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
