import * as coursesAPIUtil from "../util/coursesAPIUtil";

export const RECEIVE_COURSES = "RECEIVE_COURSES";
export const RECEIVE_COURSE = "RECEIVE_COURSE";
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

const removeCourse = courseId => ({
    type: REMOVE_COURSE,
    courseId
})

const receiveCourseErrors = errors => ({
    type: REMOVE_COURSE,
    errors
})

export const createCourse = course => dispatch => coursesAPIUtil.createCourse(course)
    .then(course => dispatch(receiveCourse(course)),
    err => dispatch(receiveCourseErrors(err)))

export const getCourses = () => dispatch => coursesAPIUtil.getCourses()
    .then(courses => dispatch(receiveCourses(courses)))

export const getUserCourses = (userId) => dispatch => coursesAPIUtil.getUserCourses(userId)
    .then(courses => dispatch(receiveCourses(courses)))

export const updateCourse = (course) => dispatch => coursesAPIUtil.updateCourses(course)
    .then(course => dispatch(receiveCourse(course)),
        err => dispatch(receiveCourseErrors(err)))

export const deleteCourse = (courseId) => dispatch => coursesAPIUtil.removeCourse(courseId)
    .then(courseId => dispatch(removeCourse(courseId)))
