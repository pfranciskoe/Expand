import { RECEIVE_COURSE_ERRORS } from '../actions/courses_actions';

const _nullErrors = [];

const coursesErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_COURSE_ERRORS:
            return action.errors;
        default:
            return state;
    }
};

export default coursesErrorsReducer;