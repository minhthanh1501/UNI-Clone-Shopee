import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import * as apis from "../../axios";
import Swal from "sweetalert2";
import {
  checkPhoneNumber,
  setCookie,
  showHideToggle,
  hashPassword,
} from "../../utils/helper";
import {
  isValidPassword,
  isValidRePassword,
  isValidUsernameOrPhone,
} from "../../utils/validates";

if (localStorage.getItem("token")) {
  window.location.replace(location.origin);
}

const checkUserExisted = async (usernameOrPhone) => {
  let data = {};
  if (checkPhoneNumber(usernameOrPhone)) {
    data = {
      username: "",
      phone: usernameOrPhone,
    };
  } else {
    data = {
      username: usernameOrPhone,
      phone: "",
    };
  }
  try {
    const response = await apis.apiCheckUserExist(data);
    console.log(response);
    if (response.length > 0) {
      console.log("true");
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
  }
};

const register = async (usernameOrPhone, password) => {
  let data = {};
  const hashPass = await hashPassword(password);
  if (checkPhoneNumber(usernameOrPhone)) {
    data = {
      username: "",
      phone: usernameOrPhone,
      password: hashPass,
    };
  } else {
    data = {
      username: usernameOrPhone,
      phone: "",
      password: hashPass,
    };
  }

  try {
    const response = await apis.apiCreateUserRegister(data);
    const { password, ...userInfoData } = response;
    const accessToken = generateAccessToken(usernameOrPhone);
    const jsonString = JSON.stringify(userInfoData);
    const userInfo = jsonString;
    const refreshToken = generateRefreshToken(usernameOrPhone);

    localStorage.setItem("token", accessToken);
    localStorage.setItem("userInfo", userInfo);
    setCookie("refreshToken", refreshToken, 1);
    window.location.replace(location.origin);
  } catch (error) {
    console.log(error);
  }
};

document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const usernameOrPhone = document.getElementById("usernameOrPhone").value;
    const password = document.getElementById("password").value;
    const repassword = document.getElementById("repassword").value;
    const messageUsernameOrPhone = document.getElementById(
      "messageUsernameOrPhone"
    );
    const messagePassword = document.getElementById("messagePassword");
    const messageRepassword = document.getElementById("messageRepassword");

    // Reset all messages
    messageUsernameOrPhone.textContent = "";
    messagePassword.textContent = "";
    messageRepassword.textContent = "";

    let isValid = true;

    // Validate usernameOrPhone
    isValid = isValidUsernameOrPhone({
      usernameOrPhone,
      messageUsernameOrPhone,
    });

    // Validate Password
    isValid = isValidPassword({ messagePassword, password });

    // Validate repassword
    isValid = isValidRePassword({
      messageRepassword,
      password,
      rePassword: repassword,
    });

    if (!isValid) {
      return;
    }

    // Proceed with registration if all validations pass
    checkUserExisted(usernameOrPhone).then((result) => {
      if (result === true) {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Đã tồn tại tài khoản!",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Đăng Ký thành công, đang chuyển hướng",
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          register(usernameOrPhone, password);
        }, 1000);
      }
    });
  });

showHideToggle("eyePassword", "password");
showHideToggle("eyeRepassword", "repassword");
