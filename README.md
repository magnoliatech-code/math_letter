# Greek Letters in Mathematics (MathLetters)

An interactive, responsive reference web application dedicated to the Greek alphabet in mathematics, statistics, physics, and engineering.

## 🚀 Features

- **All 24 Greek Letters**: Covers standard uppercase, lowercase, and mathematical variants ($\varepsilon, \vartheta, \varpi, \varrho, \varsigma, \varphi, \varkappa$).
- **Audio Pronunciation**:
  - Dual pronunciation: Standard English Academic mathematical pronunciation and Modern Greek pronunciation.
  - Powered by the native Web Speech API with fallback support.
  - International Phonetic Alphabet (IPA) and standard phonetic spelling guides.
- **LaTeX Math Integration**:
  - LaTeX commands for uppercase, lowercase, and variants.
  - 1-click copy to clipboard with animated visual feedback.
  - Client-side rendering of formulas with KaTeX.
- **Curated Mathematical Usages**:
  - Formulas and explanations across Calculus, Linear Algebra, Probability & Statistics, Physics, and Number Theory.
- **Navigation & Usability**:
  - Instant multi-attribute search (by name, symbol, LaTeX command, or concept like *eigenvalue*, *limit*, *variance*).
  - Subject filter pills (Calculus, Linear Algebra, Probability, Physics, Number Theory).
  - View switcher: **Cards View** and **LaTeX Cheat Sheet Table View**.
  - Deep-dive Modal with keyboard shortcuts (`←` / `→` arrow keys to cycle letters, `Esc` to close, `/` to focus search).
  - Dark / Light mode toggle.
- **Firebase Ready**:
  - Fully static SPA bundle configured with `firebase.json` for Firebase Hosting.

---

## 🛠️ Local Development

### 1. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Build for Production
```bash
npm run build
```
Generates production-ready static assets in `dist/`.

### 3. Local Firebase Emulation
Test your production build with the Firebase Hosting emulator:
```bash
npm run serve:emulator
```
Access the Firebase Hosting emulator at [http://127.0.0.1:5002](http://127.0.0.1:5002) (or `http://localhost:5000`).

---

## 🌐 Deploy to GitHub Pages (Recommended - Easiest)

This repository includes a pre-configured GitHub Actions workflow (`.github/workflows/deploy.yml`).

1. **Initialize Git and create repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   gh repo create math_letter --public --source=. --remote=origin --push
   ```
2. **Enable GitHub Pages**:
   Go to your repository on GitHub -> **Settings** -> **Pages** -> under **Build and deployment**, set **Source** to **GitHub Actions**.
   *(Or run: `gh api -X POST repos/magnoliatech-code/math_letter/pages -f build_type=workflow`)*
3. **Live Site**:
   The workflow will trigger automatically and your site will be live at:
   `https://<your-username>.github.io/math_letter/`

---

## 🔥 Alternative: Deploy to Firebase Hosting

If you prefer Firebase:
1. **Login to Firebase**:
   ```bash
   firebase login
   ```
2. **Select or connect your Firebase Project**:
   ```bash
   firebase use <your-firebase-project-id>
   ```
3. **Deploy**:
   ```bash
   npm run deploy:firebase
   ```
