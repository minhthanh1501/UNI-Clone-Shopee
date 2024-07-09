import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../constants";
import axios from "./axiosCient";

// export const apiGetProductsFilter = (
//   page,
//   per_page,
//   sort,
//   category,
//   minprice,
//   maxprice,
//   filter
// ) =>
//   axios({
//     url: `/products?_page=${page}&_per_page=${per_page}&_sort=${sort}&_category=${category}&_minprice=${minprice}&_maxprice=${maxprice}&_filter=${filter}`,
//     method: "get",
//   });

// export const apiGetProducts = () =>
//   axios({
//     url: `/products`,
//     method: "get",
//   });

export const apiGetProductsFilter = ({
  _page,
  _per_page,
  _sort,
  _category,
  _minprice,
  _maxprice,
  _filter,
}) =>
  axios.get("/products", {
    params: {
      _page: _page || DEFAULT_PAGE,
      _per_page: _per_page || DEFAULT_PER_PAGE,
      _sort,
      _category,
      _minprice,
      _maxprice,
      _filter,
    },
  });

export const apiGetProducts = () => axios.get("/products");
