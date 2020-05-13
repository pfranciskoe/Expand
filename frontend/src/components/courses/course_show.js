import React from "react";

class CourseShow extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.getCourse(this.props.match.params.id)
    }

    render(){
        const {students, lessons} = this.props.course;
        return(

            <div>
                <ul className="student-list">
                    {students.map(student =>(
                        <li key={student.id}>{`${student.firstName} ${student.lastName}`}</li>
                    ))}
                </ul>

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