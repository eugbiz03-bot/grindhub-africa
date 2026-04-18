let trades = JSON.parse(localStorage.getItem("trades")) || [];

function addTrade() {
    const pair = document.getElementById("pair").value;
    const type = document.getElementById("type").value;
    const profit = parseFloat(document.getElementById("profit").value);
    const strategy = document.getElementById("strategy").value;
    const emotion = document.getElementById("emotion").value;
    const date = document.getElementById("date").value;

    if (!pair || isNaN(profit)) {
        alert("Enter valid data");
        return;
    }

    const trade = { pair, type, profit, strategy, emotion, date };
    trades.push(trade);

    localStorage.setItem("trades", JSON.stringify(trades));

    document.getElementById("pair").value = "";
    document.getElementById("profit").value = "";

    displayTrades();
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

        tradeList.innerHTML += `
            <div class="card">
                <strong>${trade.pair}</strong> | ${trade.type}<br>
                <span class="${colorClass}">$${trade.profit}</span><br>
                📅 ${trade.date || "N/A"} <br>
                🎯 ${trade.strategy || "N/A"} <br>
                😤 ${trade.emotion || "N/A"} <br>

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
        `Trades: ${total} | Win Rate: ${winRate}% | Profit: $${profit}`;
}

displayTrades();
