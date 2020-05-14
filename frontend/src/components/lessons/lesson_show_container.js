import { connect } from "react-redux";
import { getLesson } from "../../actions/lessons_actions";
import { showModal } from '../../actions/modal_actions'
import LessonShow from "./lesson_show";
import {createResponse} from '../../actions/responses_actions';
import {createComment} from '../../actions/comments_actions';
const mSTP = (state, ownProps) => ({
  lesson: state.entities.lessons[ownProps.match.params.id],
  currentUserId: state.session.user.id
});

const mDTP = (dispatch) => ({
  getLesson: (lessonId) => dispatch(getLesson(lessonId)),
  createResponse: (response) => dispatch(createResponse(response)),
  createComment: (comment) => dispatch(createComment(comment)),
});

export default connect(mSTP, mDTP)(LessonShow);
