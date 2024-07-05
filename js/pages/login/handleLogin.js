import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import * as apis from "../../axios";
import Swal from "sweetalert2";
import {
  checkPhoneNumber,
  setCookie,
  showHideToggle,
  hashPassword,
} from "../../utils/helper";
import { isValidPassword, isValidUsernameOrPhone } from "../../utils/validates";

const login = async (usernameOrPhone, password) => {
  let data = {};
  if (checkPhoneNumber(usernameOrPhone)) {
    data = {
      username: "",
      phone: usernameOrPhone,
      password,
    };
  } else {
    data = {
      username: usernameOrPhone,
      phone: "",
      password,
    };
  }
  try {
    const response = await apis.apiCheckUserLogin(data);
    if (response.length > 0) {
      console.log(response);
      return response;
    }

    return false;
  } catch (error) {
    console.log(error);
  }
};

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const usernameOrPhone = document.getElementById("usernameOrPhone").value;
  const password = document.getElementById("password").value;
  const messageUsernameOrPhone = document.getElementById(
    "messageUsernameOrPhone"
  );
  const messagePassword = document.getElementById("messagePassword");

  // Reset all messages
  messageUsernameOrPhone.textContent = "";
  messagePassword.textContent = "";

  let isValid = true;

  // Validate usernameOrPhone
  isValid = isValidUsernameOrPhone({ usernameOrPhone, messageUsernameOrPhone });

  // Validate Password
  isValid = isValidPassword({ password, messagePassword });

  if (!isValid) {
    return;
  }

  const hashPass = await hashPassword(password);
  // console.log(hashPass);
  // If all validations pass, proceed with login
  login(usernameOrPhone, password).then((result) => {
    if (result) {
      if (
        (usernameOrPhone == result[0].phone ||
          usernameOrPhone == result[0].username) &&
        hashPass == result[0].password
      ) {
        const { password, ...userInfoData } = result[0];
        const accessToken = generateAccessToken(usernameOrPhone);
        const jsonString = JSON.stringify(userInfoData);
        const userInfo = jsonString;
        const refreshToken = generateRefreshToken(usernameOrPhone);

        localStorage.setItem("token", accessToken);
        localStorage.setItem("userInfo", userInfo);
        setCookie("refreshToken", refreshToken, 1);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Đăng nhập thành công!",
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          window.location.replace(location.origin);
        }, 1000);
      } else {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Sai mật khẩu hoặc tài khoản!",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } else {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Sai mật khẩu hoặc tài khoản!",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  });
});

showHideToggle("eye", "password");
