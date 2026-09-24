(function () {
  const homepageRoot = document.querySelector(".homepage-post");
  const navLinks = Array.from(document.querySelectorAll(".nav-link[data-nav-section]"));
  const navbar = document.getElementById("navbar");
  const homepageNavTitle = document.querySelector(".homepage-nav-title");

  if (navLinks.length === 0 || !navbar) return;

  document.querySelectorAll(".contact-icons a").forEach((link) => {
    if (!link.getAttribute("aria-label")) {
      const label = link.getAttribute("title");
      if (label) link.setAttribute("aria-label", label);
    }
  });

  const setCurrentSection = (currentKey) => {
    navLinks.forEach((link) => {
      const isCurrent = link.dataset.navSection === currentKey;
      link.classList.toggle("is-current", isCurrent);
      link.setAttribute("aria-current", isCurrent ? "page" : "false");

      const navItem = link.closest(".nav-item");
      if (navItem) {
        navItem.classList.toggle("active", isCurrent);
      }
    });
  };

  if (!homepageRoot) {
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    const pageSections = {
      "/news": "news",
      "/publications": "publications",
      "/projects": "research",
    };

    if (pageSections[path]) setCurrentSection(pageSections[path]);
    return;
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      homepageNavTitle.classList.toggle("is-hidden", link.dataset.navSection === "about");
    });
  });

  const sections = [
    { key: "about", element: document.querySelector("#about") },
    { key: "research", element: document.getElementById("research") },
    { key: "news", element: document.getElementById("news") },
    { key: "publications", element: document.getElementById("publications") },
  ].filter((section) => section.element);

  if (sections.length === 0) return;

  let ticking = false;

  const updateCurrentSection = () => {
    const offset = navbar.getBoundingClientRect().height + 28;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    let currentKey = "about";

    if (window.scrollY >= maxScroll - 8) {
      currentKey = sections[sections.length - 1].key;
    } else {
      sections.forEach((section) => {
        if (section.element.getBoundingClientRect().top - offset <= 0) {
          currentKey = section.key;
        }
      });
    }

    setCurrentSection(currentKey);
    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateCurrentSection);
  };

  updateCurrentSection();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  window.addEventListener("hashchange", requestUpdate);
})();