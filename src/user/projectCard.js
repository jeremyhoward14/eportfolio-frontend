import React from "react";
import './projectCard.css';
import MediaCarousel from './mediaCarousel.js';

class ProjectCard extends React.Component {
    constructor(props) {
        super(props)
    }

    // replace these getters with data from api
    getProjectName() {
        const proj_name = this.props.project.title;
        return (
            <h3>{proj_name}</h3>
        );
    }

    getProjectDescription() {
        const proj_desc = this.props.project.text;
        return (
            <p>{proj_desc}</p>
        );
    }

    renderTags() {
        var tags = String(this.props.project.tags);
        if (tags.length > 0) {
            return (
                <p><b>Tags:</b> {tags}</p>
            )
        }
    }

    render() {
        return (
            <div className="cardContainer">
                {/* <p>projid: {this.props.projid}</p> */}
                {
                    (this.props.project.attachments.length > 0) && (
                        <MediaCarousel projid={this.props.projid} project={this.props.project} />
                    )
                }
                {this.getProjectName()}
                {/* replace proj media with a project media component that displays the media*/}
                {this.getProjectDescription()}
                {this.renderTags()}
            </div>
        )
    }
}

export default ProjectCard;