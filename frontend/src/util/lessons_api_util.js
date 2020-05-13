import axios from "axios";

export const getLessons = () => {
  return axios.get("/api/lessons");
};

export const getLesson = (id) => {
  return axios.get(`/api/lessons/${id}`);
};

export const createLesson = (lesson) => {
  console.log("Util: ", lesson)
  return axios.post("/api/lessons/upload", lesson);
};

export const updateLesson = (lesson) => {
  return axios.patch(`/api/lessons/${lesson._id}`, lesson);
};

export const removeLesson = (id) => {
  return axios.delete(`/api/lessons/${id}`);
};
