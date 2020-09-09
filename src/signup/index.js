import React from "react";
import "../login/login.css"
import ReactDOM from "react-dom";

export default function Signup() {
    return (
        new SignupForm()
    )
}

class SignupForm extends React.Component {
    constructor(props) {
        super(props);        
        this.state = { email: '', first: '', last: '', password: '', confirm_password: ''};
        this.handleFirstChange = this.handleFirstChange.bind(this);
        this.handleLastChange = this.handleLastChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
      }

    submitHandler = (event) => {
        if (this.state.password === this.state.confirm_password) {
            ReactDOM.render(<p>Registration successful!</p>, document.getElementById('success'))
            console.log(this.state.password);
            console.log("Submitted");
        }
        else {
            event.preventDefault() // Don't redirect.
            ReactDOM.render(<p>Passwords didn't match!</p>, document.getElementById('success'))
            console.log("Error: Passwords do not match.")
        }
        
    }

    // Value change handlers
    handleFirstChange = (e) => {
        this.setState({first: e.target.value});
    }
    handleLastChange = (e) => {
        this.setState({last: e.target.value});
    }
    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }
    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }
    handleConfirmPasswordChange = (e) => {
        this.setState({confirm_password: e.target.value});
    }

    render() {
        return (
            <div className="bg">
                <div className="container">
                <img alt="CircleSpace" src='./Logo.svg' />
                <h2>Sign up</h2>
                <p id="success">All fields required.</p>
                <form action="/profile" onSubmit={this.submitHandler}>
                    <input type="text" id="first" placeholder="First name" value={this.state.first} onChange={this.handleFirstChange} required></input>
                    <br></br>
                    <input type="text" id="last" placeholder="Last name" value={this.state.last} onChange={this.handleLastChange} required></input>
                    <br></br>
                    <input type="text" id="email" placeholder="Email address" value={this.state.email} onChange={this.handleEmailChange} required></input>
                    <br></br>
                    <input type="password" id="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} required></input>
                    <br></br>
                    <input type="password" id="password_confirm" placeholder="Confirm password" value={this.state.confirm_password} onChange={this.handleConfirmPasswordChange} required></input>
                    <br></br>
                    <input type="submit" value="Sign up"></input>
                </form>
                </div>
            </div>
        );
    }
}