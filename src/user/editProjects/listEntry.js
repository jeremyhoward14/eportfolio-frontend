import React from "react";

class ListEntry extends React.Component {
    constructor(props) {
        super(props);
        var URLs = []
        for (let i=0; i<this.props.project.attachments.length; i++) {
            URLs.push(this.props.project.attachments[i].url);
        }

        // map to divs
        const attachments = URLs.map((url) => <p>{url}</p>)

        this.state = {
            showEdit: false,
            attachments: attachments
        }
        this.onProjectSelect = this.onProjectSelect.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
    }

    getProjName(project){
        // call for name from api
        var projname = project;
        return projname;
    }

    onProjectSelect(){
        //this.props.onSelect(this.props.project);
        // switch the value of showEdit on Button Click
        this.setState({
            showEdit: !this.state.showEdit
        })
    }

    getFileName(url) {
        url.reverse();
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("Submitting with API...")
    }

    deleteProject() {
        console.log("Deleting project...")
    }

    render() {
        return (
            <div className="listEntry">
                <button className="listEntryProject" onClick={this.onProjectSelect}>{this.props.project.title}</button>
                <button className="listEntryDelete" onClick={this.deleteProject}>Delete</button>

                {
                    this.state.showEdit && (
                        <div className="editProjectForm">
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" placeholder={this.props.project.title}/>
                                <br></br>
                                <textarea placeholder={this.props.project.text} />
                                <br></br>
                                <div>
                                    <h3> Attachments: </h3>
                                    <div>{this.state.attachments}</div>
                                </div>
                                <input type="submit" value="Save" />
                            </form>
                        </div>
                    )
                }

            </div>
        )
    }
}

export default ListEntry;