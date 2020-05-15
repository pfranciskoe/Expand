import * as lessonsAPIUtil from "../util/lessons_api_util";
import {updateCourse} from "../actions/courses_actions";

export const RECEIVE_LESSONS = "RECEIVE_LESSONS";
export const RECEIVE_LESSON = "RECEIVE_LESSON";
export const REMOVE_LESSON = "REMOVE_LESSON";
export const RECEIVE_LESSON_ERRORS = "RECEIVE_LESSON_ERRORS";

const receiveLessons = (lessons) => ({
  type: RECEIVE_LESSONS,
  lessons,
});

const receiveLesson = (lesson) => ({
  type: RECEIVE_LESSON,
  lesson,
});

const removeLesson = (lessonId) => ({
  type: REMOVE_LESSON,
  lessonId,
});

const receiveLessonErrors = (errors) => ({
  type: RECEIVE_LESSON_ERRORS,
  errors,
});

export const createLesson = (lesson) => (dispatch) =>
  lessonsAPIUtil.createLesson(lesson).then(
    (lesson) => dispatch(receiveLesson(lesson)),
    (err) => dispatch(receiveLessonErrors(err))
  );

export const getLessons = () => (dispatch) =>
  lessonsAPIUtil
    .getLessons()
    .then((lessons) => dispatch(receiveLessons(lessons)));

export const getLesson = (lessonId) => (dispatch) =>
  lessonsAPIUtil
    .getLesson(lessonId)
    .then((lesson) => dispatch(receiveLesson(lesson)));


export const updateLesson = (lesson) => (dispatch) =>
  lessonsAPIUtil.updateLesson(lesson).then(
    (lesson) => dispatch(receiveLesson(lesson)),
    (err) => dispatch(receiveLessonErrors(err))
  );

export const deleteLesson = (lessonId) => (dispatch) =>
  lessonsAPIUtil
    .removeLesson(lessonId)
    .then((lessonId) => dispatch(removeLesson(lessonId)));
