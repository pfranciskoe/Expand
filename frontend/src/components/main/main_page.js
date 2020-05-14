import React from 'react';
import "../../stylesheets/main.css";

class MainPage extends React.Component {

    render() {
        const splashStyle = {
          backgroundImage: 'url(https://expand-dev.s3-us-west-1.amazonaws.com/images/expand-main-splash.jpg)'
        }; 
        const bannerStyle = {
          backgroundImage: 'url(https://expand-dev.s3-us-west-1.amazonaws.com/images/resize2.png)'
        };
        return (
          <div className="main-box">
            <div className="splash-box" style={splashStyle}>
              <div className="overlay">
                <div className="splash-content">
                  <h1>Expand your online learning experience.</h1>
                </div>
              </div>
            </div>
            <div className="banner-box" style={bannerStyle}></div>
            <footer></footer>
          </div>
        );
    }
}

export default MainPage;