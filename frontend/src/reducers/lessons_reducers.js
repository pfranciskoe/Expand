import {
  RECEIVE_LESSONS,
  RECEIVE_LESSON,
  REMOVE_LESSON,
} from "../actions/lessons_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
      case RECEIVE_LESSONS:
        const nextState = {};
      action.lessons.forEach(lesson => {
          nextState[lesson._id] = lesson
      })
      return nextState;
    case RECEIVE_LESSON:
        return {...state, [action.lesson._id]: action.lesson}
    case REMOVE_LESSON:
        const newState = {...state}
        delete newState[action.lessonId];
        return newState;
    default:
      return state;
  }
};
