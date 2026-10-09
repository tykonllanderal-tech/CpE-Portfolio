// Mobile menu: open and close the links list
const menuButton = document.querySelector(".menu");
const linkList = document.querySelector("#links");

if (menuButton && linkList) {
  menuButton.addEventListener("click", () => {
    const open = linkList.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  linkList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      linkList.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!linkList.contains(event.target) && !menuButton.contains(event.target)) {
      linkList.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

// Reveal animations
const revealItems = document.querySelectorAll(".reveal");
if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

// Highlight the nav link for the section you are reading
const navLinks = [...document.querySelectorAll(".links a")];
const sections = navLinks
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

if (sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((a) =>
            a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
          );
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => observer.observe(s));
}

// Projects carousel: previous and next buttons
const track = document.querySelector("#track");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");

if (track && prevButton && nextButton) {
  prevButton.addEventListener("click", () => {
    track.scrollBy({ left: -track.clientWidth, behavior: "smooth" });
  });

  nextButton.addEventListener("click", () => {
    track.scrollBy({ left: track.clientWidth, behavior: "smooth" });
  });
}

// Footer year
const yearNode = document.querySelector("#year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

// Hide carousel arrows when there is only one project
if (track && track.children.length <= 1) {
  if (prevButton) prevButton.hidden = true;
  if (nextButton) nextButton.hidden = true;
  const carousel = document.querySelector(".carousel");
  if (carousel) carousel.classList.add("single");
}
