import React from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import '../../stylesheets/navbar.css';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    componentDidMount(){
        const { clearErrors, fetchUser, getUserCourses, userId } = this.props;
        // fetchUser(userId);
        // getUserCourses(userId);
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
            let test = ["Biology", "Chemistry", "Physics", "Potato"];
            return (
                <ul className="dropdown-list" id="course-dropdown">
                    {test.map((course, idx) => {
                        return (
                            <li className="dropdown-item" key={idx}>{course}</li>
                        )
                    })}
                    {/* {Object.values(courses).map((course) => {
                        return (
                            <li className="dropdown-item" key={course.id}>{course.title}</li>
                        )
                    })} */}
                </ul>
            )
        }
    }

    showList(){
        return e => {
            e.preventDefault();
            document.getElementById("course-dropdown").classList.toggle("show-list");
        }
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
            <div className="navbar-container">
                <div className="logo">
                    <h1>Expand</h1>
                </div>
                {this.getLinks()}
            </div>
        );
    }
}

export default withRouter(NavBar);
