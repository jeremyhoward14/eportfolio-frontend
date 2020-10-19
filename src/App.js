import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
//   Link
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
// Route functions
import Home from './home/index';
import LoginForm from './login/index';
import SignupForm from './signup/index';
import ProfilePage from './user/profile';
import PeopleSearchPage from "./search/people";
import ProjectsSearchPage from "./search/projects";
import StateTest from "./redux-testing/index";

class App extends React.Component {
  componentDidMount() {
    console.log("Mounting App.js")
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
          <Router>
            <div>
              <Switch>
                <Route path="/state-test">
                  <StateTest />
                </Route>
                <Route path="/signup">
                  <SignupForm />
                </Route>
                <Route path="/login">
                  <LoginForm />
                </Route>
                <Route path="/profile/:userid" render={(props) => <ProfilePage {...props} /> }>
                {/* // component={ProfilePage}> */}
                  {/* <Profile /> */}
                </Route>
                <Route path="/people" render={(props) => <PeopleSearchPage {...props} /> }>
                  {/* <PeopleSearchPage search="Mark Zuckerberg"/> */}
                </Route>
                <Route path="/projects" render={(props) => <ProjectsSearchPage {...props} />}>
                  {/* <ProjectsSearchPage search="React.js"/> */}
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
}

export default App;
