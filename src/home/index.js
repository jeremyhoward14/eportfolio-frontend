import React from "react";
import "./index.css";
import NavBar from '../common/navbar.js';
import Centre from '../home/centre.js';
import About from '../home/about.js';
// Route functions

export default class Home extends React.Component {
  render() {
    return (
      <div className="homeBody">
      <NavBar isHome='true' />
      <Centre />
      <About />
    </div>
    )
  }
}

// export default function Home() {
//   return (
//     <div className="homeBody">
//       <NavBar isHome='true' />
//       <Centre />
//       <About />
//     </div>

//     // <div>
//     //   <ul>
//     //             <li>
//     //             <Link to="/">Home</Link>
//     //             </li>
//     //             <li>
//     //             <Link to="/signup">Sign Up</Link>
//     //             </li>
//     //             <li>
//     //             <Link to="/login">Log in</Link>
//     //             </li>
//     //     </ul>
//     //     <div>
//     //       <h2> Home </h2>
//     //     </div>
//     // </div>
//   );
// }