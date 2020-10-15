import React from "react";
import './mediaSlide.css';

class MediaSlide extends React.Component {
    constructor(props) {
        super(props);
        this.url = props.url;
        this.index = props.index;
        this.total = props.total;

        this.projid = props.projid;

        this.MediaDiv = this.MediaDiv.bind(this);
        this.getFiletype = this.getFiletype.bind(this);
    }

    getFiletype() {
        return (this.props.url).split(/[#?]/)[0].split('.').pop().trim();
    }

    MediaDiv() {
        // get filetype
        const filetype = this.getFiletype();

        // create div based on filetype
        switch(filetype) {
            case "JPG":
            case "jpg":
            case "JPEG":
            case "jpeg":
            case "PNG":
            case "png":
                return(
                    <img src={this.props.url} />
                )
            case "pdf":
                return(
                    <object data={this.props.url} type="application/pdf">
                        <embed src={this.props.url} type="application/pdf" />
                    </object>
                )
            case "doc":
                return(
                    <object data={this.props.url} type="application/msword">
                        <embed src={this.props.url} type="application/msword" />
                    </object>
                )
            case "docx":
                return (
                    <object data={this.url} type="application/msword">
                        <embed src={this.url} type="application/msword" />
                    </object> 
                )
        }
    }

    render() {
        if (this.props.url == null) {
            return null;
        }
        return (
            <div className={"mediaSlide " + (this.props.projid)}>
                <div className="numbertext">{this.index + 1} / {this.total}</div>
                    <div className="media">
                        {this.MediaDiv()}
                    </div>


            </div>
            // <div>
            //     { (this.props.index == 0) ? 
            //         (<div className={"mediaSlide " + (this.props.projid)}>
            //             <div className="numbertext">{this.index + 1} / {this.total}</div>
            //             <div className="media">
            //                 <this.MediaDiv />
            //             </div>
            //         </div>) : 
            //         (<div className={"mediaSlide " + (this.props.projid)}>
            //             <div className="numbertext">{this.index + 1} / {this.total}</div>
            //             <div className="media">
            //                 <this.MediaDiv />
            //             </div>
            //         </div>)
            //     }
            // </div>
            
            // <div className={"mediaSlide " + (this.props.projid)}>
            //     {this.display()}
            //     <div className="numbertext">{this.index + 1} / {this.total}</div>
            //     <div className="media">
            //         <this.MediaDiv />
            //     </div>
            // </div>
        )
    }
}

export default MediaSlide;