import React from "react";
import {Link} from "react-router-dom";

// Route functions

export default function Home() {
  return (
    <div>
      <ul>
                <li>
                <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                <Link to="/login">Log in</Link>
                </li>
        </ul>
        <div>
          <h2> Home </h2>
        </div>
    </div>
  );
}
