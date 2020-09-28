import React from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../actions/authActions';
import PropTypes from 'prop-types';

class StateTest extends React.Component {

    componentDidMount() {
        this.props.loadUser();
    }

    render() {
        //const user = this.props.user;
        console.log(this.props.user);
        return (
            <div>
                <h1>State Testing</h1>
                <div>
                <h3>Your token is:</h3>
                </div>
                
            </div>
           
        )
    }
}

StateTest.propTypes = {
    loadUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, { loadUser })(StateTest);