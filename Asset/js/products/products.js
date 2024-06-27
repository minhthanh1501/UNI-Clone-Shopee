import * as apis from "../../../apis";

const productsList = document.getElementById("productsList");
const paginationProducts = document.getElementById("paginationProducts");
const popularBtn = document.getElementById("popularBtn");

let currentPage;
let sort;

popularBtn.addEventListener("click", function () {
  const url = new URL(location);
  let origin = url.origin;
  let pathname = url.pathname;
  let searchParams = url.searchParams;
  if (pathname == "/" && searchParams.get("_page") === null) {
    pathname = "/products";
    searchParams.set("_page", 1);
  }

  url.searchParams.set("_sort", "rating");
  console.log(url);
  sort = url.searchParams.get("_sort");
  const newUrl = origin + pathname + `?` + searchParams;
  history.pushState(null, "", newUrl);

  fetchProducts();
});

const fetchProducts = async () => {
  try {
    const url = new URL(location);
    const href = url.href;
    const origin = url.origin;
    const pathname = url.pathname;
    const searchParams = url.searchParams;

    console.log(url);

    searchParams.get("_page") === null
      ? (currentPage = 1)
      : (currentPage = searchParams.get("_page"));

    searchParams.get("_sort") === null
      ? (sort = "price")
      : (sort = searchParams.get("_sort"));

    const response = await apis.apiGetProductsFilter(currentPage, 20, sort);
    console.log(response);

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
      for (let i = 1; i < 5; i++) {
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
  const items = document.querySelectorAll('[id^="item"]');
  items.forEach((item) => {
    document.getElementById(item.id).addEventListener("click", function () {
      // Thay đổi URL mà không tải lại trang
      let pathname;
      let newUrl;
      const url = new URL(location);
      if (url.pathname === "/") {
        pathname = "/products";
      } else {
        pathname = url.pathname;
      }
      // console.log(url);
      if (url.searchParams.get("_sort") === null) {
        newUrl =
          url.protocol + "//" + url.host + pathname + `?_page=${item.value}`;
      } else {
        url.searchParams.set("_sort", "rating");
        sort = url.searchParams.get("_sort");
        newUrl =
          url.protocol +
          "//" +
          url.host +
          pathname +
          `?_page=${item.value}` +
          `&_sort=${sort}`;
      }

      history.pushState({ page: 1 }, "Page 1", newUrl);
      console.log("New URL:", newUrl);

      fetchProducts().then(() => {
        setActive(item.id);
      });
    });
  });
};

function setActive(itemId) {
  const items = document.querySelectorAll('[id^="item"]');
  items.forEach((item) => {
    item.classList.remove("active");
  });

  let activeItem = document.getElementById(itemId);
  if (activeItem) {
    activeItem.classList.add("active");
  }
}

fetchProducts();
