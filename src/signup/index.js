import React from "react";
import "../login/login.css"
import ReactDOM from "react-dom";
import {Redirect, withRouter} from "react-router-dom";

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signup } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);        
        this.state = {
            username: '', 
            email: '', 
            firstname: '', 
            lastname: '', 
            password: '', 
            confirm_password: '',
            msg: null,
            readyToRedirect: false
        };
        this.handleFirstChange = this.handleFirstChange.bind(this);
        this.handleLastChange = this.handleLastChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.submitHandlerTwo = this.submitHandlerTwo.bind(this);
      }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        signup: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            if (error.id === 'REGISTER_FAIL') {
                this.setState({msg: error.msg.msg})
            }
            else {
                this.setState({
                    msg: null
                });
            }
        }

        if (isAuthenticated) {
            this.props.clearErrors();
            this.setState({readyToRedirect: true});
        }

    }
    
    submitHandlerTwo = event => {
        event.preventDefault();

        const {firstname, lastname, username, email, password} = this.state;

        // Create user object
        const newUser = {
            firstname,
            lastname,
            username,
            email,
            password
        }

        // Attempt to sign up
        this.props.signup(newUser);
    }

    submitHandler = (event) => {
        event.preventDefault();
        // User password and confirmation match
        if (this.state.password === this.state.confirm_password) {
            // Try POST to API
            fetch('https://api-circlespace.herokuapp.com/users/signup', {
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
            }).then( (response) => {
                if (response.status === "400") {
                    event.preventDefault();
                    ReactDOM.render(<p>Email or username taken. Please try again.</p>, document.getElementById('success'));
                }
                else {
                    ReactDOM.render(<p>Registration successful.</p>, document.getElementById('success'));
                    this.props.history.push('/')
                }
            }
            ).catch( (error) => {
                console.log(error);
                ReactDOM.render(<span>Error! Please contact us for help.</span>, document.getElementById('success'));
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
        if (this.state.readyToRedirect) {
            return (
                <Redirect to="/" />
            )
        }
        return (
            <div className="bg">
                <div className="container">
                <img alt="CircleSpace" src='./Logo.svg' />
                <h2>Sign up</h2>
                <p id="success">All fields required.</p>
                <div>
                    {this.state.msg ? ( <p>{this.state.msg}</p> ) : null}
                </div>
                <form onSubmit={this.submitHandlerTwo}>
                    <input type="text" id="firstname" placeholder="First name" value={this.state.firstname} onChange={this.handleFirstChange}></input>
                    <br></br>
                    <input type="text" id="lastname" placeholder="Last name" value={this.state.lastname} onChange={this.handleLastChange}></input>
                    <br></br>
                    <input type="text" id="email" placeholder="Email address" value={this.state.email} onChange={this.handleEmailChange}></input>
                    <br></br>
                    <input type="text" id="username" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange}></input>
                    <br></br>
                    <input type="password" id="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}></input>
                    <br></br>
                    <input type="password" id="password_confirm" placeholder="Confirm password" value={this.state.confirm_password} onChange={this.handleConfirmPasswordChange}></input>
                    <br></br>
                    <input type="submit" value="Sign up"></input>
                </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { signup, clearErrors })(withRouter(SignupForm));