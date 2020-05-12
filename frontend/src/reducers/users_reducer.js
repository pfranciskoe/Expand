import {
    RECEIVE_USER,
    REMOVE_USER
} from '../actions/users_actions';
import { RECEIVE_COURSE } from '../actions/courses_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    switch(action.type){
        // case RECEIVE_COURSE:
        //     // return Object.assign({}, state, action.course.data.students);
        //     let copy = {}
        //     action.course.data.students.forEach(student => {
        //         copy[student._id] = student;
        //     });
        //     return copy;
        case RECEIVE_USER:
            return Object.assign({}, state, {[action.user.data._id]: action.user.data});
        case REMOVE_USER:
            let newState = Object.assign({}, state);
            delete newState[action.userId];
            return newState;
        default:
            return state;
    }
}