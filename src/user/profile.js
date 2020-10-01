import React from "react";
import NavBar from '../common/navbar.js';
import ProfileBio from './profileBio.js';
import ProjectCard from './projectCard.js';
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
    };
  }

  componentDidMount() {
    this.setState( {
      userid: this.props.match.params.userid
    });
  }
  

  render() {
    // get projidlist from api using userid
    const projidList = [1, 2, 3, 4, 5];
    const projList = projidList.map((projid, index) => <ProjectCard projid={projid} key={index} />)

    return (
        <div className="profileContainer">
          <NavBar userid={this.state.userid} isHome={false}/>
          <div className="profileBody">
            <div className="profileBioBody">
              <ProfileBio userid={this.state.userid} />
            </div>
            <div className="projectCardsList">
              {projList}
            </div>
          </div>
        </div>
    );
  }

}

//ReactDOM.render(<LoginForm />, document.getElementById('root'));

export default ProfilePage