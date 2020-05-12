import * as coursesAPIUtil from "../util/courses_api_util";

export const RECEIVE_COURSES = "RECEIVE_COURSES";
export const RECEIVE_COURSE = "RECEIVE_COURSE";
export const RECEIVE_NEW_COURSE = "RECEIVE_NEW_COURSE";
export const REMOVE_COURSE = "REMOVE_COURSE";
export const RECEIVE_COURSE_ERRORS = "RECEIVE_COURSE_ERRORS";

const receiveCourses = courses => ({
    type: RECEIVE_COURSES,
    courses
})

const receiveCourse = course => ({
    type: RECEIVE_COURSE,
    course
})

const receiveNewCourse = course => ({
    type: RECEIVE_NEW_COURSE,
    course
})

const removeCourse = courseId => ({
    type: REMOVE_COURSE,
    courseId
})

const receiveCourseErrors = errors => ({
    type: RECEIVE_COURSE_ERRORS,
    errors
})


export const createCourse = course => dispatch => coursesAPIUtil.createCourse(course)
    .then(course => dispatch(receiveNewCourse(course)),
    err => dispatch(receiveCourseErrors(err)))

export const getCourses = () => dispatch => coursesAPIUtil.getCourses()
    .then(courses => dispatch(receiveCourses(courses)))

export const getCourse = (courseId) => dispatch => coursesAPIUtil.getCourse(courseId)
    .then(course => dispatch(receiveCourse(course)))

export const getUserCourses = (userId) => dispatch => coursesAPIUtil.getUserCourses(userId)
    .then(courses => dispatch(receiveCourses(courses)))

export const updateCourse = (course) => dispatch => coursesAPIUtil.updateCourse(course)
    .then(course => dispatch(receiveNewCourse(course)),
        err => dispatch(receiveCourseErrors(err)))

export const deleteCourse = (courseId) => dispatch => coursesAPIUtil.removeCourse(courseId)
    .then(courseId => dispatch(removeCourse(courseId)))
