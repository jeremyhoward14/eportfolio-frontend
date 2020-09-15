import React from "react";
import './profileBio.css';

class ProfileBio extends React.Component {
    constructor(props) {
        super(props);
    }

    // eventually replace these getters with requests to the API
    getName() {
        const name = "Test Name";
        return (
            <h3>{name}</h3>
        );
    }

    getDisplayPicture() {
        // replace img_src with the actual img URL
        const img_src = "https://t3.ftcdn.net/jpg/00/64/67/80/240_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg";
        return (
            <img src={img_src} alt="Profile" />
        )
    }

    getBio() {
        const bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dignissim purus sed ante elementum, eget ultricies massa pulvinar. Mauris egestas ante a dolor dignissim eleifend. Fusce feugiat quam eu scelerisque tempor. Nullam ac ullamcorper ipsum, vitae commodo justo. Aliquam erat volutpat. Pellentesque blandit, nibh vitae suscipit pretium, nulla nulla consectetur neque, sollicitudin vehicula magna leo vitae turpis. Nam commodo nunc ut quam vestibulum, at malesuada nisl aliquam. Pellentesque sit amet ligula et libero rhoncus tincidunt ut et nulla. Maecenas semper, arcu et vehicula ultrices, libero nibh mollis mi, et fermentum diam orci ac erat.";
        return (
            <p>{bio}</p>
        );
    }

    getContactDetails() {
        const details = "0123 456 789"
        return (
            <p>{details}</p>
        );
    }

    render() {
        return (
            <div className="bioContainer">
                {/* <h3>userid: {this.props.userid}</h3> */}
                {this.getName()}
                {this.getDisplayPicture()}
                {this.getBio()}
                {this.getContactDetails()}
            </div>
        )
    }
}

export default ProfileBio