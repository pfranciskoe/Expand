import React from "react";
import {Link } from "react-router-dom";

class CourseShow extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.getCourse(this.props.match.params.id)
    }

    render(){
        if(!this.props.course) return null;
        const {students, lessons, instructor} = this.props.course;
        return (
          <div className="show-box">
            <div className="info">
              <h1>{this.props.course.title}</h1>
              <p>{`By ${instructor.firstName} ${instructor.lastName}`}</p>
              <p>{this.props.course.description}</p>
            </div>
            <div className="course-content">
              <div className="lesson-list">
                <h2>Lessons:</h2>
                {this.props.currentUser.id === instructor._id
                ? <Link to="/lessons/new">Add a lesson</Link>
                : null}
                <ol>
                  {lessons.map((lesson) => (
                    <li>
                      <Link to={`/lessons/${lesson._id}`}>{lesson.title}</Link>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="student-list">
                <h2>students:</h2>
                <ul>
                  {students.map((student) => (
                    <li
                      key={student.id}
                    >{`${student.firstName} ${student.lastName}`}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );

    }

}

export default CourseShow;