import React from "react";
import './login.css'
// import Context from "../store/context"

export default function Login() {  
    return (
      <LoginForm />
    );
  }

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
    //
  }
  submitHandler = (event) => {
    this.setState({username: event.target.value});

  }
  loginHandler = (event) => {
    this.setState({username: event.target.value});
  }
  render() {
    return (
      <div className="bg">
          <div className="container">
            <img alt="CircleSpace" src='./Logo.svg' />
                <h2>Log in</h2>
                <form action="/profile" onSubmit={this.submitHandler}>
                    <input type="text" id="username" placeholder="Email"></input>
                    <br></br>
                    <input type="text" id="password" placeholder="Password"></input>
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
