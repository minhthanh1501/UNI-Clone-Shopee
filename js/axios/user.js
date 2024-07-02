import axios from "./axiosCient";

export const apiUserRegister = (data) => axios.post("/users", data);

export const apiUserLogin = ({ username, password }) =>
  axios.get("/users", { params: { username, password } });

export const apiCheckUserExist = ({ username }) =>
  axios.get("/users", { params: { username } });
