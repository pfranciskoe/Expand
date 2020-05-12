import {
    RECEIVE_COURSES,
    RECEIVE_COURSE,
    REMOVE_COURSE,
} from '../actions/courses_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_COURSES:
            let newState = {};
            action.courses.data.forEach((course) => {
                newState[course._id] = course;
            });
            return newState;
        case RECEIVE_COURSE:
            return Object.assign({}, state, {[action.course.data._id]: action.course.data});
        case REMOVE_COURSE:
            let copyState = Object.assign({}, state);
            delete copyState[action.courseId];
            return copyState;
        default:
            return state;
    }
}