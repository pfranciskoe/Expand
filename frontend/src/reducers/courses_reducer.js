import {
    RECEIVE_COURSES,
    RECEIVE_COURSE,
    REMOVE_COURSE
} from '../actions/courses_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_COURSES:
            return action.courses;
        case RECEIVE_COURSE:
            return Object.assign({}, state, {[action.course.id]: action.course});
        case REMOVE_COURSE:
            let newState = Object.assign({}, state);
            delete newState[action.courseId];
            return newState;
        default:
            return state;
    }
}