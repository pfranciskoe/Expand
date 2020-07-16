import { connect } from 'react-redux';
import { createCourse, deleteCourse } from '../../actions/courses_actions';
import CourseForm from './course_form';
import { updateUser } from '../../actions/users_actions';

const mSTP = (state, ownProps) => ({
  course: {
    title: '',
    description: '',
    instructor: state.session.user.id,
    thumbnailUrl: '',
  },
  user: state.entities.users[state.session.user.id],
  formType: 'Create Course',
});

const mDTP = (dispatch) => ({
  action: (course) => dispatch(createCourse(course)),
  deleteCourse: (courseId) => dispatch(deleteCourse(courseId)),
  updateUser: (user) => dispatch(updateUser(user)),
});

export default connect(mSTP, mDTP)(CourseForm);
