import {
  RECEIVE_RESPONSE,
  REMOVE_RESPONSE,
} from '../actions/responses_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    //
    case RECEIVE_RESPONSE:
      return { ...state, [action.response.data._id]: action.response.data };
    case REMOVE_RESPONSE:
      const newState = { ...state };
      delete newState[action.responseId];
      return newState;
    default:
      return state;
  }
};
