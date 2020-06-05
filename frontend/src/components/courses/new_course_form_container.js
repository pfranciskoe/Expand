import { connect } from "react-redux";
import { createCourse } from "../../actions/courses_actions";
import CourseForm from "./course_form";
import {updateUser} from "../../actions/users_actions";

const mSTP = (state, ownProps) => ({
    course: {
        title: "",
        description: "",
        instructor: state.session.user.id
    },
    user: state.entities.users[state.session.user.id],
    formType: "Create Course"
})

const mDTP = dispatch => ({
    action: (course) => dispatch(createCourse(course)),
    updateUser: user => dispatch(updateUser(user))
})

export default connect(mSTP, mDTP)(CourseForm);