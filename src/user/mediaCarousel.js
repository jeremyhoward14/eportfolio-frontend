import React from "react";
import './mediaCarousel.css';
import MediaSlide from './mediaSlide.js';

class MediaCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSlide: 0,
            numSlides: 0
        }
        // this.projid = props.projid;

        // load media
        // fetch media URLs from database using API based off projid
        const attachments = this.props.project.attachments;
        var URLs = []
        for (let i=0; i<attachments.length; i++) {
            URLs.push(attachments[i].url);
        }
        //const mediaURLs = ["https://arxiv.org/pdf/1505.04597.pdf", "https://miro.medium.com/max/2510/1*vkQ0hXDaQv57sALXAJquxA.jpeg", "https://s6.postimg.cc/unjz87dz5/grd.png"]

        // map to divs
        const mediaList = URLs.map((url, index) => <MediaSlide url={url} key={index} index={index} project={this.props.project} total={URLs.length}/>)

        this.state = {
            mediaList: mediaList,
            numSlides: mediaList.length,
            currentSlide: 0
        }

        // bind functions
        this.showSlide = this.showSlide.bind(this);
        this.initialiseSlides = this.initialiseSlides.bind(this);
        this.nextSlide = this.nextSlide.bind(this);
        this.prevSlide = this.prevSlide.bind(this);
    }

    showSlide() {
        var slides = document.getElementsByClassName("mediaSlide " + this.projid);

        if (slides.length !== 0){
            // show the slide with the given index
            slides[this.state.currentSlide].style.display = "block";

            // hide the other slides
            var i;
            for (i = 0; i < slides.length; i++){
                if (i !== this.state.currentSlide) {
                    slides[i].style.display = "none";
                }
            }
        }   
    }

    nextSlide() {
        if (this.state.currentSlide + 1 >= this.state.numSlides){
            this.setState({
                currentSlide: 0
            })
        }
        else {
            this.setState({
                currentSlide: this.state.currentSlide + 1
            })
        }
    }

    prevSlide() {
        if (this.state.currentSlide - 1 < 0){
            this.setState({
                currentSlide: this.state.numSlides - 1
            })
        }
        else {
            this.setState({
                currentSlide: this.state.currentSlide - 1
            })
        }
    }

    initialiseSlides() {
        return (
            <div className="mediaSlides">
                {this.state.mediaList}
                {this.showSlide()}
            </div>
        )
    }

    render() {
        return (
            <div className="mediaCarousel">
                <this.initialiseSlides />
                <div className="buttons">
                    <a className="prevButton" onClick={this.prevSlide}>&#10094;</a>
                    <a className="nextButton" onClick={this.nextSlide}>&#10095;</a>
                </div>
            </div>
        )
    }
}

export default MediaCarousel;
