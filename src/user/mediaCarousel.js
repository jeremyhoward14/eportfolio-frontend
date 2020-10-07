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
        this.projid = props.projid;

        // bind functions
        this.showSlide = this.showSlide.bind(this);
        this.nextSlide = this.nextSlide.bind(this);
        this.prevSlide = this.prevSlide.bind(this);
    }

    showSlide() {
        console.log("i've been called! index = %d", this.state.currentSlide);
        var slides = document.getElementsByClassName("mediaSlide " + this.projid);

        if (this.state.currentSlide < 0) {
            this.setState({
                currentSlide: slides.length - 1
            });
        }

        if (this.state.currentSlide > (slides.length - 1)) {
            this.setState({
                currentSlide: 0
            });
        }

        console.log("slides length: %d", slides.length)
        if (slides.length !== 0){
            console.log("trying to show slide with index %d", this.state.currentSlide)
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
        if (this.state.currentSlide - 1 <= 0){
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

    componentDidMount(){
        // fetch media URLs from database using API based off projid
        const mediaURLs = ["https://arxiv.org/pdf/1505.04597.pdf", "https://miro.medium.com/max/2510/1*vkQ0hXDaQv57sALXAJquxA.jpeg"]

        // map to divs
        const mediaList = mediaURLs.map((url, index) => <MediaSlide url={url} key={index} index={index} projid={this.projid} total={mediaURLs.length}/>)

        this.setState({
            mediaList: mediaList,
            numSlides: mediaList.length
        });
    }

    render() {
        return (
            <div className="mediaCarousel">
                <div className="mediaSlides">
                    {this.state.mediaList}
                    {this.showSlide()}
                </div>
                <div className="buttons">
                    <button className="prevButton" onClick={this.prevSlide}>&#10094;</button>
                    <button className="nextButton" onClick={this.nextSlide}>&#10095;</button>
                </div>
            </div>
        )
    }
}

export default MediaCarousel;