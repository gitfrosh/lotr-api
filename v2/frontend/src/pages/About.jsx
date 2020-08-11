import React from "react";

function About() {
  return (
    <div>
      <h2>About</h2>
      <p>
        The <strong>one API to rule them all</strong> is a project by{" "}
        <a href="https://rike.dev">Rike</a> started during the{" "}
        <a href="https://www.100daysofcode.com/">#100DaysOfCode challenge</a>{" "}
        and is brought to you via{" "}
        <a href="https://www.digitalocean.com/">DigitalOcean</a>. You have some
        questions or suggestions? Find me on Twitter (
        <a href="https://twitter.com/frankanka">@frankanka</a>)!
      </p>
      <br />
      <p>
        <h3>Credits</h3>
        This project was made with &hearts; and some awesome technologies: -{" "}
        <a href="https://nodejs.org/en/">Node.js</a> -{" "}
        <a href="https://expressjs.com/">Express.js</a> -{" "}
        <a href="https://www.mongodb.com/de">MongoDB</a> -{" "}
        <a href="https://mongoosejs.com/">Mongoose</a> -{" "}
        <a href="https://fontawesome.com/">Fontawesome</a> -{" "}
        <a href="https://minicss.org/">Mini CSS</a> and more.
        <br /> <br />
        It could not have been made without the scraping work of Moko Sharma (
        <a href="(https://www.kaggle.com/mokosan/lord-of-the-rings-character-data">
          Kaggle
        </a>
        ) and Paul Mooney (
        <a href="https://www.kaggle.com/paultimothymooney/lord-of-the-rings-data">
          Kaggle
        </a>
        ) .
      </p>
      <br />

      <p>

      <h3>Mashups</h3>
        Have a look into some great projects based on this API. You would like
        to get listed? <a href="mailto:hello@rike.dev">Drop me a line.</a>
      </p>
      <br />

      <p>

      <h3>Support</h3>
        {/* <img src="../assets/images/icon_gandalf.gif" />{" "} */}
        You would like to support this API and its infrastructure? You can do so
        by contributing to its code base or by donating a coffee :) <br />
        <br />
        <a href="https://www.buymeacoffee.com/SqYKLmJ7Z" target="_blank">
          <img
            src="https://www.buymeacoffee.com/assets/img/custom_images/white_img.png"
            alt="Buy Me A Coffee"
          />
        </a>
      </p>
    </div>
  );
}

export default About;
