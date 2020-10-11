import React from "react";

class ListEntry extends React.Component {
    constructor(props) {
        super(props);
        this.onProjectSelect = this.onProjectSelect.bind(this);
    }

    getProjName(projid){
        // call for name from api
        var projname = projid;
        return projname;
    }

    onProjectSelect(){
        this.props.onSelect(this.props.projid);
    }

    render() {
        return (
            <div className="listEntry">
                <button onClick={this.onProjectSelect}>{this.getProjName(this.props.projid)}</button>
            </div>
        )
    }
}

export default ListEntry;