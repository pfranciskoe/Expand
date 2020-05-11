import React from 'react';
import { Link } from 'react-router-dom';
import '../../stylesheets/navbar.css';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div className="navlinks">
                    <Link to={"/courses"}>All Courses</Link>
                    <Link to={"/profile"}>Profile</Link>
                    <Link to={"/new_course"}>Create a course</Link>
                    <button className="logout" onClick={this.logoutUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <div className="navlinks">
                    <Link to={"/signup"}>Signup</Link>
                    <Link to={"/login"}>Login</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="navbar-container">
                <div className="logo">
                    <h1>Expand</h1>
                </div>
                {this.getLinks()}
            </div>
        );
    }
}

export default NavBar;