import axios from "../axios";

export const apiGetUser = () =>
  axios({
    url: `/user`,
    method: "get",
  });
