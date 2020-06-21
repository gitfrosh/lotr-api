import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./pages/Home";
import Documentation from "./pages/Documentation";
import About from "./pages/About";
import Account from "./pages/Account";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Header from "./components/Header";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./helpers/PrivateRoute";
function App() {



  return (
    <Router>
    <div className="App">
        <Header />
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
        <footer>
          <center>Made with &hearts; and #Hapi.js in 2019.</center>
        </footer>
    </div>
    </Router>
  );
}

export default App;
