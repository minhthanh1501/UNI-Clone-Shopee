import axios from "../axios";

export const apiGetProductsFilter = (
  page,
  per_page,
  sort,
  category,
  minprice,
  maxprice,
  filter
) =>
  axios({
    url: `/products?_page=${page}&_per_page=${per_page}&_sort=${sort}&_category=${category}&_minprice=${minprice}&_maxprice=${maxprice}&_filter=${filter}`,
    method: "get",
  });

export const apiGetProducts = () =>
  axios({
    url: `/products`,
    method: "get",
  });
