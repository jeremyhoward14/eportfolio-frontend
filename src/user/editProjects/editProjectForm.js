import React from "react";

class EditProjectForm extends React.Component {
    constructor(props) {
        super(props);

        // populate state after calling api
        this.state = {
            projid: props.projid,
            name: "test",
            desc: "test",
            file: ""
        }
    }

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    handleDescChange = (e) => {
        this.setState({
            desc: e.target.value
        });
    }
    

    render() {
        if (!this.props.projid) {
            return null;
        }

        return (
            <form>
                <input type="text" id="name" placeholder="Project Name" value={this.state.name} onChange={this.handleNameChange}></input>
                <br></br>
                <textarea id="description" placeholder="Project Description" value={this.state.desc} onChange={this.handleDescChange}></textarea>
                <br></br>
                <input type="file" id="file"></input>
            </form>
        )
    }
}

export default EditProjectForm;