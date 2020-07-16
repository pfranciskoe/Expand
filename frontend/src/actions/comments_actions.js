import * as commentsAPIUtil from '../util/comments_api_util';

// export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

// const receiveComments = (comments) => ({
//   type: RECEIVE_COMMENTS,
//   comments,
// });

const receiveComment = (comment) => ({
  type: RECEIVE_COMMENT,
  comment,
});

const removeComment = (commentId) => ({
  type: REMOVE_COMMENT,
  commentId,
});

export const createComment = (comment) => (dispatch) =>
  commentsAPIUtil
    .createComment(comment)
    .then((comment) => dispatch(receiveComment(comment)));

export const getComment = (commentId) => (dispatch) =>
  commentsAPIUtil
    .getComment(commentId)
    .then((comment) => dispatch(receiveComment(comment)));

export const updateComment = (comment) => (dispatch) =>
  commentsAPIUtil
    .updateComment(comment)
    .then((comment) => dispatch(receiveComment(comment)));

export const deleteComment = (commentId) => (dispatch) =>
  commentsAPIUtil
    .removeComment(commentId)
    .then((comment) => dispatch(removeComment(comment._id)));
