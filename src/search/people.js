import React from "react";
import NavBar from "../common/navbar";
import PeopleResult from "./peopleResult";
import "./search.css";
import peopleExample from "./peopleExample.json"

// export default function PeopleSearch() {
//     return (
//         <PeopleSearchPage />
//     )
// }

export default class PeopleSearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {users: peopleExample};
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="resultsContainer">
                    <div className="searchDescription">
                        <h2> Search results for {this.props.search}</h2>
                        {this.state.users.map(function(userItem, i){
                            return <PeopleResult user={userItem} key={i} />;
                        })}
                    </div> 
                </div> 
            </div>
        )
    }


}