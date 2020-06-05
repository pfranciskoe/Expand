import { connect } from "react-redux";
import { createCourse } from "../../actions/courses_actions";
import CourseForm from "./course_form";

const mSTP = (state, ownProps) => ({
    course: {
        title: "",
        description: "",
        instructor: state.session.user.id,
        thumbnailUrl: ""
    },
    formType: "Create Course"
})

const mDTP = dispatch => ({
    action: (course) => dispatch(createCourse(course))
})

export default connect(mSTP, mDTP)(CourseForm);