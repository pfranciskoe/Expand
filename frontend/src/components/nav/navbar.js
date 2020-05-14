import React from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import '../../stylesheets/navbar.css';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
        this.showList = this.showList.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    componentDidMount(){
        const { clearErrors, fetchUser, userId } = this.props;
        if (userId) fetchUser(userId);
        clearErrors();
        document.addEventListener("click", this.toggleDropdown)
    }

    componentWillUnmount(){
        document.removeEventListener("click", this.toggleDropdown);
    }

    toggleDropdown(e){
        e.stopPropagation();
        let dropdownButton = document.getElementById("dropdown-button");
        let dropdownArrow = document.getElementById("arrow");
        let dropdownMenu = document.getElementById("dropdown");
        if ((e.target === dropdownButton || e.target === dropdownArrow) && (!dropdownMenu.classList.contains("show-list"))){
            dropdownMenu.classList.toggle("show-list");
        } else if ((e.target !== dropdownMenu) && (dropdownMenu.classList.contains("show-list"))) {
            dropdownMenu.classList.remove("show-list");
        }
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout()
        this.props.history.push("/");
    }

    addOptionToCreate(){
        const {currentUser} = this.props;
        if (currentUser && currentUser.instructor){
            return (
                <li>
                    <NavLink className="create-option" to={"/courses/new"}>
                        <i className="fas fa-plus-circle"></i>
                        Add Course
                    </NavLink>
                </li>
            );
        }
    }

    courseList(){
        const {currentUser, courses} = this.props;
        if (currentUser){
            return (
                <div id="dropdown" className="course-dropdown">
                    <ul className="dropdown-list">
                        {this.addOptionToCreate()}
                        {Object.values(courses).map((course, idx) => {
                            return (
                                <li key={idx} >
                                    <NavLink className="dropdown-item" to={`/courses/${course._id}`}>
                                        {course.title[0].toUpperCase() + course.title.slice(1)}
                                    </NavLink>
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
                        <NavLink className="my-courses" to={"/courses"}>Courses</NavLink>
                        <button id="dropdown-button" className="button courses-arrow dropdown">
                            <i id="arrow" className="fas fa-caret-down"></i>
                        </button>
                        {this.courseList()}
                    </div>
                    <Link to={"/profile"}>Profile</Link>
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
