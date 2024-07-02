import axios from "./axiosCient";

export const apiGetCategoriesLimit = (limit) =>
  axios({
    url: `/categories?_limit=${limit}`,
    method: "get",
  });

export const apiGetCategories = () =>
  Axios({
    url: `/categories`,
    method: "get",
  });
