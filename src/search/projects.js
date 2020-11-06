import React from "react";
import NavBar from "../common/navbar";
import ProjectResult from "./projectResult";
import "./search.css";
import Fuse from 'fuse.js';
import axios from 'axios';
import { API_DOMAIN } from "../config";
import FilterSearch from './filterSearch.js';

// export default function PeopleSearch() {
//     return (
//         <PeopleSearchPage />
//     )
// }

export default class ProjectsSearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: null,
            projectdata: null,
            searchResults: null
            // projects: projectExample
        };

        this.getSearch = this.getSearch.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    async componentDidUpdate(){
        if (decodeURI(this.props.match.params.query) != this.state.search){
            // reset searchresults while setting search to new query
            this.setState({
                searchResults: null,
                search: decodeURI(this.props.match.params.query)
            })

            // fetch users from API
            await axios.get(API_DOMAIN+'/projects')
            .then(res => {
                this.setState({
                    projectdata: res.data
                });
            })
            .catch(err => {
                console.error(err);
            });

            this.getSearch();
        }
    }

    async componentDidMount(){
        this.setState( {
            search: decodeURI(this.props.match.params.query)
        })

        // fetch users from API
        await axios.get(API_DOMAIN+'/projects')
            .then(res => {
                this.setState({
                    projectdata: res.data
                });
            })
            .catch(err => {
                console.error(err);
            });

        this.getSearch();
        
    }
    
    getSearch() {
        if (this.state.projectdata == null){
            this.setState({
                searchResults: []
            });
        }

        this.fuse = new Fuse(this.state.projectdata, {
            keys: [
                'username',
                'project.tags',
                'project.title',
                'project.text'
            ],
            includeScore: true
        })

        // automatically orders results by how cloesly it matches
        const results = this.fuse.search(this.state.search);

        this.setState({
            searchResults: results.map(result => result.item)
        });

        console.log(this.state.searchResults);

    }

    handleFilter(tags){
        // only keep projects in this.state.searchResults that have the filter
        // tags verbatim
        // console.log("Handle filter called");
        // console.log(tags);

        // update this.state.searchResults
        this.getSearch();
        
        var length = this.state.searchResults.length;

        if (tags.length !== 0) {
            for (var i = 0; i < length; i++) {
                var projTags = this.state.searchResults[i].project.tags;
                
                // case sensitive search for tags
                var intersectionTags = projTags.filter(value => tags.includes(value))
                
                // console.log(i);
                // console.log(this.state.searchResults[i].project.title);
                // console.log(projTags);
                // console.log("Tags in common:");
                // console.log(intersectionTags);
    
                if (intersectionTags.length === 0){
                    console.log(this.state.searchResults);
                    // remove this result from this.state.searchResults
                    this.setState({
                        searchResults: this.state.searchResults.splice(i, 1)
                    })

                    // decrement length and i by 1 since we removed a project
                    i = i - 1;
                    length = length - 1;
    
                }
            }
        }       
    }

    render() {
        if (this.state.searchResults === null){
            return(
                <div>
                    <NavBar isHome={false} />
                    <div className="resultsContainer">
                        <div className="searchDescription">
                            <h2>Searching for {this.state.search}</h2>
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.state.searchResults.length == 0){
            return(
                <div>
                    <NavBar isHome={false} />
                    <div className="resultsContainer">
                        <div className="searchDescription">
                            <h2>No results found for {this.state.search}</h2>
                            <FilterSearch onFilterSearch={this.handleFilter}/>
                            <p>Make sure the spelling is correct or try other keywords</p>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <NavBar isHome={false}/>
                <div className="resultsContainer">
                    <div className="searchDescription">
                        <h2> Search results for {this.state.search}</h2>
                        <FilterSearch onFilterSearch={this.handleFilter}/>
                        {this.state.searchResults.map(function(projectItem, i){
                            return <ProjectResult project={projectItem} key={i} />;
                        })}
                    </div> 
                </div> 
            </div>
        )
    }
}