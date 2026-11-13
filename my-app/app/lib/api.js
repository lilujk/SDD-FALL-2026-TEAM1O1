import axios from "axios";

const BASE_URL = "https://1o1.nhu-code.com"

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const postLogin = (username, password) => api.post("/login", { "username": username, "password": password});
export const postLogout = () => api.post("/logout");
export const getSession = () => api.get("/session");
export default api;