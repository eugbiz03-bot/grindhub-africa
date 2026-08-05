// Shared script for every /seo-books/<slug>/index.html page.
// One file, reused by every book page — fix a bug here once instead of
// copy-pasting the fix into every book folder.

async function loadBookDetails() {
  // The slug is just the last folder in the URL, e.g. /seo-books/advanced-mathematics/ -> "advanced-mathematics"
  const slug = window.location.pathname.split('/').filter(Boolean).pop();

  try {
    // Absolute path — works the same regardless of how deep this page sits,
    // unlike a relative "../../data/books.json" which breaks if a book page
    // ever moves to a different folder depth.
    const response = await fetch('/data/books.json');
    const books = await response.json();

    const book = books.find(b => b.slug === slug || b.id === slug);

    if (!book) {
      document.querySelector('.book-title').textContent = 'Book not found';
      return;
    }

    document.querySelector('.book-title').textContent = book.title;
    document.querySelector('.book-description').textContent = book.description;

    // books.json stores images two ways: "/img-xyz/..." (already root-absolute)
    // or "../img-xyz/..." (relative to the /data/ folder). Normalizing both to
    // a root-absolute path means this works correctly no matter how deep the
    // page sits.
    const rawImg = book.image || '';
    const imgPath = rawImg.startsWith('../') ? rawImg.slice(2) : rawImg;
    document.querySelector('.book-cover').src = imgPath;
    document.querySelector('.book-cover').alt = book.title;

    const viewBtn = document.querySelector('.view-btn');
    const downloadLink = document.querySelector('.download-link');

    viewBtn.href = book.file;
    viewBtn.setAttribute('target', '_blank');

    downloadLink.href = book.file;
    downloadLink.setAttribute('target', '_blank');
    downloadLink.onclick = (e) => {
      e.preventDefault();
      window.open(book.file, '_blank', 'noopener,noreferrer');
    };

  } catch (e) {
    console.error(e);
    document.querySelector('.book-title').textContent = 'Error loading book';
  }
}

loadBookDetails();
