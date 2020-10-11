import React from "react";
import ProjectList from "./projectList.js";
import EditProjectForm from "./editProjectForm.js";
import './editProjectsPane.css';

class EditProjectsPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projid: null
        }

        this.cancelHandler = this.cancelHandler.bind(this);
        this.selectProject = this.selectProject.bind(this);
    }

    createProjectHandler() {
        // TODO
        // should create a project in the database, refresh the projid list
        // then select it
    }

    deleteProjectHandler() {
        // TODO
        // should delete a project in the database, refresh the projid list
        // then select the next project in the list
    }

    cancelHandler(e) {
        this.props.onCancel(e.target.value);
    };

    selectProject(projid) {
        this.setState( {
            projid: projid
        });
    }

    render() {
        if (!this.props.showPane){
            return null;
        }
        return (
            <div className="editProjectsOverlay">
                <div className="editProjectsOverlayContainer">
                    <div className="editProjectsContainer">
                        <div className="projectsList">
                            <ProjectList onSelect={this.selectProject} projidList={this.props.projidList} />
                        </div>
                        <div className="rightContainer">
                            <div className="projectButtonsContainer">
                                <button className="createProjectButton" onClick={this.createProjectHandler}>Create Project</button>
                                <button className="deleteProjectButton" onClick={this.deleteProjectHandler}>Delete Project</button>
                            </div>
                            <div className="editProjectForm">
                                <EditProjectForm projid={this.state.projid}/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="overlayButtonsContainer">
                        <button className="cancelButton" onClick={this.cancelHandler}>Cancel</button>
                        <button className="confirmButton">Confirm Changes</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditProjectsPane;