import * as apis from "../../../apis";

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
  let html = `<div class="relative">
          <button id="category${response[0].id}" value="${response[0].id}" class="text-[#EE4D2D] font-bold text-[14px]">${response[0].name}</button>
          <i class="fa-solid fa-caret-right absolute top-[8px] left-[-14px] text-[10px] text-[#EE4D2D]"></i>
        </div>`;

  html += response
    .slice(1)
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
      const orgin = url.origin;
      const newURL = orgin + `/category=${item.value}`;
      history.pushState(null, "", newURL);
      // fetchProductByCategory();
    });
  });
};

fetchCategories();
