import React from "react";
import {Link } from "react-router-dom";

class CourseShow extends React.Component{
    constructor(props){
        super(props);
        this.handleEnroll = this.handleEnroll.bind(this);
        this.state = {enrolled: this.checkEnrollment()};
    }

    componentDidMount(){
        this.props.getCourse(this.props.match.params.id)
        this.props.fetchUser(this.props.currentUserId)
    }

    handleEnroll(){
      const students = [];
      this.props.course.students.forEach(student =>{
        students.push(student._id)
      })
      students.push(this.props.currentUserId)
      const newCourse = {...this.props.course}
      newCourse.students = students;
      debugger
      this.props.updateCourse(newCourse)
      this.setState({toggleEnroll: !this.state.toggleEnroll})
    }

    checkEnrollment(){
      if (!this.props.user) return false;
      let enrolled = false;
      this.props.user.courses.forEach(course =>{
        if (course._id === this.props.match.params.id){
          enrolled = true;
        }
      })
      return enrolled;
    }

    render(){
        if(!this.props.course) return null;
        if(!this.props.user) return null;
        
        
        const {students, lessons, instructor} = this.props.course;
        const buttonDiv = this.state.enrolled ? (
          <button onClick={this.handleUnroll}>Unroll</button>
        ) : (
          <button onClick={this.handleEnroll}>Enroll</button>
        )
        return (
          <div className="show-box">
            <div className="info">
              <h1>{this.props.course.title}</h1>
              <p>{`By ${instructor.firstName} ${instructor.lastName}`}</p>
              <p>{this.props.course.description}</p>
              {buttonDiv}
            </div>
            <div className="course-content">
              <div className="lesson-list">
                <h2>Lessons:</h2>
                {this.props.currentUserId === instructor._id ? (
                  <Link to="/lessons/new">Add a lesson</Link>
                ) : null}
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
                      key={student._id}
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