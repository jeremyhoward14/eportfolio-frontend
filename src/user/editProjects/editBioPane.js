import axios from "axios";
import React from "react";
import { API_DOMAIN } from "../../config";
import './editProjectsPane.css';

class EditBioPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changePicture: false,
            saveBioText: "Save",
            firstname: this.props.user.firstname,
            lastname: this.props.user.lastname,
            bio: this.props.user.bio.text,
            picture: {},
            changeDPText: "Upload"
        }

        this.cancelHandler = this.cancelHandler.bind(this);
        this.showProfilePicEdit = this.showProfilePicEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);

    }

    showProfilePicEdit(e) {
        e.preventDefault();
        this.setState({
            changePicture: !this.state.changePicture
        })
    }
    cancelHandler(e) {
        this.props.onCancel(e.target.value);
    };

    handleFileChange = (event) => {
        this.setState({picture: {"index": event.target.id, "name": event.target.name, "filename": event.target.value}});
    }

    firstnameChange = event => {
        this.setState({
            firstname: event.target.value
        })
    }

    lastnameChange = event => {
        this.setState({
            lastname: event.target.value
        })
    }

    bioChange = event => {
        this.setState({
            bio: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            saveBioText: "Saving..."
        })

        var nameBody = {
            "firstname": this.state.firstname,
            "lastname": this.state.lastname
        }
        var bioBody = {
            "bio": this.state.bio
        }

        var config = {
            headers: {
                "x-auth-token": this.props.auth.token
            }
        }

        axios.post(API_DOMAIN+"/profile/bio/update", bioBody, config)
        .then(res => {
            console.log(res);
            if (this.state.firstname !== this.props.user.firstname || this.state.lastname !== this.props.user.lastname) {
                axios.post(API_DOMAIN+"/profile/name/update", nameBody, config)
                .then(res => {
                    console.log(res);
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                })
            }
            else {
                window.location.reload();
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleDPSubmit = event => {
        event.preventDefault();

        this.setState({
            changeDPText: "Uploading..."
        })

        var input = document.getElementById(this.state.picture.index);
        var fileBody = new FormData();
        fileBody.append(this.state.picture.name, input.files[0]);

        const fileConfig = {
            headers: {
                "accept": "application/json",
                "Content-type": "multipart/form-data",
                "x-auth-token": this.props.auth.token
            }
        }

        axios.post(API_DOMAIN+"/users/uploadDP", fileBody, fileConfig)
        .then(res => {
            console.log(res);
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })
    }


    render() {
        if (!this.props.showPane){
            return null;
        }
        return (
            <div className="editProjectsOverlay">
                <div className="editProjectsOverlayContainer">
                <div className="overlayButtonsContainer">
                    <button className="cancelButton" onClick={this.cancelHandler}><i class="material-icons">close</i></button> 
                </div>
                    {
                        this.props.user && (
                            <div className="editProjectsContainer">
                                <div className="editBioForm">
                                    <div className="column">
                                        <h3>Profile Information</h3>
                                        <form onSubmit={this.handleSubmit}>
                                            <label>Name:</label>
                                            <br></br>
                                            <input type="text" onChange={this.firstnameChange} defaultValue={this.props.user.firstname}/>
                                            <br></br>
                                            <input type="text" onChange={this.lastnameChange} defaultValue={this.props.user.lastname}/>
                                            <br></br>
                                            <label>Bio: </label>
                                            <br></br>
                                            <textarea onChange={this.bioChange} defaultValue={this.props.user.bio.text}/>
                                            <br></br>
                                            <input type="submit" value={this.state.saveBioText} />
                                            <br></br>
                                        </form>
                                    </div>
                                    <div className="column">
                                        {/* <button onClick={this.showProfilePicEdit}>Change Profile Picture</button> */}
                                        {/* {
                                            this.state.changePicture && ( */}
                                        <div>
                                            <h3>Profile Picture</h3>
                                            <img src={this.props.user.picture} alt="User Profile Picture" />
                                            <form onSubmit={this.handleDPSubmit}>
                                                <label>Upload Profile Picture: </label>
                                                <br></br><br></br>
                                                <input onChange={this.handleFileChange} type="file" id="dpUpload" name="userFile"/>
                                                <br></br><br></br>
                                                <input type="submit" value={this.state.changeDPText} />
                                            </form>
                                        </div>
                                        {/* )
                                            } */}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    
                    

                </div>
            </div>
        )
    }
}

export default EditBioPane;