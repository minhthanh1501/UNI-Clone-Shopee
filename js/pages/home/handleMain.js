const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userInfo = document.getElementById("userInfo");

function clearCookie(name) {
  document.cookie = name + "=; Max-Age=-99999999;";
}

if (localStorage.getItem("token")) {
  registerBtn.classList.add("hidden");
  loginBtn.classList.add("hidden");
  logoutBtn.classList.remove("hidden");
  const userInfoData = localStorage.getItem("userInfo");
  const userInfoObject = JSON.parse(userInfoData);
  userInfoObject.username == ""
    ? (userInfo.textContent = userInfoObject.phone)
    : (userInfo.textContent = userInfoObject.username);
}

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  clearCookie("refreshToken");
  location.reload();
});
