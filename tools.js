function calculateRisk() {
const balance = parseFloat(document.getElementById('accountBalance').value);
const percent = parseFloat(document.getElementById('riskPercent').value);
if (!balance || !percent) {
    document.getElementById('riskResult').textContent = "Please enter valid numbers.";
      return;
      }
const risk = (balance * percent) / 100;
    document.getElementById('riskResult').textContent = `🔥 You should risk: $${risk.toFixed(2)} per trade`;
    }

function generateQuote() {
    const quotes = [
      "Discipline beats signals.",
        "Grow the skill, the money will follow.",
        "Hustle in silence, let charts speak.",
        "Risk small, grow big.",
        "One win a day keeps the job away.",
        "A heavy purse gives to a light heart.",
        "Life itself is a risky.",
        "Learn from failure.",
        "Keep going when you are tired.",
        "Knowing is owning. What you know you own - Solomon Serge",
        "Know why you started in the first place.",
        "Don't be scared of losing.",
        "Start where you are, Use what you have, Do what you can. Keep doing it until you have everything that you ever dreamed of."
 ];
    const pick = quotes[Math.floor(Math.random() * quotes.length)];
      document.getElementById('quoteResult').textContent = `💡 ${pick}`;
  }