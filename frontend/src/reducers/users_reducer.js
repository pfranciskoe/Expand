import {
    RECEIVE_USER,
    REMOVE_USER
} from '../actions/users_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_USER:
            return Object.assign({}, state, {[action.user.id]: action.user});
        case REMOVE_USER:
            let newState = Object.assign({}, state);
            delete newState[action.userId];
            return newState;
        default:
            return state;
    }
}