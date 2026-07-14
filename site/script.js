const root = document.documentElement;
const body = document.body;
const header = document.querySelector("[data-header]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const year = document.querySelector("[data-year]");
const themeColor = document.querySelector('meta[name="theme-color"]');

if (year) {
  year.textContent = new Date().getFullYear();
}

const updateThemeLabel = () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  themeToggle?.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
  themeColor?.setAttribute("content", root.dataset.theme === "dark" ? "#151916" : "#f7f8f5");
};

updateThemeLabel();

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  try {
    localStorage.setItem("portfolio-theme-v2", nextTheme);
  } catch (_) {}
  updateThemeLabel();
});

const closeMenu = () => {
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Open navigation");
  mobileNav?.classList.remove("is-open");
  header?.classList.remove("menu-active");
  body.classList.remove("menu-open");
};

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  if (isOpen) {
    closeMenu();
    return;
  }

  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Close navigation");
  mobileNav?.classList.add("is-open");
  header?.classList.add("menu-active");
  body.classList.add("menu-open");
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener(
  "scroll",
  () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 16);
  },
  { passive: true },
);

const revealItems = document.querySelectorAll(".reveal");
const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 },
  );

  revealItems.forEach((item) => observer.observe(item));
}
