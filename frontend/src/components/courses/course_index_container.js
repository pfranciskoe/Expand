import {connect} from "react-redux";
import {getCourses} from "../"
import CourseIndex from "./course_index";

const mSTP = state => ({
    courses: state.entities.courses
})

const mDTP = dispatch => ({
    getCourses: () => dispatch(getCourses())
})

export default connect(mSTP, mDTP)(CourseIndex);