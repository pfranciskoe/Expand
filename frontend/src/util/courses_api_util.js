import axios from "axios";

export const getCourses = () => {
    return axios.get("/api/courses");
};

export const getUserCourses = (id) => {
    return axios.get(`/api/courses/user/${id}`);
};

export const getCourse = (id) => {
    return axios.get(`/api/courses/${id}`);
};

export const createCourse= (course) => {
    return axios.post("/api/courses/", course);
};

export const updateCourse = (course) => {
    return axios.patch(`/api/courses/${course.id}`, course);
};

export const removeCourse = (id) => {
    return axios.delete(`/api/courses/${id}`);
};
