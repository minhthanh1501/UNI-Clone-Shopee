import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import * as apis from "../../axios";

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

const login = async (username, password) => {
  try {
    const response = apis.apiUserLogin({ username, password });
    const accessToken = generateAccessToken(username);
    const refreshToken = generateRefreshToken(username);

    localStorage.setItem("token", accessToken);
    setCookie("refreshToken", refreshToken, 1);
    location.replace(location.origin);
  } catch (error) {
    console.log(error);
  }
};

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  login(username, password);
});
