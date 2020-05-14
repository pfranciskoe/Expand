import React from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import '../../stylesheets/navbar.css';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
        this.showList = this.showList.bind(this);
    }

    componentDidMount(){
        const { clearErrors, fetchUser, userId } = this.props;
        if (userId) fetchUser(userId);
        clearErrors();
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout()
        this.props.history.push("/");
    }

    addOptionToCreate(){
        const {currentUser} = this.props;
        if (currentUser && currentUser.instructor){
            return <Link to={"/courses/new"}>Create a course</Link>;
        }
    }

    courseList(){
        const {currentUser, courses} = this.props;
        if (currentUser){
            return (
                <div id="dropdown" className="course-dropdown">
                    <ul className="dropdown-list">
                        {currentUser.courses.map((course, idx) => {
                            return (
                                <li key={idx} 
                                    className="dropdown-item" >
                                        {course.title[0].toUpperCase() + course.title.slice(1)}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )
        }
    }

    showList(e){
        e.preventDefault();
        document.getElementById("dropdown").classList.toggle("show-list");
    }

    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div className="navlinks">
                    <div className="user-courses">
                        <NavLink className="my-courses" to={"/courses"}>My Courses</NavLink>
                        <button className="button courses-arrow dropdown" onClick={this.showList}>
                            <i className="fas fa-caret-down"></i>
                        </button>
                        {this.courseList()}
                    </div>
                    <Link to={"/profile"}>Profile</Link>
                    {this.addOptionToCreate()}
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
            <div>
                <div className="navbar-container">
                    <div className="logo">
                        <h1>Expand</h1>
                    </div>
                    {this.getLinks()}
                </div>
                <div className="navbar-placeholder"></div>
            </div>
        );
    }
}

export default withRouter(NavBar);
