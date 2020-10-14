import React from "react";
import './profileBio.css';

class ProfileBio extends React.Component {

    render() {
        return (
            <div className="bioContainer">
                {/* Render name if it has been fetched from parent */}
                {
                    (this.props.user.firstname && this.props.user.lastname) && (
                        <div>
                            <h3>{this.props.user.firstname + " " + this.props.user.lastname}</h3>
                        </div>
                    )
                }
                {/* Render profile pic if it has been fetched from parent, else render default pic */} {/* Currently not in DB */}
                {
                   (this.props.user.image) ? (
                       <div>
                            <img src={this.props.user.image} alt="Profile Picture" />
                       </div>
                   ) : (
                        <div>
                            <img src={"https://t3.ftcdn.net/jpg/00/64/67/80/240_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"} alt="Profile Picture" />
                       </div>
                   )
                }
                {/* Render description if it has been fetched from parent */} {/* Currently not in DB */}
                {
                   (this.props.user.bio) ? ( 
                       <div>
                            <p>{this.props.user.bio}</p>
                       </div>
                   ) : (
                        <div>
                            <p><i>{this.props.user.firstname} has no bio yet</i></p>
                        </div>
                   )
                }
                {/* Render email if it has been fetched from parent */}
                {
                   (this.props.user.email) && (
                       <div>
                            <b>Email:</b> <a href={"mailto:"+this.props.user.email}>{this.props.user.email}</a>
                       </div>
                   )
                }
            </div>
        )
    }
}

export default ProfileBio;