import React from "react";
import CourseForm from "./course_form";

class EditCourseForm extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getCourse(this.props.course._id)
    }

    render() {
        const { course, formType, action, deleteCourse } = this.props
        return (
            <div>
                <CourseForm course={course}
                    formType={formType} action={action} deleteCourse={deleteCourse} />
            </div>
        )
    }
}

export default EditCourseForm;