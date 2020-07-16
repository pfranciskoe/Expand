import { combineReducers } from 'redux';
import courses from './courses_reducer';
import users from './users_reducer';
import lessons from './lessons_reducers';
import comments from './comments_reducer';
import responses from './responses_reducer';

export default combineReducers({
  courses,
  users,
  lessons,
  comments,
  responses,
});
