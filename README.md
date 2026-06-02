# Portfolio

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=flat-square&logo=github&logoColor=white)
![Formspree](https://img.shields.io/badge/Formspree-Integrated-red?style=flat-square&logoColor=white)
![TryHackMe](https://img.shields.io/badge/TryHackMe-Top%204%25-red?style=flat-square&logo=tryhackme&logoColor=white)
![CSP](https://img.shields.io/badge/CSP-Hardened-critical?style=flat-square)
![Mobile](https://img.shields.io/badge/Mobile-Optimized-brightgreen?style=flat-square)

---

🌐 **Live Website**
[Aman Kothari - Cybersec Portfolio](https://amankothari.netlify.app/aman_kothari_portfolio.html)

---

## 🧠 About
This is my personal portfolio website created to present my Cybersecurity profile in a high-impact, modern terminal theme.

> ⚠️ **Note:** I am not a frontend or full-stack developer. This portfolio was built primarily to maintain a distinct online presence where I can showcase my skills, tools, ongoing research, and overall progress in the cybersecurity domain.

> 🤖 **Note on Development:** The layout and base user interface of this portfolio were conceptualized and created with the help of AI tools to optimize production time, allowing me to focus directly on core domain tools and background functionality.

---

## 🎯 Purpose
- Showcase my cybersecurity journey (DFIR, Red Teaming, VAPT)
- Create a simple, interactive, and memorable online presence
- Present technical skills, writeups, and accomplishments clearly

---

## 🛠️ Tech Used

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/Vanilla%20JS-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

- HTML5 & CSS3 (Custom UI, terminal styling, glow/flicker effects)
- Vanilla JavaScript (Interactive terminal execution logic, mobile events)

---

## 📁 Structure
```Portfolio/  
│── .gitignore
│── AmanKothari_Cybersecurity_Resume.pdf
│── README.md
│── _headers
│── aman_kothari_portfolio.html   # Main Core UI Structure
│── style.css                     # Cursed Energy Aesthetic Styling
└── script.js                     # Terminal Commands & Native Event Handling
```

---

---

## 📈 Changelog & Development Milestones

Below is the historical documentation of the development timeline, cross-platform fixes, and feature integrations implemented across major updates.

---

### 🔹 Update-1: Feature Enhancements & Localization

![Localization](https://img.shields.io/badge/Localization-Sanskrit-orange?style=flat-square)
![Credentials](https://img.shields.io/badge/CERT--In-Acknowledged-critical?style=flat-square)
![Resume](https://img.shields.io/badge/Resume-Live-brightgreen?style=flat-square)

Introduced multiple accessibility features and content formatting:

- **Localization Update:** Replaced default placeholder string `我は呪いの王なり` with proper Sanskrit context: `अहं शापराजः अस्मि।` ✅
- **Credentials & Validations:** Integrated live CERT-In acknowledgment and verified credentials. ✅
- **Access Control:** Integrated active Resume view and dynamic download triggers. ✅
- **Content Extensions:** Created dedicated sections for GitHub writeups and strategic notes. ✅
- **Active Research:** Implemented the `//ONGOING EXORCISM - LEARNING PHASE` module to display live certification updates. ✅

---

### 🔹 Update-2 (Hotfix): Cross-Platform Mobile Input & Event Optimization

![Hotfix](https://img.shields.io/badge/Hotfix-Mobile%20Input-red?style=flat-square)
![Android](https://img.shields.io/badge/Android-Gboard%20Fixed-3DDC84?style=flat-square&logo=android&logoColor=white)
![iOS](https://img.shields.io/badge/iOS-Safari%20Fixed-000000?style=flat-square&logo=apple&logoColor=white)
![Samsung](https://img.shields.io/badge/Samsung-Keyboard%20Fixed-1428A0?style=flat-square&logo=samsung&logoColor=white)

> **Note:** The initial setup had layout failures on iOS Safari/Android WebViews due to OS-specific keyboard intercept protocols. The native desktop event listener was overhauled and pushed directly via a hotfix to main to ensure absolute stability.

#### 📝 Bug Summary
The terminal interface was experiencing critical input failures on mobile engines. The previous implementation relied on a global `document`-level `keydown` listener, which was swallowed or mistranslated by Android virtual keyboards (Gboard, Samsung Keyboard) and WebView wrappers during text composition.

#### 🔍 Root Cause Analysis
- **Event Swallowing:** `document.addEventListener("keydown")` fails on touch screen keyboards because mobile operating systems batch characters during auto-suggest loops rather than dispatching atomic desktop key events.
- **Missing Input Attributes:** The terminal layout lacked standard form attributes, causing virtual layouts to spawn standard configurations instead of explicit alpha-numeric fields.
- **Focus Hijacking:** Aggressive `touchstart` handling on the viewport container called `.preventDefault()`, crashing interaction loops for `<a>` and `<button>` references inside terminal lists.
- **Layout Newlines:** Android WebViews often force-inject a trailing `\n` character straight into input strings without ever triggering a standard enter sequence.

#### 🛠️ Fixes Implemented
- **Event Migration:** Shifted event structures out of global scope directly down into the local `#termInput` field. Implemented a dual-layer `keyup` and `input` check mechanism to capture asynchronous virtual typing streams.
- **WebView Trailing Guard:** Integrated a rigorous evaluation sequence inside the input field tracking raw `\n` strings to parse commands immediately on secondary clients.
- **Mobile Return Element (↵):** Dynamically initialized an absolute-positioned interactive carriage return wrapper (↵) allowing explicit command executions across arbitrary viewport heights.
- **Optimized Touch Overrides:** Swapped global `touchstart` listeners for a conditional `touchend` matrix checking target parameters (`e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON'`) to completely mitigate focus hijacking on hyperlinks.
- **Double-Fire Mitigation:** Configured strict runtime event flags preventing duplicate command evaluations across faulty hybrid browser layers.

#### 📊 Lines Mutated
| Target Script | Additions | Removals | Total Net Overhead |
|---|---|---|---|
| `script.js` | +48 | -2 | +46 |

#### 🧪 Testing Grid
- [x] Desktop Chrome / Edge — Regression Check ✅
- [x] Android Chrome / Gboard — Virtual Input Handler ✅
- [x] Desktop Firefox — Functional execution (Gecko paint-lag noted under high CSS shadow load)
- [x] iOS Safari — Virtual Keyboard Input Interception ✅

---

### 🔹 Update-3: Dynamic Terminal - Static HTML Removal

![Terminal](https://img.shields.io/badge/Terminal-Fully%20Dynamic-black?style=flat-square&logo=gnubash&logoColor=white)
![Bugfix](https://img.shields.io/badge/Bugfix-Static%20HTML%20Removed-yellow?style=flat-square)

#### 📝 Bug Summary
Terminal rendered stale hardcoded commands (`whoami`, `ls ./achievements/`, `leakhunt`) from HTML on every page load — mixed above the interactive JS prompt. `script.js` wiped `#termOutput` but static lines lived **outside** `#termOutput` so they were never cleared.

#### 🛠️ Fixes Implemented
| File | Change | Net |
|---|---|---|
| `index.html` | Removed 18 hardcoded `.t-line` divs, malformed nested `t-line`, static `tcursor`. Added `id="terminalBody"`, `id="termOutput"`, `<input id="termInput">` with full mobile attributes | -11 |
| `style.css` | Added `max-height:320px`, `overflow-y:auto`, `position:sticky` on input line, mobile `@media` overrides | +13 |

---

### 🔹 Update-4: Functional Contact Form

![Formspree](https://img.shields.io/badge/Formspree-Integrated-red?style=flat-square&logoColor=white)
![Status](https://img.shields.io/badge/Form-Live-brightgreen?style=flat-square)
![No Backend](https://img.shields.io/badge/Backend-None%20Required-black?style=flat-square)
![iOS](https://img.shields.io/badge/iOS-Zoom%20Fix-000000?style=flat-square&logo=apple&logoColor=white)

#### 📝 What Changed
Replaced static non-functional HTML form with a fully operational Formspree-powered contact pipeline. All submissions now deliver directly to inbox — zero server infrastructure required.

#### 🛠️ Fixes Implemented
| Feature | Detail |
|---|---|
| Formspree Integration | `fetch()` POST to Formspree endpoint — real email delivery |
| Loading State | Button text → `// TRANSMITTING...` + disabled during request |
| Success State | Green `[+] SIGNAL TRANSMITTED — MESSAGE RECEIVED.` + form reset |
| Error State | Red `[!] TRANSMISSION FAILED — TRY DIRECT CONTACT.` + retry enabled |
| `name` Attributes | Added to all inputs — required for Formspree data parsing |
| iOS Zoom Fix | `font-size:16px` on inputs — prevents Safari auto-zoom on focus |

#### 📊 Lines Mutated
| Target | Additions | Removals | Net |
|---|---|---|---|
| `index.html` | +12 | -4 | +8 |
| `script.js` | +38 | -0 | +38 |
| `style.css` | +8 | -0 | +8 |

#### 🧪 Testing Grid
- [x] Desktop Chrome — Form submission ✅
- [x] Desktop Firefox — Form submission ✅
- [x] iOS Safari — No zoom on focus, submission ✅
- [x] Android Chrome — Submission + success state ✅
- [x] Netlify Production — Live delivery to inbox ✅

---

### 🔹 Update-5: Production Security Headers Fix (Netlify CSP)

![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=flat-square&logo=netlify&logoColor=white)
![CSP](https://img.shields.io/badge/CSP-Hardened-critical?style=flat-square)
![Security](https://img.shields.io/badge/Security-Headers%20Fixed-red?style=flat-square)
![Fonts](https://img.shields.io/badge/Google%20Fonts-Secured-4285F4?style=flat-square&logo=google-fonts&logoColor=white)
![Video](https://img.shields.io/badge/Video%20BG-Protected-black?style=flat-square)

#### 📝 Bug Summary
Contact form worked locally but failed silently on Netlify production. Browser blocked the Formspree `fetch()` due to strict `Content-Security-Policy`. Additionally Google Fonts were loading CSS but font binaries were blocked on some browsers — causing fallback to system monospace, breaking the Sukuna aesthetic.

#### 🔍 Root Cause Analysis
| Directive | Problem |
|---|---|
| `connect-src 'self'` | Blocked `fetch()` to `formspree.io` — different origin not whitelisted |
| `font-src` missing `fonts.googleapis.com` | Font CSS loaded but actual font binary files blocked on strict browsers |
| `media-src` missing `data:` | Potential video background block for blob/data URI sources |
| `style-src` missing `cdnjs.cloudflare.com` | Font Awesome icons blocked in some configurations |

#### 🛠️ Fixes Implemented
| Directive | Before | After |
|---|---|---|
| `connect-src` | `'self'` | `'self' https://formspree.io` |
| `font-src` | `'self' data: https://fonts.gstatic.com` | `+ https://fonts.googleapis.com https://cdnjs.cloudflare.com` |
| `style-src` | `https://fonts.googleapis.com` | `+ https://cdnjs.cloudflare.com` |
| `media-src` | `'self' blob: https://res.cloudinary.com` | `+ data:` |

#### 📊 Lines Mutated
| Target | Additions | Removals | Net |
|---|---|---|---|
| `_headers` | +1 | -1 | 0 |

#### 🧪 Testing Grid
- [x] Formspree form — Live on Netlify production ✅
- [x] Google Fonts (Cinzel Decorative, Share Tech Mono, Noto Serif JP) — Loading correctly ✅
- [x] Video background — Playing on all tested browsers ✅
- [x] Font Awesome icons — Rendering correctly ✅
- [x] CSP violation log — Zero violations in production ✅

---

⭐ If you find this terminal style configuration interesting or useful, feel free to star the repository!
> “If you use this project, please give proper credit.”
