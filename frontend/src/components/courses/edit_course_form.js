import React from "react";
import CourseForm from "./course_form";

class EditCourseForm extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getCourse(this.props.course.id)
    }
    render() {
        const { course, formType, action } = this.props
        return (
            <div>
                <CourseForm course={course}
                    formType={formType} action={action} />
            </div>
        )
    }
}

export default EditCourseForm;