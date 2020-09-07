import React from 'react';
import ReactDOM from "react-dom";
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
                    <h2>Heading 1</h2>
                    <p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut libero ut massa pretium commodo faucibus non ipsum. Morbi bibendum, dui sit amet maximus tempor, velit odio maximus felis, vel vehicula magna sem ut nisi. Vivamus ac ex pellentesque, ultrices lacus sit amet, imperdiet erat. Integer ut lectus vestibulum, pretium dolor id, malesuada diam. Sed pellentesque fermentum diam vitae ultrices. Aliquam enim sem, cursus ac diam a, vestibulum porta orci. Quisque eu ex vel nisi ultricies lacinia vitae eget ante. Vivamus at risus sit amet sapien hendrerit tristique vel ut neque. Aenean malesuada, enim eget maximus vehicula, neque quam faucibus nunc, eu auctor ipsum sem eu tellus. Fusce in vehicula elit, ut feugiat lacus. Ut mollis magna vel tortor luctus, aliquam pretium nisi ornare. Duis mi orci, bibendum et hendrerit lobortis, euismod tristique tellus.

Aliquam vitae justo id metus lobortis vulputate ut nec leo. Donec ut turpis ac turpis semper ultricies. Curabitur viverra nibh non egestas sodales. Aenean congue bibendum enim eget faucibus. Mauris pretium lacus nibh, nec euismod nibh laoreet nec. Vestibulum pulvinar, nibh eu condimentum convallis, lectus nulla ultrices felis, non porttitor arcu urna eu nisi. Nulla sed diam nisi. Nam a suscipit ligula. Praesent a ipsum mi. Aenean sit amet lacus ut diam fringilla volutpat. Etiam vehicula faucibus nisi eu semper. Sed feugiat pellentesque tellus et posuere. Aliquam erat volutpat.

Nunc elementum lacinia dictum. Maecenas nec nunc placerat, fringilla odio sed, aliquet mauris. Nunc iaculis, felis ut commodo molestie, erat velit ullamcorper metus, commodo finibus quam sapien at dui. Nunc et fringilla ante, a malesuada velit. Suspendisse ligula nisi, facilisis sit amet elit ut, tempor maximus justo. Ut eget efficitur est. Morbi malesuada velit vitae arcu efficitur, eu vestibulum ligula venenatis. Nullam molestie urna leo, vel iaculis dui faucibus id. Vivamus convallis tortor eu congue euismod. Sed viverra pharetra interdum. Sed sagittis, nibh sit amet luctus lobortis, nisi nunc tristique nibh, eget faucibus leo nisi nec enim.

Donec at eros elit. Duis id iaculis diam. Nulla ut mi eget justo luctus ultricies id vel orci. Proin libero arcu, tincidunt id pharetra blandit, accumsan nec odio. Mauris sollicitudin elit in efficitur dictum. Vivamus at augue non erat cursus facilisis nec id ex. Fusce rhoncus lobortis sollicitudin. Proin id risus quis turpis congue dapibus id non neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur fermentum nisl ex, eu ultricies felis feugiat vel.

