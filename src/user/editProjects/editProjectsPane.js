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
            files: [],
            uploads: [],
            numUploads: 0,
            timeoutText: ""
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
        var trimmedTitle = this.state.createTitle;
        trimmedTitle = trimmedTitle.trim();
        this.setState({
            createSubmitText: "Creating...",
            createTitle: trimmedTitle
        })
        if (trimmedTitle.length < 3) {
            this.setState({
                timeoutText: "Project title must be at least 3 characters long.",
                createSubmitText: "Create Project"
            })
            return;
        }

        const config = {
            headers: {
                "Content-type": "application/json",
                "x-auth-token": this.props.auth.token
            }
        }
        const body = {
            "title": trimmedTitle,
            "text": this.state.createText,
            "tags": [] // insert tags here when schema has changed
        }

        var timeout = false;
        function startTimeout(){
            setTimeout(function(){ 
                timeout = true; 
            }, 30000);
        }
        startTimeout();
        axios.post(API_DOMAIN+'/projects/create', body, config)
        .then(res => {
            console.log(res);
            if (this.state.attachmentsCount === 0) {
                this.setState({
                    createSubmitText: "Create Project",
                    showCreateForm: false
                });
    
                this.props.history.push(window.location.pathname);
            }

            // POST request to add attachments
            for (var i=0; i<this.state.attachmentsCount; i++) {

                // Time out if not finished after 30 seconds
                if (timeout) {
                    this.setState({
                        createSubmitText: "Create Project",
                        timeoutText: "Sorry! Our server timed out. Please try again."
                        // Delete project that was just created with API here.
                    });
                    this.props.history.push(window.location.pathname);
                    break;
                }

                var input = document.getElementById(this.state.files[i].index);
                var fileBody = new FormData();
                fileBody.append(this.state.files[i].name, input.files[0]);

                const fileConfig = {
                    headers: {
                        "accept": "application/json",
                        "Content-type": "multipart/form-data",
                        "x-auth-token": this.props.auth.token
                    }
                }
                console.log(fileConfig);
                async function postFile(self, fileBody, fileConfig) {
                    let create = await axios.post(API_DOMAIN+'/files/'+self.state.createTitle+'/upload', fileBody, fileConfig)
                    
                    if (create) {
                        self.setState({
                            numUploads: self.state.numUploads + 1
                        })
                        if (self.state.numUploads >= self.state.attachmentsCount) {
                            console.log("Hit upload refresh")
                            self.setState({
                                createSubmitText: "Create Project",
                                numUploads: 0,
                                attachmentsCount: 0
                            });
                            self.props.history.push(window.location.pathname);
                            self.setState({
                                showCreateForm: false
                            })
                        }
                    }
                }
                postFile(this, fileBody, fileConfig);            
            } 
        })
        .catch(err => {
            console.error(err);
            this.setState({
                timeoutText: "Something went wrong! Please try again.",
                createSubmitText: "Create Project"
            })
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
        tempFiles.unshift({"index": event.target.id, "name": event.target.name, "filename": event.target.value})
        this.setState({files: tempFiles});
        console.log(this.state.files);
    }

    cancelHandler(e) {
        this.props.onCancel(e.target.value);
        this.setState({
            createSubmitText: "Create Project"
        })
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
                    <input onChange={this.handleFileChange} type="file" name="userFile" id={"file "+String(i)}/>
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
        if ((this.state.numUploads === this.state.attachmentsCount) && (this.state.numUploads > 0)) {
            this.setState({
                createSubmitText: "Create Project",
                numUploads: 0,
                attachmentsCount: 0
            })
            this.props.history.push(window.location.pathname); // refresh user profile 
        }
        return (
            <div className="editProjectsOverlay">
                <div className="editProjectsOverlayContainer">
                    <div className="overlayButtonsContainer">
                        <button className="cancelButton" onClick={this.cancelHandler}>X</button> 
                    </div>
                    <br></br>
                    <br></br>
                    <div className="editProjectsContainer">
                        <div className="projectsList">
                            <ProjectList history={this.props.history} onSelect={this.selectProject} projidList={this.props.projects}/>
                        </div>
                        <div className="rightContainer">
                            <div className="projectButtonsContainer">
                                <button className="createProjectButton" onClick={this.createForm}>Create Project</button>
                                {
                                    this.state.showCreateForm && (
                                        <div>
                                            <form onSubmit={this.createProjectHandler}>
                                                <input type="text" required placeholder="Project title" onChange={this.createTitleChange}/>
                                                <br></br>
                                                <textarea required placeholder="Project description" onChange={this.createTextChange}/>
                                                <br></br>
                                                <textarea placeholder="Tags, (comma separated)" onChange={this.createTagsChange}/>
                                                <br></br>
                                                <div>
                                                    <h3> Attachments: </h3>
                                                    <label>Number of attachments: </label>
                                                    <input type="number" placeholder="0" min="0" max="10" onChange={this.attachmentsCountChange} />
                                                    <div>
                                                        {this.fileInputs()}
                                                    </div>
                                                    {
                                                        (this.state.attachmentsCount > 0) &&
                                                        (
                                                            <p>Files uploaded: {this.state.numUploads} of {this.state.attachmentsCount}</p>
                                                        )
                                                    }
                                                    {
                                                        (this.state.timeoutText.length > 0) && (
                                                            <p>{this.state.timeoutText}</p>
                                                        )
                                                    }
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