import axios from "./axiosCient";

export const apiGetCategoriesLimit = (limit) =>
  axios({
    url: `/categories?_limit=${limit}`,
    method: "get",
  });

export const apiGetCategories = () =>
  axios({
    url: `/categories`,
    method: "get",
  });
