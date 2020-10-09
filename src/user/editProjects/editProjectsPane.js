import React from "react";
import ProjectList from "./projectList.js";
import EditProjectForm from "./editProjectForm.js";

class EditProjectsPane extends React.Component {
    constructor(props) {
        super(props);
        this.state({
            showPane: props.showPane
        })
    }

    render() {
        return (
            <div className="editProjectsOverlay">
                <div className="editProjectsContainer">
                    <div className="projectsList">
                        <ProjectList />
                    </div>
                    <div className="rightContainer">
                        <div className="projectButtonsContainer">
                            <button className="createProjectButton">Create Project</button>
                            <button className="deleteProjectButton">Delete Project</button>
                        </div>
                        <div className="editProjectForm">
                            <EditProjectForm />
                        </div>
                    </div>
                </div>
                
                <div className="overlayButtonsContainer">
                    <button className="cancelButton">Cancel</button>
                    <button className="confirmButton">Confirm Changes</button>
                </div>
                
            </div>
        )
    }
}

export default EditProjectsPane;