import React from "react";
import {Link} from "react-router-dom";
import Searchbar from './searchbar.js';
import './navbar.css'

// export default function Navbar() {
//     return (
//         new NavBar()
//     //     <div>
//     //         <ul>
//     //             <li>
//     //             <Link to="/">Home</Link>
//     //             </li>
//     //             <li>
//     //             <Link to="/signup">Sign Up</Link>
//     //             </li>
//     //             <li>
//     //             <Link to="/login">Log in</Link>
//     //             </li>
//     //         </ul>
//     //   </div>
//       );  
//     }

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        // this.isHome = props.isHome;
        this.state = { 
            isLoggedIn: true,
            isHome: props.isHome
        };        

        // bind methods
        this.RightRender = this.RightRender.bind(this);
        this.LoggedInRender = this.LoggedInRender.bind(this);
        this.SearchRender = this.SearchRender.bind(this);
    }

    componentDidMount() {
        this.setState( {
            userid: 1
        })
    }

    LoggedInRender() {
        let profilelink = '/profile/' + this.state.userid;
        return (
            <div className="row">
                <Link to={profilelink}>
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

    RightRender(isLoggedIn) {
        if (isLoggedIn) {
            return (
                <this.LoggedInRender userid={this.state.userid} />
            )
        }
        else {
            return (
                <thisLoggedOutRender />
            )
        }
    }

    SearchRender() {
        if (!this.props.isHome) {
            return (
                <Searchbar />
            );
        }
        else {
            return (null);
        }
    }

    render() {
        // should only render search bar in navbar if you're not on the home page
        // const isHome = this.state.isHome
        let centre;
        if (!this.state.isHome) {
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
                        <img alt="CircleSpace" src="/logo.svg" />
                    </Link>
                </div>
                {/* should contain search bar */}
                <div className="centre">
                    {/* {centre} */}
                    <this.SearchRender />
                </div>
                {/* should show log in/sign up buttons OR profile button if logged in */}
                <div className="right">
                    {/* {right} */}
                    <this.RightRender isLoggedIn={this.state.isLoggedIn} />
                </div>
            </div>            
        )
    }
}

export default NavBar;