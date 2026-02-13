const quotes = [
  "Discoveries are not limits — they're doors to greater discoveries. – Eugene Nexus Cheelo",
  "The best way to get started is to quit talking and begin doing. – Walt Disney",
  "Knowing is owing. What you know you own - Solomon Serge",
  "Success is not in what you have, but who you are. – Bo Bennett",
  "Don't let yesterday take up too much of today. – Will Rogers",
  "Whether you think you can or think you can’t, you’re right. – Henry Ford",
  "Your time is limited, so don’t waste it living someone else’s life. – Steve Jobs",
  "The best way to get started is to quit talking and begin doing. – Walt Disney",
  "Success is not in what you have, but who you are. – Bo Bennett",
  "Don’t let yesterday take up too much of today. – Will Rogers",
  "Whether you think you can or think you can’t, you’re right. – Henry Ford",
  "Your time is limited, so don’t waste it living someone else’s life. – Steve Jobs",
  "Great things never come from comfort zones. – Anonymous",
  "Push yourself, because no one else is going to do it for you. – Unknown",
  "Don’t watch the clock; do what it does. Keep going. – Sam Levenson",
  "If you want to fly, you have to give up the stuff that weighs you down. – Toni Morrison",
  "Hustle in silence and let your success make the noise. – Unknown",
  "The dream is free, but the hustle is sold separately. – Unknown",
  "Work hard in silence, let your success be the noise. – Frank Ocean",
  "Do not wait to strike till the iron is hot, but make it hot by striking. – William Butler Yeats",
  "Be stronger than your excuses. – Unknown",
  "Discipline is choosing between what you want now and what you want most. – Abraham Lincoln",
  "If you’re going through hell, keep going. – Winston Churchill",
  "Grind while they sleep. Learn while they party. Live how they dream. – Unknown",
  "You don’t have to be great to start, but you have to start to be great. – Zig Ziglar",
  "Doubt kills more dreams than failure ever will. – Suzy Kassem",
  "The man who moves a mountain begins by carrying away small stones. – Confucius"
];

function showRandomQuote() {
  const quoteContainer = document.querySelector(".quotes");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteContainer.textContent = quotes[randomIndex];
}

// Run when the page loads
document.addEventListener("DOMContentLoaded", showRandomQuote);
