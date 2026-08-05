document.addEventListener('DOMContentLoaded', () => {
  const grids = document.querySelectorAll('.pdf-grid');
  const ONE_DAY = 24 * 60 * 60 * 1000;

  grids.forEach((grid, gridIndex) => {
    const cards = Array.from(grid.children);
    const storageKey = `pdfShuffle_${gridIndex}_${cards.length}`;
    const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');

    const isFresh = saved && (Date.now() - saved.timestamp < ONE_DAY) && saved.order.length === cards.length;

    let order;

    if (isFresh) {
      // Reuse yesterday's (still-valid) order instead of reshuffling
      order = saved.order;
    } else {
      // Time to reshuffle — Fisher–Yates on the index positions
      order = cards.map((_, i) => i);
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
      localStorage.setItem(storageKey, JSON.stringify({ order, timestamp: Date.now() }));
    }

    // Re-append cards in the chosen order
    order.forEach(index => grid.appendChild(cards[index]));
  });
});
