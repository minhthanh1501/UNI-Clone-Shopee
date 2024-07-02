import axios from "./axiosCient";

export const apiGetUser = () =>
  axios({
    url: `/user`,
    method: "get",
  });
