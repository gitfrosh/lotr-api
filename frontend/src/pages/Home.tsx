import React from "react";
import Helmet from "react-helmet";

const Home: React.FC = () => {
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
            <em>Mellon</em>, this is <b>the one API</b> (
            <a href="/documentation#1">
              wondering what an Application Programming Interface is?
            </a>
            ) <em>to rule them all</em>, that caters to all your needs
            concerning data from <b>The Lord of the Rings</b>, the iconic books
            by J.R.R. Tolkien and their official film adaptations directed by
            Peter Jackson.
          </p>
          <p>
            The API offers numerous endpoints. To access them, please{" "}
            <a href="/sign-up">sign up</a> for an access key. We recommend
            reviewing the <a href="/documentation">documentation</a> to explore
            the extensive datasets available.
          </p>
        </div>
      </div>
      <div className="card fluid">
        <div className="section">
          <h2>What's new?</h2>
          <p>
            To explore everything happening with this project, feel free to
            visit our{" "}
            <a
              href="https://github.com/gitfrosh/lotr-api"
              rel="noopener noreferrer"
              target="_blank"
            >
              Github
            </a>{" "}
            Page. We warmly invite you to consider contributing as well.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
