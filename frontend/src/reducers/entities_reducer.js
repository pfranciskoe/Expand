import {combineReducers} from 'redux';
import courses from './courses_reducer';
import users from './users_reducer';

export default combineReducers({
    courses,
    users
});