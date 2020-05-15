import React from 'react';
import "../../stylesheets/main.css";
import {Link} from "react-router-dom";
import { FaGithub} from "react-icons/fa";

class MainPage extends React.Component {

    render() {
        const splashStyle = {
          backgroundImage:
            "url(https://expand-dev.s3-us-west-1.amazonaws.com/images/table1.png)",
        }; 
        const bannerStyle = {
          backgroundImage:
            "url(https://expand-dev.s3-us-west-1.amazonaws.com/images/splash-info.png)",
        };

         const peter = {
           backgroundImage:
             "url(https://expand-dev.s3-us-west-1.amazonaws.com/images/peter-mugshot.png)",
         };

        const erick = {
          backgroundImage:
            "url(https://media-exp1.licdn.com/dms/image/C5603AQHTrNE7OvY4Sg/profile-displayphoto-shrink_200_200/0?e=1594857600&v=beta&t=No2QgCPzapfVPeAOlfPTk1onVnRhcpj2ci_JbFV_NXU)",
        };

        const grant = {
          backgroundImage:
            "url(https://media-exp1.licdn.com/dms/image/C5603AQFN56g_ie0yTw/profile-displayphoto-shrink_200_200/0?e=1594857600&v=beta&t=gFcjkKJWBsvuj8XKiuRwgiBbqZ2bf3JnIhDa2a7NgE8)",
        };

         const zoe = {
           backgroundImage:
             "url(https://media-exp1.licdn.com/dms/image/C5603AQG3nJVhyelE8A/profile-displayphoto-shrink_200_200/0?e=1594857600&v=beta&t=laiR9ECKD-Gq2s3xLDTBY62BV_Rvsc7EP8rKBN1vd0k)",
         };
        return (
          <div className="main-box">
            <div className="splash-box" style={splashStyle}>
              <div className="overlay">
                <div className="splash-content">
                  <h1>
                    Expansive online video learning with a new level of student
                    and instructor engagement
                  </h1>
                  <Link to="/signup">Start Today</Link>
                </div>
              </div>
            </div>
            <div className="content-box">
              <h1 className="banner-header"> What Make Us Unique</h1>
              <div className="banner-box" style={bannerStyle}></div>
              <h1 className="banner-header"> Meet the team</h1>
              <div className="team">
                <div className="pic" id="peter" style={peter}></div>
                <div className="pic" style={erick}></div>
                <div className="pic" style={grant}></div>
                <div className="pic" style={zoe}></div>
              </div>
              <div className="name">
                <a src="https://www.linkedin.com/in/peter-koe-377385128/">
                  Peter Koe
                </a>
                <a src="https://www.linkedin.com/in/erick-santos2/">
                  Erick Santos
                </a>
                <a src="https://www.linkedin.com/in/grant-kleinman-pe-35930070/">
                  Grant Kleinman
                </a>
                <a src="https://www.linkedin.com/in/zixuan-lin-2a2953a9/">
                  Zoe Lin
                </a>
              </div>
            </div>
            <footer>
              <p>Learn more about us: </p>
              <a src="https://github.com/pfranciskoe/Expand" id="icon">
                <FaGithub />
              </a>
            </footer>
          </div>
        );
    }
}

export default MainPage;