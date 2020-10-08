import React from "react";
import './searchbar.css'
import {Redirect} from "react-router-dom";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchContents: ''}

        this.handleChange = this.handleChange.bind(this);
        this.handlePeopleSubmit = this.handlePeopleSubmit.bind(this);
        this.handleProjectSubmit = this.handleProjectSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({searchContents: event.target.value})
    }

    handlePeopleSubmit(event) {
        // event.preventDefault();
        return <Redirect to="/home" />
    }

    handleProjectSubmit(event) {
        event.preventDefault();        
    }

    render() {
        return (
            <div className="row">
                <form onSubmit={this.handlePeopleSubmit}>
                    <input type="text" id="search" placeholder="Name, project, topics" value={this.state.searchContents} onChange={this.handleChange} />
                </form>
                <button type="submit">People</button>
                <button onClick={this.handleProjectSubmit}>Projects</button>
            </div>
        );
    }
}

export default SearchBar;