let trades = JSON.parse(localStorage.getItem("trades")) || [];

function addTrade() {
    const pair = document.getElementById("pair").value;
    const type = document.getElementById("type").value;
    const profit = parseFloat(document.getElementById("profit").value);
    const strategy = document.getElementById("strategy").value;
    const emotion = document.getElementById("emotion").value;
    const date = document.getElementById("date").value;
    const notes = document.getElementById("notes").value;

    if (!pair || isNaN(profit)) {
        alert("Enter valid data");
        return;
    }

    const trade = { pair, type, profit, strategy, emotion, date, notes };
    trades.push(trade);

    localStorage.setItem("trades", JSON.stringify(trades));

    document.getElementById("pair").value = "";
    document.getElementById("profit").value = "";
    document.getElementById("notes").value = "";

    displayTrades();
}

// If arriving from the calculator's "Log This Trade" button, pre-fill pair + notes
function loadPendingTrade() {
    const pending = localStorage.getItem("pendingTrade");
    if (!pending) return;

    try {
        const data = JSON.parse(pending);
        document.getElementById("pair").value = data.pair || "";
        document.getElementById("notes").value = data.notes || "";
    } catch (e) {
        console.error("Could not load pending trade", e);
    }

    localStorage.removeItem("pendingTrade");
}

function deleteTrade(index) {
    trades.splice(index, 1);
    localStorage.setItem("trades", JSON.stringify(trades));
    displayTrades();
}

function displayTrades(list = trades) {
    const tradeList = document.getElementById("tradeList");
    tradeList.innerHTML = "";

    list.forEach((trade, index) => {
        const colorClass = trade.profit >= 0 ? "profit" : "loss";
        const displayProfit = trade.profit >= 0
            ? `$${trade.profit.toFixed(2)}`
            : `-$${Math.abs(trade.profit).toFixed(2)}`;

        tradeList.innerHTML += `
            <div class="card">
                <strong>${trade.pair}</strong> | ${trade.type}<br>
                <span class="${colorClass}">${displayProfit}</span><br>
                📅 ${trade.date || "N/A"} <br>
                🎯 ${trade.strategy || "N/A"} <br>
                😤 ${trade.emotion || "N/A"} <br>
                ${trade.notes ? `📝 ${trade.notes} <br>` : ""}

                <button class="delete" onclick="deleteTrade(${index})">Delete</button>
            </div>
        `;
    });

    updateStats();
}

function filterTrades() {
    const search = document.getElementById("search").value.toLowerCase();

    const filtered = trades.filter(t =>
        t.pair.toLowerCase().includes(search)
    );

    displayTrades(filtered);
}

function updateStats() {
    let total = trades.length;
    let wins = trades.filter(t => t.profit > 0).length;
    let profit = trades.reduce((acc, t) => acc + t.profit, 0);

    let winRate = total ? ((wins / total) * 100).toFixed(1) : 0;

    document.getElementById("stats").textContent =
        `Trades: ${total} | Win Rate: ${winRate}% | Profit: $${profit.toFixed(2)}`;

    updateEmotionInsights();
}

function updateEmotionInsights() {
    const box = document.getElementById("emotionInsights");
    if (!box) return;

    const emotions = ["Calm", "Fear", "Greed"];
    const icons = { Calm: "😌", Fear: "😨", Greed: "🤑" };

    const rows = emotions.map(emotion => {
        const group = trades.filter(t => t.emotion === emotion);
        if (group.length === 0) return null;

        const wins = group.filter(t => t.profit > 0).length;
        const winRate = ((wins / group.length) * 100).toFixed(0);
        const avgProfit = (group.reduce((acc, t) => acc + t.profit, 0) / group.length).toFixed(2);

        return `<div class="insight-row">
            ${icons[emotion]} <strong>${emotion}:</strong>
            ${winRate}% win rate (${group.length} trade${group.length === 1 ? "" : "s"}),
            avg $${avgProfit}/trade
        </div>`;
    }).filter(Boolean);

    box.innerHTML = rows.length
        ? `<h4>Performance by Emotion</h4>${rows.join("")}`
        : "";
}

function exportTrades() {
    if (trades.length === 0) {
        alert("No trades to export yet.");
        return;
    }

    const blob = new Blob([JSON.stringify(trades, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const today = new Date().toISOString().split("T")[0];

    a.href = url;
    a.download = `grindhub-trading-journal-${today}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

loadPendingTrade();
displayTrades();
