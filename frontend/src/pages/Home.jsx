import React from "react";
import Helmet from "react-helmet";

function Home() {
  return (
    <div>
      <Helmet>
        <title>The Lord of the Rings API - The one API </title>
      </Helmet>
      <br />
      <div className="card fluid">
        <div className="section">
          <h2>What is this?</h2>
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
            out all accessible datasets.
          </p>
        </div>
      </div>
      <div className="card fluid">
        <div className="section">
          <h2>What's new?</h2>
          <p>
            <b>Version 2.0 is out!</b> (August 2020) Please update your API
            calls from{" "}
            <br/>
              {" "}
              &raquo; https://the-one-api.herokuapp.com/v1/
            <br/>
            to 
            <br />
            &raquo; https://the-one-api.dev/v2/.
            <br/><br />
            We moved from Heroku to DigitalOcean, added some features and
            reimplemented a lot of backend code. You can now contribute to this
            Open Source Project on <a href="https://github.com/gitfrosh/lotr-api" rel="noopener noreferrer" target="_blank">Github</a>!{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
