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
    document.title = book.title + " | GrindHub Africa";
    descEl.textContent = book.description || "No description";
    coverEl.src = book.image;

    viewBtn.href = book.file;
    viewBtn.setAttribute("target", "_blank");

    // =====================
    // DOWNLOAD WITH 5-SECOND COUNTDOWN
    // =====================

    downloadBtn.href = "#";
    downloadBtn.addEventListener("click", (e) => {
      e.preventDefault();

      if (downloadBtn.dataset.counting === "true") return; // ignore repeat clicks mid-countdown

      downloadBtn.dataset.counting = "true";
      downloadBtn.classList.add("counting");
      let seconds = 5;
      const originalText = "⬇️ Download";

      downloadBtn.textContent = `Starting in ${seconds}...`;

      const interval = setInterval(() => {
        seconds--;
        if (seconds > 0) {
          downloadBtn.textContent = `Starting in ${seconds}...`;
        } else {
          clearInterval(interval);
          downloadBtn.textContent = originalText;
          downloadBtn.classList.remove("counting");
          downloadBtn.dataset.counting = "false";
          window.open(book.file, "_blank", "noopener,noreferrer");
        }
      }, 1000);
    });

    // =====================
    // SHARE LINKS (WORKING)
    // =====================

    const bookLink = book.slug
      ? `https://grindhub-africa.netlify.app/seo-books/${book.slug}/`
      : window.location.href;

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
      shareContainer.classList.toggle("active");
    });

  } catch (err) {
    console.error(err);
    titleEl.textContent = "Error loading book";
  }

});