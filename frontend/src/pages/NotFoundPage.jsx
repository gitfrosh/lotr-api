import React from "react";
import Helmet from "react-helmet";

function NotFoundPage() {
  return (
    <main>
      <Helmet>
        <title>The Lord of the Rings API - The one API | 404 </title>
      </Helmet>
      <div id="intro">
        <div className="row">
          <div className="box col-2" />
          <div className="box col-8">
            <center>
              <h2>Sorry, this is a 404.</h2>
            </center>
          </div>
          <div className="box col-2" />
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
