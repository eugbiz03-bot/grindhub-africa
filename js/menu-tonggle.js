const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// Open / Close
toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  document.body.classList.toggle("no-scroll");

  // Change icon
  if (navLinks.classList.contains("active")) {
    toggle.textContent = "✖";
  } else {
    toggle.textContent = "☰";
  }
});

// Auto-close when clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    document.body.classList.remove("no-scroll");

    toggle.textContent = "☰";
  });
});

window.addEventListener("load", () => {
  document.body.classList.remove("preload");
});