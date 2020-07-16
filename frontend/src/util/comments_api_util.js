import axios from 'axios';

export const getComment = (id) => {
  return axios.get(`/api/comments/${id}`);
};

export const createComment = (comment) => {
  return axios.post('/api/comments', comment);
};

export const updateComment = (comment) => {
  return axios.patch(`/api/comments/${comment._id}`, comment);
};

export const removeComment = (commentId) => {
  return axios.delete(`/api/comments/${commentId}`);
};
