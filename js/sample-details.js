document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const packId = params.get("id");

  // DEBUG
  console.log("Pack ID:", packId);

  if (!packId) {
    showError("No pack ID found in URL.");
    return;
  }

  fetch("../data/sample-details.json")
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to load JSON");
      }
      return res.json();
    })
    .then(data => {
      console.log("Loaded Packs:", data);

      const pack = data.find(p => String(p.id) === String(packId));

      if (!pack) {
        showError("Pack not found.");
        return;
      }

      // SET BASIC INFO
      setText("title", pack.name);
      setImage("image", pack.image);
      setText("meta", `${pack.type || "Unknown"} • ${pack.size || "N/A"}`);
      setText("description", pack.description || "No description available.");
      const btn = document.getElementById("downloadBtn");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  // ✅ If already unlocked → start countdown, then download
  if (window.isUnlocked && window.currentSample) {
    startCountdownAndDownload(btn, window.currentSample.file);
    return;
  }
  
  // ❌ Otherwise → go through email logic
  handleDownload(pack);
});

      // AUDIO PREVIEWS
      const previewContainer = document.getElementById("previewContainer");
      previewContainer.innerHTML = "";

      if (pack.previews && pack.previews.length > 0) {
        pack.previews.slice(0, 3).forEach(src => {
          const audio = document.createElement("audio");
          audio.controls = true;
          audio.src = src;
          previewContainer.appendChild(audio);
        });
      } else {
        previewContainer.innerHTML = "<p>No previews available</p>";
      }

      // SOUNDS LIST
      const list = document.getElementById("soundList");
      list.innerHTML = "";

      if (pack.sounds && pack.sounds.length > 0) {
        pack.sounds.forEach(sound => {
          const li = document.createElement("li");
          li.textContent = "🎧 " + sound;
          list.appendChild(li);
});
      } else {
        list.innerHTML = "<li>No sounds listed</li>";
      }

    })
    .catch(err => {
      console.error(err);
      showError("Something went wrong loading the pack.");
    });
});


// ---------- HELPERS ----------
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value || "N/A";
}

function setImage(id, src) {
  const el = document.getElementById(id);
  if (el && src) {
    el.src = src;
  }
}

function handleDownload(sample) {
  const btn = document.getElementById("downloadBtn");
  const gate = document.getElementById("emailGate");

  // ALWAYS store sample
  window.currentSample = sample;

  if (sample.requiresEmail) {
    if (gate) gate.style.display = "block";
    if (btn) btn.style.display = "none";
  } else {
    startCountdownAndDownload(btn, sample.file);
  }
}

function startCountdownAndDownload(btn, file) {
  if (!btn || btn.dataset.counting === "true") return; // ignore repeat clicks mid-countdown

  btn.dataset.counting = "true";
  btn.classList.add("counting");
  const originalText = btn.textContent;
  let seconds = 5;

  btn.textContent = `Starting in ${seconds}...`;

  const interval = setInterval(() => {
    seconds--;
    if (seconds > 0) {
      btn.textContent = `Starting in ${seconds}...`;
    } else {
      clearInterval(interval);
      btn.textContent = originalText;
      btn.classList.remove("counting");
      btn.dataset.counting = "false";
      triggerDownload(file);
    }
  }, 1000);
}

function triggerDownload(file) {
  const a = document.createElement("a");
  a.href = file;
  a.target = "_blank";
  a.click();
}

function showLoading() {
  const box = document.getElementById("loadingBox");
  if (box) box.style.display = "block";
}

function hideLoading() {
  const box = document.getElementById("loadingBox");
  if (box) box.style.display = "none";
}

async function submitEmail() {
  const email = document.getElementById("emailInput").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  showLoading(); // 🔥 show "Wait..." + spinner

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: "3d7c63fd-c82e-4b1c-9e03-84d6fc6c8f8d",
        subject: "New Sample Hub Download Lead",
        email: email,
        sample: window.currentSample ? window.currentSample.name : "unknown"
      })
    });

    const data = await response.json();
    hideLoading();

    if (!data.success) {
      alert("Something went wrong submitting your email. Please try again.");
      return;
    }

    // ✅ Only unlock after a CONFIRMED successful submission
    document.getElementById("emailGate").style.display = "none";
    window.isUnlocked = true;

    const btn = document.getElementById("downloadBtn");
    btn.style.display = "block";
    btn.textContent = "⬇ Download Now";

  } catch (err) {
    hideLoading();
    alert("Network error — please check your connection and try again.");
  }
}

function setLink(id, href) {
  const el = document.getElementById(id);
  if (el && href) {
    el.href = href;
  } else if (el) {
    el.style.display = "none";
  }
}

function showError(message) {
  document.body.innerHTML = `
    <div style="text-align:center; padding:40px;">
      <h2>⚠️ ${message}</h2>
      <p>Check your link or data.</p>
    </div>
  `;
}