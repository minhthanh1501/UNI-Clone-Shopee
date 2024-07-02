import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import * as apis from "../../axios";

if (localStorage.getItem("token")) {
  window.location.replace(location.origin);
}

const checkUserExisted = async (username) => {
  try {
    const response = await apis.apiCheckUserExist({ username });
    if (response.length === 1) {
      console.log("true");
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
  }
};

const register = async (username, password) => {
  try {
    const response = await apis.apiUserRegister({ username, password });
    const accessToken = generateAccessToken(username);

    localStorage.setItem("token", accessToken);
    window.location.replace(location.origin);
  } catch (error) {
    console.log(error);
  }
};

document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const repassword = document.getElementById("repassword").value;
    const messageRegister = document.getElementById("messageRegister");

    if (!username || !password || !repassword) {
      messageRegister.textContent = "Vui lòng nhập đủ thông tin!";
    } else {
      messageRegister.textContent = "";
      if (checkUserExisted(username) === true) {
        console.log("đã tồn  tại");
      } else {
        register(username, password);
      }
    }
  });
