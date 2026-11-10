// Small enhancements: phone menu, header shadow, reveal-on-scroll.
// The site still works fully if this script does not load.

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const menu = document.getElementById("main-nav");

// ---------- Phone menu (burger) ----------
if (menuButton && menu) {
  const labelOpen = menuButton.getAttribute("aria-label");
  const labelClose = document.documentElement.lang === "uk" ? "Закрити меню" : "Menü schließen";

  const setMenu = (open) => {
    header.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? labelClose : labelOpen);
  };

  menuButton.addEventListener("click", () => {
    setMenu(!header.classList.contains("menu-open"));
  });

  // Close the menu after choosing a section or pressing Escape
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });
}

// ---------- Header gets a shadow once the page is scrolled ----------
const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 8);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

// ---------- Blocks fade in while scrolling ----------
// Classes are added from here, so without JavaScript nothing stays hidden.
const revealItems = document.querySelectorAll(
  ".section-title, .section-sub, .card, .note, .about-grid > *, .faq details, .contact-box, .example-label"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => {
    // Cards in one row appear one after another (small delay for each)
    if (item.classList.contains("card")) {
      const index = Array.from(item.parentElement.children).indexOf(item);
      item.style.setProperty("--delay", `${index * 90}ms`);
    }
    item.classList.add("reveal");
    observer.observe(item);
  });
}
