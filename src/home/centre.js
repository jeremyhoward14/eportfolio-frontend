import React from 'react';
import ReactDOM from "react-dom";
import Searchbar from '../common/searchbar.js'
import './centre.css'

export default function Centre() {
    return (
        new CentralArea()
    );
}

class CentralArea extends React.Component {
    render() {
        return(
            <div className="centralContainer">
                <img alt="CircleSpace" src='./Logo.svg' />
                <div className="text">
                    <h3>Welcome to CircleSpace! Search below for people, projects, tags, etc.</h3>
                </div>
                <div className="searchArea">
                    <Searchbar />
                </div>                
            </div>
        )
    }
}