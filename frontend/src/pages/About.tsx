import React from "react";
import Helmet from "react-helmet";
import logo from "../assets/github.png";
import coffee from "../assets/buymeacoffee.jpg";

const About: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>The Lord of the Rings API - The one API | About</title>
      </Helmet>
      <p>
        <br />
        The <strong>one API to rule them all</strong> is a non-commercial,
        open-source project maintained by{" "}
        <a href="https://rike.dev" rel="noopener noreferrer" target="_blank">
          Rike
        </a>{" "}
        and{" "}
        <a
          href="https://github.com/MateuszKikmunter"
          rel="noopener noreferrer"
          target="_blank"
        >
          Mateusz
        </a>
        , which has been around since 2019. If you have any quick questions or
        suggestions, feel free to reach out to Rike on X (
        <a
          href="https://twitter.com/rikecodes"
          rel="noopener noreferrer"
          target="_blank"
        >
          @rikecodes
        </a>
        )!
      </p>
      <br />
      <div className="card fluid">
        <div className="section">
          <h2>Support</h2>
          <p>
            You would like to support this API and its infrastructure? You can
            do so by contributing to its code base or by donating a coffee :){" "}
            <br />
            <br />
            <a href="https://github.com/gitfrosh/lotr-api">
              <img src={logo} alt="Github Repo" />
            </a>{" "}
            <a
              href="https://www.buymeacoffee.com/SqYKLmJ7Z"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={coffee} alt="Buy Me A Coffee" />
            </a>
          </p>
        </div>
      </div>
      <div className="card fluid">
        <div className="section">
          <h2>Credits</h2>
          <p>
            This project was made with &hearts; and some awesome technologies: -{" "}
            <a
              href="https://reactjs.org/"
              rel="noopener noreferrer"
              target="_blank"
            >
              React
            </a>{" "}
            -{" "}
            <a
              href="https://nodejs.org/en/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Node.js
            </a>{" "}
            -{" "}
            <a
              href="https://expressjs.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Express.js
            </a>{" "}
            -{" "}
            <a
              href="https://azure.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Azure
            </a>{" "}
            -{" "}
            <a
              href="https://www.mongodb.com/de"
              rel="noopener noreferrer"
              target="_blank"
            >
              MongoDB
            </a>{" "}
            -{" "}
            <a
              href="https://mongoosejs.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Mongoose
            </a>{" "}
            -{" "}
            <a
              href="https://fontawesome.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Fontawesome
            </a>{" "}
            -{" "}
            <a
              href="https://minicss.org/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Mini CSS
            </a>{" "}
            and more.
            <br /> <br />
            This project would not have been possible without the invaluable
            scraping contributions of Moko Sharma (
            <a
              href="https://www.kaggle.com/mokosan/lord-of-the-rings-character-data"
              rel="noopener noreferrer"
              target="_blank"
            >
              Kaggle
            </a>
            ) and Paul Mooney (
            <a
              href="https://www.kaggle.com/paultimothymooney/lord-of-the-rings-data"
              rel="noopener noreferrer"
              target="_blank"
            >
              Kaggle
            </a>
            ).
          </p>
        </div>
      </div>
      <div className="card fluid">
        <div className="section">
          <h2>Mashups</h2>
          <p>
            Have a look into some great projects based on this API. You would
            like to get listed?{" "}
            <a href="mailto:hello@rike.dev">Drop Rike a line.</a>
          </p>

          <ul>
            <li>
              Gaetano wrote a comprehensive documentation for Postman REST
              client. |{" "}
              <a
                href="https://documenter.getpostman.com/view/8886024/2s7ZLhpXAw"
                rel="noopener noreferrer"
                target="_blank"
              >
                Link
              </a>
            </li>
            <li>
              Alex built a Twitter bot that retweets random LotR quotes. |{" "}
              <a
                href="https://twitter.com/lotr_daily"
                rel="noopener noreferrer"
                target="_blank"
              >
                Link
              </a>
              ,{" "}
              <a
                href="https://github.com/alexneocoding/dailyquote"
                rel="noopener noreferrer"
                target="_blank"
              >
                Github
              </a>
            </li>

            <li>
              Victor created a virtual catalogue from all the available LotR
              characters. |{" "}
              <a
                href="https://lotr-characters.vercel.app/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Link
              </a>
              ,{" "}
              <a
                href="https://github.com/VictorLira-DEV/lotr-characters"
                rel="noopener noreferrer"
                target="_blank"
              >
                Github
              </a>
            </li>
            <li>
              Aline made some very interesting statistics based on the API's
              data |{" "}
              <a
                href="https://alinedebenath.github.io/API_project.html"
                rel="noopener noreferrer"
                target="_blank"
              >
                Link
              </a>
            </li>
            <li>
              Get a random LotR movie trilogy quote from this npm package |{" "}
              <a
                href="https://www.npmjs.com/package/random-lotr-movie-quote"
                rel="noopener noreferrer"
                target="_blank"
              >
                Link
              </a>
            </li>
            <li>
              Matthew built a CFML wrapper for the API |{" "}
              <a
                href="https://github.com/mjclemente/lotrcfc"
                rel="noopener noreferrer"
                target="_blank"
              >
                Link
              </a>
            </li>
            <li>
              Sam gathered the API movie quotes data for some sentiment analysis
              |{" "}
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://community.storytellingwithdata.com/challenges/52e943ac-9468-4b4e-a8d8-14eadd6a3394/7abe32ad-ad9a-422f-8c9b-3167298c794c"
              >
                Link
              </a>
            </li>
            <li>
              Moritz implemented a Dart package which developers can use to
              interact with The One Api in their Flutter apps |{" "}
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://pub.dev/packages/lotr_api"
              >
                pub.dev
              </a>
              ,{" "}
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://github.com/finkmoritz/lotr_api"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
