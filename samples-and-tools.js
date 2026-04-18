// BPM TAP TOOL
let taps = [];
let lastTap = 0;

document.getElementById("tapBtn").addEventListener("click", () => {
  let now = Date.now();

  if (lastTap) {
    let interval = now - lastTap;
    taps.push(interval);

    if (taps.length > 5) taps.shift();

    let avg = taps.reduce((a, b) => a + b) / taps.length;
    let bpm = Math.round(60000 / avg);

    document.getElementById("bpmResult").innerText = "BPM: " + bpm;
  }

  lastTap = now;
});

// FILTER SYSTEM
function filterSamples(type) {
  let samples = document.querySelectorAll(".sample");

  samples.forEach(sample => {
    if (type === "all") {
      sample.style.display = "block";
    } else {
      sample.style.display =
        sample.dataset.type === type ? "block" : "none";
    }
  });
}