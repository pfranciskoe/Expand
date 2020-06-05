import { connect } from "react-redux";
import { updateCourse, getCourse, deleteCourse } from "../../actions/courses_actions";
import EditCourseForm from "./edit_course_form";

const mSTP = (state, ownProps) => ({
    course: state.entities.courses[ownProps.match.params.id],
    formType: "Update Course"
})

const mDTP = dispatch => ({
    action: (course) => dispatch(updateCourse(course)),
    getCourse: (courseId) => dispatch(getCourse(courseId)),
    deleteCourse: (courseId) => dispatch(deleteCourse(courseId))
})

export default connect(mSTP, mDTP)(EditCourseForm);