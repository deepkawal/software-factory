#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '.');
const examplesDir = path.join(root, 'packs/ai-control-plane-factory/examples');
const requiredFields = [
  'Tool name',
  'Reads allowed',
  'Writes allowed',
  'Production access',
  'Customer data access',
  'Patient data access',
  'Payment/KYC/sanctions access',
  'External network access',
  'Required approvals',
  'Audit events emitted',
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
  const mentionsMcp = /mcp|tool access/i.test(readmeText) || files.some((file) => /mcp-tool-access-review/i.test(file));
  if (!mentionsMcp) continue;

  const review = files.find((file) => /mcp-tool-access-review/i.test(file));
  if (!review) {
    findings.push(`${rel} mentions MCP/tool access but is missing an MCP tool access review.`);
    continue;
  }
  const text = fs.readFileSync(path.join(scenario, review), 'utf8');
  for (const field of requiredFields) {
    if (!text.toLowerCase().includes(field.toLowerCase())) {
      findings.push(`${rel}/${review} is missing tool access field: ${field}.`);
    }
  }
}

if (findings.length === 0) {
  console.log('MCP/tool access reviews include expected access and audit fields.');
  process.exit(0);
}

console.log('MCP/tool access review findings:\n');
for (const finding of findings) console.log(`- ${finding}`);
console.log('\nSuggested next step: review each MCP server and tool before it can access production or regulated data.');
process.exit(1);

