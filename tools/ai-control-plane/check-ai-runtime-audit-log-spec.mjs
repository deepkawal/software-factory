#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '.');
const examplesDir = path.join(root, 'packs/ai-control-plane-factory/examples');
const requiredFields = [
  'Request ID',
  'User/service identity',
  'Agent identity',
  'Model used',
  'Route used',
  'Data classification',
  'Prompt policy result',
  'Tool calls requested',
  'Tool calls allowed/blocked',
  'Sensitive-data filter result',
  'Output validation result',
  'Human approval result',
  'Evidence links',
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
  const spec = fs.readdirSync(scenario).find((file) => /ai-runtime-audit-log-spec/i.test(file));
  if (!spec) {
    findings.push(`${rel} is missing an AI runtime audit-log spec.`);
    continue;
  }
  const text = fs.readFileSync(path.join(scenario, spec), 'utf8');
  for (const field of requiredFields) {
    if (!text.toLowerCase().includes(field.toLowerCase())) {
      findings.push(`${rel}/${spec} is missing audit field: ${field}.`);
    }
  }
}

if (findings.length === 0) {
  console.log('AI runtime audit-log specs include expected request, route, policy, tool, filter, validation, and approval fields.');
  process.exit(0);
}

console.log('AI runtime audit-log spec findings:\n');
for (const finding of findings) console.log(`- ${finding}`);
console.log('\nSuggested next step: define company-owned audit events before runtime AI release.');
process.exit(1);

