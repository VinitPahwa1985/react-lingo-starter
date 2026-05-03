# 🌍 React AI Localization Starter

Build a production-ready React localization pipeline that automates translation and integrates with `react-i18next`.

> Add text once in English, generate locale JSON automatically, and render translated UI instantly.

---

## Project Overview

This repository demonstrates a complete React + i18next localization workflow with automated translation generation.

The app uses:

- `react-i18next` for runtime language switching in the browser
- `src/locales/en.json` as the source-of-truth English copy
- generated target files in `src/locales/hi.json` and `src/locales/fr.json`
- a translation orchestration layer based on `lingo.dev` CLI
- convenient npm scripts for development, translation, and build

### What problem does it solve?

Manual localization is slow, brittle, and hard to keep in sync across languages.

This project replaces repetitive copy/paste and spreadsheet workflows with an automated translation pipeline, so developers can:

- author text once in English
- generate translated JSON assets automatically
- switch languages in the React UI without manual file edits

---

## Key Features

- **Automated translation pipeline** via `npm run i18n`
- **React + i18next integration** for simple `t('key')` lookups
- **Source-of-truth JSON** model with separate locale output files
- **Scalable architecture** ready for CI/CD and multi-language expansion
- **Translation discovery & injection** configured through `i18n.json`

---

## Architecture

A high-level view of the localization flow:

```mermaid
flowchart LR
  "React App" --> "i18next"
  "i18next" --> "src/locales/en.json"
  "src/locales/en.json" --> "Translation script"
  "Translation script" --> "Lingo.dev CLI / Ollama"
  "Lingo.dev CLI / Ollama" --> "src/locales/hi.json / fr.json"
  "src/locales/hi.json / fr.json" --> "i18next"
  "i18next" --> "React UI"
```

---

## How It Works

1. Developer adds or updates UI text in `src/locales/en.json`.
2. The source key is consumed by `react-i18next` via `src/i18n.ts`.
3. The translation pipeline runs using `npx lingo run`.
4. `i18n.json` tells Lingo where locale files live and which target languages to update.
5. Translated values are written to `src/locales/hi.json` and `src/locales/fr.json`.
6. The React app renders translated strings when the active locale changes.

---

## Code Examples

### React usage

```tsx
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('welcome.title')}</h1>
      <button>{t('cta.get_started')}</button>
      <button onClick={() => i18n.changeLanguage('hi')}>HI</button>
      <button onClick={() => i18n.changeLanguage('fr')}>FR</button>
    </div>
  );
}
```

### Source JSON example

```json
{
  "welcome.title": "Welcome to your app",
  "cta.get_started": "Get Started",
  "header.dashboard": "Dashboard"
}
```

### Translation script example

```js
import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const output = execSync(
  `npx lingo translate --input i18n-keys.json --locales hi,fr --api-key ${process.env.LINGO_API_KEY}`,
  { encoding: 'utf-8' }
);
console.log(output);
```

### package.json scripts

```json
{
  "scripts": {
    "dev": "npm run i18n && vite",
    "build": "vite build",
    "i18n": "npx lingo run"
  }
}
```

---

## Project Structure

```text
.
├── README.md
├── package.json
├── package-lock.json
├── i18n.json
├── i18n-keys.json
├── i18n.lock
├── .env
├── scripts/
│   ├── extract.js
│   ├── translate.js
│   └── verify.js
├── src/
│   ├── main.tsx
│   ├── i18n.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── locales/
│       ├── en.json
│       ├── fr.json
│       └── hi.json
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── index.html
```

---

## Setup Instructions

1. Install node dependencies:

```bash
npm install
```

2. Install or make sure the Lingo CLI is available:

```bash
npm install -g @lingo.dev/cli
```

3. Create a `.env` file with your API key:

```env
LINGO_API_KEY="your_lingo_api_key"
```

4. Generate or refresh locale files:

```bash
npm run i18n
```

5. Start the development server:

```bash
npm run dev
```

6. Open the app in your browser at the URL shown by Vite.

---

## Developer Workflow

- Add or update keys in `src/locales/en.json`.
- Use `t('your.key')` in React components.
- Run `npm run i18n` to build translated locale files.
- Confirm `src/locales/hi.json` and `src/locales/fr.json` contain translated values.
- Start the app with `npm run dev` and switch languages.

For translations key extraction, use:

```bash
node scripts/extract.js
```

To verify missing keys in Hindi translations:

```bash
node scripts/verify.js
```

---

## Advantages

- **Faster localization** than spreadsheets or manual copy/paste
- **Centralized source of truth** in `src/locales/en.json`
- **Automatic locale generation** for multiple languages
- **Low infrastructure overhead** compared to SaaS-only workflows
- **Built-in change detection** via `i18n.lock`

---

## Limitations

- Translation quality depends on the configured provider and prompt context
- The current example is best suited for short UI strings, not large documents
- Some contextual meaning can be lost if keys are too generic
- Performance depends on how often translations are regenerated and cached

---

## Scaling to Production

- **Translation caching:** `i18n.lock` tracks fingerprints and avoids reprocessing unchanged strings
- **Batch translation:** `lingo.dev` can process multiple target locales in one run
- **CI/CD integration:** run `npm run i18n` as part of build or deployment pipelines
- **Multi-language expansion:** add new locale codes to `i18n.json` and add matching JSON files
- **Enterprise / multi-tenant usage:** separate locale buckets, provider settings, and glossary rules can be added on top of this architecture

---

## Future Enhancements

- Add a **real-time translation API** or local translation server
- Add **vector memory** for translation reuse and fuzzy lookup
- Build an **admin dashboard** for copy editing, glossary management, and review
- Add support for **pluralization**, **namespaces**, and **nested locale files**
- Add **build-time i18n compilation** for zero-runtime overhead

---

## Notes

- This repo currently uses `lingo.dev` as the translation orchestration layer.
- If you want to substitute a different local LLM provider, update `scripts/translate.js` or adjust the `lingo` command to use your preferred backend.
- Keep `.env` out of version control and never commit API keys.
