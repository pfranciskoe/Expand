import { connect } from "react-redux";
import {
  getCourse,
  updateCourse,
} from "../../actions/courses_actions";
import { fetchUser, updateUser } from "../../actions/users_actions";
import { deleteLesson } from '../../actions/lessons_actions';
import CourseShow from "./course_show";

const mSTP = (state, ownProps) => {
  const currentUserId = state.session.user.id
  return {
    course: state.entities.courses[ownProps.match.params.id],
    currentUserId: state.session.user.id,
    user: state.entities.users[currentUserId],
  };
};

const mDTP = (dispatch) => ({
  getCourse: (courseId) => dispatch(getCourse(courseId)),
  updateCourse: (course) => dispatch(updateCourse(course)),
  fetchUser: (userId) => dispatch(fetchUser(userId)),
  updateUser: (user) => dispatch(updateUser(user)),
  deleteLesson: (id) => dispatch(deleteLesson(id))
});

export default connect(mSTP, mDTP)(CourseShow);
