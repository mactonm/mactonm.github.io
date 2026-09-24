---
permalink: /assets/js/reveal-setup.js
---
// Fade-up homepage sections as they scroll into view.
// Sections are fully visible by default; the js-reveal class opts into the
// hidden initial state only when IntersectionObserver is available and the
// user has not requested reduced motion.
(function () {
  const targets = document.querySelectorAll(".homepage-post .reveal");
  if (targets.length === 0) return;

  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) return;

  document.documentElement.classList.add("js-reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Reveal when entering the viewport, or if already scrolled past
        // (e.g. anchor jump / fast scroll) so nothing is left hidden above.
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  targets.forEach((el) => observer.observe(el));
})();
