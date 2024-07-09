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
  if (!rePassword) {
    messageRepassword.textContent = "Vui lòng xác nhận lại mật khẩu";
    return false;
  } else {
    if (password !== rePassword) {
      messageRepassword.textContent = "Xác nhận mật khẩu không khớp!";
      return false;
    }
    if (rePassword.length < 8) {
      messageRepassword.innerHTML =
        "Mật khẩu phải có 8 ký tự gồm 1 ký tự in hoa, 1 ký tự đặc biệt<br>(vd: Shopee123@)";
      return false;
    }
    if (
      !uppercaseRegex.test(rePassword) ||
      !specialCharRegex.test(rePassword)
    ) {
      messageRepassword.innerHTML =
        "Mật khẩu phải có 8 ký tự gồm 1 ký tự in hoa, 1 ký tự đặc biệt<br>(vd: Shopee123@)";
      return false;
    }
  }

  return true;
};

export const isValidPassword = ({ password, messagePassword }) => {
  if (!password) {
    messagePassword.textContent = "Vui lòng nhập mật khẩu";
    return false;
  } else {
    if (password.length < 8) {
      messagePassword.innerHTML =
        "Mật khẩu phải có 8 ký tự gồm 1 ký tự in hoa, 1 ký tự đặc biệt<br>(vd: Shopee123@)";

      return false;
    }
    if (!uppercaseRegex.test(password) || !specialCharRegex.test(password)) {
      messagePassword.innerHTML =
        "Mật khẩu phải có 8 ký tự gồm 1 ký tự in hoa, 1 ký tự đặc biệt<br>(vd: Shopee123@)";

      return false;
    }
  }

  return true;
};

export const isUsernameShouldBePhoneNumber = ({ usernameOrPhone }) => {
  if (!usernameOrPhone || !(typeof usernameOrPhone === "string")) return false;

  if (usernameOrPhone.length !== 10) return false;

  if (usernameOrPhone.indexOf(0) !== "0") return false;

  if (isNaN(Number(usernameOrPhone))) return false;

  return true;
};

export const isValidUsernameOrPhone = ({
  usernameOrPhone,
  messageUsernameOrPhone,
}) => {
  if (!usernameOrPhone) {
    messageUsernameOrPhone.textContent =
      "Vui lòng nhập tên đăng nhập hoặc số điện thoại";
    return false;
  }

  const isPhoneNumber = isUsernameShouldBePhoneNumber({ usernameOrPhone });

  if (isPhoneNumber) {
    phoneNumberRegex.test(usernameOrPhone) &&
      (messageUsernameOrPhone.innerHTML =
        "Số điện thoại không hợp lệ<br> (vd: 84386648412 / 0985391168)");
    return false;
  }

  if (usernameOrPhone.length < 8) {
    messageUsernameOrPhone.innerHTML =
      "Tên tài khoản tối thiểu 8 ký tự gồm số và chữ cái<br>(vd: minhthanh_1501 / minhthanh1501)";
    return false;
  }

  if (
    usernameOrPhone.length >= 8 &&
    usernameOrPhone.length !== 10 &&
    !usernameRegex.test(usernameOrPhone)
  ) {
    messageUsernameOrPhone.innerHTML =
      "Tên tài khoản phải gồm số và chữ cái<br>(vd: minhthanh_1501 / minhthanh1501)";
    return false;
  }

  return true;
};

// export const isValidUsernameOrPhone = ({
//   usernameOrPhone,
//   messageUsernameOrPhone,
// }) => {
//   let isValid = true;

//   if (!usernameOrPhone) {
//     messageUsernameOrPhone.textContent =
//       "Vui lòng nhập tên đăng nhập hoặc số điện thoại";
//     isValid = false;
//   } else if (usernameOrPhone.length < 8) {
//     messageUsernameOrPhone.innerHTML =
//       "Tên tài khoản tối thiểu 8 ký tự gồm số và chữ cái<br>(vd: minhthanh_1501 / minhthanh1501)";
//     isValid = false;
//   } else if (
//     usernameOrPhone.length >= 8 &&
//     usernameOrPhone.length !== 10 &&
//     !usernameRegex.test(usernameOrPhone)
//   ) {
//     messageUsernameOrPhone.innerHTML =
//       "Tên tài khoản phải gồm số và chữ cái<br>(vd: minhthanh_1501 / minhthanh1501)";
//     isValid = false;
//   } else if (
//     usernameOrPhone.length == 10 &&
//     Number(usernameOrPhone) &&
//     phoneNumberRegex.test(usernameOrPhone)
//   ) {
//     isValid = true;
//   } else if (
//     usernameOrPhone.length == 10 &&
//     Number(usernameOrPhone) &&
//     !phoneNumberRegex.test(usernameOrPhone)
//   ) {
//     messageUsernameOrPhone.innerHTML =
//       "Số điện thoại không hợp lệ<br> (vd: 84386648412 / 0985391168)";
//     isValid = false;
//   }

//   return isValid;
// };
