import React from "react";
import Helmet from "react-helmet";

const textCenter = {
    'textAlign': 'center'
};

function NotFoundPage() {
  return (
    <main>
      <Helmet>
        <title>The Lord of the Rings API - The one API | 404 </title>
      </Helmet>
      <div id="intro">
        <div style={textCenter}>
            <h2>Sorry, this is a 404.</h2>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
