import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Documentation from "./pages/Documentation";
import About from "./pages/About";
import Account from "./pages/Account";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Header from "./components/Header";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./helpers/PrivateRoute";
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <ToastProvider
      autoDismiss
    >
      <Router>
        <div className="App">
          <div class="container">
            <div id="content-wrap">
              <Header />
              <div class="row">
                <div class="col-sm-12 col-md-2 col-lg-3"></div>
                <div class="col-sm-12 col-md-8 col-lg-6">
                  <Switch>
                    <Route path="/login">
                      <Login />
                    </Route>
                    <Route path="/sign-up">
                      <SignUp />
                    </Route>
                    <PrivateRoute path="/account">
                      <Account />
                    </PrivateRoute>
                    <Route path="/about">
                      <About />
                    </Route>
                    <Route path="/documentation">
                      <Documentation />
                    </Route>
                    <Route path="/">
                      <Home />
                    </Route>
                    <Route path="" component={NotFoundPage} />
                  </Switch>
                </div>
                <div class="col-sm-12 col-md-2 col-lg-3"></div>
              </div>
            </div>
            <footer>
              <p>
                <em>
                  {" "}
                  All we have to decide is what to do with the time that is
                  given to us.
                </em>{" "}
                Built with &hearts; in 2020 <br />
              </p>
            </footer>
          </div>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
