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
  userInfo.textContent = localStorage.getItem("token").toString();
}

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("token");
  clearCookie("refreshToken");
  location.reload();
});
