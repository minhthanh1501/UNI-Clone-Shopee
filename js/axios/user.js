import axios from "./axiosCient";

export const apiCreateUserRegister = (data) => axios.post("/users", data);

export const apiCheckUserLogin = ({ username, phone, password }) =>
  axios.get("/users", { params: { username, phone, password } });

export const apiCheckUserExist = ({ username, phone }) =>
  axios.get("/users", { params: { username, phone } });
