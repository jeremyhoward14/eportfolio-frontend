import React from "react";
import {Link} from "react-router-dom";
import "./search.css";


export default class ProjectResult extends React.Component {
    constructor(props) {
        super(props);
        this.imageRender = this.imageRender.bind(this);
    }

    imageRender() {
        if (this.props.project.project.attachments.length === 0){
            return null;
        }
        else {
            // only show if the filetype is an image
            if (/\.(jpeg|jpg|gif|png)$/.test(this.props.project.project.attachments[0].url)){
                return (
                    <div className="searchImage">
                        <img src={this.props.project.project.attachments[0].url} alt={this.props.project.project.title}/>
                    </div>
                );
           }
        }
    }

    render() {
        // only print the first 150 characters of the text
        var text;
        if (this.props.project.project.text.length > 300) {
            text = this.props.project.project.text.substring(0, 300) + " ...";
        }
        else {
            text = this.props.project.project.text;
        }

        return (
            <div className="searchResult">
                {this.imageRender()}
                <Link to={"/profile/" + this.props.project.username}>
                    <h3>{this.props.project.project.title}</h3>
                </Link>
                <p>{text}</p>
                
            </div>
        )
    }

}