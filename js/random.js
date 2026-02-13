document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.pdf-grid');
  if (!grid) return;

  const cards = Array.from(grid.children);

  // Shuffle cards (Fisher–Yates)
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  // Re-append in random order
  cards.forEach(card => grid.appendChild(card));
});
