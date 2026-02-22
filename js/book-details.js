async function loadBookDetails() {
  // ================================
  // 1. Get book ID from URL
  // ================================
  const params = new URLSearchParams(window.location.search);
  const bookId = params.get('id');

  // DOM elements
  const titleEl = document.querySelector('.book-title');
  const descEl = document.querySelector('.book-description');
  const coverEl = document.querySelector('.book-cover');
  const viewBtn = document.querySelector('.view-btn');
  const downloadBtn = document.querySelector('.download-link');

  // ================================
  // 2. Validate ID
  // ================================
  if (!bookId) {
    titleEl.textContent = 'Invalid book ID';
    descEl.textContent = 'No book was selected.';
    viewBtn.style.display = 'none';
    downloadBtn.style.display = 'none';
    return;
  }

  try {
    // ================================
    // 3. Fetch books JSON
    // ================================
    const response = await fetch('../data/books.json');

    if (!response.ok) {
      throw new Error('Failed to load books.json');
    }

    const books = await response.json();

    // ================================
    // 4. Find book by ID
    // ================================
    const book = books.find(b => b.id === bookId);

    if (!book) {
      titleEl.textContent = 'Book not found';
      descEl.textContent = 'This book does not exist in the database.';
      viewBtn.style.display = 'none';
      downloadBtn.style.display = 'none';
      return;
    }

    // ================================
    // 5. Fill book details
    // ================================
    titleEl.textContent = book.title;
    descEl.textContent = book.description || 'No description available.';
    coverEl.src = `../${book.image}`;
    coverEl.alt = book.title;

    // ================================
    // 6. Validate file link
    // ================================
    if (!book.file || book.file.trim() === '') {
      console.error('Book file link missing:', book);
      viewBtn.style.display = 'none';
      downloadBtn.style.display = 'none';
      descEl.textContent = 'Download link not available for this book.';
      return;
    }

    // ================================
    // 7. Set button links
    // ================================
    viewBtn.href = book.file;
    downloadBtn.href = book.file;

    viewBtn.setAttribute("target", "_blank");
    downloadBtn.setAttribute("target", "_blank");

    viewBtn.setAttribute("rel", "noopener noreferrer");
    downloadBtn.setAttribute("rel", "noopener noreferrer");

    // ================================
    // 8. Force external open (prevents Netlify routing)
    // ================================
    viewBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(book.file, "_blank", "noopener,noreferrer");
    });

    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(book.file, "_blank", "noopener,noreferrer");
    });

  } catch (error) {
    // ================================
    // 9. Error handling
    // ================================
    console.error('Error loading book details:', error);

    titleEl.textContent = 'Error loading book';
    descEl.textContent = 'Something went wrong while loading this book.';
    viewBtn.style.display = 'none';
    downloadBtn.style.display = 'none';
  }
}

// ================================
// 10. Run loader
// ================================
document.addEventListener('DOMContentLoaded', loadBookDetails);