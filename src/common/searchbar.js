import React from "react";
import './searchbar.css'
import {Redirect} from "react-router-dom";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchContents: '',
            peopleRedirect: props.peopleRedirect,
            projectRedirect: props.projectRedirect    
        }

        this.handleChange = this.handleChange.bind(this);
        this.handlePeopleSubmit = this.handlePeopleSubmit.bind(this);
        this.handleProjectSubmit = this.handleProjectSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({searchContents: event.target.value})
    }

    handlePeopleSubmit(event) {
        event.preventDefault();
        if (!(this.state.searchContents === '')){
            console.log("Submitting people search");
            this.setState( {
                peopleRedirect: true 
            })
        } 
    }

    handleProjectSubmit(event) {
        event.preventDefault();     
        if (!(this.state.searchContents === '')){
            console.log("Submitting project search");
            this.setState( {
                projectRedirect: true
            })
        }
    }

    render() {
        if (this.state.peopleRedirect) {
            return <Redirect to={{
                pathname: "/people",
                state: { search: this.state.searchContents }
             }}
            />
        }

        if (this.state.projectRedirect) {
            return <Redirect to={{
                pathname: "/projects",
                state: { search: this.state.searchContents }
             }}
            />
        }

        return (
            <div className="row">
                <form onSubmit={this.handlePeopleSubmit}>
                    <input type="text" id="search" placeholder="Name, project, topics" value={this.state.searchContents} onChange={this.handleChange} />
                </form>
                <button onClick={this.handlePeopleSubmit}>People</button>
                <button onClick={this.handleProjectSubmit}>Projects</button>
            </div>
        );
    }
}

export default SearchBar;
