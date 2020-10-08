import React from "react";
import {Link} from "react-router-dom";
import Searchbar from './searchbar.js';
import './navbar.css'

import { connect } from 'react-redux'
// import { logout } from '../actions/authActions'
import PropTypes from 'prop-types';

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

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
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
                {/* <Link onClick={this.props.logout} href='#'>
                    Logout
                </Link> */}
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
        const { isAuthenticated } = this.props.auth;
        if (isAuthenticated) {
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
                        <img alt="CircleSpace" src="./Logo.svg" />
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

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    null
)(NavBar)
