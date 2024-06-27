import axios from "../axios";

export const apiGetProductsFilter = (page, per_page, sort) =>
  axios({
    url: `/products?_page=${page}&_per_page=${per_page}&_sort=${sort}`,
    method: "get",
  });

export const apiGetProducts = () =>
  axios({
    url: `/products`,
    method: "get",
  });
