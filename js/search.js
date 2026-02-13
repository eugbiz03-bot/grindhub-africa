document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');
  const loading = document.getElementById('search-loading');

  const allPdfCards = document.querySelectorAll(
    '.pdf-card, .pdf-card-flex, .pdf-card-flex1, .pdf-category-card-with-bg, .pagination'
  );
  const allHr = document.querySelectorAll('hr.rule');
  const allSectionTitles = document.querySelectorAll('h3.center-flex');
  const allSection = document.querySelectorAll('.pdf-section');

  if (!searchInput || !resultsContainer) return;

  let cachedBooks = null;

  function shortText(text, maxLength = 80) {
    if (!text) return '';
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  }

  searchInput.addEventListener('input', async function () {
    const query = this.value.trim().toLowerCase();

    // RESET STATE
    if (query.length < 1) {
      resultsContainer.innerHTML = '';
      if (loading) loading.style.display = 'none';

      allPdfCards.forEach(card => card.style.display = '');
      allHr.forEach(el => el.style.display = '');
      allSectionTitles.forEach(el => el.style.display = '');
      allSection.forEach(section => section.style.display = '');

      return;
    }

    // HIDE MAIN CONTENT
    allPdfCards.forEach(card => card.style.display = 'none');
    allHr.forEach(el => el.style.display = 'none');
    allSectionTitles.forEach(el => el.style.display = 'none');
    allSection.forEach(section => section.style.display = 'none');

    // SHOW LOADING
    if (loading) loading.style.display = 'block';
    resultsContainer.innerHTML = '';

    try {
      // FETCH ONLY ONCE
      if (!cachedBooks) {
        const response = await fetch('../data/books.json');
        cachedBooks = await response.json();
      }

      const filtered = cachedBooks.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query)
      );

      if (filtered.length === 0) {
        resultsContainer.innerHTML =
          '<p style="text-align:center;">❌ No books found.</p>';
        return;
      }

      resultsContainer.innerHTML = filtered.map(book => `
        <div class="book-item"
          style="
            border:1px solid #00ffcc;
            padding:1rem;
            margin:1rem 0;
            border-radius:10px;
            display:flex;
            gap:1rem;
            align-items:flex-start;
          ">
          <img src="../${book.image}"
               alt="${book.title}"
               style="max-width:80px; border-radius:6px;" />

          <div>
            <h3 style="margin:0 0 0.3rem;">${book.title}</h3>
            <p style="font-size:0.85rem; opacity:0.85; margin:0 0 0.4rem;">
              ${shortText(book.description, 70)}
            </p>
            <a href="../data/book-details.html?id=${book.id}"
               style="color:#00ffcc; font-size:0.85rem;">
              🔍 View Details
            </a>
          </div>
        </div>
      `).join('');

    } catch (error) {
      console.error('Search error:', error);
      resultsContainer.innerHTML =
        '<p style="text-align:center;">⚠️ Error loading search results.</p>';
    } finally {
      if (loading) loading.style.display = 'none';
    }
  });
});
