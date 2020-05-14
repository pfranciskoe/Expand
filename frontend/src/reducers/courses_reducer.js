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
            let nextState= {...state};
            nextState[action.course.data._id] = action.course.data;
            return nextState;
        case REMOVE_COURSE:
            let copyState = Object.assign({}, state);
            delete copyState[action.courseId.data._id];
            return copyState;
        default:
            return state;
    }
}