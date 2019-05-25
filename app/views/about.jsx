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
                    by Rike (https://rike.dev) made during th #100DaysOfCode
                    challenge and is brought to you via DigitalOcean. You have
                    some questions or suggestions? Find me on Twitter
                    (@frankanka)!
                    <br />
                    <img src="../assets/images/icon_gandalf.gif" />
                    <br />
                    <p>
                      <strong>Credits</strong>
                    </p>
                    This project was made with &hearts; and some awesome
                    technologies: - Node.js - Hapi.js - MongoDB, Mongoose -
                    Fontawesome - Rest Hapi - Webpack / Babel. It could not gave
                    been made without the scraping work of Moko Sharma
                    (https://www.kaggle.com/mokosan/lord-of-the-rings-character-data)
                    and Paul Mooney
                    (https://www.kaggle.com/paultimothymooney/lord-of-the-rings-data).{" "}
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
