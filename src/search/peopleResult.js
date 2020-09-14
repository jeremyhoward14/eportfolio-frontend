import React from "react";
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
                <img src={this.props.user.image} alt={this.props.user.name}/>
                <h3><a href={this.props.user.url}>{this.props.user.name}</a></h3>
                <p><strong>{this.props.user.headline}</strong></p>
                <p>{this.props.user.bio}</p>
                
            </div>
        )
    }


}