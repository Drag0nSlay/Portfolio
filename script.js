/* ── SOUND TOGGLE ── */
function toggleSound() {
  const video = document.querySelector(".video-bg video");
  const btn = document.getElementById("sound-btn");
  if (video.muted) {
    video.muted = false;
    video.volume = 0.6;
    btn.textContent = "▐▐ MUTE CURSED ENERGY";
    btn.style.color = "#CC0000";
    btn.style.borderColor = "rgba(139,0,0,0.5)";
  } else {
    video.muted = true;
    btn.textContent = "▶ UNMUTE CURSED ENERGY";
    btn.style.color = "rgba(201,168,76,0.6)";
    btn.style.borderColor = "rgba(201,168,76,0.2)";
  }
}

/* ── SCROLL REVEAL ── */
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.classList.add("visible");
          e.target.querySelectorAll(".dfill-anim").forEach((bar) => {
            bar.style.width = bar.dataset.width;
          });
        }, i * 70);
      }
    });
  },
  { threshold: 0.08 }
);
document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

/* ── TECHNIQUE HOVER ── */
document.querySelectorAll(".technique").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.borderLeftWidth = "3px";
    card.style.borderLeftColor = "rgba(139,0,0,0.75)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.borderLeftWidth = "1px";
    card.style.borderLeftColor = "rgba(139,0,0,0.15)";
  });
});

/* ── GLITCH EFFECT (desktop only) ── */
if (window.innerWidth > 768) {
  setInterval(() => {
    if (Math.random() < 0.07) {
      document.body.style.filter = "hue-rotate(180deg) contrast(1.06)";
      setTimeout(() => (document.body.style.filter = ""), 75);
    }
  }, 4500);
}

/* ── VIDEO ERROR FALLBACK ── */
const video = document.querySelector(".video-bg video");
video.addEventListener("error", () => {
  document.querySelector(".video-bg").style.background =
    "radial-gradient(ellipse 120% 80% at 20% 50%, #1A0000 0%, #000 60%)";
  video.style.display = "none";
});

/* ── TERMINAL ── */
let termInput, termOutput;
const cmdHistory = [];
let histIdx = -1;
let terminalReady = false;

document.addEventListener("DOMContentLoaded", () => {
  termInput  = document.getElementById("termInput");
  termOutput = document.getElementById("termOutput");

  if (!termInput || !termOutput) return;

  // boot message
  termOutput.innerHTML = `
    <div class="t-line"><span class="t-info">&nbsp;// CURSED TERMINAL v2.0 — SYSTEM READY //</span></div>
    <div class="t-line"><span class="tout">&nbsp;type <span style="color:var(--gold)">help</span> to see available commands</span></div>
    <div class="t-line">&nbsp;</div>
  `;
  terminalReady = true;

  // ── iOS + Android keyboard attributes ──
  termInput.setAttribute("autocomplete",   "off");
  termInput.setAttribute("autocorrect",    "off");   // iOS Safari
  termInput.setAttribute("autocapitalize", "off");   // iOS Safari
  termInput.setAttribute("spellcheck",     "false"); // both
  termInput.setAttribute("inputmode",      "text");  // Android — shows text keyboard not numeric

  // ── tap/click anywhere in terminal = focus input ──
  const terminal = document.querySelector(".terminal-block");
  if (terminal) {
    terminal.addEventListener("click", () => termInput.focus());
    // touchend instead of touchstart — avoids stealing focus from links
    terminal.addEventListener("touchend", (e) => {
      if (e.target.tagName !== "A" && e.target.tagName !== "BUTTON") {
        termInput.focus();
      }
    }, { passive: true });
  }

  // ── ↵ Enter button — works on ALL mobile keyboards ──
  // Android Gboard, Samsung Keyboard, iOS Safari — all support button tap
  const inputLine = document.querySelector(".t-input-line");
  if (inputLine) {
    const enterBtn = document.createElement("button");
    enterBtn.textContent = "↵";
    enterBtn.setAttribute("type", "button"); // prevent form submit if wrapped
    enterBtn.style.cssText = `
      background:rgba(139,0,0,0.3);
      border:1px solid rgba(139,0,0,0.5);
      color:#CC0000;
      font-family:'Share Tech Mono',monospace;
      font-size:16px;
      padding:6px 14px;
      cursor:pointer;
      flex-shrink:0;
      -webkit-tap-highlight-color:transparent;
      touch-action:manipulation;
    `;

    const fireCmd = (e) => {
      e.preventDefault(); // stops iOS double-fire
      const value = termInput.value.trim();
      if (!value) return;
      cmdHistory.push(value);
      histIdx = -1;
      runCommand(value);
      termInput.value = "";
      termInput.focus();
    };

    enterBtn.addEventListener("click",    fireCmd);
    enterBtn.addEventListener("touchend", fireCmd); // direct touchend — reliable on both platforms
    inputLine.appendChild(enterBtn);
  }

  // ── keydown — desktop + some Android physical keyboards ──
  termInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      e.preventDefault();
      const value = termInput.value.trim();
      if (!value) return;
      cmdHistory.push(value);
      histIdx = -1;
      runCommand(value);
      termInput.value = "";
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (histIdx < cmdHistory.length - 1) histIdx++;
      termInput.value = cmdHistory[cmdHistory.length - 1 - histIdx] || "";
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx > 0) histIdx--;
      else { histIdx = -1; termInput.value = ""; return; }
      termInput.value = cmdHistory[cmdHistory.length - 1 - histIdx] || "";
    }
  });

  // ── keyup — catches Android virtual keyboard Enter (Gboard/Samsung) ──
  // Android fires keyup reliably even when keydown is swallowed
  termInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      e.preventDefault();
      const value = termInput.value.trim();
      if (!value) return;
      // guard: don't double-fire if keydown already handled it
      if (cmdHistory[cmdHistory.length - 1] === value) return;
      cmdHistory.push(value);
      histIdx = -1;
      runCommand(value);
      termInput.value = "";
    }
  });

  // ── input event — Android browsers that swallow both keydown + keyup ──
  // catches "\n" appended by some Android WebViews and older Chrome
  termInput.addEventListener("input", (e) => {
    // insertLineBreak — fired by iOS Safari "Return" key
    if (e.inputType === "insertLineBreak") {
      const value = termInput.value.replace(/\n/g, "").trim();
      termInput.value = "";
      if (!value) return;
      if (cmdHistory[cmdHistory.length - 1] === value) return;
      cmdHistory.push(value);
      histIdx = -1;
      runCommand(value);
      return;
    }
    // raw \n check — Android WebView fallback
    if (termInput.value.includes("\n")) {
      const value = termInput.value.replace(/\n/g, "").trim();
      termInput.value = "";
      if (!value) return;
      if (cmdHistory[cmdHistory.length - 1] === value) return;
      cmdHistory.push(value);
      histIdx = -1;
      runCommand(value);
    }
  });
});

