import React from "react";
import './login.css'
import ReactDOM from "react-dom";
// import Context from "../store/context"

export default function Login() {  
    return (
      <LoginForm />
    );
  }

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.emailHandler = this.emailHandler.bind(this);
    this.passwordHandler = this.passwordHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  submitHandler = (event) => {
    event.preventDefault();
      // Try POST to API
      fetch('http://circlespace.herokuapp.com/users/login', {
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
      }).then(function(response) {
        console.log(response.status);
          if (response.status === 400) {
              event.preventDefault();
              ReactDOM.render(<span>Incorrect credentials. Please try again.</span>, document.getElementById('success'));
          }
      }
      ).catch(function(error) {
          event.preventDefault();
          console.log(error);
          ReactDOM.render(<span>Error! Please try again.</span>, document.getElementById('success'));
      });           
  }
  emailHandler = (event) => {
    this.setState({username: event.target.value});
  }
  passwordHandler = (event) => {
    this.setState({password: event.target.value})
  }
  render() {
    return (
      <div className="bg">
          <div className="container">
            <img alt="CircleSpace" src='./Logo.svg' />
                <h2>Log in</h2>
                <p id="success"></p>
                <form action="/people" onSubmit={this.submitHandler}>
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

// Login Function with global state hooks using the Context API from ./store . Doesn't work atm.

// export default function Login() {  
//   const { globalState, globalDispatch } = useContext(Context);
//   const onLogin = () => {
//     globalDispatch({type: "LOGIN"})
//   }
//   const onLoggedIn = () => {
//     globalDispatch({type: "LOGOUT"})
//   }
//   return (
//     <div className="bg">
//         <div className="container">
//           <img alt="CircleSpace" src='./Logo.svg' />
//           {globalState.isLoggedIn ? (
//             <div>
//               <h2>Logged in.</h2>
//               <form action="/login">
//                 <input type="submit" value="Continue?" onClick={onLoggedIn
//               }></input>
//               </form>
//               <button onClick={onLoggedIn
//               }>Logout</button>
//             </div>
//           ) : (
//             <div>
//               <h2>Log in</h2>
//               <form action="/login">
//                   <input type="text" id="username" placeholder="Email"></input>
//                   <br></br>
//                   <input type="text" id="password" placeholder="Password"></input>
//                   <br></br>
//                   <input type="submit" value="Login" onClick={onLogin
//               }></input>
//               </form>
//               <button onClick={onLogin}>Login</button>
//             </div>
//           )
//           }
//       </div>
//     </div>
//   );
// }
