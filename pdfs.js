document.addEventListener('DOMContentLoaded', () => {
  const pdfCards = document.querySelectorAll('.pdf-card, .pdf-card-flex, .pdf-card-flex1, .pdf-category-card-with-bg, .pagination, .section-title');
  const hrElements = document.querySelectorAll('hr.rule');
  const searchInput = document.getElementById('search-input');
  const sectionTitles = document.querySelectorAll('h3.center-flex');
  const noResults = document.getElementById('no-results');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    let anyVisible = false;

    // Filter cards
    pdfCards.forEach(card => {
      const h3 = card.querySelector('h3');
      const p = card.querySelector('p');

      const title = h3?.textContent.toLowerCase() || '';
      const desc = p?.textContent.toLowerCase() || '';

      const isVisible = title.includes(query) || desc.includes(query);
      card.style.display = isVisible ? '' : 'none';

      if (isVisible) anyVisible = true;
    });

    // Show/hide <hr>
    hrElements.forEach(hr => {
      hr.style.display = anyVisible ? '' : 'none';
    });

    // Show/hide section titles
    sectionTitles.forEach(title => {
      const wrapper = title.nextElementSibling;
      if (!wrapper) return;

      const flexCards = wrapper.querySelectorAll('.pdf-card-flex, pdf-card-flex1');
      const anyFlexVisible = Array.from(flexCards).some(card => card.style.display !== 'none');

      title.style.display = anyFlexVisible ? '' : 'none';
    });

    // Show/hide no results message
    noResults.style.display = anyVisible ? 'none' : 'block';
  });
});
