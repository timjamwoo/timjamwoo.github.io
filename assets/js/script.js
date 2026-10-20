/* timbarrywoods.dev
   Small, dependency-free enhancements. Everything on the page works without this file. */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  /* ---- Theme toggle (dark is the default; the choice is remembered) ---- */
  var THEME_KEY = "tbw-theme";

  function applyTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
    var toggle = document.querySelector(".theme-toggle");
    if (toggle) {
      var isLight = theme === "light";
      toggle.setAttribute("aria-pressed", isLight ? "true" : "false");
      toggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
    }
  }

  function storedTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  applyTheme(storedTheme());

  document.addEventListener("click", function (event) {
    var toggle = event.target.closest(".theme-toggle");
    if (!toggle) return;
    var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (e) {
      /* private mode or storage blocked: the toggle still works for this visit */
    }
  });

  /* ---- Mobile menu ---- */
  var menuToggle = document.querySelector(".menu-toggle");
  var navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        /* The links sit before the toggle in the DOM, so move focus to them. */
        var first = navLinks.querySelector("a");
        if (first) first.focus();
      }
    });

    navLinks.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navLinks.classList.contains("is-open")) {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.focus();
      }
    });

    navLinks.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Reveal on scroll (CSS only animates when motion is allowed) ---- */
  var reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && reveals.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
