import React from 'react';

function Home() {

  return (
    <main>
    <div id="intro">
      <div className="row">
        <div className="box col-2" />
        <div className="box col-8">
          <center>
            <h2>
              Welcome to <br />
              <i className="fa fa-ring" />
              <strong> the one API </strong>
              <br />
              to rule them all.
            </h2>
          </center>
        </div>
        <div className="box col-2" />
      </div>
    </div>
    <section>
      <div className="row">
        <div className="box col-2" />
        <div className="box col-8">
          <div className="panel dark">
            <div className="panel-head">Welcome"</div>
            <div className="panel-body">
              <em>Mellon</em>, this is the API (
              Your Account.
             
            </div>
          </div>
        </div>
        <div className="box col-2" />
      </div>
    </section>
    {/* <section>
      <div className="row">
        <div className="box col-2" />
        <div className="box col-8">
          <div className="panel dark">
            <div className="panel-head">
              Try it now! (maybe "/book" ?)
            </div>
            <div className="panel-body">
              <div>
                <label htmlFor="try-api">Get</label>
                <input
                  id="try-api"
                  type="text"
                  onChange={this.changeApi.bind(this)}
                  value={this.state.url}
                />
                <button
                  onClick={this.fetchBook.bind(this)}
                  className="btn default dark"
                >
                  Fetch
                </button>
              </div>
              <div
                className="alert info"
                style={{ overflowY: "scroll", height: "140px" }}
              >
                <pre>{this.state.book}</pre>
              </div>
              <div className="notice dark">
                There are many more endpoints available, but you need to{" "}
                <a href="/sign-up">sign up</a> to obtain an access key.
                Get a glimpse into the{" "}
                <a href="/documentation">documentation</a> to check out
                all accessable datasets.
              </div>
            </div>
          </div>
        </div>
        <div className="box col-2" />
      </div>
    </section> */}
  </main>
  );
}

export default Home;
