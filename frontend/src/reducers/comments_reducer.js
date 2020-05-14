import {
  RECEIVE_COMMENT,
  REMOVE_COMMENT,
} from "../actions/comments_actions";
import { RECEIVE_LESSON} from "../actions/lessons_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    //  
    case RECEIVE_COMMENT:
      return { ...state, [action.comment.data._id]: action.comment.data };
    case REMOVE_COMMENT:
      const newState = { ...state };
      delete newState[action.commentId];
      return newState;
    default:
      return state;
  }
};
