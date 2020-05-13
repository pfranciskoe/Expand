import { connect } from "react-redux";
import {
  getCourse,
} from "../../actions/courses_actions";
import CourseShow from "./course_show";

const mSTP = (state, ownProps) => ({
  course: state.entities.courses[ownProps.match.params.id],
  currentUser: state.session.user
});

const mDTP = (dispatch) => ({
  getCourse: (courseId) => dispatch(getCourse(courseId))
});

export default connect(mSTP, mDTP)(CourseShow);
