import React from "react";

function About() {
  return (
    <div>
      <h2>About</h2>
      <p>
        The <strong>one API to rule them all</strong> is a project by{" "}
        <a href="https://rike.dev">Rike</a> made during the{" "}
        <a href="https://www.100daysofcode.com/">#100DaysOfCode challenge</a>{" "}
        and is brought to you via <a href="https://www.heroku.com/">Heroku</a>.
        You have some questions or suggestions? Find me on Twitter (
        <a href="https://twitter.com/frankanka">@frankanka</a>)!
        <br />
        <br />
        Friends, <b>Version 2</b> is here since August 2020! <br />
        We moved from Heroku to DigitalOcean, added some features and
        reimplemented a lot of backend code. You can now contribute to this Open
        Source Project on Github!{" "}
        <a href="/">Have a look into the Change Log!</a>
      </p>
      <br />
      <p>
        <h3>Credits</h3>
        This project was made with &hearts; and some awesome technologies: -{" "}
        <a href="https://nodejs.org/en/">Node.js</a> -{" "}
        <a href="https://hapijs.com/">Hapi.js</a> -{" "}
        <a href="https://www.mongodb.com/de">MongoDB</a> -{" "}
        <a href="https://mongoosejs.com/">Mongoose</a> -{" "}
        <a href="https://fontawesome.com/">Fontawesome</a> -{" "}
        <a href="https://github.com/caramelcss/caramel">Caramel</a> -{" "}
        <a href="https://www.toptal.com/designers/subtlepatterns/">
          Subtle Patterns
        </a>{" "}
        - <a href="https://resthapi.com/">Rest Hapi</a> -{" "}
        <a href="https://webpack.js.org/">Webpack</a> /{" "}
        <a href="https://babeljs.io/">Babel</a>. It could not have been made
        without the scraping work of Moko Sharma (
        <a href="(https://www.kaggle.com/mokosan/lord-of-the-rings-character-data">
          Kaggle
        </a>
        ) and Paul Mooney (
        <a href="https://www.kaggle.com/paultimothymooney/lord-of-the-rings-data">
          Kaggle
        </a>
        ) .
        <br />
        <br />
        {/* <img src="../assets/images/icon_gandalf.gif" />{" "} */}
        You would like to support this api and its infrastructure? You can do so
        by donating a coffee :) <br />
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
