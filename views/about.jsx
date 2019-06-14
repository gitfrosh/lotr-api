"use strict";

const React = require("react");
const Layout = require("./layout.jsx");

class AboutView extends React.Component {
  render() {
    return (
      <Layout title="About Page">
        <main>
          <section>
            <div className="row" style={{ marginTop: "5rem" }}>
              <div className="box col-2" />
              <div className="box col-8">
                <div className="panel dark">
                  <div className="panel-head">About</div>
                  <div className="panel-body">
                    {" "}
                    The <strong>one API to rule them all</strong> is a project
                    by <a href="https://rike.dev">Rike</a> made during the{" "}
                    <a href="https://www.100daysofcode.com/">
                      #100DaysOfCode challenge
                    </a>{" "}
                    and is brought to you via{" "}
                    <a href="https://www.heroku.com/">Heroku</a>. You have some
                    questions or suggestions? Find me on Twitter (
                    <a href="https://twitter.com/frankanka">@frankanka</a>)!
                    <br />
                    <br />
                    <p>
                      <strong>Credits</strong>
                    </p>
                    This project was made with &hearts; and some awesome
                    technologies: - <a href="https://nodejs.org/en/">Node.js</a>{" "}
                    - <a href="https://hapijs.com/">Hapi.js</a> -{" "}
                    <a href="https://www.mongodb.com/de">MongoDB</a> -{" "}
                    <a href="https://mongoosejs.com/">Mongoose</a> -{" "}
                    <a href="https://fontawesome.com/">Fontawesome</a> -{" "}
                    <a href="https://github.com/caramelcss/caramel">Caramel</a>{" "}
                    -{" "}
                    <a href="https://www.toptal.com/designers/subtlepatterns/">
                      Subtle Patterns
                    </a>{" "}
                    - <a href="https://resthapi.com/">Rest Hapi</a> -{" "}
                    <a href="https://webpack.js.org/">Webpack</a> /{" "}
                    <a href="https://babeljs.io/">Babel</a>. It could not have
                    been made without the scraping work of Moko Sharma (
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
                    You would like to support this api? You can do so by
                    donating a coffee :) <br />
                    <a
                      href="https://www.buymeacoffee.com/SqYKLmJ7Z"
                      target="_blank"
                    >
                      <img
                        src="https://www.buymeacoffee.com/assets/img/custom_images/white_img.png"
                        alt="Buy Me A Coffee"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="box col-2" />
            </div>
          </section>
        </main>
      </Layout>
    );
  }
}

module.exports = AboutView;
