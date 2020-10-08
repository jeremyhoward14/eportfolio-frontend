import React from "react";
import './projectCard.css'

class ProjectCard extends React.Component {
    constructor(props) {
        super(props)
    }

    // replace these getters with data from api
    getProjectName() {
        const proj_name = "test proj";
        return (
            <h3>{proj_name}</h3>
        );
    }

    getProjectMedia() {
        const proj_media = ["1", "2"];
        return proj_media;
    }

    getProjectDescription() {
        const proj_desc = "desc";
        return (
            <p>{proj_desc}</p>
        );
    }

    render() {
        return (
            <div className="cardContainer">
                <p>projid: {this.props.projid}</p>
                <p>proj media: {this.getProjectMedia()}</p>
                {this.getProjectName()}
                {/* replace proj media with a project media component that displays the media*/}
                {this.getProjectDescription()}
            </div>
        )
    }
}

export default ProjectCard;