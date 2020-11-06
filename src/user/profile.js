import React from "react";
import NavBar from '../common/navbar.js';
import ProfileBio from './profileBio.js';
import ProjectCard from './projectCard.js';
import EditProjectsPane from './editPanes/editProjectsPane.js';
import EditBioPane from './editPanes/editBioPane.js';
import EditPicturePane from './editPanes/editPicturePane';
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
      bioPane: false,
      inCircle: false,
      authCircle: [],
      adding: false,
      removing: false,
      picturePane: false
    };

    this.showEditPane = this.showEditPane.bind(this);
    this.closeEditPane = this.closeEditPane.bind(this);

    this.showBioPane = this.showBioPane.bind(this);
    this.closeBioPane = this.closeBioPane.bind(this);

    this.showPicturePane = this.showPicturePane.bind(this);
    this.closePicturePane = this.closePicturePane.bind(this);

    this.checkIfInCircle = this.checkIfInCircle.bind(this);
    this.addToCircle = this.addToCircle.bind(this);
    this.removeFromCircle = this.removeFromCircle.bind(this);
    //this.getAuthCircle = this.getAuthCircle.bind(this);
    
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
          //console.log(res.data);
            this.setState({
              userdata: res.data
            });
            //this.getAuthCircle();
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
          //console.log(res.data);
            this.setState({
              userdata: res.data
            });
            //console.log(res.data);
            //console.log(this.state.userdata);
          }
        )
        .catch(err => {
            console.error(err);
            this.props.history.push('/');
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

  showPicturePane() {
    this.setState({
      picturePane: true
    })
  }

  closePicturePane() {
    this.setState({
      picturePane: false
    })
  }

  addToCircle= (e) => {
    e.preventDefault();
    this.setState({
      adding: true
    })
    const config = {
      headers: {
        'x-auth-token': this.props.auth.token
      }
    }

    const body = {}

    axios.post(API_DOMAIN+"/circle/add/"+this.props.match.params.userid, body, config)
    .then(res => {
      console.log(res);
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
      window.location.reload();
    })

    //alert("Added");
  }

  removeFromCircle= (e) => {
    e.preventDefault();
    this.setState({
      removing: true
    })
    const config = {
      headers: {
        'x-auth-token': this.props.auth.token
      }
    }

    const body = {}

    axios.post(API_DOMAIN+"/circle/remove/"+this.props.match.params.userid, body, config)
    .then(res => {
      console.log(res);
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
      window.location.reload();
    })
  }

  // // Get the circle of the authenticated user
  // getAuthCircle() {
  //   axios.get(API_DOMAIN+"/circle/"+this.props.user.username)
  //   .then(res => {
  //       //console.log(res);
  //       this.setState({
  //           authCircle: res.data
  //       })
  //       this.checkIfInCircle();
  //   })
  //   .catch(err => {
  //       console.log(err)
  //   })
  // }

  // Check if this user is in the authenticated user's circle to determine Add/Remove button
  checkIfInCircle() {
    
    if (this.props.user) {
      var userCircle = this.state.userdata.circle;
      if (this.props.user.circle) { // Check that we have received the circle array of the authenticated user
        var authCircle = this.props.user.circle;
      
      
        for (let i=0; i<authCircle.length; i++) {
          if (authCircle[i] === this.state.userdata.username) {
            return true;
          }
          // for (let j=0; j<userCircle.length; i++) {
          //   if (authCircle[i] === userCircle[i]) {
          //     return true;
          //   }
          // }
        }

      }
    }
    
    return false;
  }

  mapCircle() {
    var circle = this.state.circle.map((user) => (
        <div key={user} className="circleEntry">
            <a href={"/profile/"+user}>{user}</a>
        </div>
    ))

    return circle;
  }

  render() {
    if (this.state.userdata == null) {
      return (
        <div className='loadingScreen'>
          <i className="material-icons w3-spin">refresh</i>
        </div>
      )
      
    }

    var userProjects = [];
    var projList = [];
    var userInfo = {};

    if (Object.keys(this.state.userdata).length > 0) {
      // this.checkIfInCircle();
      //console.log('userdata is set');
      userProjects = this.state.userdata.projects.slice().reverse();
      //console.log(userProjects);
      projList = userProjects.map((project, index) => <ProjectCard projid={parseInt(index)} project={project} key={index} />)
      //console.log(projList);
    }
    
    // Check if this page is the logged in user's page to allow editing or not.
    var editAllowed;
    const user = this.props.user;
    if (this.props.auth.isAuthenticated && user !== null) {
      editAllowed = (this.props.match.params.userid === user.username);
      if (editAllowed) {
        userInfo = this.props.user;
      }
    }
    else {
      editAllowed = false;
    }

    // Render
    return (
        <div className="profileContainer">
          <NavBar userid={this.state.userid} isHome={false}/>
          
          <div className="profilePageContainer">
            <div className="profileBody">
              <div className="profileBioBody">
                <ProfileBio 
                  user={this.state.userdata} 
                  userid={this.state.userid} />
              </div>
              <div className="projectListContainer">
                {
                  this.props.auth.isAuthenticated && (
                    editAllowed ? (
                      <div className="editButtons">
                        <button className="editProjectsButton" onClick={this.showEditPane}>Edit Projects</button>
                        <button className="editProfileButton" onClick={this.showBioPane}>Edit Profile</button>
                        <button className="editProjectsButton" onClick={this.showPicturePane}>Change Profile Picture</button>
                        <EditProjectsPane history={this.props.history} projects={userProjects} onCancel={this.closeEditPane} showPane={this.state.editPane}/>
                        <EditBioPane history={this.props.history} auth={this.props.auth} user={userInfo} onCancel={this.closeBioPane} showPane={this.state.bioPane}/>
                        <EditPicturePane history={this.props.history} auth={this.props.auth} user={userInfo} onCancel={this.closePicturePane} showPane={this.state.picturePane}/>
                      </div>
                    ) :
                    (
                      this.checkIfInCircle() ? 
                      <div className="editButtons">
                        {
                          this.state.removing ? (
                            <button>Removing...</button>
                          ) :
                          (
                            <button onClick={this.removeFromCircle}>Remove {this.state.userdata.firstname} from your Circle</button>
                          )
                        }
                      </div>
                      :
                      <div className="editButtons">
                        {
                          this.state.adding ? (
                            <button>Adding..</button>
                          ) :
                          (
                            <button onClick={this.addToCircle}>Add {this.state.userdata.firstname} to your Circle</button>
                          )
                        }  
                      </div>  
                    )
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
