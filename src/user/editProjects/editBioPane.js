import React from "react";
import './editProjectsPane.css';

class EditBioPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changePicture: false
        }

        this.cancelHandler = this.cancelHandler.bind(this);
        this.showProfilePicEdit = this.showProfilePicEdit.bind(this);
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

    render() {
        if (!this.props.showPane){
            return null;
        }
        return (
            <div className="editProjectsOverlay">
                <div className="editProjectsOverlayContainer">
                <div className="overlayButtonsContainer">
                        <button className="cancelButton" onClick={this.cancelHandler}>Cancel</button>
                    </div>
                    <div className="editProjectsContainer">
                        <form>
                            <label>Name: </label>
                            <br></br>
                            <input type="text" placeholder="First name"/>
                            <br></br>
                            <input type="text" placeholder="Last name"/>
                            <br></br>
                            <label>Bio: </label>
                            <br></br>
                            <textarea placeholder=""/>
                            <br></br>
                            <button onClick={this.showProfilePicEdit}>Edit Profile Picture</button>
                            {
                                this.state.changePicture && (
                                    <div>
                                        <label>Upload Profile Picture: </label>
                                        <input type="file"/>
                                    </div>
                                )
                            }
                            
                        </form>
                    </div>
                    

                </div>
            </div>
        )
    }
}

export default EditBioPane;