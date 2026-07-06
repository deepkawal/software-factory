#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '.');

const requirements = [
  {
    label: 'healthcare examples',
    dir: path.join(root, 'packs/healthcare-clinic-factory/examples'),
    required: [
      /healthcare-change-classification/i,
      /phi-ephi-data-flow-map/i,
      /minimum-necessary-review/i,
      /release-evidence-package/i,
    ],
  },
  {
    label: 'fintech examples',
    dir: path.join(root, 'packs/fintech-app-platform-factory/examples'),
    required: [
      /fintech-change-classification/i,
      /pii-data-flow-map/i,
      /release-evidence-package/i,
    ],
  },
];

function scenarioDirs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(dir, entry.name));
}

const missing = [];
for (const group of requirements) {
  for (const scenario of scenarioDirs(group.dir)) {
    const files = fs.readdirSync(scenario);
    for (const required of group.required) {
      if (!files.some((file) => required.test(file))) {
        missing.push(`${path.relative(root, scenario)} is missing ${required}`);
      }
    }
    if (scenario.includes('pii-safe-logging-library') && !files.some((file) => /app-platform-library-manifest/i.test(file))) {
      missing.push(`${path.relative(root, scenario)} is missing app platform library manifest`);
    }
  }
}

if (missing.length === 0) {
  console.log('Required regulated-domain artifacts are present.');
  process.exit(0);
}

console.log('Missing required regulated-domain artifacts:\n');
for (const item of missing) console.log(`- ${item}`);
process.exit(1);
