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

  // ✅ If already unlocked → download directly
  if (window.isUnlocked && window.currentSample) {
    triggerDownload(window.currentSample.file);
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
    triggerDownload(sample.file);
  }
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

function submitEmail() {
  const email = document.getElementById("emailInput").value;
  window.isUnlocked = true;
  if (!email) return;

  showLoading(); // 🔥 show "Wait..." + spinner

  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdmndPZFqkyDNAk7lvA9wT3kgO109jOoSJwhzzoi3eobnNQTQ/formResponse";

  const formData = new FormData();
  formData.append("entry.1537021743", email);

  fetch(formUrl, {
    method: "POST",
    mode: "no-cors",
    body: formData
  });

  // simulate processing delay (5 seconds)
  setTimeout(() => {
  hideLoading();

  document.getElementById("emailGate").style.display = "none";

  // ✅ Mark as unlocked
  window.isUnlocked = true;

  const btn = document.getElementById("downloadBtn");
  btn.style.display = "block";
  btn.textContent = "⬇ Download Now";

}, 5000);
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