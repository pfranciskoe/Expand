import React from "react";
import {withRouter, Link, NavLink} from "react-router-dom";
import "../../stylesheets/courses.css"

class CourseIndexItem extends React.Component{
    constructor(props){
        super(props);
        this.showDetails = this.showDetails.bind(this);
        this.hideDetails = this.hideDetails.bind(this);
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
            backgroundImage: `url(${course.thumbnailUrl})`
        }; 

        return(
            <div className="course-list-item"
                style={courseStyle}
                onMouseEnter={this.showDetails}
                onMouseLeave={this.hideDetails}
                onClick={(e) => {
                    e.preventDefault();
                    this.props.history.push(`/courses/${course._id}`);
                }}>
                <div id='description-container'>
                    <div id={`desc-${course._id}`} className="desc-back">
                        <p>{course.description}</p>
                    </div>
                </div>
                <div className="title-box">
                    <div id='title-container'>
                        {course.title}
                    </div>
                    <div className="edit-link">
                        {currentUser.id === course.instructor
                            ? (
                                <Link to={`/courses/${course._id}/edit`}
                                    onClick={(e) => e.stopPropagation()}>
                                    <i title="Edit Course" className="fas fa-pencil-alt"></i>
                                </Link>
                            )
                            : (null)
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CourseIndexItem);