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

    // formatDate(date){
    //     const newDate = new Date(date);
    //     return newDate.toDateString();
    // }


    render(){
        const {course, currentUser} = this.props;
        let colors = ['#F3E190 ', '#97D8CF', '#E79DCC', '#68AF91'];
        //colors in array: yellow, blue, pink, green
        let color = colors[Math.floor(Math.random() * colors.length)];
        const courseStyle = {
            //   backgroundImage: `url(https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80)`,
            background: `${color}`,
            boxShadow: `2px 2px 16px 0px ${color}`,
        }; 

        return(
            <div className="course-list-item" style={courseStyle}>
                <div id='title-container'>
                    <Link id="title" to={`/courses/${course._id}`}>{course.title}</Link>
                </div>
                <div id='description-container'>{course.description}</div>
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