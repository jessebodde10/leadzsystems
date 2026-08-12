/* ============================================================
   Leadz Systems — video landing prototype
   Vanilla JS: stat count-up + mobile menu.
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------
     Stat count-up — easeOutCubic, fires once when in view
     --------------------------------------------------------- */
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function format(value, decimals, suffix) {
    return value.toFixed(decimals) + suffix;
  }

  function countUp(el, index) {
    var target = parseFloat(el.dataset.target);
    var decimals = parseInt(el.dataset.decimals, 10) || 0;
    var suffix = el.dataset.suffix || "";

    if (reduceMotion) {
      el.textContent = format(target, decimals, suffix);
      return;
    }

    var duration = 1500 + index * 80;
    var startDelay = 480 + index * 90;
    var startTime = null;

    function frame(now) {
      if (startTime === null) startTime = now;
      var elapsed = now - startTime;
      var progress = Math.min(elapsed / duration, 1);
      el.textContent = format(target * easeOutCubic(progress), decimals, suffix);
      if (progress < 1) requestAnimationFrame(frame);
    }

    setTimeout(function () {
      requestAnimationFrame(frame);
    }, startDelay);
  }

  var values = Array.prototype.slice.call(document.querySelectorAll(".stat-value"));

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          countUp(entry.target, values.indexOf(entry.target));
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.25 }
    );
    values.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    values.forEach(countUp);
  }

  /* ---------------------------------------------------------
     Mobile menu
     --------------------------------------------------------- */
  var burger = document.querySelector(".burger");
  var overlay = document.querySelector(".menu-overlay");
  var sheet = document.querySelector(".menu-sheet");

  if (!burger || !overlay || !sheet) return;

  function setMenu(open) {
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
    overlay.hidden = !open;
    sheet.hidden = !open;
    document.body.classList.toggle("menu-open", open);
  }

  burger.addEventListener("click", function () {
    setMenu(burger.getAttribute("aria-expanded") !== "true");
  });

  overlay.addEventListener("click", function () {
    setMenu(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  sheet.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 720) setMenu(false);
  });
})();
