import React from "react";
import { Link } from "react-router-dom";
import "./search.css";
// export default function PeopleResult() {
//     return (
//         <PeopleResultDiv name={}/>
//     )
// }

export default class PeopleResult extends React.Component {
    constructor(props) {
        super(props);

        this.imageRender = this.imageRender.bind(this);
    }

    imageRender() {
        if (this.props.user.picture === ""){
            return (
                <div className="searchImage">
                    <img src="../public/noprofile.jpg" />
                </div>
            )
        }
        else {
            return (
                <div className="searchImage">
                    <img src={this.props.user.picture} alt={this.props.user.username}/>
                </div>     
            )
        }
    }

    render() {
        // only print the first 150 characters of the biotext
        var biotext = this.props.user.bio.text.substring(0, 150) + " ...";

        return (
            <div className="searchResult"> 
                {this.imageRender()}
                <Link to={"/profile/" + this.props.user.username}>
                    <h3>{this.props.user.firstname} {this.props.user.lastname}</h3>
                </Link>
                <p>{biotext}</p>
                
            </div>
        )
    }


}