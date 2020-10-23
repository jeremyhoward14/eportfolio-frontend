import Axios from "axios";
import React from "react";
import axios from 'axios';
import { API_DOMAIN } from "../config";
import './profileBio.css';

class ProfileBio extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            circleList: []
        }
    }

    componentDidUpdate() {
        this.mapCircle();
    }

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
        async function getCircleData(self) {
            var circle = self.props.user.circle;
            var circleList = []
            for (let i=0; i<circle.length; i++) {
                await axios.get(API_DOMAIN+"/users/"+circle[i])
                .then(res => {
                    circleList.push(res.data);
                })
                .catch(err => {
                    console.log(err);
                })

                
            } 
            return circleList;          
        }

        var circleResponse = getCircleData(this);
        circleResponse.then(response => {
            //console.log(response);
            var renderResult = response.map((user) => (
            <a key={user.username} href={"/profile/"+user.username} style={{"textDecoration": "none"}}>
                <div className="circleEntry">
                    {
                        user.picture ? (
                            <img src={user.picture} alt="User Profile Picture"/>
                        ) :
                        (
                            <img src={"../noprofile.jpg"} alt="User Profile Picture"/>
                        )
                    }
                    <h4>{user.firstname + " " + user.lastname}</h4>
                </div>
            </a>
            
            ));
            this.setState({
                circleList: renderResult
            });
            //console.log(renderResult);
        });
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
                   (this.props.user.picture) ? (
                       <div>
                            <img src={this.props.user.picture} alt="Profile Picture" />
                       </div>
                   ) : (
                        <div>
                            <img src="../noprofile.jpg" alt="Profile Picture" />
                       </div>
                   )
                }
                <hr />
                {/* Render description if it has been fetched from parent */} {/* Currently not in DB */}
                {
                   (this.props.user.bio) ? (
                       (
                        this.props.user.bio.text ?
                        <div>
                            {
                                this.props.user.bio.text.length > 0 ?
                                <p>{this.props.user.bio.text}</p> :
                                <p><i>{this.props.user.firstname} has no bio yet</i></p>
                            }
                        </div> :
                        <div>
                            <p><i>{this.props.user.firstname} has no bio yet</i></p>
                        </div>
                       )   
                    ) : (
                        <div>
                            <p><i>{this.props.user.firstname} has no bio yet</i></p>
                        </div>
                    )
                }
                <hr />
                {/* Render email if it has been fetched from parent */}
                {
                   (this.props.user.email) && (
                       <div>
                            <b>Email:</b> <a href={"mailto:"+this.props.user.email}>{this.props.user.email}</a>
                       </div>
                   )
                }
                <hr />
                {
                    (this.props.user.circle.length > 0) ? (
                        <div>
                            <h3>{this.props.user.firstname}'s Circle</h3>
                            {this.state.circleList}
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