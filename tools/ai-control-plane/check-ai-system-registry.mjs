#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '.');
const examplesDir = path.join(root, 'packs/ai-control-plane-factory/examples');
const requiredFields = [
  'AI system name',
  'Owner',
  'Models used',
  'Deployment location',
  'Prompt templates',
  'Tools/MCP servers',
  'Datasets/vector stores',
  'Data classes allowed',
  'Policies applied',
  'Audit-log destination',
  'Monitoring owner',
  'Review cadence',
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
  const files = fs.readdirSync(scenario);
  const readme = files.find((file) => file.toLowerCase() === 'readme.md');
  const readmeText = readme ? fs.readFileSync(path.join(scenario, readme), 'utf8') : '';
  const expectsRegistry = /ai system registry/i.test(readmeText) || files.some((file) => /ai-system-registry/i.test(file));
  if (!expectsRegistry) continue;

  const registry = files.find((file) => /ai-system-registry/i.test(file));
  if (!registry) {
    findings.push(`${rel} is missing an AI system registry artifact.`);
    continue;
  }
  const text = fs.readFileSync(path.join(scenario, registry), 'utf8');
  for (const field of requiredFields) {
    if (!text.toLowerCase().includes(field.toLowerCase())) {
      findings.push(`${rel}/${registry} is missing registry field: ${field}.`);
    }
  }
}

if (findings.length === 0) {
  console.log('AI system registry artifacts are present and include expected fields.');
  process.exit(0);
}

console.log('AI system registry findings:\n');
for (const finding of findings) console.log(`- ${finding}`);
console.log('\nSuggested next step: register each runtime AI system before release.');
process.exit(1);
