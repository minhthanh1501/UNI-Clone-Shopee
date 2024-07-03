import * as apis from "../../axios";
import { fetchProducts } from "./products";

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);

  // Lấy giá trị của tham số _filter từ URL và cập nhật trạng thái của các checkbox
  const filters = urlParams.get("_filter");
  if (filters !== null) {
    const filterArray = filters.split(",");
    filterArray.forEach((filter) => {
      const checkbox = document.querySelector(
        `input[name="filter"][value="${filter}"]`
      );
      if (checkbox) {
        checkbox.checked = true;
      }
    });
  }

  const checkboxes = document.querySelectorAll('input[name="filter"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      const url = new URL(window.location);
      const params = new URLSearchParams(url.search);

      const checkedFilters = Array.from(checkboxes)
        .filter((cb) => cb.checked)
        .map((cb) => cb.value);

      if (checkedFilters.length > 0) {
        params.set("_filter", checkedFilters.join(","));
      } else {
        params.delete("_filter");
      }

      const newUrl = `${url.protocol}//${url.host}${
        url.pathname
      }?${params.toString()}`;
      history.pushState(null, "", newUrl);

      // Gọi hàm xử lý hoặc tải lại dữ liệu nếu cần
      fetchProducts();
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Lấy URL hiện tại
  const urlParams = new URLSearchParams(window.location.search);

  // Lấy giá trị của tham số _minprice và _maxprice
  const minPrice = urlParams.get("_minprice");
  const maxPrice = urlParams.get("_maxprice");

  // Kiểm tra nếu các tham số tồn tại và đặt giá trị cho các ô input
  if (minPrice !== null) {
    document.getElementById("minPrice").value = minPrice;
  }
  if (maxPrice !== null) {
    document.getElementById("maxPrice").value = maxPrice;
  }

  document.getElementById("submitPrice").addEventListener("click", () => {
    const minPrice = document.getElementById("minPrice").value;
    const maxPrice = document.getElementById("maxPrice").value;

    const url = new URL(location);
    const params = new URLSearchParams(url.search);

    if (parseInt(minPrice) >= parseInt(maxPrice)) {
      document.getElementById("messagePrice").textContent =
        "Giá trị không hợp lệ";

      return;
    } else {
      document.getElementById("messagePrice").textContent = "";
    }

    if (minPrice !== "") {
      params.set("_minprice", minPrice);
    } else {
      params.delete("_minprice");
    }

    if (maxPrice !== "") {
      params.set("_maxprice", maxPrice);
    } else {
      params.delete("_maxprice");
    }

    const newUrl = `${url.protocol}//${url.host}${
      url.pathname
    }?${params.toString()}`;
    history.pushState(null, "", newUrl);
    fetchProducts();
  });
});

document.getElementById("delParams").addEventListener("click", () => {
  const url = new URL(location);
  const NewUrl = url.origin;
  history.pushState(null, "", NewUrl);
  location.reload();
});

const categoriesList = document.getElementById("categoriesList");
let limitCurrent = 5;

const fetchCategories = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const category = parseInt(urlParams.get("_category"), 10);
    let categoryCheck;

    if (category >= 6) {
      limitCurrent = 15;
    }

    const response = await apis.apiGetCategoriesLimit(limitCurrent);
    // console.log(response);
    showDataCategories(response);
  } catch (error) {
    console.log(error);
  }
};

const showDataCategories = async (response) => {
  let html = "";

  html += response
    .map(
      (category) =>
        `<button id="category${category.id}" class="flex" value="${category.id}">${category.name}</button>`
    )
    .join("");

  html += `
        <p id="loadMoreBtn">
          Thêm
          <i class="fa-solid fa-angle-down"></i>
        </p>`;

  categoriesList.innerHTML = html;
  const url = new URL(location);
  if (url.searchParams.get("_category")) {
    console.log(url.searchParams.get("_category"));
    setActive(`category${url.searchParams.get("_category")}`);
  }
  attachLoadMoreEvent();
};

const attachLoadMoreEvent = () => {
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  // console.log(limitCurrent);
  if (limitCurrent <= 12) {
    limitCurrent += 5;
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", function (event) {
        event.preventDefault();
        fetchCategories();
      });
    } else {
      console.log("load more false");
    }
  } else {
    loadMoreBtn.style.display = "none";
  }

  const items = document.querySelectorAll('[id^="category"]');
  items.forEach((item) => {
    document.getElementById(item.id).addEventListener("click", (e) => {
      e.preventDefault();
      const url = new URL(location);
      let params = "";
      console.log(url);
      if (url.searchParams.get("_page") == null) {
        params += `?_page=1`;
        if (url.searchParams.get("_sort") == null) {
          params += `&_sort=price`;
        }
        params += `&_category=${item.value}`;
        const NewUrl = url.protocol + `//` + url.host + `/` + params;
        history.pushState({ category: 1 }, "", NewUrl);
        fetchProducts().then(() => {
          setActive(item.id);
        });
        console.log(NewUrl);
      } else {
        if (url.searchParams.get("_sort") != null) {
          params += `&_sort=${url.searchParams.get("_sort")}`;
        }
        params += `&_category=${item.value}`;
        const NewUrl =
          url.protocol +
          `//` +
          url.host +
          `/` +
          `?_page=${url.searchParams.get("_page")}` +
          params;
        history.pushState({ category: 1 }, "", NewUrl);
        fetchProducts().then(() => {
          setActive(item.id);
        });
        console.log(NewUrl);
      }
    });
  });
};

function setActive(itemId) {
  const items = document.querySelectorAll("button.flex");
  items.forEach((item) => {
    item.classList.remove("active");
  });

  let activeItem = document.getElementById(itemId);
  if (activeItem) {
    activeItem.classList.add("active");
  }
}

fetchCategories();
