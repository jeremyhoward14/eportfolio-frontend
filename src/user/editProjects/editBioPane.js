import React from "react";
// import ProjectList from "./projectList.js";
// import EditProjectForm from "./editProjectForm.js";
import './editProjectsPane.css';

class EditBioPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projid: null
        }

        this.cancelHandler = this.cancelHandler.bind(this);
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

    render() {
        if (!this.props.showPane){
            return null;
        }
        return (
            <div className="editProjectsOverlay">
                <div className="editProjectsOverlayContainer">
                    <div className="editProjectsContainer">
                        <form>
                            <textarea placeholder="Edit your bio" />
                            <br></br>
                            <input type="file"/>
                        </form>
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

export default EditBioPane;