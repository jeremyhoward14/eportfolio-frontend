import React from "react";
import ProjectList from "./projectList.js";
import EditProjectForm from "./editProjectForm.js";
import './editProjectsPane.css';
import axios from 'axios'
import { API_DOMAIN } from "../../config"

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
            createTags: [],
            createSubmitText: "Create Project",
            attachmentsCount: 0,
            files: []
        }

        this.cancelHandler = this.cancelHandler.bind(this);
        this.selectProject = this.selectProject.bind(this);
        this.createForm = this.createForm.bind(this);
        this.createProjectHandler = this.createProjectHandler.bind(this);
        this.createTagsChange = this.createTagsChange.bind(this);
        this.createTextChange = this.createTextChange.bind(this);
        this.createTitleChange = this.createTitleChange.bind(this);
        this.attachmentsCountChange = this.attachmentsCountChange.bind(this);
        this.fileInputs = this.fileInputs.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
      }

    createProjectHandler(event) {
        event.preventDefault();
        this.setState({
            createSubmitText: "Creating..."
        })
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
        axios.post(API_DOMAIN+'/projects/create', body, config)
        .then(res => {
            console.log(res);

            // POST request to add attachments
            for (let i=0; i<this.state.attachmentsCount; i++) {
                var input = document.getElementById(this.state.files[i].index);
                var fileBody = new FormData();
                fileBody.append(this.state.files[i].index, input.files[0]);
                const fileConfig = {
                    headers: {
                        "accept": "application/json",
                        "Content-type": "multipart/form-data",
                        "x-auth-token": this.props.auth.token
                    }
                }
                axios.post(API_DOMAIN+'/files/'+this.state.createTitle+'/upload', fileBody, fileConfig)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.error(err);
                })
            }
            
            this.props.history.push(window.location.pathname); // refresh user profile
            this.setState({
                createSubmitText: "Create Project"
            })
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

    attachmentsCountChange = (event) => {
        this.setState({attachmentsCount: event.target.value})
    }

    handleFileChange = (event) => {
        var tempFiles = this.state.files;
        for (let i=0; i<tempFiles.length; i++) {
            if (tempFiles[i].index === event.target.id) {
                tempFiles.splice(i, i+1);
                break;
            }
        }
        tempFiles.push({"index": event.target.id, "filename": event.target.value})
        this.setState({files: tempFiles});
        console.log(this.state.files);
    }

    cancelHandler(e) {
        this.props.onCancel(e.target.value);
    };

    selectProject(projid) {
        this.setState({
            projid: projid
        });
    }

    fileInputs() {
        var inputs = []
        for (let i=0; i<this.state.attachmentsCount; i++) {
            inputs.push(
                <div key={i}>
                    <input onChange={this.handleFileChange} type="file" id={"file "+String(i)}/>
                    <br></br>
                </div>
                
            )
        }
        return inputs;
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
                                                    <label>Number of attachments: </label>
                                                    <input type="number" min="0" max="10" onChange={this.attachmentsCountChange} />
                                                    <div>
                                                        {this.fileInputs()}
                                                    </div>
                                                    
                                                </div>
                                                <input type="submit" value={this.state.createSubmitText} />
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