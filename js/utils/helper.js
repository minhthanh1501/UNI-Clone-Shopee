export function checkPhoneNumber(input) {
  const phoneNumberRegex = /^\d+$/;
  return phoneNumberRegex.test(input);
}

export function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function showHideToggle(ElementId, ElementChangeId) {
  let hide = true;
  const ElementClick = document.getElementById(ElementId);
  const ElementChange = document.getElementById(ElementChangeId);

  ElementClick.addEventListener("click", () => {
    if (hide) {
      ElementClick.classList.remove("fa-eye-slash");
      ElementClick.classList.add("fa-eye");
      ElementChange.type = "text";
      hide = false;
    } else {
      ElementClick.classList.remove("fa-eye");
      ElementClick.classList.add("fa-eye-slash");
      ElementChange.type = "password";
      hide = true;
    }
  });
}

export async function hashPassword(passwordInput) {
  const password = passwordInput;
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}
