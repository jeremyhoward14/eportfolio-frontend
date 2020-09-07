import React from "react";
import {Link} from "react-router-dom";
import NavBar from '../common/navbar.js';
import Centre from '../home/centre.js';
import About from '../home/about.js';
// Route functions

export default function Home() {
  return (
    <div className="body">
      <NavBar isHome='true' />
      <Centre />
      <About />
    </div>

    // <div>
    //   <ul>
    //             <li>
    //             <Link to="/">Home</Link>
    //             </li>
    //             <li>
    //             <Link to="/signup">Sign Up</Link>
    //             </li>
    //             <li>
    //             <Link to="/login">Log in</Link>
    //             </li>
    //     </ul>
    //     <div>
    //       <h2> Home </h2>
    //     </div>
    // </div>
  );
}