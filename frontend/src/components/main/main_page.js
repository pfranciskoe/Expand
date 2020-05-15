import React from 'react';
import "../../stylesheets/main.css";

class MainPage extends React.Component {

    render() {
        const splashStyle = {
          backgroundImage:
            "url(https://images.unsplash.com/photo-1522071901873-411886a10004?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)",
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
            <h1 className="banner-header"> What Make Us Unique</h1>
            <div className="banner-box" style={bannerStyle}></div>
            <footer></footer>
          </div>
        );
    }
}

export default MainPage;