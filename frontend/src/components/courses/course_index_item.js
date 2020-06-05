import React from "react";
import {withRouter, Link, NavLink} from "react-router-dom";
import "../../stylesheets/courses.css"

class CourseIndexItem extends React.Component{
    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.showDetails = this.showDetails.bind(this);
        this.hideDetails = this.hideDetails.bind(this);
    }

    handleDelete(e){
        e.preventDefault();
        this.props.deleteCourse(this.props.course._id)
            .then(this.props.history.push("/courses"));
    }

    showDetails(){
        document.getElementById(`desc-${this.props.course._id}`).style.left = "0px";
    }

    hideDetails(){
        document.getElementById(`desc-${this.props.course._id}`).style.left = "-300px";
    }

    render(){
        const {course, currentUser} = this.props;
        const courseStyle = {
            backgroundImage: `url(https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80)`,
            // backgroundImage: `url(${course.thumbnailUrl})`
        }; 

        return(
            <NavLink id="title" className="course-list-item-link" to={`/courses/${course._id}`}>
                <div className="course-list-item" 
                    style={courseStyle} 
                    onMouseEnter={this.showDetails}
                    onMouseLeave={this.hideDetails}>
                    <div id='title-container'>
                        {course.title}
                    </div>
                    <div id='description-container'>
                        <p id={`desc-${course._id}`}>{course.description}</p>
                    </div>
                    {currentUser.id === course.instructor 
                    ? (<div>
                        <Link to={`/courses/${course._id}/edit`}>Edit Course</Link>
                        <button onClick={this.handleDelete}>Delete Course</button>
                        </div>)
                    : (null)
                    }
                </div>
            </NavLink>
        )
    }
}

export default withRouter(CourseIndexItem);