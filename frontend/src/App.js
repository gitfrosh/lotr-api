import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Documentation from "./pages/Documentation";
import About from "./pages/About";
import Account from "./pages/Account";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Header from "./components/Header";
import NotFoundPage from "./pages/NotFoundPage";
import { ToastProvider } from "react-toast-notifications";
import Footer from "./components/Footer";

function App() {
  return (
    <ToastProvider autoDismiss>
      <Router>
        <div className="App">
          <div className="container">
            <div id="content-wrap">
              <Header />
              <div
                style={{
                  padding: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}
                className="row"
              >
                <div className="col-sm-12 col-md-8 col-lg-6">
                  <Switch>
                    <Route path="/login">
                      <Login />
                    </Route>
                    <Route path="/sign-up">
                      <SignUp />
                    </Route>
                    <Route path="/account">
                      <Account />
                    </Route>
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
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
