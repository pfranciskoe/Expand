import React from 'react';
import "../../stylesheets/main.css";

class MainPage extends React.Component {

    render() {
        const splashStyle = {
          backgroundImage: `url(https://images.unsplash.com/photo-1488998427799-e3362cec87c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)`
        }; 
        return (
          <div>
            <div className="splash-box" style={splashStyle}>
              <div className="overlay">
                <div className="splash-content">
                  <h1>Expand your online learning experience.</h1>
                </div>
              </div>
            </div>
            <footer></footer>
          </div>
        );
    }
}

export default MainPage;