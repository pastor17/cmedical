(function () {
  "use strict";
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var open = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  var backToTop = document.getElementById("backToTop");
  if (backToTop) backToTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
})();
