import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import * as apis from "../../axios";
import Toastify from "toastify-js";
import Swal from "sweetalert2";
import { checkPhoneNumber, setCookie } from "../../utils/helper";

const Login = async (usernameOrPhone, password) => {
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
      return response;
    }

    return false;
  } catch (error) {
    console.log(error);
  }
};

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const usernameOrPhone = document.getElementById("usernameOrPhone").value;
  const password = document.getElementById("password").value;
  const messageUsernameOrPhone = document.getElementById(
    "messageUsernameOrPhone"
  );
  const messagePassword = document.getElementById("messagePassword");
  const messageLogin = document.getElementById("messageLogin");

  // Regular expressions to check for uppercase letters and special characters
  const uppercaseRegex = /[A-Z]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  // Reset all messages
  messageUsernameOrPhone.textContent = "";
  messagePassword.textContent = "";
  messageLogin.textContent = "";

  let isValid = true;
  let isPhoneNumber = false;

  // Validate usernameOrPhone
  if (!usernameOrPhone) {
    messageLogin.textContent = "Vui lòng điền đầy đủ thông tin!";
    messageUsernameOrPhone.textContent = "Tên tài khoản tối thiểu 8 ký tự";
    isValid = false;
  } else if (usernameOrPhone.length < 8) {
    messageUsernameOrPhone.textContent = "Tên tài khoản tối thiểu 8 ký tự";
    isValid = false;
  }

  if (checkPhoneNumber(usernameOrPhone)) {
    isPhoneNumber = true;
  }

  if (isPhoneNumber) {
    if (usernameOrPhone.length == 10) {
      messageUsernameOrPhone.textContent = "";
      isValid = true;
    } else {
      messageUsernameOrPhone.textContent = "Số điện thoại gồm 10 số";
      isValid = false;
    }
  } else {
    isPhoneNumber = false;
  }

  // Validate Password
  if (!password) {
    messageLogin.textContent = "Vui lòng nhập đủ thông tin!";
    messagePassword.textContent = " 8 ký tự, 1 ký tự in hoa, 1 ký tự đặc biệt";
    isValid = false;
  } else {
    if (password.length < 8) {
      messagePassword.textContent = "8 ký tự";
      messagePassword.textContent += ", 1 ký tự in hoa";
      messagePassword.textContent += ", 1 ký tự đặc biệt";
      isValid = false;
    }
    if (!uppercaseRegex.test(password) || !specialCharRegex.test(password)) {
      messagePassword.textContent = "8 ký tự";
      messagePassword.textContent += ", 1 ký tự in hoa";
      messagePassword.textContent += ", 1 ký tự đặc biệt";
      isValid = false;
    }
  }

  if (!isValid) {
    return;
  }

  // If all validations pass, proceed with login
  Login(usernameOrPhone, password).then((result) => {
    if (result) {
      const accessToken = generateAccessToken(usernameOrPhone);
      const jsonString = JSON.stringify(result[0]);
      const userInfo = jsonString;
      const refreshToken = generateRefreshToken(usernameOrPhone);
      if (
        (usernameOrPhone == result[0].phone ||
          usernameOrPhone == result[0].username) &&
        password == result[0].password
      ) {
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
