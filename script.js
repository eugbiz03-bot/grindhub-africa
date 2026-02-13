document.addEventListener("DOMContentLoaded", () => {
  const note = document.getElementById("note");

  // Show popup after 3 seconds
  setTimeout(() => {
    note.classList.add("show");

    // Automatically hide after 8 seconds if not clicked
    setTimeout(() => {
      if (note.classList.contains("show")) {
        note.classList.remove("show");
      }
    }, 8000); // 8 seconds visible
  }, 3000); // delay before it appears

  // Redirect when clicked
  note.addEventListener("click", () => {
    window.location.href = "notice.html";
  });
});
