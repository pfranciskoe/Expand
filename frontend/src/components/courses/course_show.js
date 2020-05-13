import React from "react";

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
        return(

            <div className="course-">
                <div>
                    <h1>{this.props.course.title}</h1>
                    <p>{`${instructor.firstName} ${instructor.lastName}`}</p>
                    <p>{this.props.course.description}</p>

                </div>
                <div>
                    <h2>students:</h2>
                    <ul className="student-list">
                        {students.map(student =>(
                            <li key={student.id}>{`${student.firstName} ${student.lastName}`}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    {lessons.map(lesson => (
                        <p>{lesson.title}</p>
                    ))}
                </div>
            </div>
        )

    }

}

export default CourseShow;