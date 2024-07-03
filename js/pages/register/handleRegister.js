import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import * as apis from "../../axios";
import Swal from "sweetalert2";
import { checkPhoneNumber, setCookie } from "../../utils/helper";

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
  if (checkPhoneNumber(usernameOrPhone)) {
    data = {
      username: "",
      phone: usernameOrPhone,
      password: password,
    };
  } else {
    data = {
      username: usernameOrPhone,
      phone: "",
      password: password,
    };
  }

  try {
    const response = await apis.apiCreateUserRegister(data);
    console.log(response);
    const accessToken = generateAccessToken(usernameOrPhone);
    const jsonString = JSON.stringify(response);
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
    const messageRegister = document.getElementById("messageRegister");

    // Regular expressions to check for uppercase letters and special characters
    const uppercaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    // Reset all messages
    messageUsernameOrPhone.textContent = "";
    messagePassword.textContent = "";
    messageRepassword.textContent = "";
    messageRegister.textContent = "";

    let isValid = true;
    let isPhoneNumber = false;

    // Validate usernameOrPhone
    if (!usernameOrPhone) {
      messageRegister.textContent = "Vui lòng nhập đủ thông tin!";
      messageUsernameOrPhone.textContent = "Tên tài khoản tối thiểu 8 ký tự";
      isValid = false;
    } else if (usernameOrPhone.length < 8) {
      // messageUsernameOrPhone.textContent = "Tên tài khoản tối thiểu 8 ký tự";
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
    }

    // Validate Password
    if (!password) {
      messageRegister.textContent = "Vui lòng nhập đủ thông tin!";
      messagePassword.textContent =
        " 8 ký tự, 1 ký tự in hoa, 1 ký tự đặc biệt";
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

    // Validate repassword
    if (!repassword) {
      messageRegister.textContent = "Vui lòng nhập đủ thông tin!";
      isValid = false;
    } else if (password !== repassword) {
      messageRepassword.textContent = "Xác nhận mật khẩu không khớp!";
      isValid = false;
    }

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
