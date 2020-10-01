import React from "react";
import './login.css'
import ReactDOM from "react-dom";
import { Redirect, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '', 
      password: '', 
      msg: null,
      readyToRedirect: false };
    this.emailHandler = this.emailHandler.bind(this);
    this.passwordHandler = this.passwordHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.submitHandlerTwo = this.submitHandlerTwo.bind(this);
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
        if (error.id === 'LOGIN_FAIL') {
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

  submitHandlerTwo = (event) => {
    event.preventDefault();

    const {email, password} = this.state;

        // Create user object
        const user = {
            email,
            password
        }

        // Attempt to sign up
        this.props.login(user);
  }
  submitHandler = (event) => {
    event.preventDefault();
      // Try POST to API
      fetch('https://api-circlespace.herokuapp.com/users/login', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
          body: JSON.stringify({
              email: this.state.email,
              password: this.state.password
          })
      // If successful, let the user know. If an error, 
      }).then( (response) => {
        response.json().then( (data) => {
          console.log(data);
        })
          if (response.status === 400) {
              ReactDOM.render(<span>Incorrect credentials. Please try again.</span>, document.getElementById('success'));
          }
          else {
            console.log("success")
            //this.props.history.push('/')
          }
      }
      ).catch(function(error) {
          console.log(error);
          ReactDOM.render(<span>Error! Please try again.</span>, document.getElementById('success'));
      });           
  }
  emailHandler = (event) => {
    this.setState({email: event.target.value});
  }
  passwordHandler = (event) => {
    this.setState({password: event.target.value})
  }
  render() {

    if (this.state.readyToRedirect) {
      return (
        <Redirect to='/' />
      );
    }
    return (
      <div className="bg">
          <div className="container">
            <img alt="CircleSpace" src='./Logo.svg' />
                <h2>Log in</h2>
                <p id="success"></p>
                <form onSubmit={this.submitHandlerTwo}>
                    <input type="text" id="email" placeholder="Email" onChange={this.emailHandler}></input>
                    <br></br>
                    <input type="password" id="password" placeholder="Password" onChange={this.passwordHandler}></input>
                    <br></br>
                    <input type="submit" value="Login"></input>
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

export default connect(mapStateToProps, { login, clearErrors })(withRouter(LoginForm));
