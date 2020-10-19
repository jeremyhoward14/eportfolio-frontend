import Axios from "axios";
import React from "react";
import axios from 'axios';
import { API_DOMAIN } from "../config";
import './profileBio.css';

class ProfileBio extends React.Component {

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         circle: this.props.user.circle
    //     }
    // }

    getCircle() {
        axios.get(API_DOMAIN+"/circle/"+this.props.user.username)
        .then(res => {
            //console.log(res);
            this.setState({
                circle: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    mapCircle() {
        console.log(this.props.user.circle);
        var circle = this.props.user.circle.map((user) => (
            <div key={user} className="circleEntry">
                <a href={"/profile/"+user}>{user}</a>
            </div>
        ))

        return circle;
    }

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
                {
                    (this.props.user.circle.length > 0) ? (
                        <div>
                            <h3>{this.props.user.firstname}'s Circle</h3>
                            {this.mapCircle()}
                        </div>
                    ) :
                    (
                        <div>
                            <h3>{this.props.user.firstname}'s Circle</h3>
                            <p>{this.props.user.firstname} has not added anyone to their circle.</p>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default ProfileBio;