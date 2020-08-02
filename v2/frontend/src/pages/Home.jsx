import React from "react";

function Home() {
  return (
    <div>
      <h1>The One API</h1>
      <br />
      <h3>What is this?</h3>
      <p>
        <em>Mellon</em>, this is the one API (
        <a href="/documentation#1">
          What the hell is an Application Programming Interface?
        </a>
        ) <em>to rule them all</em>. No really, it serves your needs regarding
        data about <strong>The Lord of the Rings</strong>, the epic books by J.
        R. R. Tolkien and the official movie adaptions by Peter Jackson.
      </p>
      <p>
        There are many more endpoints available, but you need to{" "}
        <a href="/sign-up">sign up</a> to obtain an access key. Get a glimpse
        into the <a href="/documentation">documentation</a> to check out all
        accessable datasets.
      </p>
      <h3>What's new?</h3>
      <p>
        <b>Version 2.0 is out!</b> (August 2020) Please update your API calls from{" "}<br />
        <em>https://the-one-api.herokuapp.com/v1/</em><br /> to{" "}<br />
        <em>https://the-one-api.dev/v2/</em>.<br /> Contributing is now possible on{" "}
        <a href="https://github.com/gitfrosh/lotr-api">Github</a>.
      </p>
    </div>
  );
}

export default Home;
