import React from "react";
import NavBar from "../common/navbar";
import ProjectResult from "./projectResult";
import "./search.css";
import Fuse from 'fuse.js';
import axios from 'axios';
import { API_DOMAIN } from "../config";

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
                        {this.state.searchResults.map(function(projectItem, i){
                            return <ProjectResult project={projectItem} key={i} />;
                        })}
                    </div> 
                </div> 
            </div>
        )
    }
}