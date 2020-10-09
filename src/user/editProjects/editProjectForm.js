import React from "react";

class EditProjectForm extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <form>
                <input type="text" id="name" placeholder="Project Name"></input>
                <br></br>
                <input type="text" id="description" placeholder="Project Description"></input>
                <br></br>
            </form>
        )
    }
}

export default EditProjectForm;