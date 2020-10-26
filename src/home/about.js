import React from 'react';
import '../home/about.css'

class About extends React.Component {
    render() {
        return(
            <div className="aboutContainer">
                <div className="card">
                    <p>
                        CircleSpace is all about sharing your projects and experiences
                        for others to view, connect, and engage with. Whether it's a 
                        thesis you've worked hard on over several years, or a small 
                        passion project that you're proud of, we are the platform
                        to share it on. If you are a job hunter, student, or just someone
                        that wants their work published somewhere, our platform is perfect for you. Or if you 
                        are an employer, talent recruiter, or just interested in exploring
                        people's ideas and projects, our platform provides all
                        the connectivity that you'll need.
                    </p>
                </div>           
            </div>
        )
    }
}

export default About;