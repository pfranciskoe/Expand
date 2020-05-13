import { connect } from "react-redux";
import { getLesson } from "../../actions/lessons_actions";
import LessonShow from "./lesson_show";

const mSTP = (state, ownProps) => ({
  lesson: state.entities.lessons[ownProps.match.params.id]
});

const mDTP = (dispatch) => ({
  getLesson: (lessonId) => dispatch(getLesson(lessonId)),
});

export default connect(mSTP, mDTP)(LessonShow);
