async function loadBookDetails() {
  const params = new URLSearchParams(window.location.search);
  const bookId = params.get('id');

  if (!bookId) {
    document.querySelector('.book-title').textContent = 'Invalid book ID';
    document.querySelector('.book-description').textContent = '';
    return;
  }

  try {
    const response = await fetch('../data/books.json'); 
    const books = await response.json();

    const book = books.find(b => b.id === bookId);

    if (!book) {
      document.querySelector('.book-title').textContent = 'Book not found';
      document.querySelector('.book-description').textContent = '';
      return;
    }

    // Fill in the book details
    document.querySelector('.book-title').textContent = book.title;
    document.querySelector('.book-description').textContent = book.description;
    document.querySelector('.book-cover').src = `../${book.image}`;
    document.querySelector('.book-cover').alt = book.title;
    document.querySelector('.view-btn').href = `../${book.pdf}`;
    document.querySelector('.download-link').href = `../${book.pdf}`;
  } catch (error) {
    console.error('Error loading book details:', error);
    document.querySelector('.book-title').textContent = 'Error loading book';
    document.querySelector('.book-description').textContent = '';
  }
}

loadBookDetails();
