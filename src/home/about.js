import React from 'react';
import '../home/about.css'

export default function About() {
    return (
        new AboutArea()
    );
}

class AboutArea extends React.Component {
    render() {
        return(
            <div className="aboutContainer">
                <div className="card">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Ut ut libero ut massa pretium commodo faucibus non ipsum. Morbi bibendum, dui sit amet maximus tempor,
                        velit odio maximus felis, vel vehicula magna sem ut nisi. 
                        Vivamus ac ex pellentesque, ultrices lacus sit amet, imperdiet erat. 
                        Integer ut lectus vestibulum, pretium dolor id, malesuada diam. 
                        Sed pellentesque fermentum diam vitae ultrices. 
                        Aliquam enim sem, cursus ac diam a, vestibulum porta orci. 
                        Quisque eu ex vel nisi ultricies lacinia vitae eget ante. 
                        Vivamus at risus sit amet sapien hendrerit tristique vel ut neque. 
                        Aenean malesuada, enim eget maximus vehicula, neque quam faucibus nunc, eu auctor ipsum sem eu tellus. 
                        Fusce in vehicula elit, ut feugiat lacus. Ut mollis magna vel tortor luctus, aliquam pretium nisi ornare. 
                        Duis mi orci, bibendum et hendrerit lobortis, euismod tristique tellus.
                    </p>
                </div>           
            </div>
        )
    }
}