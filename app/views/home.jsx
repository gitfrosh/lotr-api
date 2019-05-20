"use strict";

const React = require("react");
const Layout = require("./layout.jsx");
const fetch = require("isomorphic-unfetch");

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quote: "fdsff" };
  }

  fetchQuote() {
    const that = this;
    alert("Hi " + this.props.foo);
    console.log("fetch");
    fetch("http://localhost:8088/quote/5cd96e05de30eff6ebcce7e9")
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(JSON.stringify(myJson));
        that.setState({
          quote: myJson.dialog
        });
      });
  }

  handleClick() {
    alert("Hi " + this.props.foo);
  }

  componentWillMount() {
    console.log("did mount!", this.props.foo);
    // console.log(window)
    // let response = await fetch(
    //   `http://localhost:8080/quote/5cd96e05de30eff6ebcce7e9`
    // );
    // let data = await response.json();
    // this.setState({
    //   quote: data
    // });
  }

  render() {
    return (
      <Layout title="Home">
        <section id="banner">
          <div className="inner">
            <header>
              <h2>The LOTR API</h2>
            </header>
            <p>
              Get <strong>quotes</strong>, <strong>characters</strong>,<br />
              <strong>book</strong> and <strong>movie</strong> data from <br />{" "}
              the one api <a href="/documentation">to rule them all</a>.
              {/* {this.state.quote}
              <br />
              by <a href="http://html5up.net">HTML5 UP</a>. */}
            </p>
            <footer>
              <ul className="buttons stacked">
                <li>
                  <a href="#main" className="button fit scrolly">
                    Tell Me More
                  </a>
                </li>
              </ul>
            </footer>
          </div>
        </section>
        <article id="main">
          <header className="special container">
            {/* <span className="icon fa fa-ring" /> */}
            <h2>What is this?</h2>
            <div>
              {/* <button onClick={this.fetchQuote.bind(this)}>Event test</button> */}
            </div>
            <p>
              What you see is the <strong>the one API to rule them all</strong>,
              a <strong>The Lord of the Rings</strong> API that holds quite a
              lot data about the books by J. R. R. Tolkien and their film
              adaptions by Peter Jackson. <a href="/documentation">What is an API?</a>
            </p>
          </header>

          <section className="wrapper style2 container special-alt">
            <div className="row gtr-50">
              <div className="col-8 col-12-narrower">
                <header>
                  <h2>
                    Try <strong>now</strong>!.
                  </h2>
                </header>
                <p>
                  All endpoints must begin with{" "}
                  <strong>https://the-one-api</strong> followed by the wished
                  endpoint. The <strong>/movie</strong> endpoint is the only one
                  that is accessible without key token.
                </p>
                <footer>
                  <ul className="buttons">
                    <li>
                      <a href="#" className="button">
                        Find Out More
                      </a>
                    </li>
                  </ul>
                </footer>
              </div>
              {/* <div className="col-4 col-12-narrower imp-narrower">
                <ul className="featured-icons">
                  <li>
                    <span className="icon fa-clock-o">
                      <span className="label">Feature 1</span>
                    </span>
                  </li>
                  <li>
                    <span className="icon fa-volume-up">
                      <span className="label">Feature 2</span>
                    </span>
                  </li>
                  <li>
                    <span className="icon fa-laptop">
                      <span className="label">Feature 3</span>
                    </span>
                  </li>
                  <li>
                    <span className="icon fa-inbox">
                      <span className="label">Feature 4</span>
                    </span>
                  </li>
                  <li>
                    <span className="icon fa-lock">
                      <span className="label">Feature 5</span>
                    </span>
                  </li>
                  <li>
                    <span className="icon fa-cog">
                      <span className="label">Feature 6</span>
                    </span>
                  </li>
                </ul>
              </div> */}
            </div>
          </section>

          <section className="wrapper style1 container special">
            <div className="row">
              <div className="col-4 col-12-narrower">
                <section>
                  <span className="icon featured fa-check" />
                  <header>
                    <h3>This is Something</h3>
                  </header>
                  <p>
                    Sed tristique purus vitae volutpat ultrices. Aliquam eu elit
                    eget arcu commodo suscipit dolor nec nibh. Proin a
                    ullamcorper elit, et sagittis turpis. Integer ut fermentum.
                  </p>
                </section>
              </div>
              <div className="col-4 col-12-narrower">
                <section>
                  <span className="icon featured fa-check" />
                  <header>
                    <h3>Also Something</h3>
                  </header>
                  <p>
                    Sed tristique purus vitae volutpat ultrices. Aliquam eu elit
                    eget arcu commodo suscipit dolor nec nibh. Proin a
                    ullamcorper elit, et sagittis turpis. Integer ut fermentum.
                  </p>
                </section>
              </div>
              <div className="col-4 col-12-narrower">
                <section>
                  <span className="icon featured fa-check" />
                  <header>
                    <h3>Probably Something</h3>
                  </header>
                  <p>
                    Sed tristique purus vitae volutpat ultrices. Aliquam eu elit
                    eget arcu commodo suscipit dolor nec nibh. Proin a
                    ullamcorper elit, et sagittis turpis. Integer ut fermentum.
                  </p>
                </section>
              </div>
            </div>
          </section>

          <section className="wrapper style3 container special">
            <header className="major">
              <h2>
                Next look at this <strong>cool stuff</strong>
              </h2>
            </header>

            <div className="row">
              <div className="col-6 col-12-narrower">
                <section>
                  <a href="#" className="image featured">
                    <img src="assets/images/pic01.jpg" alt="" />
                  </a>
                  <header>
                    <h3>A Really Fast Train</h3>
                  </header>
                  <p>
                    Sed tristique purus vitae volutpat commodo suscipit amet sed
                    nibh. Proin a ullamcorper sed blandit. Sed tristique purus
                    vitae volutpat commodo suscipit ullamcorper sed blandit
                    lorem ipsum dolore.
                  </p>
                </section>
              </div>
              <div className="col-6 col-12-narrower">
                <section>
                  <a href="#" className="image featured">
                    <img src="assets/images/pic02.jpg" alt="" />
                  </a>
                  <header>
                    <h3>An Airport Terminal</h3>
                  </header>
                  <p>
                    Sed tristique purus vitae volutpat commodo suscipit amet sed
                    nibh. Proin a ullamcorper sed blandit. Sed tristique purus
                    vitae volutpat commodo suscipit ullamcorper sed blandit
                    lorem ipsum dolore.
                  </p>
                </section>
              </div>
            </div>
            <div className="row">
              <div className="col-6 col-12-narrower">
                <section>
                  <a href="#" className="image featured">
                    <img src="assets/images/pic03.jpg" alt="" />
                  </a>
                  <header>
                    <h3>Hyperspace Travel</h3>
                  </header>
                  <p>
                    Sed tristique purus vitae volutpat commodo suscipit amet sed
                    nibh. Proin a ullamcorper sed blandit. Sed tristique purus
                    vitae volutpat commodo suscipit ullamcorper sed blandit
                    lorem ipsum dolore.
                  </p>
                </section>
              </div>
              <div className="col-6 col-12-narrower">
                <section>
                  <a href="#" className="image featured">
                    <img src="assets/images/pic04.jpg" alt="" />
                  </a>
                  <header>
                    <h3>And Another Train</h3>
                  </header>
                  <p>
                    Sed tristique purus vitae volutpat commodo suscipit amet sed
                    nibh. Proin a ullamcorper sed blandit. Sed tristique purus
                    vitae volutpat commodo suscipit ullamcorper sed blandit
                    lorem ipsum dolore.
                  </p>
                </section>
              </div>
            </div>

            <footer className="major">
              <ul className="buttons">
                <li>
                  <a href="#" className="button">
                    See More
                  </a>
                </li>
              </ul>
            </footer>
          </section>
        </article>
        <section id="cta">
          <header>
            <h2>
              Ready to do <strong>something</strong>?
            </h2>
            <p>
              Proin a ullamcorper elit, et sagittis turpis integer ut fermentum.
            </p>
          </header>
          <footer>
            <ul className="buttons">
              <li>
                <a href="#" className="button primary">
                  Take My Money
                </a>
              </li>
              <li>
                <a href="#" className="button">
                  LOL Wut
                </a>
              </li>
            </ul>
          </footer>
        </section>
      </Layout>
    );
  }
}

module.exports = View;
