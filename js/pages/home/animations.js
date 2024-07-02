function setupHoverToggle(triggerElementId, targetElementId) {
  const triggerElement = document.getElementById(triggerElementId);
  const targetElement = document.getElementById(targetElementId);

  triggerElement.addEventListener("mouseenter", function () {
    targetElement.style.display = "block";
    requestAnimationFrame(() => {
      targetElement.classList.add("show");
    });
  });

  triggerElement.addEventListener("mouseleave", function () {
    targetElement.classList.remove("show");
    targetElement.addEventListener(
      "transitionend",
      function handleTransitionEnd() {
        if (!targetElement.classList.contains("show")) {
          targetElement.style.display = "none";
        }
        targetElement.removeEventListener("transitionend", handleTransitionEnd);
      }
    );
  });
}

setupHoverToggle("language", "box-language");
setupHoverToggle("cart", "box-cart");
setupHoverToggle("priceBtn", "box-price");
