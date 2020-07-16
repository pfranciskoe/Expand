import { RECEIVE_LESSON_ERRORS } from '../actions/lessons_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_LESSON_ERRORS:
      return action.errors;
    default:
      return state;
  }
};
