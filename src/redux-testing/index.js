import React from 'react';
// import { withRouter } from 'react-router-dom';

//import store from '../store';
//import { loadUser } from '../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class StateTest extends React.Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object    
    };

    render() {
        //const user = this.props.user;
        console.log(this.props.user);
        const user = this.props.user;
        
        return (
            <div>
                <h1>State Testing</h1>
                <div>
                    <p>Welcome <b>{user.firstname} {user.lastname}</b></p>
                    <p>Your email: <b>{user.email}</b> </p>
                    <p>Your username: <b>{user.username}</b> </p>
                    <p>You have uploaded <b>{user.projects.length}</b> projects.</p>
                </div>     
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, null)(StateTest);