function calculateAll() {
  const balance = parseFloat(document.getElementById('balance').value);
  const riskPercent = parseFloat(document.getElementById('riskPercent').value);
  const entry = parseFloat(document.getElementById('entry').value);
  const sl = parseFloat(document.getElementById('stopLoss').value);
  const tp = parseFloat(document.getElementById('takeProfit').value);
  const pairType = document.getElementById('pairType').value;

  if([balance,riskPercent,entry,sl,tp].some(isNaN)){
    document.getElementById('result').innerHTML = "Enter valid numbers.";
    return;
  }

  // 💰 Risk Amount
  const riskAmount = (balance * riskPercent)/100;

  // 📉 Risk & Reward
  const risk = Math.abs(entry - sl);
  const reward = Math.abs(tp - entry);

  if(risk===0){document.getElementById('result').innerHTML="Stop Loss cannot equal Entry."; return;}

  const rrr = (reward/risk).toFixed(2);

  // 📊 Lot Size
  const lotSize = (riskAmount/risk).toFixed(2);

  // ⚡ Pips
  const multiplier = pairType==="JPY"?100:10000;
  const pips = (Math.abs(tp-entry)*multiplier).toFixed(1);

  // ⚠️ Trade Quality
  let quality="";
  if(rrr>=3) quality="Excellent 🔥";
  else if(rrr>=2) quality="Good 👍";
  else if(rrr>=1) quality="Average ⚠️";
  else quality="Bad ❌";

  // 💹 Potential Profit/Loss
  const profit = reward * lotSize;
  const loss = risk * lotSize;

  document.getElementById('result').innerHTML=`
    💰 Risk Amount: $${riskAmount.toFixed(2)} <br>
    📊 Lot Size: ${lotSize} <br>
    📉 RRR: 1:${rrr} (${quality}) <br>
    📈 Pips: ${pips} <br>
    💸 Potential Profit: $${profit.toFixed(2)} <br>
    💸 Potential Loss: $${loss.toFixed(2)}
  `;
}

function calculateGrowth() {
  const balance = parseFloat(document.getElementById('startBalance').value);
  const percent = parseFloat(document.getElementById('growthPercent').value);
  const trades = parseInt(document.getElementById('trades').value);

  if (isNaN(balance) || isNaN(percent) || isNaN(trades)) {
    document.getElementById('growthResult').textContent = "Enter valid numbers.";
    return;
  }

  let result = balance;

  for (let i = 0; i < trades; i++) {
    result += result * (percent / 100);
  }

  document.getElementById('growthResult').textContent =
    "Final Balance: $" + result.toFixed(2);
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
  
  function updateSession() {
  const now = new Date();
  const hour = now.getUTCHours(); // use UTC time

  let session = "";

  if (hour >= 7 && hour < 9) {
  session = "Tokyo + London Overlap 🔥";
} else if (hour >= 13 && hour < 16) {
  session = "London + New York Overlap 🔥";
} else if (hour >= 13 && hour < 22) {
    session = "New York Session 🇺🇸";
  } else {
    session = "Market Closed 🌙";
  }

  document.getElementById("sessionStatus").textContent = session;
}

// update every second
setInterval(updateSession, 1000);
updateSession();

function detectTrend() {
  const entry = parseFloat(document.getElementById('entryDir').value);
  const tp = parseFloat(document.getElementById('tpDir').value);

  if (isNaN(entry) || isNaN(tp)) {
    document.getElementById('trendResult').textContent = "Enter valid numbers.";
    return;
  }

  let result = "";

  if (tp > entry) {
    result = "BUY 📈 (Bullish)";
  } else if (tp < entry) {
    result = "SELL 📉 (Bearish)";
  } else {
    result = "Invalid setup ⚠️";
  }

  document.getElementById('trendResult').textContent = result;
}

const reminders = [
  "Don’t risk more than 2% per trade ⚠️",
  "Stick to your strategy 📊",
  "Avoid revenge trading ❌",
  "Wait for confirmation ⏳",
  "Protect your capital 💰",
  "Follow your trading plan 🧠",
  "Losses are part of the game 🎯"
];

function showReminder() {
  const randomIndex = Math.floor(Math.random() * reminders.length);
  document.getElementById("reminderText").textContent = reminders[randomIndex];
}

// change every 10 seconds
setInterval(showReminder, 10000);
showReminder();