import {
  RECEIVE_LESSON,
  REMOVE_LESSON,
} from "../actions/lessons_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_LESSON:
        return {...state, [action.lesson.data._id]: action.lesson.data}
    case REMOVE_LESSON:
        const newState = {...state}
        delete newState[action.lessonId.data._id];
        return newState;
    default:
      return state;
  }
};
