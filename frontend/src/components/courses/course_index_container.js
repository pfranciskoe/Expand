import {connect} from "react-redux";
import {getCourses, getCourse, deleteCourse} from "../../actions/courses_actions";
import CourseIndex from "./course_index";

const mSTP = state => ({
    courses: state.entities.courses,
    currentUser: state.session.user
})

const mDTP = dispatch => ({
    getCourses: () => dispatch(getCourses()),
    getCourse: (courseId) => dispatch(getCourse(courseId)),
    deleteCourse: (courseId) => dispatch(deleteCourse(courseId))
})

export default connect(mSTP, mDTP)(CourseIndex);