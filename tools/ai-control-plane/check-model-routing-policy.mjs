#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '.');
const examplesDir = path.join(root, 'packs/ai-control-plane-factory/examples');
const requiredTerms = [
  'Allowed model route',
  'Approved models',
  'Approved vendors',
  'Prohibited routes',
  'Fallback behavior',
  'Escalation behavior',
];

function scenarioDirs() {
  if (!fs.existsSync(examplesDir)) return [];
  return fs.readdirSync(examplesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(examplesDir, entry.name));
}

const findings = [];
for (const scenario of scenarioDirs()) {
  const rel = path.relative(root, scenario);
  const policy = fs.readdirSync(scenario).find((file) => /model-routing-policy/i.test(file));
  if (!policy) {
    findings.push(`${rel} is missing a model routing policy artifact.`);
    continue;
  }
  const text = fs.readFileSync(path.join(scenario, policy), 'utf8');
  for (const term of requiredTerms) {
    if (!text.toLowerCase().includes(term.toLowerCase())) {
      findings.push(`${rel}/${policy} is missing routing topic: ${term}.`);
    }
  }
  if (!/external api|private endpoint|self-hosted|vpc|air-gapped/i.test(text)) {
    findings.push(`${rel}/${policy} does not name any approved route type.`);
  }
}

if (findings.length === 0) {
  console.log('Model routing policies include expected routing controls.');
  process.exit(0);
}

console.log('Model routing policy findings:\n');
for (const finding of findings) console.log(`- ${finding}`);
console.log('\nSuggested next step: define allowed routes, prohibited routes, fallback behavior, and escalation for every data class.');
process.exit(1);

