import React from "react";
import Helmet from "react-helmet";
import logo from '../assets/github.png'; // Tell webpack this JS file uses this image

function About() {
  return (
    <div>
      <Helmet>
        <title>The Lord of the Rings API - The one API | About</title>
      </Helmet>
      <p>
        <br />
        The <strong>one API to rule them all</strong> is a project by{" "}
        <a href="https://rike.dev" rel="noopener noreferrer" target="_blank">
          Rike
        </a>{" "}
        started during the{" "}
        <a
          href="https://www.100daysofcode.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          #100DaysOfCode challenge
        </a>{" "}
        and is brought to you via{" "}
        <a
          href="https://www.digitalocean.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          DigitalOcean
        </a>
        . You have some questions or suggestions? Find me on Twitter (
        <a
          href="https://twitter.com/frankanka"
          rel="noopener noreferrer"
          target="_blank"
        >
          @frankanka
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
            <br /><br />
            <a href="https://github.com/gitfrosh/lotr-api"><img src={logo} alt="Github Repo" /></a>
            {" "}
            <a
              href="https://www.buymeacoffee.com/SqYKLmJ7Z"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                src="https://www.buymeacoffee.com/assets/img/custom_images/white_img.png"
                alt="Buy Me A Coffee"
              />
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
            It could not have been made without the scraping work of Moko Sharma
            (
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
            ) .
          </p>
        </div>
      </div>
      <div className="card fluid">
        <div className="section">
          <h2>Mashups</h2>
          <p>
            Have a look into some great projects based on this API. You would
            like to get listed?{" "}
            
            <a href="mailto:hello@rike.dev">Drop me a line.</a>
            </p>

            <ul>
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
            </ul>
        </div>
      </div>

    </div>
  );
}

export default About;
