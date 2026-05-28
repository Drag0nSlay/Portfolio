# 🛡️ Portfolio - Cursed Realm

🌐 **Live Website**  
[Aman Kothari - Cybersec Portfolio](https://drag0nslay.github.io/Portfolio/aman_kothari_portfolio.html)

---

## 🧠 About

This is my personal portfolio website created to present my **Cybersecurity profile** in a high-impact, modern terminal theme. 

> ⚠️ **Note:** I am **not a frontend or full-stack developer**. This portfolio was built primarily to maintain a distinct online presence where I can showcase my skills, tools, ongoing research, and overall progress in the cybersecurity domain.

---

## 🤖 Note on Development

The layout and base user interface of this portfolio were conceptualized and created with the help of AI tools to optimize production time, allowing me to focus directly on core domain tools and background functionality.

---

## 🎯 Purpose

* Showcase my cybersecurity journey (DFIR, Red Teaming, VAPT)
* Create a simple, interactive, and memorable online presence
* Present technical skills, writeups, and accomplishments clearly

---

## 🛠️ Tech Used

* **HTML5** & **CSS3** (Custom UI, terminal styling, glow/flicker effects)
* **Vanilla JavaScript** (Interactive terminal execution logic, mobile events)

---

## 📁 Structure

```text
Portfolio/  
│── .gitignore
│── AmanKothari_Cybersecurity_Resume.pdf
│── README.md
│── _headers
│── aman_kothari_portfolio.html   # Main Core UI Structure
│── style.css                     # Cursed Energy Aesthetic Styling
└── script.js                     # Terminal Commands & Native Event Handling
```

## 📈 Changelog & Development Milestones

Below is the historical documentation of the development timeline, cross-platform fixes, and feature integrations implemented across major updates.

### 🔹 Update-1: Feature Enhancements & Localization
Introduced multiple accessibility features and content formatting:
* **Localization Update:** Replaced default placeholder string `我は呪いの王なり` with proper Sanskrit context: `अहं शापराजः अस्मि।` ✅
* **Credentials & Validations:** Integrated live CERT-In acknowledgment and verified credentials. ✅
* **Access Control:** Integrated active Resume view and dynamic download triggers. ✅
* **Content Extensions:** Created dedicated sections for GitHub writeups and strategic notes. ✅
* **Active Research:** Implemented the `//ONGOING EXORCISM - LEARNING PHASE` module to display live certification updates. ✅

### 🔹 Update-2: Navigation & Terminal Integration
Focused on turning a static visual into an interactive environment:
* **Hyperlink Matrix:** Embedded deep navigation tags across the interface.
* **Functional Terminal:** Implemented a base mock-terminal loop mapping native strings into standard outputs (e.g., `whoami`, `achievements`, `leakhunt`).

### 🔹 Update-3 (Hotfix): Cross-Platform Mobile Input & Event Optimization
*Note: The initial setup had layout failures on iOS Safari/Android WebViews due to OS-specific keyboard intercept protocols. The native desktop event listener was overhauled and pushed directly via a hotfix to `main` to ensure absolute stability.*

#### 📝 Bug Summary
The terminal interface was experiencing critical input failures on mobile engines. The previous implementation relied on a global `document`-level `keydown` listener, which was swallowed or mistranslated by Android virtual keyboards (Gboard, Samsung Keyboard) and WebView wrappers during text composition.

#### 🔍 Root Cause Analysis
* **Event Swallowing:** `document.addEventListener("keydown")` fails on touch screen keyboards because mobile operating systems batch characters during auto-suggest loops rather than dispatching atomic desktop key events.
* **Missing Input Attributes:** The terminal layout lacked standard form attributes, causing virtual layouts to spawn standard configurations instead of explicit alpha-numeric fields.
* **Focus Hijacking:** Aggressive `touchstart` handling on the viewport container called `.preventDefault()`, crashing interaction loops for `<a>` and `<button>` references inside terminal lists.
* **Layout Newlines:** Android WebViews often force-inject a trailing `\n` character straight into input strings without ever triggering an standard enter sequence.

#### 🛠️ Fixes Implemented
* **Event Migration:** Shifted event structures out of global scope directly down into the local `#termInput` field. Implemented a dual-layer `keyup` and `input` check mechanism to capture asynchronous virtual typing streams.
* **WebView Trailing Guard:** Integrated a rigorous evaluation sequence inside the input field tracking raw `\n` strings to parse commands immediately on secondary clients.
* **Mobile Return Element (↵):** Dynamically initialized an absolute-positioned interactive carriage return wrapper (↵) allowing explicit command executions across arbitrary viewport heights.
* **Optimized Touch Overrides:** Swapped global `touchstart` listeners for a conditional `touchend` matrix checking target parameters (`e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON'`) to completely mitigate focus hijacking on hyperlinks.
* **Double-Fire Mitigation:** Configured strict runtime event flags preventing duplicate command evaluations across faulty hybrid browser layers.

#### 📊 Lines Mutated

| Target Script | Additions | Removals | Total Net Overhead |
| :--- | :---: | :---: | :---: |
| `script.js` | +48 | -2 | +46 |

#### 🧪 Testing Grid

* [x] **Desktop Chrome / Edge** (Regression Check - Passed)
* [x] **Android Chrome / Gboard** (Virtual Input Handler - Passed)
* [x] **Desktop Firefox** (Functional execution - Gecko paint-lag noted under high CSS shadow load)
* [x] **iOS Safari** (Virtual Keyboard Input Interception - Passed)

---

⭐ *If you find this terminal style configuration interesting or useful, feel free to star the repository!*
