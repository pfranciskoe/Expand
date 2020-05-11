import {connect} from "react-redux";
import {getCourses} from "../../actions/courses_actions";
import CourseIndex from "./course_index";

const mSTP = state => ({
    courses: state.entities.courses
})

const mDTP = dispatch => ({
    getCourses: () => dispatch(getCourses())
})

export default connect(mSTP, mDTP)(CourseIndex);