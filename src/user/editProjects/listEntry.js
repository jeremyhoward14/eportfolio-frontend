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
            attachments: attachments
        }

        this.onProjectSelect = this.onProjectSelect.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.convertFileURLs = this.convertFileURLs.bind(this);
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
        var attachments = convertedAttachments.map((url) => <li>{url}</li>)
        return attachments;
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("Submitting with API...")
    }

    deleteProject() {
        console.log("Deleting project...");
        const config = {
            headers: {
                'x-auth-token': this.props.auth.token
            }
        }
        axios.post(API_DOMAIN+'/projects/delete/'+this.props.project.title, config)
    }

    render() {
        return (
            <div className="listEntry">
                <button className="listEntryProject" onClick={this.onProjectSelect}>{this.props.project.title}</button>
                <button className="listEntryDelete" onClick={this.deleteProject}>Delete</button>

                {
                    this.state.showEdit && (
                        <div className="editProjectForm">
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" placeholder={this.props.project.title}/>
                                <br></br>
                                <textarea placeholder={this.props.project.text} />
                                <br></br>
                                <textarea placeholder={"Tags will go here when dev deployment works."} />
                                <br></br>
                                <div>
                                    <h3> Attachments: </h3>
                                    <div>
                                        <ul>
                                            {this.convertFileURLs()}
                                        </ul>
                                    </div>
                                </div>
                                <input type="submit" value="Save" />
                            </form>
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
