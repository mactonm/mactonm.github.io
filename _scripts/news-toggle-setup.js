---
permalink: /assets/js/news-toggle-setup.js
---
(function () {
  const sections = document.querySelectorAll(".news");
  if (sections.length === 0) return;

  sections.forEach((section) => {
    const wrapper = section.querySelector(".news-list-collapsible");
    const button = section.querySelector(".news-toggle-button");

    if (!wrapper || !button) return;

    button.addEventListener("click", () => {
      const isCollapsed = wrapper.classList.toggle("is-collapsed");
      button.setAttribute("aria-expanded", String(!isCollapsed));
      button.innerHTML = isCollapsed
        ? 'More news <span aria-hidden="true">&darr;</span>'
        : 'Less news <span aria-hidden="true">&uarr;</span>';
    });
  });
})();