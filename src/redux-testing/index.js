import React from 'react';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import PropTypes from 'prop-types';

class StateTest extends React.Component {

    componentDidMount() {
        this.props.getItems();
    }

    render() {
        const { items } = this.props.item;
        return (
            <div>
                <h1>State Testing</h1>
                <div>
                {items.map(function(item, i){
                            return <h2 key={i}>{item.name}</h2>;
                        })}
                </div>
                
            </div>
           
        )
    }
}

StateTest.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
});

export default connect(mapStateToProps, { getItems })(StateTest);