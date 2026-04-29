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
  { threshold: 0.08 },
);

document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

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

if (window.innerWidth > 768) {
  setInterval(() => {
    if (Math.random() < 0.07) {
      document.body.style.filter = "hue-rotate(180deg) contrast(1.06)";
      setTimeout(() => (document.body.style.filter = ""), 75);
    }
  }, 4500);
}

const video = document.querySelector(".video-bg video");
video.addEventListener("error", () => {
  document.querySelector(".video-bg").style.background =
    "radial-gradient(ellipse 120% 80% at 20% 50%, #1A0000 0%, #000 60%)";
  video.style.display = "none";
});
/* ── FUNCTIONAL TERMINAL ── */
// Wipe static lines as soon as page loads
document.addEventListener('DOMContentLoaded', () => {
  const termOutput = document.getElementById('termOutput');
  if (termOutput) termOutput.innerHTML = '';
});
const termInput = document.getElementById('termInput');
const termOutput = document.getElementById('termOutput');

// Click anywhere in terminal to focus input
document.querySelector('.terminal-block').addEventListener('click', () => {
  termInput.focus();
});

const COMMANDS = {
  help: () => `
    <div class="t-line"><span class="t-info">&nbsp;// AVAILABLE COMMANDS //</span></div>
    <div class="t-line"><span class="tout">&nbsp;whoami&nbsp;&nbsp;&nbsp;→ identity & bio</span></div>
    <div class="t-line"><span class="tout">&nbsp;skills&nbsp;&nbsp;&nbsp;→ cursed arsenal</span></div>
    <div class="t-line"><span class="tout">&nbsp;projects&nbsp;→ innate techniques</span></div>
    <div class="t-line"><span class="tout">&nbsp;achievemnets&nbsp;&nbsp;&nbsp;&nbsp;→ power seals</span></div>
    <div class="t-line"><span class="tout">&nbsp;contact&nbsp;&nbsp;→ open channel</span></div>
    <div class="t-line"><span class="tout">&nbsp;socials&nbsp;&nbsp;→ links</span></div>
    <div class="t-line"><span class="tout">&nbsp;clear&nbsp;&nbsp;&nbsp;&nbsp;→ clear terminal</span></div>
    <div class="t-line"><span class="tout">&nbsp;sudo su&nbsp;&nbsp;→ ???</span></div>
  `,
  whoami: () => `
    <div class="t-line"><span class="tok">&nbsp;name&nbsp;&nbsp;&nbsp;&nbsp; = Aman Kothari</span></div>
    <div class="t-line"><span class="tok">&nbsp;alias&nbsp;&nbsp;&nbsp; = Drag0nSlay</span></div>
    <div class="t-line"><span class="tok">&nbsp;role&nbsp;&nbsp;&nbsp;&nbsp; = Cybersecurity Analyst (Entry → Special Grade)</span></div>
    <div class="t-line"><span class="tok">&nbsp;email&nbsp;&nbsp;&nbsp; = ak5518786@gmail.com</span></div>
    <div class="t-line"><span class="tok">&nbsp;degree&nbsp;&nbsp; = B.Tech CSE IoT — AKTU 2027</span></div>
    <div class="t-line"><span class="tok">&nbsp;thm_rank = Top 4% Global | 60th in India (peak)</span></div>
  `,
  skills: () => `
    <div class="t-line"><span class="t-info">&nbsp;// CURSED ARSENAL //</span></div>
    <div class="t-line"><span class="tok">&nbsp;[LVL 88] Web App Security&nbsp;&nbsp;&nbsp;— BUg Hunting · Burp Suite</span></div>
    <div class="t-line"><span class="tok">&nbsp;[LVL 85] Python Automation&nbsp;&nbsp;&nbsp;— Scripting · Custom Scripts · LLM Tools</span></div>
    <div class="t-line"><span class="tok">&nbsp;[LVL 82] Network Security&nbsp;&nbsp;&nbsp;&nbsp;— Nmap · Wireshark · Metasploit</span></div>
    <div class="t-line"><span class="tok">&nbsp;[LVL 80] Red Team Ops&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— MITRE ATT&CK · Kill Chain · VAPT</span></div>
    <div class="t-line"><span class="tok">&nbsp;[LVL 75] SOC & Threat Intel&nbsp;&nbsp;— SIEM · IR · Threat Management</span></div>
    <div class="t-line"><span class="tok">&nbsp;[LVL 70] ML / AI on GPU&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— TensorRT · Docker · Triton · RAG</span></div>
    <div class="t-line"><span class="tout">&nbsp;tools: Kali · Metasploit · Burp · Nmap · Wireshark · Git · Python · Bash</span></div>
  `,
  projects: () => `
    <div class="t-line"><span class="t-info">&nbsp;// INNATE TECHNIQUES //</span></div>
    <div class="t-line"><span class="tok">&nbsp;[01] LeakHunt v2</span></div>
    <div class="t-line"><span class="tout">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ github.com/Drag0nSlay/LeakHuntv2</span></div>
    <div class="t-line"><span class="tok">&nbsp;[02] Local LLM Policy Gap Analyzer</span></div>
    <div class="t-line"><span class="tout">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ github.com/Drag0nSlay/Local-LLM-Policy-Gap-Analyzer</span></div>
    <div class="t-line"><span class="tok">&nbsp;[03] Phishing Email Analyzer — Hack Secure</span></div>
        <div class="t-line"><span class="tout">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ github.com/Drag0nSlay/Phishing-Email-Analyzer</span></div>
    <div class="t-line"><span class="tok">&nbsp;[04] Intrusion Detection System — Blue Team</span></div>
    <div class="t-line"><span class="tout">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;→ github.com/Drag0nSlay/Intrusion-Detection-System</span></div>
  `,
  achievements: () => `
    <div class="t-line"><span class="t-info">&nbsp;// POWER SEALS //</span></div>
    <div class="t-line"><span class="tok">&nbsp;◆ CNSP — Certified Network Security Practitioner</span></div>
    <div class="t-line"><span class="tok">&nbsp;◆ Google Cloud Cybersecurity Certification</span></div>
    <div class="t-line"><span class="tok">&nbsp;◈ HKCERT — Critical ADB Disclosure #20250619002</span></div>
    <div class="t-line"><span class="tok">&nbsp;◈ CERT-In Acknowledged</span></div>
    <div class="t-line"><span class="tok">&nbsp;◈ Microsoft Student SOC Program</span></div>
    <div class="t-line"><span class="tok">&nbsp;⬡ TryHackMe — Top 4% Global | Ranked 60th India (Once)</span></div>
    <div class="t-line"><span class="tok">&nbsp;⬡ NVIDIA GRIL Training — AI/ML on GPU Infrastructure</span></div>
  `,
  contact: () => `
    <div class="t-line"><span class="t-info">&nbsp;// OPEN CHANNEL //</span></div>
    <div class="t-line"><span class="tok">&nbsp;email&nbsp;&nbsp; → ak5518786@gmail.com</span></div>
  `,
  socials: () => `
    <div class="t-line"><span class="tok">&nbsp;GitHub&nbsp;&nbsp;&nbsp;&nbsp; → <a href="https://github.com/Drag0nSlay" target="_blank" style="color:var(--gold)">github.com/Drag0nSlay</a></span></div>
    <div class="t-line"><span class="tok">&nbsp;TryHackMe → <a href="https://tryhackme.com/p/Drag0nSlay" target="_blank" style="color:var(--gold)">tryhackme.com/p/Drag0nSlay</a></span></div>
    <div class="t-line"><span class="tok">&nbsp;LinkedIn&nbsp;&nbsp; → <a href="https://linkedin.com/in/aman-kothari" target="_blank" style="color:var(--gold)">linkedin.com/in/aman-kothari</a></span></div>
  `,
  'sudo su': () => `
    <div class="t-line"><span class="twarn">&nbsp;[!] Requesting Special Grade access...</span></div>
    <div class="t-line"><span class="twarn">&nbsp;[!] Cursed energy threshold: ∞</span></div>
    <div class="t-line"><span class="tok">&nbsp;[+] Access granted. Welcome, King of Curses.</span></div>
    <div class="t-line"><span class="tok">&nbsp;root@cursed-realm:~# ▮</span></div>
  `,
  clear: () => 'CLEAR'
};

function runCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return;

  // Echo the command
  const echo = document.createElement('div');
  echo.innerHTML = `<div class="t-line"><span class="tpr">kothari@cursed-realm:~$</span> <span class="tcmd"> ${raw}</span></div>`;
  termOutput.appendChild(echo);

  if (cmd === 'clear') {
    termOutput.innerHTML = '';
    return;
  }

  const result = document.createElement('div');
  if (COMMANDS[cmd]) {
    result.innerHTML = COMMANDS[cmd]();
  } else {
    result.innerHTML = `<div class="t-line"><span class="t-error">&nbsp;command not found: ${raw} — type 'help' for available commands</span></div>`;
  }

  // Spacer
  const spacer = document.createElement('div');
  spacer.innerHTML = '<div class="t-line">&nbsp;</div>';

  termOutput.appendChild(result);
  termOutput.appendChild(spacer);

  // Auto scroll to bottom
  const tb = document.getElementById('terminalBody');
  tb.scrollTop = tb.scrollHeight;
}

termInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    runCommand(termInput.value);
    termInput.value = '';
  }
});

// Command history (up/down arrows)
const cmdHistory = [];
let histIdx = -1;
termInput.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (histIdx < cmdHistory.length - 1) histIdx++;
    termInput.value = cmdHistory[cmdHistory.length - 1 - histIdx] || '';
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (histIdx > 0) histIdx--;
    else { histIdx = -1; termInput.value = ''; return; }
    termInput.value = cmdHistory[cmdHistory.length - 1 - histIdx] || '';
  }
});

// Save to history on enter
termInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && termInput.value.trim()) {
    cmdHistory.push(termInput.value.trim());
    histIdx = -1;
  }
});