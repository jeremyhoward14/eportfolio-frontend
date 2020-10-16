import React from "react";
import ListEntry from './listEntry.js';

class ProjectList extends React.Component {
    constructor(props) {
        super(props);        
        this.state = {
            projects: this.props.projidList
        }
        this.selectHandler = this.selectHandler.bind(this);
    }

    componentDidUpdate(prevProps) {

        if (prevProps.projidList !== this.props.projidList) {
            this.setState({projects: this.props.projidList});
        }
    }
    // should probably "componentDidUpdate()" to get projects rather than passing them via props.
    // Then a project will add visually as soon as the user creates one

    selectHandler(projid) {
        this.props.onSelect(projid);
    }

    render() {
        const projNameList = this.state.projects.map((project, index) => <ListEntry project={project} key={index} onSelect={this.selectHandler}/>)
        return (
            <div className="projNameList">
                {projNameList}
            </div>
        )
    }
}

export default ProjectList;