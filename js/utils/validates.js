import {
  specialCharRegex,
  uppercaseRegex,
  phoneNumberRegex,
  usernameRegex,
} from "./regex";

export const isValidRePassword = ({
  password,
  rePassword,
  messageRepassword,
}) => {
  let isValid = true;

  if (!rePassword) {
    messageRepassword.textContent = "Vui lòng xác nhận lại mật khẩu";
    isValid = false;
  } else {
    if (password !== rePassword) {
      messageRepassword.textContent = "Xác nhận mật khẩu không khớp!";
      isValid = false;
    }
    if (rePassword.length < 8) {
      messageRepassword.innerHTML =
        "Mật khẩu phải có 8 ký tự gồm 1 ký tự in hoa, 1 ký tự đặc biệt<br>(vd: Shopee123@)";
      isValid = false;
    }
    if (
      !uppercaseRegex.test(rePassword) ||
      !specialCharRegex.test(rePassword)
    ) {
      messageRepassword.innerHTML =
        "Mật khẩu phải có 8 ký tự gồm 1 ký tự in hoa, 1 ký tự đặc biệt<br>(vd: Shopee123@)";
      isValid = false;
    }
  }

  return isValid;
};

export const isValidPassword = ({ password, messagePassword }) => {
  let isValid = true;

  if (!password) {
    messagePassword.textContent = "Vui lòng nhập mật khẩu";
    isValid = false;
  } else {
    if (password.length < 8) {
      messagePassword.innerHTML =
        "Mật khẩu phải có 8 ký tự gồm 1 ký tự in hoa, 1 ký tự đặc biệt<br>(vd: Shopee123@)";
      isValid = false;
      isValid = false;
    }
    if (!uppercaseRegex.test(password) || !specialCharRegex.test(password)) {
      messagePassword.innerHTML =
        "Mật khẩu phải có 8 ký tự gồm 1 ký tự in hoa, 1 ký tự đặc biệt<br>(vd: Shopee123@)";
      isValid = false;
      isValid = false;
    }
  }

  return isValid;
};

export const isValidUsernameOrPhone = ({
  usernameOrPhone,
  messageUsernameOrPhone,
}) => {
  let isValid = true;

  if (!usernameOrPhone) {
    messageUsernameOrPhone.textContent =
      "Vui lòng nhập tên đăng nhập hoặc số điện thoại";
    isValid = false;
  } else if (usernameOrPhone.length < 8) {
    messageUsernameOrPhone.innerHTML =
      "Tên tài khoản tối thiểu 8 ký tự gồm số và chữ cái<br>(vd: minhthanh_1501 / minhthanh1501)";
    isValid = false;
  } else if (
    usernameOrPhone.length >= 8 &&
    usernameOrPhone.length !== 10 &&
    !usernameRegex.test(usernameOrPhone)
  ) {
    messageUsernameOrPhone.innerHTML =
      "Tên tài khoản phải gồm số và chữ cái<br>(vd: minhthanh_1501 / minhthanh1501)";
    isValid = false;
  } else if (
    usernameOrPhone.length == 10 &&
    Number(usernameOrPhone) &&
    phoneNumberRegex.test(usernameOrPhone)
  ) {
    isValid = true;
  } else if (
    usernameOrPhone.length == 10 &&
    Number(usernameOrPhone) &&
    !phoneNumberRegex.test(usernameOrPhone)
  ) {
    messageUsernameOrPhone.innerHTML =
      "Số điện thoại không hợp lệ<br> (vd: 84386648412 / 0985391168)";
    isValid = false;
  }

  return isValid;
};

export const isUsernameShouldBePhoneNumber = ({
  usernameOrPhone,
  messageUsernameOrPhone,
}) => {
  //string, number, {}, []
  if (!usernameOrPhone || !(typeof usernameOrPhone === "string")) return false;

  let isValid = true;

  if (usernameOrPhone.length !== 10) {
    isValid = false;
    messageUsernameOrPhone.textContent = "Số điện thoại phải có 10 ký tự";
  }

  if (usernameOrPhone.indexOf(0) !== "0") {
    isValid = false;
    messageUsernameOrPhone.textContent = "Số điện thoại không hợp lệ";
  }

  if (isNaN(Number(usernameOrPhone))) {
    isValid = false;
    messageUsernameOrPhone.textContent = "Số điện thoại không hợp lệ";
  }

  return isValid;
};
