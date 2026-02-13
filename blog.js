const filterButtons = document.querySelectorAll(".filter-btn");
const blogCards = document.querySelectorAll(".blog-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");

    // Activate clicked button
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Filter cards
    blogCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      if (filter === "all" || category === filter) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});
