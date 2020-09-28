import React from "react";
import {Link} from "react-router-dom";
import Searchbar from './searchbar.js';
import './navbar.css'

import { connect } from 'react-redux'
import { logout } from '../actions/authActions'
import PropTypes from 'prop-types';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.isHome = false;
        this.state = {
            isLoggedIn: false
        }
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
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
                <Link onClick={this.props.logout} href='#'>
                    Logout
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
        const { isAuthenticated, user } = this.props.auth;
        let right;
        if (isAuthenticated) {
            right = <this.LoggedInRender />
        }
        else {
            right = <this.LoggedOutRender />
            
        }
        
        // should only render search bar in navbar if you're not on the home page
        const isHome = this.props.isHome
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
                        <img alt="CircleSpace" src="/logo.svg" />
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

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { logout }
)(NavBar)