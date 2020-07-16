import { connect } from 'react-redux';
import { createLesson } from '../../actions/lessons_actions';
import { updateCourse, getCourse } from '../../actions/courses_actions';
import LessonForm from './lesson_form';

const mSTP = ({ entities: { courses, lessons }, session }, { match }) => ({
  lesson: {
    title: '',
    description: '',
    videoUrl: '',
    instructor: session.user ? session.user.id : undefined,
    course: match.params.courseId,
    order: lessons ? Object.values(lessons).length + 1 : 1,
    thumbnailUrl: 'test.com',
  },
  course: courses[match.params.courseId],
  formType: 'Create Lesson',
});

const mDTP = (dispatch) => ({
  action: (lesson) => dispatch(createLesson(lesson)),
  updateCourse: (course) => dispatch(updateCourse(course)),
  getCourse: (courseId) => dispatch(getCourse(courseId)),
});

export default connect(mSTP, mDTP)(LessonForm);
