import React from "react";
import "../login/login.css"
// import ReactDOM from "react-dom";

export default function Signup() {
    return (
        new SignupForm()
    )
}

class SignupForm extends React.Component {
    constructor(props) {
        super(props);        
        this.state = { username: '', email: '', first: '', last: ''};
      }

    submitHandler = (event) => {
        event.preventDefault();

    }

    render() {
        return (
            <div className="container">
              <img alt="CircleSpace" src='./Logo.svg' />
              <h2>Sign up</h2>
              <form onSubmit={this.submitHandler}>
                  <input type="text" id="first" placeholder="First name"></input>
                  <br></br>
                  <input type="text" id="last" placeholder="Last name"></input>
                  <br></br>
                  <input type="text" id="email" placeholder="Email address"></input>
                  <br></br>
                  <input type="text" id="user" placeholder="Username"></input>
                  <br></br>
                  <input type="text" id="pass" placeholder="Password"></input>
                  <br></br>
                  <input type="submit" value="Sign up"></input>
              </form>
            </div>
        );
    }
}

// ReactDOM.render(<SignupForm />, document.getElementById('root'));
