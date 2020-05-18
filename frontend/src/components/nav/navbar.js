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
        this.goHome = this.goHome.bind(this);
        this.handleLink = this.handleLink.bind(this);
    }

    componentDidMount(){
        const { clearErrors, getCourses, fetchUser, userId } = this.props;
        if (userId){
            fetchUser(userId);
            getCourses();
        }
        clearErrors();
        document.addEventListener("click", this.toggleDropdown);
    }

    componentWillUnmount(){
        document.removeEventListener("click", this.toggleDropdown);
    }

    goHome(){
        this.props.history.push("/")
    }

    toggleDropdown(e){
        e.stopPropagation();
        if (!this.props.loggedIn) return null;
        let dropdownButton = document.getElementById("dropdown-button");
        let dropdownArrow = document.getElementById("arrow");
        let dropdownMenu = document.getElementById("dropdown");
        if (!dropdownButton || !dropdownArrow || !dropdownMenu) return null;
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
                                    <a className="dropdown-item" 
                                        onClick={this.handleLink(course._id)}>
                                        {course.title[0].toUpperCase() + course.title.slice(1)}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )
        }
    }

    handleLink(courseId){
        return e => {
            this.props.history.push(`/courses/${courseId}`);
        }
    }

    showList(e){
        e.preventDefault();
        document.getElementById("dropdown").classList.toggle("show-list");
    }

    burgerMenu(){
        if (this.props.loggedIn) {
            return (
                <div className="burger-menu">
                    <div className="user-courses">
                        <NavLink className="my-courses" to={"/courses"}>Courses</NavLink>
                        <button id="dropdown-button" className="button courses-arrow dropdown">
                            <i id="arrow" className="fas fa-caret-down"></i>
                        </button>
                        {this.courseList()}
                    </div>
                    <Link to={`/users/${this.props.userId}`}>Profile</Link>
                    <button className="logout" onClick={this.logoutUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <div className="burger-menu">
                    <Link to={"/signup"}>Signup</Link>
                    <Link to={"/login"}>Login</Link>
                </div>
            );
        }
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
                    <Link to={`/users/${this.props.userId}`}>Profile</Link>
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
                    <div className="main-logo" onClick={this.goHome}>
                        <img className="tri-logo" 
                            src="https://expand-dev.s3-us-west-1.amazonaws.com/images/triangles.png" 
                            alt="Expand"
                        />
                        <h1>expand</h1>
                    </div>
                    {this.getLinks()}
                    {this.burgerMenu()}
                </div>
                <div className="navbar-placeholder"></div>
            </div>
        );
    }
}

export default withRouter(NavBar);
