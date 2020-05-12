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

class CourseIndexItem extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        // this.props.getCourse(this.props.match.params.id);
    }

    handleDelete(e){
        e.preventDefault();
        this.props.deleteCourse(this.props.course.id)
            .then(this.props.history.push("/courses"));
    }

    render(){
        const {course, currentUser} = this.props;
        return(
            <div>
                <h1>{course.title}</h1>
                <p>{course.date}</p>
                <p>{course.description}</p>
                {currentUser.id === course.instructor 
                ? (<div>
                    <Link to={`/courses/${course.id}/edit`}>Edit Course</Link>
                    <button onClick={this.handleDelete}>Delete Course</button>
                    </div>)
                : (null)
                }
            </div>
        )
    }
}

export default withRouter(CourseIndexItem);