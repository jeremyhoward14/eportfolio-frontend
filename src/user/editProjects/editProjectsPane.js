import React from "react";
import ProjectList from "./projectList.js";
import EditProjectForm from "./editProjectForm.js";
import './editProjectsPane.css';
import axios from 'axios'

// Redux imports
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

class EditProjectsPane extends React.Component {
    constructor(props) {
        super(props);
    
        
        this.state = {
            projid: null,
            showCreateForm: false,
            createTitle: "",
            createText: "",
            createTags: []
        }

        this.cancelHandler = this.cancelHandler.bind(this);
        this.selectProject = this.selectProject.bind(this);
        this.createForm = this.createForm.bind(this);
        this.createProjectHandler = this.createProjectHandler.bind(this);
        this.createTagsChange = this.createTagsChange.bind(this);
        this.createTextChange = this.createTextChange.bind(this);
        this.createTitleChange = this.createTitleChange.bind(this);
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
      }

    createProjectHandler(event) {
        event.preventDefault();
        const config = {
            headers: {
                "Content-type": "application/json",
                "x-auth-token": this.props.auth.token
            }
        }
        const body = {
            "title": this.state.createTitle,
            "text": this.state.createText,
            "tags": [] // insert tags here when schema has changed
        }
        var self = this;
        axios.post('https://api-circlespace.herokuapp.com/projects/create', body, config)
        .then(res => {
            console.log(res);
            // POST request to add attachments
            self.props.history.push(window.location.pathname); // refresh user profile
        })
        .catch(err => {
            console.error(err);
        });
    }

    createForm() {
        this.setState({
            showCreateForm: !this.state.showCreateForm
        })
    }

    createTitleChange = (event) => {
        this.setState({createTitle: event.target.value});
    }

    createTextChange = (event) => {
        this.setState({createText: event.target.value});
    }
    
    createTagsChange = (event) => {
        var tags = event.target.value.split(', ');
        this.setState({createTags: tags});
    }

    cancelHandler(e) {
        this.props.onCancel(e.target.value);
    };

    selectProject(projid) {
        this.setState({
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
                            <ProjectList onSelect={this.selectProject} projidList={this.props.projects}/>
                        </div>
                        <div className="rightContainer">
                            <div className="projectButtonsContainer">
                                <button className="createProjectButton" onClick={this.createForm}>Create Project</button>
                                {
                                    this.state.showCreateForm && (
                                        <div>
                                            <form onSubmit={this.createProjectHandler}>
                                                <input type="text" placeholder="Project title" onChange={this.createTitleChange}/>
                                                <br></br>
                                                <textarea placeholder="Project description" onChange={this.createTextChange}/>
                                                <br></br>
                                                <textarea placeholder="Tags, (comma separated)" onChange={this.createTagsChange}/>
                                                <br></br>
                                                <div>
                                                    <h3> Attachments: </h3>
                                                    <div>{this.state.attachments}</div>
                                                </div>
                                                <input type="submit" value="Create Project" />
                                            </form>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="editProjectForm">
                                <EditProjectForm projid={this.state.projid}/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="overlayButtonsContainer">
                        <button className="confirmButton">Confirm Changes</button>
                        <button className="cancelButton" onClick={this.cancelHandler}>Cancel</button>
                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});
  
  export default connect(
    mapStateToProps,
    null
  )(EditProjectsPane);