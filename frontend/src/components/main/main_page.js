import React from 'react';
import '../../stylesheets/main.css';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

class MainPage extends React.Component {
  render() {
    const splashStyle = {
      backgroundImage:
        'url(https://expand-dev.s3-us-west-1.amazonaws.com/images/table1.png)',
    };
    const bannerStyle = {
      backgroundImage:
        'url(https://expand-dev.s3-us-west-1.amazonaws.com/images/splash-info.png)',
    };

    const peter = {
      backgroundImage:
        'url(https://expand-dev.s3-us-west-1.amazonaws.com/images/peter-mugshot.png)',
    };

    const erick = {
      backgroundImage:
        'url(https://expand-dev.s3-us-west-1.amazonaws.com/images/erick_prof_profile.png)',
    };

    const grant = {
      backgroundImage:
        'url(https://expand-dev.s3-us-west-1.amazonaws.com/images/grant-profile.png)',
    };

    const zoe = {
      backgroundImage:
        'url(https://expand-dev.s3-us-west-1.amazonaws.com/images/zoe-profile.png)',
    };
    return (
      <div className="main-box">
        <div className="splash-box" style={splashStyle}>
          <div className="overlay">
            <div className="splash-content">
              <h1>
                Expansive online video learning with a new level of student and
                instructor engagement
              </h1>
              <Link to="/signup">Start Today</Link>
            </div>
          </div>
        </div>
        <div className="content-box">
          <h1 className="banner-header"> What Make Us Unique</h1>
          <div className="banner-box" style={bannerStyle}></div>
          <h1 className="banner-header"> Meet the Team</h1>
          <div className="team">
            <a
              href="https://www.linkedin.com/in/peter-koe-377385128/"
              target="_blank"
            >
              <div className="pic" id="peter" style={peter}></div>
            </a>
            <a
              href="https://www.linkedin.com/in/erick-santos2/"
              target="_blank"
            >
              <div className="pic" style={erick}></div>
            </a>
            <a
              href="https://www.linkedin.com/in/grant-kleinman-pe-35930070/"
              target="_blank"
            >
              <div className="pic" style={grant}></div>
            </a>
            <a
              href="https://www.linkedin.com/in/zixuan-lin-2a2953a9/"
              target="_blank"
            >
              <div className="pic" style={zoe}></div>
            </a>
          </div>
          <div className="name">
            <a
              href="https://www.linkedin.com/in/peter-koe-377385128/"
              target="_blank"
            >
              Peter Koe
            </a>
            <a
              href="https://www.linkedin.com/in/erick-santos2/"
              target="_blank"
            >
              Erick Santos
            </a>
            <a
              href="https://www.linkedin.com/in/grant-kleinman-pe-35930070/"
              target="_blank"
            >
              Grant Kleinman
            </a>
            <a
              href="https://www.linkedin.com/in/zixuan-lin-2a2953a9/"
              target="_blank"
            >
              Zoe Lin
            </a>
          </div>
        </div>
        <footer>
          <p>Learn more about us: </p>
          <a
            href="https://github.com/pfranciskoe/Expand"
            id="icon"
            target="_blank"
          >
            <FaGithub />
          </a>
        </footer>
      </div>
    );
  }
}

export default MainPage;
