import React from "react";
import './search.css';

export default class FilterSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterSearchContents: ''
        }

        this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleFilterSubmit(event){
        event.preventDefault();
        if (!(this.state.filterSearchContents === '')){
            // console.log("FILTER SEARCH");
            // separate tags by commas
            var tags = this.state.filterSearchContents.split(", ");
            this.props.onFilterSearch(tags);
        }
        else {
            this.props.onFilterSearch([]);
        }
    }

    handleChange(event){
        this.setState({filterSearchContents: event.target.value})
    }

    render() {
        return(
            <div className="filterContainer">                
                <p>Filter search results by tags:</p>
                <div className="filterForm">
                    <form onSubmit={this.handleFilterSubmit}>
                        <input text="text" id="filter" placeholder="Enter comma separated tags" value={this.state.filterSearchContents} onChange={this.handleChange} />
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        )        
    }
}