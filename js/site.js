(() => {
  const REGISTER_FALLBACK = "https://app.utrsports.net/club/3156?tab=info";

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector("#mobile-menu");
  const nav = document.querySelector(".nav");

  function closeMenu() {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    mobileMenu.classList.remove("open");
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
      mobileMenu.classList.toggle("open", !isOpen);
    });

    mobileMenu.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  if (nav) {
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function applyRegisterLinks(url) {
    document.querySelectorAll("[data-register]").forEach((link) => {
      link.setAttribute("href", url);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noreferrer");
    });
  }

  async function loadSiteConfig() {
    try {
      const siteRoot = document.body?.dataset.siteRoot || "";
      const response = await fetch(`${siteRoot}resources/site.json`);
      if (!response.ok) throw new Error("site.json missing");
      const config = await response.json();
      window.BAT = { ...(window.BAT || {}), config };
      applyRegisterLinks(config.register_url || REGISTER_FALLBACK);
      return config;
    } catch (error) {
      console.warn(error);
      applyRegisterLinks(REGISTER_FALLBACK);
      return null;
    }
  }

  window.BAT = {
    ...(window.BAT || {}),
    escapeHtml(value) {
      return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
    },
    formatDate(iso, lang = "English") {
      const date = new Date(`${iso}T00:00:00`);
      if (Number.isNaN(date.getTime())) return iso;
      if (lang === "Chinese") {
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
      }
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    },
    loadSiteConfig
  };

  loadSiteConfig();
})();
