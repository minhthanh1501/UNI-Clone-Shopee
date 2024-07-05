import * as apis from "../../axios";
import { getQueryParams, setQueryParamsAndPushSate } from "../../utils/helper";
import { fetchProducts } from "./products";

document.getElementById("delParams").addEventListener("click", () => {
  const url = new URL(location);
  const NewUrl = url.origin;
  history.pushState(null, "", NewUrl);
  location.reload();
});

document.addEventListener("DOMContentLoaded", function () {
  const { filter } = getQueryParams();
  if (filter !== null) {
    const filterArray = filter.split(",");
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

      fetchProducts();
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const { minprice, maxprice } = getQueryParams();

  // Kiểm tra nếu các tham số tồn tại và đặt giá trị cho các ô input
  if (minprice !== null) {
    document.getElementById("minPrice").value = minprice;
  }
  if (maxprice !== null) {
    document.getElementById("maxPrice").value = maxprice;
  }

  document.getElementById("submitPrice").addEventListener("click", () => {
    let minPrice = document.getElementById("minPrice").value;
    let maxPrice = document.getElementById("maxPrice").value;

    const url = new URL(location);
    const params = new URLSearchParams(url.search);
    if (minPrice === "" && maxPrice === "") {
      return;
    }

    if (parseInt(minPrice) >= parseInt(maxPrice)) {
      document.getElementById("messagePrice").textContent =
        "Giá trị không hợp lệ";

      return;
    } else {
      document.getElementById("messagePrice").textContent = "";
    }

    // setQueryParamsAndPushSate({ _minprice: minPrice, _maxprice: maxPrice });
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

const categoriesList = document.getElementById("categoriesList");
let limitCurrent = 5;

const fetchCategories = async () => {
  try {
    const { category } = getQueryParams();

    if (category >= 6) {
      limitCurrent = 15;
    }

    const response = await apis.apiGetCategoriesLimit(limitCurrent);
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
  const { category } = getQueryParams();
  setActive(`category${category}`);
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
      const { currentPage } = getQueryParams();
      setQueryParamsAndPushSate({ _page: currentPage, _category: item.value });
      fetchProducts().then(() => {
        setActive(item.id);
      });
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
