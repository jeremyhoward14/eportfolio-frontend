import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class StateTest extends React.Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object    
    };

    // Render 'Welcome' while user state is loading
    // Once user has loaded and is mapped to props, render their details
    render() {
        const user = this.props.user;
        return (
            <div>
                <h1>State Testing</h1>
                {
                    user ? 
                    (<div>
                        <p>Welcome <b>{user.firstname} {user.lastname}</b></p>
                        <p>Your email: <b>{user.email}</b> </p>
                        <p>Your username: <b>{user.username}</b> </p>
                        <p>You have uploaded <b>{user.projects.length}</b> projects.</p>
                    </div>) :
                    (<div>
                        <p>Welcome</p>
                    </div>) 
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, null)(StateTest);