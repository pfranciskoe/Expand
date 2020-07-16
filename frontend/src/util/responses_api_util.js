import axios from 'axios';

export const getResponse = (id) => {
  return axios.get(`/api/responses/${id}`);
};

export const createResponse = (response) => {
  return axios.post(`/api/responses/`, response);
};

export const updateResponse = (response) => {
  return axios.patch(`/api/responses/${response._id}`, response);
};

export const removeResponse = (responseId) => {
  return axios.delete(`/api/responses/${responseId}`);
};
