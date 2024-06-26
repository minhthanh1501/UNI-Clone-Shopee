import "./index.css";
import "./Asset/sass/index.scss";
import "./Asset/sass/header.scss";
import "./Asset/sass/content.scss";
import "./Asset/sass/footer.scss";
import "@fortawesome/fontawesome-free/css/all.css";

document.addEventListener("DOMContentLoaded", function () {
  const language = document.getElementById("language");
  const boxLanguage = document.getElementById("box-language");

  language.addEventListener("mouseenter", function () {
    boxLanguage.style.display = "block";
    requestAnimationFrame(() => {
      boxLanguage.classList.add("show");
    });
  });

  language.addEventListener("mouseleave", function () {
    boxLanguage.classList.remove("show");
    boxLanguage.addEventListener(
      "transitionend",
      function handleTransitionEnd() {
        if (!boxLanguage.classList.contains("show")) {
          boxLanguage.style.display = "none";
        }
        boxLanguage.removeEventListener("transitionend", handleTransitionEnd);
      }
    );
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cart = document.getElementById("cart");
  const boxCart = document.getElementById("box-cart");

  cart.addEventListener("mouseenter", function () {
    boxCart.style.display = "block";
    requestAnimationFrame(() => {
      boxCart.classList.add("show");
    });
  });

  cart.addEventListener("mouseleave", function () {
    boxCart.classList.remove("show");
    boxCart.addEventListener("transitionend", function handleTransitionEnd() {
      if (!boxCart.classList.contains("show")) {
        boxCart.style.display = "none";
      }
      boxCart.removeEventListener("transitionend", handleTransitionEnd);
    });
  });
});
