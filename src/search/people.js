import React from "react";
import NavBar from "../common/navbar";
import PeopleResult from "./peopleResult";
import "./search.css";

// export default function PeopleSearch() {
//     return (
//         <PeopleSearchPage />
//     )
// }

export default class PeopleSearchPage extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div>
                <NavBar />
                <div className="resultsContainer">
                    <div className="searchDescription">
                        <h2> Search results for {this.props.search}</h2>
                        <PeopleResult user={
                            {name: "Mark Zuckerberg", 
                            headline: "Tech Billionaire and Founder @ Facebook", 
                            bio: "Hi! My name is Mark. I founded Facebook. Come check out my ePortfolio.",
                            image: "",
                            url: "/"}
                        } />
                        <PeopleResult user={
                            {name: "Mark Cluckerberg", 
                            headline: "Software Engineering Student", 
                            bio: "Hi! My name is Mark. I want to be a software developer."}
                        } />
                        <PeopleResult user={
                            {name: "Mark Z", 
                            headline: "Headline goes here.", 
                            bio: "Hey"}
                        } />
                        <PeopleResult user={
                            {name: "Mark Zuckerberg", 
                            headline: "Tech Billionaire and Founder @ Facebook", 
                            bio: "Hi! My name is Mark. I founded Facebook. Come check out my ePortfolio.",
                            image: "",
                            url: "/"}
                        } />
                        <PeopleResult user={
                            {name: "Mark Cluckerberg", 
                            headline: "Software Engineering Student", 
                            bio: "Hi! My name is Mark. I want to be a software developer."}
                        } />
                        <PeopleResult user={
                            {name: "Mark Z", 
                            headline: "Headline goes here.", 
                            bio: "Hey"}
                        } />
                        <PeopleResult user={
                            {name: "Mark Zuckerberg", 
                            headline: "Tech Billionaire and Founder @ Facebook", 
                            bio: "Hi! My name is Mark. I founded Facebook. Come check out my ePortfolio.",
                            image: "",
                            url: "/"}
                        } />
                        <PeopleResult user={
                            {name: "Mark Cluckerberg", 
                            headline: "Software Engineering Student", 
                            bio: "Hi! My name is Mark. I want to be a software developer."}
                        } />
                        <PeopleResult user={
                            {name: "Mark Z", 
                            headline: "Headline goes here.", 
                            bio: "Hey"}
                        } />
                        <PeopleResult user={
                            {name: "Mark Zuckerberg", 
                            headline: "Tech Billionaire and Founder @ Facebook", 
                            bio: "Hi! My name is Mark. I founded Facebook. Come check out my ePortfolio.",
                            image: "",
                            url: "/"}
                        } />
                        <PeopleResult user={
                            {name: "Mark Cluckerberg", 
                            headline: "Software Engineering Student", 
                            bio: "Hi! My name is Mark. I want to be a software developer."}
                        } />
                        <PeopleResult user={
                            {name: "Mark Z", 
                            headline: "Headline goes here.", 
                            bio: "Hey"}
                        } />
                        <PeopleResult user={
                            {name: "Mark Zuckerberg", 
                            headline: "Tech Billionaire and Founder @ Facebook", 
                            bio: "Hi! My name is Mark. I founded Facebook. Come check out my ePortfolio.",
                            image: "",
                            url: "/"}
                        } />
                        <PeopleResult user={
                            {name: "Mark Cluckerberg", 
                            headline: "Software Engineering Student", 
                            bio: "Hi! My name is Mark. I want to be a software developer."}
                        } />
                        <PeopleResult user={
                            {name: "Mark Z", 
                            headline: "Headline goes here.", 
                            bio: "Hey"}
                        } />

                    </div> 
                </div>
                
            </div>
        )
    }


}