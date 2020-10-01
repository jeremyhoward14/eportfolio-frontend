import React from "react";
import './mediaCarousel.css';
import MediaSlide from './mediaSlide.js';

class MediaCarousel extends React.Component {
    constructor(props) {
        super(props);
    }


    // getMediaDiv(url){
    //     // get filetype
    //     const filetype = this.getFiletype(url);

    //     // create div based on filetype
    //     switch(filetype) {
    //         case "jpeg":
    //             return(
    //                 <img src={url} />
    //             )
    //         case "pdf":
    //             return(
    //                 <object data={url} type="application/pdf">
    //                     <embed src={url} type="application/pdf" />
    //                 </object>
    //             )
    //     }
    // }

    // mediaSlide(url, index, total) {
    //     return (
    //         <div className="mediaSlide">
    //             <div className="numbertext">{index} / {total}</div>
    //             <div className="media">
    //                 <getMediaDiv URL={url} />
    //             </div>
    //             <p> test </p>
    //         </div>
    //     )
    // }


    render() { 
        // fetch media URLs from database using API based off projid
        const mediaURLs = ["https://arxiv.org/pdf/1505.04597.pdf", "https://miro.medium.com/max/2510/1*vkQ0hXDaQv57sALXAJquxA.jpeg"]

        // map to divs
        const mediaList = mediaURLs.map((url, index) => <MediaSlide url={url} key={index} index={index} total={mediaURLs.length}/>)

        return (
            <div className="mediaCarousel">
                <div className="mediaSlides">
                    {mediaList}
                </div>
                <div className="buttons">
                    <a className="prevButton" onclick="plusSlides(-1)">&#10094;</a>
                    <a className="nextButton" onclick="plusSlides(1)">&#10095;</a>
                </div>
            </div>
        )
    }
}

export default MediaCarousel;