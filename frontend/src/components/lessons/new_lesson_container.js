import { connect } from "react-redux";
import { createLesson } from "../../actions/lessons_actions";
import LessonForm from "./lesson_form";

const mSTP = (state, ownProps) => ({
  lesson: {
    fileLink: "",
    description: "",
    title: ""
  },
  formType: "Create Lesson",
});

const mDTP = (dispatch) => ({
  action: (lesson) => dispatch(createLesson(lesson)),
});

export default connect(mSTP, mDTP)(LessonForm);
