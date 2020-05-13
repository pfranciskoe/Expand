// const CourseSchema = new Schema({
//     instructor: {
//         type: Schema.Types.ObjectId,
//         ref: 'users'
//     },
//     students: [],
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     lessons: [],
//     date: {
//         type: Date,
//         default: Date.now
//     }
// });

import React from "react";
import {withRouter, Link} from "react-router-dom";
import "../../stylesheets/courses.css"

class CourseIndexItem extends React.Component{
    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }


    handleDelete(e){
        e.preventDefault();
        this.props.deleteCourse(this.props.course._id)
            .then(this.props.history.push("/courses"));
    }

    formatDate(date){
        const newDate = new Date(date);
        return newDate.toDateString();
    }

    render(){
        const {course, currentUser} = this.props;
        return(
            <div className="course-list-item">
                <h1>{course.title}</h1>
                <p>{this.formatDate(course.date)}</p>
                <p>{course.description}</p>
                {currentUser.id === course.instructor 
                ? (<div>
                    <Link to={`/courses/${course._id}/edit`}>Edit Course</Link>
                    <button onClick={this.handleDelete}>Delete Course</button>
                    </div>)
                : (null)
                }
            </div>
        )
    }
}

export default withRouter(CourseIndexItem);