import {
  RECEIVE_LESSONS,
  RECEIVE_LESSON,
  REMOVE_LESSON,
} from "../actions/lessons_actions";
import { RECEIVE_COURSE } from "../actions/courses_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_LESSON:
        return {...state, [action.lesson.data._id]: action.lesson.data}
    case REMOVE_LESSON:
      console.log("reducer deletion", action.lessonId)
      console.log("actual: ", action.lessonId.data._id)
        const newState = {...state}
        delete newState[action.lessonId.data._id];
        return newState;
    default:
      return state;
  }
};
