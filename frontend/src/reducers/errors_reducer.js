import { combineReducers } from 'redux';
import SessionErrorsReducer from './session_errors_reducer';
import CoursesErrorsReducer from './courses_errors_reducer';
import UsersErrorsReducer from './users_errors_reducer';
import LessonsErrorsReducer from './lessons_errors_reducer';

export default combineReducers({
    users: UsersErrorsReducer,
    courses: CoursesErrorsReducer,
    lessons: LessonsErrorsReducer,
    session: SessionErrorsReducer
});