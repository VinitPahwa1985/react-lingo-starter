import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

try {
  const output = execSync(
    `npx lingo translate --input i18n-keys.json --locales hi,fr,ar --api-key ${process.env.LINGO_API_KEY}`,
    { encoding: 'utf-8' }
  );

  console.log('✅ Output:\n', output);
} catch (err) {
  console.error('❌ ERROR OUTPUT:\n', err.stdout?.toString());
  console.error('❌ ERROR STDERR:\n', err.stderr?.toString());
  console.error('❌ FULL ERROR:', err.message);
}