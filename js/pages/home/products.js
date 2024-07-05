import * as apis from "../../axios";
import {
  DEFALT_MAX_PAGE,
  DEFALT_MIN_PAGE,
  DEFAULT_MAX_STAR,
  DEFAULT_PAGE,
} from "../../constants";
import { getQueryParams, setQueryParamsAndPushSate } from "../../utils/helper";

const productsList = document.getElementById("productsList");
const paginationProducts = document.getElementById("paginationProducts");
const popularBtn = document.getElementById("popularBtn");
const pageCurrent = document.getElementById("pageCurrent");
const totalPage = document.getElementById("totalPage");
const prevBtnTop = document.getElementById("prevBtnTop");
const nextBtnTop = document.getElementById("nextBtnTop");

window.addEventListener("popstate", () => {
  fetchProducts();
});

prevBtnTop.addEventListener("click", () => {
  const { currentPage } = getQueryParams();
  let newPage = Math.max(currentPage - 1, DEFALT_MIN_PAGE);
  setQueryParamsAndPushSate({ _page: newPage });
  fetchProducts();
});

nextBtnTop.addEventListener("click", () => {
  const { currentPage } = getQueryParams();
  let newPage = Math.min(currentPage + 1, DEFALT_MAX_PAGE);
  setQueryParamsAndPushSate({ _page: newPage });
  fetchProducts();
});

popularBtn.addEventListener("click", function () {
  setQueryParamsAndPushSate({ _sort: "rating" });
  fetchProducts();
});

export const fetchProducts = async () => {
  try {
    const { currentPage, category, filter, maxprice, minprice, perPage, sort } =
      getQueryParams();

    const response = await apis.apiGetProductsFilter({
      _page: currentPage,
      _per_page: perPage,
      _sort: sort,
      _category: category,
      _minprice: minprice,
      _maxprice: maxprice,
      _filter: filter,
    });

    response.next != null
      ? (pageCurrent.textContent = response.next - 1)
      : (pageCurrent.textContent = 3);
    totalPage.textContent = response.pages;

    showDataProducts(response);
    ShowPaginationProducts(response);
  } catch (error) {
    console.log(error);
  }
};

const showDataProducts = (response) => {
  const products = response.data;
  let productsHtml = "";
  productsHtml += products
    .map((product) => {
      let percentPrice =
        ((product.price_before_discount - product.price) /
          product.price_before_discount) *
        100;
      percentPrice = percentPrice.toFixed(2);

      const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      });

      let starsHtml = "";
      for (let i = 1; i < DEFAULT_MAX_STAR; i++) {
        if (i <= product.rating) {
          starsHtml += '<i class="fa-solid fa-star text-yellow-400"></i>';
        } else {
          starsHtml += '<i class="fa-regular fa-star"></i>';
        }
      }

      return `<div class="flex w-[20%] ">
              <a href="#" class="m-1 flex flex-col shadow min-h-[335.8px] transition ease-in-out hover:scale-1.03">
                <img src="${product.images[0]}" alt=""
                  class="w-[188px] h-[188px]">
                <div class="flex flex-col p-1">
                  <div>
                    <div class="text-[12px] line-clamp-2">${product.name}</div>
                    <div class="text-[10px]"><span class="text-[10px] border border-[#EE4D2D] text-primary px-2 py-0.5">Rẻ
                        vô
                        địch</span>
                    </div>
                  </div>
                  <div class="flex items-center justify-stretch gap-1  pt-2">
                    <div class="flex items-center">
                      <span class="text-[12px] text-primary font-extralight">₫</span>
                      <span class="text-[16px] text-primary font-extralight">${VND.format(
                        product.price
                      )}</span>
                    </div>
                    <div class="flex items-center">
                      <del class="text-[12px] text-gray-600 font-extralight">₫</del>
                      <del class="text-[14px] text-gray-600 font-extralight">${VND.format(
                        product.price_before_discount
                      )}</del>
                    </div>
                    <div>
                      <span class="text-[10px] text-primary">-${percentPrice}%</span>
                    </div>
                  </div>
                  <div class="flex items-center mt-3">
                    <div class="flex text-[9px]">
                      ${starsHtml}
                      <i class="fa-regular fa-star"></i>
                    </div>
  
                    <span class="pl-1 text-[12px] block">Đã bán ${
                      product.sold
                    }K</span>
  
                  </div>
                  <div class="mt-2 text-[12px] font-extralight">TP.HCM</div>
                </div>
              </a>
            </div>`;
    })
    .join("");
  productsList.innerHTML = productsHtml;
};

const ShowPaginationProducts = (response) => {
  let paginationHtml = "";

  paginationHtml += `<button  class="flex justify-between items-center px-3 rounded-sm  cursor-pointer hover:opacity-50" id="prevBtn"><i
                class="fa-solid fa-angle-left text-gray-400 text-[17px]"></i></button>`;

  for (let index = 1; index <= response.pages; index++) {
    paginationHtml += `
    <button class="outline-none border-none px-4 py-1 font-light rounded-sm text-gray-400" value="${index}" id="item${index}">${index}</button>
    `;
  }

  paginationHtml += `<button class="flex justify-between items-center px-3 rounded-sm  cursor-pointer hover:opacity-50" id="nextBtn"><i
                class="fa-solid fa-angle-right text-gray-400 text-[17px]"></i></button>`;

  paginationProducts.innerHTML = paginationHtml;

  const url = new URL(location);
  let item;
  url.searchParams.get("_page") == null
    ? (item = document.getElementById("item1"))
    : (item = document.getElementById("item" + url.searchParams.get("_page")));
  item.classList.add("active");
  attachLoadMoreEventProducts();
};

const attachLoadMoreEventProducts = () => {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  prevBtn.addEventListener("click", () => {
    const { currentPage } = getQueryParams();
    let newPage = Math.max(currentPage - 1, DEFALT_MIN_PAGE);
    setQueryParamsAndPushSate({ _page: newPage });
    fetchProducts();
  });

  nextBtn.addEventListener("click", () => {
    const { currentPage } = getQueryParams();
    let newPage = Math.min(currentPage + 1, DEFALT_MAX_PAGE);
    setQueryParamsAndPushSate({ _page: newPage });
    fetchProducts();
  });

  const items = document.querySelectorAll('[id^="item"]');

  items.forEach((item) => {
    document.getElementById(item.id).addEventListener("click", function () {
      setQueryParamsAndPushSate({ _page: item.value });
      fetchProducts().then(() => {
        setActive(item.id);
      });
    });
  });
};

function setActive(itemId) {
  const items = document.querySelectorAll('[id^="`item`"]');
  items.forEach((item) => {
    item.classList.remove("active");
  });

  let activeItem = document.getElementById(itemId);
  if (activeItem) {
    activeItem.classList.add("active");
  }
}

fetchProducts();
