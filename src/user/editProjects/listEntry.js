import React from "react";
import axios from 'axios';
import { API_DOMAIN } from "../../config";

// Redux imports
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

class ListEntry extends React.Component {
    constructor(props) {
        super(props);
        var URLs = []
        for (let i=0; i<this.props.project.attachments.length; i++) {
            URLs.push(this.props.project.attachments[i].url);
        }

        // map to divs
        const attachments = URLs.map((url) => <p>{url}</p>)

        this.state = {
            urls: URLs,
            showEdit: false,
            attachments: attachments,
            title: this.props.project.title,
            text: this.props.project.text,
            tags: this.props.project.tags,
            createSubmitText: "Create Project",
            attachmentsCount: 0,
            files: [],
            uploads: [],
            numUploads: 0,
            timeoutText: "",
            saveProjectText: "Save Project Information"
        }

        this.onProjectSelect = this.onProjectSelect.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.convertFileURLs = this.convertFileURLs.bind(this);
        this.handleInfoSubmit = this.handleInfoSubmit.bind(this);
        this.tagsChange = this.tagsChange.bind(this);
        this.textChange = this.textChange.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.attachmentsCountChange = this.attachmentsCountChange.bind(this);
        this.fileInputs = this.fileInputs.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    getProjName(project){
        // call for name from api
        var projname = project;
        return projname;
    }

    onProjectSelect(){
        //this.props.onSelect(this.props.project);
        // switch the value of showEdit on Button Click
        this.setState({
            showEdit: !this.state.showEdit
        })
    }

    getFileName(url) {
        var urlChars = url.split('').reverse();
        var filename = []
        for (let i=0; i<urlChars.length; i++) {
            if (urlChars[i] === '/') {
                break;
            }
            filename.push(urlChars[i]);
        }
        filename.reverse();
        return filename.join('');
    }

    convertFileURLs() {
        var convertedAttachments = []
        for (let i=0; i<this.state.urls.length; i++) {
            convertedAttachments.push(this.getFileName(this.state.urls[i]))
        }
        var attachments = convertedAttachments.map((url) => (
            <li key={url}>
                <div>
                    {url}
                </div>
                <button>Delete attachment</button>
            </li>
        ))
        return attachments;
    }

    createProjectInfoBody() {
        var body = {};
        // booleans to check what to send based on whether state equals props
        var titleOnly = ((this.props.project.title !== this.state.title) && (this.props.project.text === this.state.text) && (this.props.project.tags === this.state.tags));
        var textOnly = ((this.props.project.title === this.state.title) && (this.props.project.text !== this.state.text) && (this.props.project.tags === this.state.tags));
        var tagsOnly = ((this.props.project.title === this.state.title) && (this.props.project.text === this.state.text) && (this.props.project.tags !== this.state.tags));
        var titleAndText = ((this.props.project.title !== this.state.title) && (this.props.project.text !== this.state.text) && (this.props.project.tags === this.state.tags));
        var titleAndTags = ((this.props.project.title !== this.state.title) && (this.props.project.text === this.state.text) && (this.props.project.tags !== this.state.tags));
        var textAndTags = ((this.props.project.title === this.state.title) && (this.props.project.text !== this.state.text) && (this.props.project.tags !== this.state.tags));
        var titleTextTags = ((this.props.project.title !== this.state.title) && (this.props.project.text !== this.state.text) && (this.props.project.tags !== this.state.tags));
        // Set body
        if (titleOnly) {
            body = {
                "title": this.state.title
            }
        }
        else if (textOnly) {
            body = {
                "text": this.state.text
            }
        }
        else if (tagsOnly) {
            body = {
                "tags": this.state.tags
            }
        }
        else if (titleAndText) {
            body = {
                "title": this.state.title,
                "text": this.state.text
            }
        }
        else if (titleAndTags) {
            body = {
                "title": this.state.title,
                "tags": this.state.tags
            }
        }
        else if (textAndTags) {
            body = {
                "text": this.state.text,
                "tags": this.state.tags
            }
        }
        else if (titleTextTags) {
            body = {
                "title": this.state.title,
                "text": this.state.text,
                "tags": this.state.tags
            }
        }

        return body;
    }
    handleInfoSubmit(event) {
        event.preventDefault();
        console.log("Submitting edits with API...");
        const config = {
            headers: {
                "Content-type": "application/json",
                'x-auth-token': this.props.auth.token
            }
        }
        var body = this.createProjectInfoBody();
        console.log(body);
        async function postProjectInfo(self) {
            self.setState({
                saveProjectText: "Saving..."
            })
            let res = await axios.post(API_DOMAIN+'/projects/edit/'+self.props.project.title, body, config);
            if (res) {
                self.setState({
                    saveProjectText: "Saved!"
                })
                self.props.history.push(window.location.pathname);
            }  
        }
        postProjectInfo(this);

    }

    deleteProject() {
        const config = {
            headers: {
                'x-auth-token': this.props.auth.token
            }
        }
        async function postDelete(self) {

            let res = await axios.post(API_DOMAIN+'/projects/delete/'+self.props.project.title, config);
            if (res) {
                self.props.history.push(window.location.pathname);
            }  
        }
        postDelete(this);
    }

    titleChange = (event) => {
        this.setState({title: event.target.value});
        this.setState({
            saveProjectText: "Save Project Information"
        })
    }

    textChange = (event) => {
        this.setState({text: event.target.value});
        this.setState({
            saveProjectText: "Save Project Information"
        })
    }
    
    tagsChange = (event) => {
        var tags = event.target.value.split(', ');
        this.setState({tags: tags});
        this.setState({
            saveProjectText: "Save Project Information"
        })
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
        return (
            <div className="listEntry">
                <button className="listEntryProject" onClick={this.onProjectSelect}>{this.props.project.title}</button>
                <button className="listEntryDelete" onClick={this.deleteProject}>Delete</button>

                {
                    this.state.showEdit && (
                        <div className="editProjectForm">
                            <form onSubmit={this.handleInfoSubmit}>
                                <h3>Project Information</h3>
                                <label>Project Title: </label>
                                <input type="text" onChange={this.titleChange} placeholder={this.props.project.title}/>
                                <br></br>
                                <label>Project Description: </label>
                                <textarea placeholder={this.props.project.text} onChange={this.textChange}/>
                                <br></br>
                                <label>Project Tags (comma separated, e.g. "software, tech, javascript"): </label>
                                <textarea onChange={this.tagsChange} placeholder={this.props.project.tags} />
                                <br></br>
                                <br></br>
                                <input type="submit" value={this.state.saveProjectText} />
                            </form>
                                <div>
                                    <h3> Current Attachments: </h3>
                                    <div>
                                        <ul>
                                            {this.convertFileURLs()}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3> Upload Attachments: </h3>
                                        <label>Number of attachments: </label>
                                        <input type="number" min="0" max="10" onChange={this.attachmentsCountChange} />
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
                                </div>
                        </div>
                    )
                }

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
)(ListEntry);
