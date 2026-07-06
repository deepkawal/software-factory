#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '.');
const exampleRoots = [
  path.join(root, 'packs/healthcare-clinic-factory/examples'),
  path.join(root, 'packs/fintech-app-platform-factory/examples'),
];

function scenarioDirs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(dir, entry.name));
}

const missing = [];
for (const examplesRoot of exampleRoots) {
  for (const scenario of scenarioDirs(examplesRoot)) {
    const files = fs.readdirSync(scenario);
    if (!files.some((file) => /release-evidence-package/i.test(file))) {
      missing.push(path.relative(root, scenario));
    }
  }
}

if (missing.length === 0) {
  console.log('Every regulated example scenario includes a release evidence package.');
  process.exit(0);
}

console.log('Regulated scenarios missing release evidence packages:\n');
for (const scenario of missing) console.log(`- ${scenario}`);
process.exit(1);
