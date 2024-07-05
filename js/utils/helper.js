import {
  DEFAULT_MAX_PRICE,
  DEFAULT_MIN_PRICE,
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
} from "../constants";

export function checkPhoneNumber(input) {
  const phoneNumberRegex = /^\d+$/;
  return phoneNumberRegex.test(input);
}

export function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function showHideToggle(ElementId, ElementChangeId) {
  let hide = true;
  const ElementClick = document.getElementById(ElementId);
  const ElementChange = document.getElementById(ElementChangeId);

  ElementClick.addEventListener("click", () => {
    if (hide) {
      ElementClick.classList.remove("fa-eye-slash");
      ElementClick.classList.add("fa-eye");
      ElementChange.type = "text";
      hide = false;
    } else {
      ElementClick.classList.remove("fa-eye");
      ElementClick.classList.add("fa-eye-slash");
      ElementChange.type = "password";
      hide = true;
    }
  });
}

export async function hashPassword(passwordInput) {
  const password = passwordInput;
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

export const getQueryParams = () => {
  const url = new URL(location);
  const searchParams = url.searchParams;

  const currentPage = searchParams.get("_page");

  const perPage = searchParams.get("_per_page");

  const sort = searchParams.get("_sort");

  const category = searchParams.get("_category");

  const minprice = searchParams.get("_minprice");

  const maxprice = searchParams.get("_maxprice");

  const filter = searchParams.get("_filter");

  return {
    currentPage: parseInt(currentPage) || DEFAULT_PAGE,
    perPage: parseInt(perPage) || DEFAULT_PER_PAGE,
    sort,
    category,
    minprice,
    maxprice,
    filter,
  };
};

// {
//   "_page": 22342342,
//   "_per_page": 1231231231
// }

export const setQueryParamsAndPushSate = (Obj) => {
  const keyArr = Object.keys(Obj); // ["_page", "_per_page"]

  let url = new URL(location);
  let params = new URLSearchParams(url.search);

  keyArr.forEach((key) => {
    params.set(key, Obj[key]);
  });

  url.search = params.toString();
  window.history.pushState(null, "", url);
};

// setQueryParamsAndPushSate({
//   _page: 1,
//   _per_page: 20,
//   _sort: "price",
// });
