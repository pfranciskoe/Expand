import {combineReducers} from 'redux';
import courses from './courses_reducer';
import users from './users_reducer';
import lessons from './lessons_reducers';

export default combineReducers({
    courses,
    users,
    lessons
});