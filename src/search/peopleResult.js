import React from "react";
import { Link } from "react-router-dom";
import "./search.css";
// export default function PeopleResult() {
//     return (
//         <PeopleResultDiv name={}/>
//     )
// }

export default class PeopleResult extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className="searchResult">
                
                <img src={this.props.user.image} alt={this.props.user.username}/>
                <Link to={"/profile/" + this.props.user.username}>
                    <h3><a href={this.props.user.url}>{this.props.user.firstname} {this.props.user.lastname}</a></h3>
                </Link>
                <p><strong>{this.props.user.headline}</strong></p>
                <p>{this.props.user.bio}</p>
                
            </div>
        )
    }


}