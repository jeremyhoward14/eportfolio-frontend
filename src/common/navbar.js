import React from "react";
import {Link} from "react-router-dom";
import Searchbar from './searchbar.js';
import './navbar.css'

export default function Navbar() {
    return (
        new NavBar()
    //     <div>
    //         <ul>
    //             <li>
    //             <Link to="/">Home</Link>
    //             </li>
    //             <li>
    //             <Link to="/signup">Sign Up</Link>
    //             </li>
    //             <li>
    //             <Link to="/login">Log in</Link>
    //             </li>
    //         </ul>
    //   </div>
      );  
    }

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.isHome = true;
        this.state = { 
            isLoggedIn: false,
            // isHome: false
        };
        
    }

    LoggedInRender() {
        return (
            <div className="row">
                <Link to="/">
                    {/* should link to profile */}
                    {/* profile picture */}
                    {/* profile name */}
                    <h2>Profile</h2>
                </Link>
            </div>
        );
    }

    LoggedOutRender() {
        return (
            <div className="row">
                <Link to="/login">
                    <h2>Login</h2>
                </Link>
                <Link to="/signup">
                    <h2>Signup</h2>
                </Link>
            </div>
        );
    }

    SearchRender() {
        return (
            <Searchbar />
        )
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn
        let right;
        if (isLoggedIn) {
            right = <this.LoggedInRender />
        }
        else {
            right = <this.LoggedOutRender />
            
        }
        
        // should only render search bar in navbar if you're not on the home page
        const isHome = this.isHome
        let centre;
        if (!isHome) {
            centre = <this.SearchRender />
        }
        else {
            centre = null
        }

        return (
            <div className="header">
                {/* should contain logo which links back to home page */}
                <div className="left">
                    <Link to="/">
                        <img alt="CircleSpace" src="./Logo.svg" />
                    </Link>
                </div>
                {/* should contain search bar */}
                <div className="centre">
                    {centre}
                </div>
                {/* should show log in/sign up buttons OR profile button if logged in */}
                <div className="right">
                    {right}
                </div>
            </div>            
        )
    }
}