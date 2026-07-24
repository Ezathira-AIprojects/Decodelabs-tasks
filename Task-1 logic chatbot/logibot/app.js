// UI wiring for Logibot
(function () {
  const chatEl = document.getElementById("chat");
  const form = document.getElementById("composer");
  const input = document.getElementById("input");
  const themeBtn = document.getElementById("themeBtn");
  const clearBtn = document.getElementById("clearBtn");
  const statsBtn = document.getElementById("statsBtn");
  const statsEl = document.getElementById("stats");
  const qCountEl = document.getElementById("qCount");
  const durationEl = document.getElementById("duration");
  const userNameEl = document.getElementById("userName");

  const state = {
    name: localStorage.getItem("logibot_name") || "",
    questions: 0,
    startTime: Date.now(),
  };

  function fmtTime(d) {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function addMessage(text, who) {
    const msg = document.createElement("div");
    msg.className = "msg " + who;
    msg.innerHTML = `
      <div class="avatar">${who === "user" ? "👤" : "🤖"}</div>
      <div>
        <div class="bubble"></div>
        <div class="time">${fmtTime(new Date())}</div>
      </div>`;
    msg.querySelector(".bubble").textContent = text;
    chatEl.appendChild(msg);
    chatEl.scrollTop = chatEl.scrollHeight;
  }

  function updateStats() {
    qCountEl.textContent = state.questions;
    const sec = Math.floor((Date.now() - state.startTime) / 1000);
    const m = Math.floor(sec / 60), s = sec % 60;
    durationEl.textContent = m > 0 ? `${m}m ${s}s` : `${s}s`;
    userNameEl.textContent = state.name || "—";
  }
  setInterval(updateStats, 1000);

  // Theme
  const savedTheme = localStorage.getItem("logibot_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  themeBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
  themeBtn.addEventListener("click", () => {
    const now = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", now);
    localStorage.setItem("logibot_theme", now);
    themeBtn.textContent = now === "dark" ? "☀️" : "🌙";
  });

  clearBtn.addEventListener("click", () => {
    chatEl.innerHTML = "";
    state.questions = 0;
    state.startTime = Date.now();
    greet();
  });

  statsBtn.addEventListener("click", () => statsEl.classList.toggle("hidden"));

  function greet() {
    const hi = state.name ? `Welcome back, ${state.name}! 👋` : "Hi! I'm Logibot 🤖 — type 'help' to see what I can do.";
    addMessage(hi, "bot");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, "user");
    input.value = "";
    state.questions++;

    // If you want to use the backend instead of local engine, swap this block:
    const result = window.LogibotEngine.generateReply(text, state.name);
    if (result.newName) {
      state.name = result.newName;
      localStorage.setItem("logibot_name", result.newName);
    }
    setTimeout(() => addMessage(result.reply.text, "bot"), 250);
    updateStats();
  });

  greet();
  updateStats();
})();
