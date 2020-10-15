import React from "react";
import NavBar from '../common/navbar.js';
import ProfileBio from './profileBio.js';
import ProjectCard from './projectCard.js';
import EditProjectsPane from './editProjects/editProjectsPane.js';
import EditBioPane from './editProjects/editBioPane.js';
import './profile.css'
import axios from 'axios';

// Redux imports
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { API_DOMAIN } from "../config.js";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      isLoggedIn: true,
      editPane: false,
      userdata: null,
      bioPane: false
    };

    this.showEditPane = this.showEditPane.bind(this);
    this.closeEditPane = this.closeEditPane.bind(this);

    this.showBioPane = this.showBioPane.bind(this);
    this.closeBioPane = this.closeBioPane.bind(this);
  }

  // Redux state props
  static propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object
  }

  componentDidMount() {
    this.setState( {
      userid: this.props.match.params.userid
    });

    axios.get(API_DOMAIN+'/users/'+this.props.match.params.userid)
        .then(res => {
            this.setState({
              userdata: res.data
            });
            //console.log(this.state.userdata);
          }
        )
        .catch(err => {
            //console.error(err);
            this.props.history.push('/');
            // Handle user doesn't exist here
        });
  }

  // Fetch user data when new props are received from URL as component doesn't remount between props changes,
  // i.e. (going between different profiles).
  // e.g. if I'm on profile/jim, then click on "Profile" in the navbar to go to my profile, profile/jack, 
  // then the component doesn't remount.
  // Thus we need to fetch user data again

  componentWillReceiveProps(newProps) {
    // get projidlist from api using userid
    axios.get(API_DOMAIN+'/users/'+newProps.match.params.userid)
        .then(res => {
            this.setState({
              userdata: res.data
            });
            console.log(this.state.userdata);
          }
        )
        .catch(err => {
            console.error(err);
            this.props.history.push('/');
            // Handle user doesn't exist here
        });
  }

  showEditPane() {
    this.setState({
      editPane: true
    })
  }

  closeEditPane() {
    this.setState( {
      editPane: false
    })
  }

  showBioPane() {
    this.setState({
      bioPane: true
    })
  }

  closeBioPane() {
    this.setState({
      bioPane: false
    })
  }
  

  render() {
    if (this.state.userdata == null) {
      return null;
    }

    var userProjects = [];
    var projList = [];

    if (Object.keys(this.state.userdata).length > 0) {
      //console.log('userdata is set');
      userProjects = this.state.userdata.projects;
      //console.log(userProjects);
      projList = userProjects.map((project, index) => <ProjectCard projid={parseInt(index)} project={project} key={index} />)
      //console.log(projList);
    }
    
    // Check if this page is the logged in user's page to allow editing or not.
    var editAllowed;
    const user = this.props.user;
    if (this.props.auth.isAuthenticated && user !== null) {
      editAllowed = (this.props.match.params.userid === user.username);
    }
    else {
      editAllowed = false;
    }

    // Render
    return (
        <div className="profileContainer">
          <NavBar userid={this.state.userid} isHome={false}/>
          <EditProjectsPane history={this.props.history} projects={userProjects} onCancel={this.closeEditPane} showPane={this.state.editPane}/>
          <EditBioPane onCancel={this.closeBioPane} showPane={this.state.bioPane}/>
          <div className="profilePageContainer">
            <div className="profileBody">
              <div className="profileBioBody">
                <ProfileBio 
                  user={this.state.userdata} 
                  userid={this.state.userid} />
              </div>
              <div className="projectListContainer">
                { editAllowed ? (
                    <div className="editButtons">
                      <button className="editProjectsButton" onClick={this.showEditPane}>Edit Projects</button>
                      <button className="editProfileButton" onClick={this.showBioPane}>Edit Profile</button>
                    </div>
                  ) :
                  (
                    <div className="editButtons">
                      <button>Add {this.state.userdata.firstname} to your Circle</button>
                    </div>
                  )
                }
                <div className="projectCardsList">
                  {projList}
                </div>
              </div>            
            </div>
          </div>
        </div>
    );
  }

}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  null
)(ProfilePage);
