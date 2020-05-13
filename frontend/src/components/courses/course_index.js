import React from "react";
import CourseIndexItem from "./course_index_item";

class CourseIndex extends React.Component {
    constructor(props) {
        super(props)
    };

    componentDidMount() {
        this.props.getCourses();
    }

    render() {
        const { courses, getCourse, updateCourse, deleteCourse, currentUser } = this.props
        return (
            <div className="courses-box">
                <h1>Find what interests you</h1>
                <div className="course-list">
                    {Object.values(courses).map((course, i) => (
                        <CourseIndexItem
                            key={i} course={course}
                            updateCourse={updateCourse} 
                            deleteCourse={deleteCourse} 
                            currentUser={currentUser}
                            />
                    ))}
                </div>
            </div>
        )
    }
}

export default CourseIndex;