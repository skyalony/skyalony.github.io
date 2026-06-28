(function () {
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  var year = document.querySelector("[data-year]");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  if (!navToggle || !navLinks) {
    return;
  }

  navToggle.addEventListener("click", function () {
    var isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", function (event) {
    if (event.target.tagName !== "A") {
      return;
    }

    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
})();
