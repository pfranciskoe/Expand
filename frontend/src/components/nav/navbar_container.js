import { connect } from 'react-redux';
import { logout, clearErrors } from '../../actions/session_actions';
import { fetchUser } from '../../actions/users_actions';
import NavBar from './navbar';
import { getCourses, getCourse } from '../../actions/courses_actions';

const mapStateToProps = ({ entities: { users, courses }, session }) => {
  let userId = undefined;
  if (session.user) userId = session.user.id;
  return {
    loggedIn: session.isAuthenticated,
    userId,
    currentUser: users[userId],
    courses,
  };
};

const mapDispatchToProps = (dispatch) => ({
  clearErrors: () => dispatch(clearErrors()),
  logout: () => dispatch(logout()),
  fetchUser: (userId) => dispatch(fetchUser(userId)),
  getCourses: (userId) => dispatch(getCourses(userId)),
  getCourse: (courseId) => dispatch(getCourse(courseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
