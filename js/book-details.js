document.addEventListener("DOMContentLoaded", async () => {

  const params = new URLSearchParams(window.location.search);
  const bookId = params.get("id");

  const titleEl = document.querySelector(".book-title");
  const descEl = document.querySelector(".book-description");
  const coverEl = document.querySelector(".book-cover");
  const viewBtn = document.querySelector(".view-btn");
  const downloadBtn = document.querySelector(".download-btn");
  const shareContainer = document.getElementById("share-container");

  if (!bookId) {
    titleEl.textContent = "Invalid book ID";
    return;
  }

  try {
    const response = await fetch("../data/books.json");
    const books = await response.json();

    const book = books.find(b => b.id === bookId);

    if (!book) {
      titleEl.textContent = "Book not found";
      return;
    }

    // Fill content
    titleEl.textContent = book.title;
    descEl.textContent = book.description || "No description";
    coverEl.src = "../" + book.image;

    viewBtn.href = book.file;
    downloadBtn.href = book.file;

    // =====================
    // SHARE LINKS (WORKING)
    // =====================

    const bookLink = window.location.href;

    document.getElementById("whatsapp-share").href =
      "https://wa.me/?text=" + encodeURIComponent(bookLink);

    document.getElementById("facebook-share").href =
      "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(bookLink);

    document.getElementById("twitter-share").href =
      "https://twitter.com/intent/tweet?url=" + encodeURIComponent(bookLink);

    // =====================
    // TOGGLE SHARE BUTTON
    // =====================

    const toggleBtn = document.getElementById("share-toggle");

    toggleBtn.addEventListener("click", () => {
      if (shareContainer.style.display === "block") {
        shareContainer.style.display = "none";
      } else {
        shareContainer.style.display = "block";
      }
    });

  } catch (err) {
    console.error(err);
    titleEl.textContent = "Error loading book";
  }

});