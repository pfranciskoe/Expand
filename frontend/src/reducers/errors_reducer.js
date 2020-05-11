import { combineReducers } from 'redux';
import SessionErrorsReducer from './session_errors_reducer';
import CourseErrorsReducer from './courses_errors_reducer';

export default combineReducers({
    courses: CourseErrorsReducer,
    session: SessionErrorsReducer
});