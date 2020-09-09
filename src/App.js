import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
//   Link
} from "react-router-dom";

// Route functions
import Home from './home/index';
import Login from './login/index';
import Signup from './signup/index';
import Profile from './user/profile';
// import GlobalStateProvider from "./store/GlobalStateProvider";

export default function App() {
  return (
      <Router>
        <div>
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}