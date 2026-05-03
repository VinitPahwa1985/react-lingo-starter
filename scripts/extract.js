import fs from 'fs';
import { glob } from 'glob';  // ✅ FIX

const files = await glob('src/**/*.{ts,tsx}');
const keys = new Set();

const regex = /t\(['"`](.*?)['"`]\)/g;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');
  let match;
  while ((match = regex.exec(content))) {
    keys.add(match[1]);
  }
}

fs.writeFileSync('i18n-keys.json', JSON.stringify([...keys], null, 2));
console.log('Extracted keys:', keys.size);