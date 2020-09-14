import React from "react";
import NavBar from "../common/navbar";
import ProjectResult from "./projectResult";
import "./search.css";
import projectExample from "../datasets/projectExample.json"

// export default function PeopleSearch() {
//     return (
//         <PeopleSearchPage />
//     )
// }

export default class ProjectsSearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {projects: projectExample};
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="resultsContainer">
                    <div className="searchDescription">
                        <h2> Search results for {this.props.search}</h2>
                        {this.state.projects.map(function(projectItem, i){
                            return <ProjectResult project={projectItem} key={i} />;
                        })}
                    </div> 
                </div> 
            </div>
        )
    }
}