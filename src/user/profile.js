import React from "react";

export default function Profile() {  
    return (
      <ProfilePage />
    );
  }

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }
  
  render() {
    return (
        <div>
          <p>Welcome</p>
        </div>        
    );
  }
}

//ReactDOM.render(<LoginForm />, document.getElementById('root'));