import React from "react";
import ListEntry from './listEntry.js';

class ProjectList extends React.Component {
    constructor(props) {
        super(props);
        
        this.selectHandler = this.selectHandler.bind(this);
    }

    selectHandler(projid) {
        this.props.onSelect(projid);
    }

    render() {
        const projNameList = this.props.projidList.map((project, index) => <ListEntry project={project} key={index} onSelect={this.selectHandler}/>)
        return (
            <div className="projNameList">
                {projNameList}
            </div>
        )
    }
}

export default ProjectList;