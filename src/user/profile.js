import React from "react";
import NavBar from '../common/navbar.js';
import ProfileBio from './profileBio.js';
import ProjectCard from './projectCard.js';
import EditProjectsPane from './editProjects/editProjectsPane.js';
import './profile.css'

// export default function Profile() {  
//     return (
//       <div className="profileBody">
//         <ProfilePage userid={1}/>
//       </div>
//     );
//   }

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      isLoggedIn: true,
      editPane: false
    };

    this.showEditPane = this.showEditPane.bind(this);
    this.closeEditPane = this.closeEditPane.bind(this);
  }

  componentDidMount() {
    this.setState( {
      userid: this.props.match.params.userid
    });
  }

  showEditPane() {
    // if (this.state.isLoggedIn) {
    if (true) {
      this.setState({
        editPane: true
      })
    }
  }

  closeEditPane(e) {
    this.setState( {
      editPane: false
    })
  }
  

  render() {
    // get projidlist from api using userid
    const projidList = [1, 2, 3, 4, 5];
    const projList = projidList.map((projid, index) => <ProjectCard projid={projid} key={index} />)

    return (
        <div className="profileContainer">
          <NavBar userid={this.state.userid} isHome={false}/>
          <EditProjectsPane onCancel={this.closeEditPane} showPane={this.state.editPane} projidList={projidList}/>
          <div className="profilePageContainer">
            <div className="profileBody">
              <div className="profileBioBody">
                <ProfileBio userid={this.state.userid} />
              </div>
              <div className="projectListContainer">
                <div className="editButtons">
                  <button className="editProjectsButton" onClick={this.showEditPane}>Edit Projects</button>
                  <button className="editProfileButton">Edit Profile</button>
                </div>
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

//ReactDOM.render(<LoginForm />, document.getElementById('root'));

export default ProfilePage