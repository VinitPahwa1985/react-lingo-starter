import fs from 'fs';

const safeReadJSON = (path) => {
  try {
    const content = fs.readFileSync(path, 'utf-8').trim();
    if (!content) return {}; // handle empty file
    return JSON.parse(content);
  } catch (e) {
    console.error(`Error reading ${path}:`, e.message);
    return {};
  }
};

const en = safeReadJSON('src/locales/en.json');
const hi = safeReadJSON('src/locales/hi.json');

Object.keys(en).forEach(k => {
  if (!hi[k]) {
    console.warn(`Missing key in HI: ${k}`);
  }
});

console.log('Verification done');