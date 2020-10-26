import React from "react";
import axios from 'axios';
import { API_DOMAIN } from "../../config";
import $ from 'jquery';

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
            uploadText: "Upload attachments",
            attachmentsCount: 0,
            files: [],
            uploads: [],
            numUploads: 0,
            timeoutText: "",
            saveProjectText: "Save Project Information",
            timeoutText: "",
            showConfirmDelete: false
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
        this.confirmDelete = this.confirmDelete.bind(this);
        this.uploadAttachments = this.uploadAttachments.bind(this);
        this.deleteAttachment = this.deleteAttachment.bind(this);
        this.scroll = this.scroll.bind(this);

    }

    // Prop type for redux state (used to get jwt of user)
    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    scroll(buttonID) {
        $(function (){
            $(buttonID).on(function (){
                $('html, body').animate({
                    scrollTop: $(buttonID).offset().top
                }, 2000);
            });
        });
    }

    // Select a project when clicking on it, and show its edit options
    onProjectSelect(){
        this.scroll(this.props.project.title);
        this.setState({
            showEdit: !this.state.showEdit
        })
    }

    // Get the file name from an S3 link
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

    // Return decoded strings of file names in an HTML list with an option to delete that attachment
    convertFileURLs() {
        var convertedAttachments = []
        for (let i=0; i<this.state.urls.length; i++) {
            var decoded = decodeURI(this.state.urls[i])
            //console.log(decoded);
            convertedAttachments.push(this.getFileName(decoded))
        }

        var attachments = convertedAttachments.map((url, index) => (
            <li className="attachment"key={url}>
                {url}
                <button className="listEntryDelete" onClick={ () => {this.deleteAttachment(this.state.urls[index])}}><i class="material-icons">delete</i></button>
            </li>
        ))
        if (attachments.length === 0) {
            var message = (
                <p>This projects doesn't have any attachments yet. Add some to show off your work!</p>
            )
            return message;
        }
        return attachments;
    }

    // Dynamically create the request body for updating a project's title, text and/or tags
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
        
        var trimmedTitle = this.state.title;
        trimmedTitle = trimmedTitle.trim();

        if (trimmedTitle.length < 3) {
            this.setState({
                timeoutText: "Project title must be at least 3 characters long.",
                saveProjectText: "Save Project Information"
            })
            return null;
        }
        
        // Set body
        if (titleOnly) {
            body = {
                "title": trimmedTitle
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
                "title": trimmedTitle,
                "text": this.state.text
            }
        }
        else if (titleAndTags) {
            body = {
                "title": trimmedTitle,
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
                "title": trimmedTitle,
                "text": this.state.text,
                "tags": this.state.tags
            }
        }

        return body;
    }

    // Submit a POST request to change a project's title, text and/or tags
    handleInfoSubmit(event) {
        event.preventDefault();
        const config = {
            headers: {
                "Content-type": "application/json",
                'x-auth-token': this.props.auth.token
            }
        }
        var body = this.createProjectInfoBody();
        if (body === null) {
            return;
        }
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

    // Show overlay to confirm deletion of a project
    confirmDelete() {
        this.setState({
            showConfirmDelete: !this.state.showConfirmDelete
        })
    }

    // Submit POST request to delete a project after user confirmation
    deleteProject() {
        const config = {
            headers: {
                "x-auth-token": this.props.auth.token
            }
        }
        async function postDelete(self) {
            const body = {}
            var req_url = API_DOMAIN+'/projects/delete/'+self.props.project.title;
            console.log(req_url);
            let res = await axios.post(req_url, body, config);
            console.log(res);
            if (res) {
                self.props.history.push(window.location.pathname);
            }  
        }
        postDelete(this);
    }

    // Project title change handler
    titleChange = (event) => {
        this.setState({title: event.target.value});
        this.setState({
            saveProjectText: "Save Project Information"
        })
    }

    // Project description change handler
    textChange = (event) => {
        this.setState({text: event.target.value});
        this.setState({
            saveProjectText: "Save Project Information"
        })
    }
    
    // Project tags change handler
    tagsChange = (event) => {
        var tags = event.target.value.split(', ');
        this.setState({tags: tags});
        this.setState({
            saveProjectText: "Save Project Information"
        })
    }

    // Attachment count change handler (from number input)
    attachmentsCountChange = (event) => {
        this.setState({attachmentsCount: event.target.value})
    }

    // Handle file input changes
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

    // Dynamically create file input HTML elements based on number of selected attachments
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

    // Submit POST request to upload attachments from edit project menu
    uploadAttachments(event) {
        event.preventDefault();
        this.setState({
            uploadText: "Uploading..."
        })
        console.log(this.state.attachmentsCount);
        if (this.state.attachmentsCount == 0) {
            this.setState({
                uploadText: "Upload"
            })
            return;
        }
        var timeout = false;
        function startTimeout(){
            setTimeout(function(){ 
                timeout = true; 
            }, 30000);
        }
        startTimeout();
        // POST request to add attachments
        for (var i=0; i<this.state.attachmentsCount; i++) {
            console.log(this.state.attachmentsCount);
            console.log(this.state.numUploads);
            // Time out if not finished after 30 seconds
            if (timeout) {
                this.setState({
                    uploadText: "Upload Attachments",
                    timeoutText: "Sorry! Our server timed out. Please try again."
                    // Delete project that was just created with API here.
                });
                this.props.history.push(window.location.pathname);
                break;
            }

            var input = document.getElementById(this.state.files[i].index);
            if (input === null) {
                this.setState({
                    changeDPText: "Upload",
                    loading: false,
                    timoutText: "An error occured. Please try again."
                })
                return;
            }
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
                let upload = await axios.post(API_DOMAIN+'/files/'+self.state.title+'/upload', fileBody, fileConfig)
                
                if (upload) {
                    self.setState({
                        numUploads: self.state.numUploads + 1
                    })
                    if (self.state.numUploads >= self.state.attachmentsCount) {

                        // Update file upload list
                        // var URLs = []
                        // for (let i=0; i<this.props.project.attachments.length; i++) {
                        //     URLs.push(this.props.project.attachments[i].url);
                        // }

                        // // map to divs
                        // const attachments = URLs.map((url) => <p>{url}</p>)

                        console.log("Hit upload refresh")
                        self.setState({
                            uploadText: "Upload Attachments",
                            numUploads: 0,
                            attachmentsCount: 0,
                            showEdit: false
                        });
                        console.log("Refreshing")
                        self.props.history.push(window.location.pathname);
                        window.location.reload();
                        console.log("refreshed")
                        
                    }
                }
            }
            postFile(this, fileBody, fileConfig);            
        } 
    }

    deleteAttachment(url) {
        console.log(url);
        const body = {
            "fileurl": url
        }
        const config = {
            headers: {
                "x-auth-token": this.props.auth.token
            }
        }
        axios.post(API_DOMAIN+"/files/"+this.props.project.title+"/delete", body, config)
        .then(res => {
            console.log(res);
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className="listEntry" id={this.props.project.title}>
                <button className="listEntryProject" id={'button '+this.props.project.title} onClick={this.onProjectSelect}>{this.props.project.title}</button>
                <button className="listEntryDelete" onClick={this.confirmDelete}><i class="material-icons">delete</i></button>
                {/* Overlay to show/hide confirm delete window. -Show if this.state.showConfirmDelete === true */}
                {
                    this.state.showConfirmDelete && (
                        <div className="editProjectsOverlay">
                            <div className="editProjectsOverlayContainer">
                                <div className="confirmDeletion">
                                    <h3>Delete {this.props.project.title}</h3>
                                    <p>Are you sure you want to delete this project?</p>
                                    <button onClick={this.deleteProject}>Yes</button>
                                    <button onClick={this.confirmDelete}>No</button>
                                </div>
                            </div>
                            
                        </div>
                    )
                }

                {/* Edit pane. Show if this.state.showEdit === true */}
                {
                    this.state.showEdit && (
                        <div className="editProjectForm">
                            <div className="column">
                                <form onSubmit={this.handleInfoSubmit}>
                                    <h3>Project Information</h3>
                                    <label>Project Title: </label>
                                    <br></br><br></br>
                                    <input type="text" onChange={this.titleChange} defaultValue={this.props.project.title}/>
                                    <br></br><br></br>
                                    <label>Project Description: </label>
                                    <br></br><br></br>
                                    <textarea defaultValue={this.props.project.text} onChange={this.textChange}/>
                                    <br></br><br></br>
                                    <label>Project Tags (comma separated, e.g. "software, tech, javascript"): </label>
                                    <br></br><br></br>
                                    <textarea onChange={this.tagsChange} defaultValue={this.props.project.tags} />
                                    <br></br>
                                    <br></br>
                                    <input type="submit" value={this.state.saveProjectText} />
                                </form>
                                {
                                    (this.state.timeoutText.length > 0) && (
                                        <p>{this.state.timeoutText}</p>
                                    )
                                }
                            </div>
                            
                            <div className="column">
                                <h3> Current Attachments: </h3>
                                <div>
                                    <ul>
                                        {this.convertFileURLs()}
                                    </ul>
                                </div>

                                <form onSubmit={this.uploadAttachments}>
                                    <h3> Upload Attachments (page will refresh): </h3>
                                    <label>Number of attachments: </label>
                                    <input type="number" placeholder="0" min="0" max={10 - this.state.urls.length} onChange={this.attachmentsCountChange} />
                                    <div>
                                        {this.fileInputs()}
                                    </div>
                                    {
                                        (this.state.attachmentsCount > 0) &&
                                        (
                                            <p>Files uploaded: {this.state.numUploads} of {this.state.attachmentsCount}</p>
                                        )
                                    }
                                    <div>
                                        <input type="submit" value={this.state.uploadText} />
                                    </div>
                                </form>
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