Mauris consequat tincidunt interdum. Nulla suscipit risus eu diam tristique, et sollicitudin libero vehicula. Ut sagittis odio vel dui dapibus, ac luctus magna molestie. Curabitur dignissim purus eget tellus iaculis, id lobortis ligula facilisis. Integer consectetur imperdiet scelerisque. Integer tincidunt congue tortor, ac viverra dolor malesuada ac. Duis tempus arcu vitae condimentum rhoncus. Morbi tempor velit non vestibulum pulvinar. In cursus lectus dui, a vestibulum ligula dignissim eu. Aliquam consectetur neque lacus, id sagittis quam pretium vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam posuere rutrum ligula, eget rutrum quam ullamcorper at. Etiam sagittis, magna vel gravida laoreet, turpis neque convallis sapien, non tempus enim leo ut ipsum. Praesent at metus sit amet tortor imperdiet semper non a sapien. Maecenas ex enim, vehicula fringilla vulputate nec, commodo et justo. Sed volutpat magna ac lorem tincidunt facilisis.</p>
                </div>
                <div className="card">
                    <h2>Heading 2</h2>
                    <p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut libero ut massa pretium commodo faucibus non ipsum. Morbi bibendum, dui sit amet maximus tempor, velit odio maximus felis, vel vehicula magna sem ut nisi. Vivamus ac ex pellentesque, ultrices lacus sit amet, imperdiet erat. Integer ut lectus vestibulum, pretium dolor id, malesuada diam. Sed pellentesque fermentum diam vitae ultrices. Aliquam enim sem, cursus ac diam a, vestibulum porta orci. Quisque eu ex vel nisi ultricies lacinia vitae eget ante. Vivamus at risus sit amet sapien hendrerit tristique vel ut neque. Aenean malesuada, enim eget maximus vehicula, neque quam faucibus nunc, eu auctor ipsum sem eu tellus. Fusce in vehicula elit, ut feugiat lacus. Ut mollis magna vel tortor luctus, aliquam pretium nisi ornare. Duis mi orci, bibendum et hendrerit lobortis, euismod tristique tellus.

Aliquam vitae justo id metus lobortis vulputate ut nec leo. Donec ut turpis ac turpis semper ultricies. Curabitur viverra nibh non egestas sodales. Aenean congue bibendum enim eget faucibus. Mauris pretium lacus nibh, nec euismod nibh laoreet nec. Vestibulum pulvinar, nibh eu condimentum convallis, lectus nulla ultrices felis, non porttitor arcu urna eu nisi. Nulla sed diam nisi. Nam a suscipit ligula. Praesent a ipsum mi. Aenean sit amet lacus ut diam fringilla volutpat. Etiam vehicula faucibus nisi eu semper. Sed feugiat pellentesque tellus et posuere. Aliquam erat volutpat.

Nunc elementum lacinia dictum. Maecenas nec nunc placerat, fringilla odio sed, aliquet mauris. Nunc iaculis, felis ut commodo molestie, erat velit ullamcorper metus, commodo finibus quam sapien at dui. Nunc et fringilla ante, a malesuada velit. Suspendisse ligula nisi, facilisis sit amet elit ut, tempor maximus justo. Ut eget efficitur est. Morbi malesuada velit vitae arcu efficitur, eu vestibulum ligula venenatis. Nullam molestie urna leo, vel iaculis dui faucibus id. Vivamus convallis tortor eu congue euismod. Sed viverra pharetra interdum. Sed sagittis, nibh sit amet luctus lobortis, nisi nunc tristique nibh, eget faucibus leo nisi nec enim.

Donec at eros elit. Duis id iaculis diam. Nulla ut mi eget justo luctus ultricies id vel orci. Proin libero arcu, tincidunt id pharetra blandit, accumsan nec odio. Mauris sollicitudin elit in efficitur dictum. Vivamus at augue non erat cursus facilisis nec id ex. Fusce rhoncus lobortis sollicitudin. Proin id risus quis turpis congue dapibus id non neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur fermentum nisl ex, eu ultricies felis feugiat vel.

Mauris consequat tincidunt interdum. Nulla suscipit risus eu diam tristique, et sollicitudin libero vehicula. Ut sagittis odio vel dui dapibus, ac luctus magna molestie. Curabitur dignissim purus eget tellus iaculis, id lobortis ligula facilisis. Integer consectetur imperdiet scelerisque. Integer tincidunt congue tortor, ac viverra dolor malesuada ac. Duis tempus arcu vitae condimentum rhoncus. Morbi tempor velit non vestibulum pulvinar. In cursus lectus dui, a vestibulum ligula dignissim eu. Aliquam consectetur neque lacus, id sagittis quam pretium vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam posuere rutrum ligula, eget rutrum quam ullamcorper at. Etiam sagittis, magna vel gravida laoreet, turpis neque convallis sapien, non tempus enim leo ut ipsum. Praesent at metus sit amet tortor imperdiet semper non a sapien. Maecenas ex enim, vehicula fringilla vulputate nec, commodo et justo. Sed volutpat magna ac lorem tincidunt facilisis.</p>
                </div>
                
            </div>
        )
    }
}