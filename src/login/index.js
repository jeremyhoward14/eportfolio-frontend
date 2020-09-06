import React from "react";
import ReactDOM from "react-dom";
import './login.css'

export default function Login() {  
    return (
      new LoginForm()
    );
  }
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }
  submitHandler = (event) => {
    event.preventDefault();
    ReactDOM.render(<p>Logged in</p>, document.getElementById('logstate'));
  }
  loginHandler = (event) => {
    this.setState({username: event.target.value});
  }
  render() {
    return (
        <div className="container">
          <img alt="CircleSpace" src='./Logo.svg' />
          <h2>Log in</h2>
          <p id="logstate">Not logged in. Click Login to change this to 'Logged in'.</p>
          <form onSubmit={this.submitHandler}>
              <input type="text" id="user" placeholder="Username/Email"></input>
              <br></br>
              <input type="text" id="pass" placeholder="Password"></input>
              <br></br>
              <input type="submit" value="Login"></input>
          </form>
        </div>
    );
  }
}

ReactDOM.render(<LoginForm />, document.getElementById('root'));