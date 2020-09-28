import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
//   Link
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

// Route functions
import Home from './home/index';
import LoginForm from './login/index';
import SignupForm from './signup/index';
import Profile from './user/profile';
import PeopleSearchPage from "./search/people";
import ProjectsSearchPage from "./search/projects";
import StateTesting from "./redux-testing/index";

export default function App() {
  return (
    <Provider store={store}>
        <Router>
          <div>
            <Switch>
              <Route path="/state-test">
                <StateTesting />
              </Route>
              <Route path="/signup">
                <SignupForm />
              </Route>
              <Route path="/login">
                <LoginForm />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/people">
                <PeopleSearchPage search="Mark Zuckerberg"/>
              </Route>
              <Route path="/projects">
                <ProjectsSearchPage search="React.js"/>
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </Provider>

  );
}