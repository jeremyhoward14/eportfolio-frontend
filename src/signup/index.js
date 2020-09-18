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
        this.state = {username: '', email: '', firstname: '', lastname: '', password: '', confirm_password: ''};
        this.handleFirstChange = this.handleFirstChange.bind(this);
        this.handleLastChange = this.handleLastChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
      }

    submitHandler = (event) => {
        // User password and confirmation match
        if (this.state.password === this.state.confirm_password) {
            // Try POST to API
            fetch('http://circlespace.herokuapp.com/users/signup', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    username: this.state.username,
                    email: this.state.email,
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    password: this.state.password
                })
            // If successful, let the user know. If an error, 
            }).then(function(response) {
                if (response.status === "400") {
                    event.preventDefault();
                    ReactDOM.render(<p>Email or username taken. Please try again.</p>, document.getElementById('success'));
                }
                else {
                    ReactDOM.render(<p>Registration successful.</p>, document.getElementById('success'));
                }
            }
            ).catch(function(error) {
                event.preventDefault();
                ReactDOM.render(<span>Error! Please try again.</span>, document.getElementById('success'));
            });           
        }
        // Password and confirm_password don't match
        else {
            event.preventDefault() // Don't redirect.
            ReactDOM.render(<span>Passwords didn't match! Please try again.</span>, document.getElementById('success'))
        }
        
    }

    // Value change handlers
    handleFirstChange = (e) => {
        this.setState({firstname: e.target.value});
    }
    handleLastChange = (e) => {
        this.setState({lastname: e.target.value});
    }
    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }
    handleUsernameChange = (e) => {
        this.setState({username: e.target.value});
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
                <form action='/people' onSubmit={this.submitHandler}>
                    <input type="text" id="firstname" placeholder="First name" value={this.state.firstname} onChange={this.handleFirstChange} required></input>
                    <br></br>
                    <input type="text" id="lastname" placeholder="Last name" value={this.state.lastname} onChange={this.handleLastChange} required></input>
                    <br></br>
                    <input type="text" id="email" placeholder="Email address" value={this.state.email} onChange={this.handleEmailChange} required></input>
                    <br></br>
                    <input type="text" id="username" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange} required></input>
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