/* ── COMMANDS ── */
const COMMANDS = {
  help: () => `
    <div class="t-line"><span class="t-info">&nbsp;// AVAILABLE COMMANDS //</span></div>
    <div class="t-line"><span class="tout">&nbsp;whoami&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ identity &amp; bio</span></div>
    <div class="t-line"><span class="tout">&nbsp;skills&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ cursed arsenal</span></div>
    <div class="t-line"><span class="tout">&nbsp;projects&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ innate techniques</span></div>
    <div class="t-line"><span class="tout">&nbsp;achievements&nbsp;→ power seals &amp; certs</span></div>
    <div class="t-line"><span class="tout">&nbsp;contact&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ open channel</span></div>
    <div class="t-line"><span class="tout">&nbsp;socials&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ links</span></div>
    <div class="t-line"><span class="tout">&nbsp;clear&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ clear terminal</span></div>
    <div class="t-line"><span class="tout">&nbsp;sudo su&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ ???</span></div>
  `,
  whoami: () => `
    <div class="t-line"><span class="tok">&nbsp;name&nbsp;&nbsp;&nbsp;&nbsp; = Aman Kothari</span></div>
    <div class="t-line"><span class="tok">&nbsp;alias&nbsp;&nbsp;&nbsp; = Drag0nSlay</span></div>
    <div class="t-line"><span class="tok">&nbsp;role&nbsp;&nbsp;&nbsp;&nbsp; = Cybersecurity Analyst</span></div>
    <div class="t-line"><span class="tok">&nbsp;email&nbsp;&nbsp;&nbsp; = ak5518786@gmail.com</span></div>
    <div class="t-line"><span class="tok">&nbsp;degree&nbsp;&nbsp; = B.Tech CSE IoT — AKTU 2027</span></div>
    <div class="t-line"><span class="tok">&nbsp;thm_rank = Top 4% Global | 60th in India (peak)</span></div>
  `,
  skills: () => `
    <div class="t-line"><span class="t-info">&nbsp;// CURSED ARSENAL //</span></div>
    <div class="t-line"><span class="tok">&nbsp;[LVL 88] Web App Security&nbsp;&nbsp;&nbsp;— Bug Hunting · Burp Suite · OWASP</span></div>
    <div class="t-line"><span class="tok">&nbsp;[LVL 85] Python Automation&nbsp;&nbsp;&nbsp;— Scripting · Custom Scripts · LLM Tools</span></div>
    <div class="t-line"><span class="tok">&nbsp;[LVL 82] Network Security&nbsp;&nbsp;&nbsp;&nbsp;— Nmap · Wireshark · Metasploit</span></div>
    <div class="t-line"><span class="tok">&nbsp;[LVL 80] Red Team Ops&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— MITRE ATT&amp;CK · Kill Chain · VAPT</span></div>
    <div class="t-line"><span class="tok">&nbsp;[LVL 75] SOC &amp; Threat Intel&nbsp;&nbsp;— SIEM · IR · Threat Management</span></div>
    <div class="t-line"><span class="tok">&nbsp;[LVL 70] ML / AI on GPU&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— TensorRT · Docker · Triton · RAG</span></div>
    <div class="t-line"><span class="tout">&nbsp;tools: Kali · Metasploit · Burp · Nmap · Wireshark · Git · Python · Bash</span></div>
  `,
  projects: () => `
    <div class="t-line"><span class="t-info">&nbsp;// INNATE TECHNIQUES //</span></div>
    <div class="t-line"><span class="tok">&nbsp;[01] LeakHunt</span></div>
    <div class="t-line"><span class="tout">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ github.com/Drag0nSlay/LeakHunt</span></div>
    <div class="t-line"><span class="tok">&nbsp;[02] Local LLM Policy Gap Analyzer</span></div>
    <div class="t-line"><span class="tout">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ github.com/HACK-IITK-2025-C3iHub/Local-LLM-UI</span></div>
    <div class="t-line"><span class="tok">&nbsp;[03] Phishing Email Analyzer</span></div>
    <div class="t-line"><span class="tout">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ github.com/Drag0nSlay/Phishing-Email-Analyzer</span></div>
    <div class="t-line"><span class="tok">&nbsp;[04] Intrusion Detection System</span></div>
    <div class="t-line"><span class="tout">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ github.com/Drag0nSlay/Intrusion-Detection-System</span></div>
  `,
  achievements: () => `
    <div class="t-line"><span class="t-info">&nbsp;// POWER SEALS //</span></div>
    <div class="t-line"><span class="tok">&nbsp;◆ CNSP — Certified Network Security Practitioner</span></div>
    <div class="t-line"><span class="tok">&nbsp;◆ Google Cloud Cybersecurity Certification</span></div>
    <div class="t-line"><span class="tok">&nbsp;◈ HKCERT — Critical ADB Disclosure #20250619002</span></div>
    <div class="t-line"><span class="tok">&nbsp;◈ CERT-In Acknowledged</span></div>
    <div class="t-line"><span class="tok">&nbsp;◈ Microsoft Student SOC Program</span></div>
    <div class="t-line"><span class="tok">&nbsp;⬡ TryHackMe — Top 4% Global | Ranked 60th India (peak)</span></div>
    <div class="t-line"><span class="tok">&nbsp;⬡ NVIDIA GRIL Training — AI/ML on GPU Infrastructure</span></div>
  `,
  contact: () => `
    <div class="t-line"><span class="t-info">&nbsp;// OPEN CHANNEL //</span></div>
    <div class="t-line"><span class="tok">&nbsp;X (Twitter)&nbsp;&nbsp; → x.com/0xRootPwn</span></div>
    <div class="t-line"><span class="tok">&nbsp;linkedin&nbsp; → linkedin.com/in/aman-kothari-995944274/</span></div>
  `,
  socials: () => `
    <div class="t-line"><span class="tok">&nbsp;GitHub&nbsp;&nbsp;&nbsp;&nbsp; → <a href="https://github.com/Drag0nSlay" target="_blank" style="color:var(--gold)">github.com/Drag0nSlay</a></span></div>
    <div class="t-line"><span class="tok">&nbsp;TryHackMe → <a href="https://tryhackme.com/p/Drag0nSlay" target="_blank" style="color:var(--gold)">tryhackme.com/p/Drag0nSlay</a></span></div>
    <div class="t-line"><span class="tok">&nbsp;X (Twitter)&nbsp; → <a href="https://x.com/0xRootPwn" target="_blank" style="color:var(--gold)">x.com/0xRootPwn</a></span></div>
    <div class="t-line"><span class="tok">&nbsp;LinkedIn&nbsp;&nbsp; → <a href="https://www.linkedin.com/in/aman-kothari-995944274/" target="_blank" style="color:var(--gold)">linkedin.com/in/aman-kothari</a></span></div>
  `,
  "sudo su": () => `
    <div class="t-line"><span class="twarn">&nbsp;[!] Requesting Special Grade access...</span></div>
    <div class="t-line"><span class="twarn">&nbsp;[!] Cursed energy threshold: ∞</span></div>
    <div class="t-line"><span class="tok">&nbsp;[+] Access granted. Welcome, King of Curses.</span></div>
    <div class="t-line"><span class="tok">&nbsp;root@cursed-realm:~# ▮</span></div>
  `,
};

/* ── RUN COMMAND ── */
function runCommand(raw) {
  if (!terminalReady || !termInput || !termOutput) return;
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return;

  const echo = document.createElement("div");
  echo.innerHTML = `<div class="t-line"><span class="tpr">kothari@cursed-realm:~$</span> <span class="tcmd"> ${raw}</span></div>`;
  termOutput.appendChild(echo);

  if (cmd === "clear") {
    termOutput.innerHTML = "";
    return;
  }

  const result = document.createElement("div");
  result.innerHTML = COMMANDS[cmd]
    ? COMMANDS[cmd]()
    : `<div class="t-line"><span class="t-error">&nbsp;command not found: <span style="color:var(--cr3)">${raw}</span> — type 'help'</span></div>`;

  const spacer = document.createElement("div");
  spacer.innerHTML = `<div class="t-line">&nbsp;</div>`;

  termOutput.appendChild(result);
  termOutput.appendChild(spacer);

  const tb = document.getElementById("terminalBody");
  if (tb) tb.scrollTo({ top: tb.scrollHeight, behavior: "smooth" });
}