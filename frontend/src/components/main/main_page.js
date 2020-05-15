import React from 'react';
import "../../stylesheets/main.css";
import {Link} from "react-router-dom"

class MainPage extends React.Component {

    render() {
        const splashStyle = {
          backgroundImage:
            "url(https://expand-dev.s3-us-west-1.amazonaws.com/images/table1.png)",
        }; 
        const bannerStyle = {
          backgroundImage:
            "url(https://expand-dev.s3-us-west-1.amazonaws.com/images/banner-dots.png)",
        };
        return (
          <div className="main-box">
            <div className="splash-box" style={splashStyle}>
              <div className="overlay">
                <div className="splash-content">
                  <h1>Expand your online learning experience.</h1>
                  <Link to="/signup">Start Today</Link>
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