import React from "react";
import Slider from "react-slick";

class mediaCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projid = props.projid
        }

        this.getMedia = this.getMedia.bind(this);
    }

    getMedia() {
        // fetch media URLs from database using API based off projid
        mediaURLs = ["https://arxiv.org/pdf/1505.04597.pdf", "https://miro.medium.com/max/2510/1*vkQ0hXDaQv57sALXAJquxA.jpeg"]

        // map to divs
        
    }

    render() {
        var settings = {
            dots: true,
            infinite: true,
            slidesToShow: 1
        }
        return (
            <Slider {...settings}>

            </Slider>
        )
    }
}