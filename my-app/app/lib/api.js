import axios from "axios";

const BASE_URL = "https://1o1.nhu-code.com"

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const postLogin = (username, password) => api.post("/login", { "username": username, "password": password});
export const postLogout = () => api.post("/logout");
export const getSession = () => api.get("/session");

export const getUser = (userID) => api.get(`/user/${userID}`);

export const getUserResources = (userID) => api.get(`/resource/user/${userID}`);

export const getResource = (resourceID) => api.get(`/resource/${resourceID}`);
export const postResource = (userId, resource) => api.post(`/resource`, resource);
export const patchResource = (resourceID, changes) => api.patch(`/resource/${resourceID}`, changes);
export const deleteResource = (resourceID) => api.delete(`/resource/${resourceID}`);

export const putLike = (resourceID, liked) => api.put(`/resource/${resourceID}/like`, liked);

export const getTagResources = (tagName) => api.get(`/resource/tag/${tagName}`);
export const getAuthorResources = (author) => api.get(`resource/author/${author}`);

export default api;