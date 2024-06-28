import * as apis from "../../../apis";
import { fetchProducts } from "../products/products";

const checkboxes = document.getElementsByName("filter");
checkboxes.forEach((item) => {
  document.getElementById(item.id).addEventListener("click", () => {});
});

document.getElementById("submitPrice").addEventListener("click", () => {
  const minPrice = document.getElementById("minPrice").value;
  const maxPrice = document.getElementById("maxPrice").value;

  const url = new URL(location);
  const params = new URLSearchParams(url.search);

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

  const NewUrl = `${url.protocol}//${url.host}${
    url.pathname
  }?${params.toString()}`;
  history.pushState(null, "", NewUrl);
  fetchProducts();
});

const categoriesList = document.getElementById("categoriesList");
let limitCurrent = 5;

const fetchCategories = async () => {
  try {
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
  attachLoadMoreEvent();
};

const attachLoadMoreEvent = () => {
  const loadMoreBtn = document.getElementById("loadMoreBtn");
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
