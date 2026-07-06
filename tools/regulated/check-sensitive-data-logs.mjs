#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '.');
const extensions = new Set(['.md', '.js', '.mjs', '.cjs', '.ts', '.tsx', '.json', '.yaml', '.yml']);
const ignoredDirs = new Set(['.git', 'node_modules', 'dist', 'build', 'coverage']);
const riskyTerms = [
  'ssn',
  'social_security_number',
  'bank_account',
  'routing_number',
  'card_number',
  'access_token',
  'refresh_token',
  'patient_name',
  'diagnosis',
  'medical_record_number',
  'mrn',
  'clinical_note',
  'phi',
  'ephi',
];
const leakageTerms = ['log', 'logger', 'logging', 'analytics', 'telemetry', 'crash', 'screenshot', 'fixture', 'prompt', 'support ticket', 'generated documentation'];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    if (entry.isFile() && extensions.has(path.extname(entry.name))) files.push(full);
  }
  return files;
}

function isPolicyLike(file) {
  const rel = path.relative(root, file).replaceAll(path.sep, '/').toLowerCase();
  return rel.startsWith('packs/')
    || rel.startsWith('tools/regulated/')
    || rel.includes('/templates/')
    || rel.includes('/rules/')
    || rel.includes('/examples/')
    || rel.includes('/agents/')
    || rel.includes('/docs/')
    || rel.startsWith('docs/')
    || rel.endsWith('readme.md');
}

const findings = [];
const educational = [];
for (const file of walk(root)) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  lines.forEach((line, index) => {
    const lower = line.toLowerCase();
    const hits = riskyTerms.filter((term) => lower.includes(term));
    if (hits.length === 0) return;
    const hasLeakageContext = leakageTerms.some((term) => lower.includes(term));
    if (!hasLeakageContext) return;
    const finding = {
      file: path.relative(root, file),
      line: index + 1,
      terms: hits,
      sample: line.trim().slice(0, 140),
    };
    if (isPolicyLike(file)) educational.push(finding);
    else findings.push(finding);
  });
}

if (findings.length === 0 && educational.length === 0) {
  console.log('No likely sensitive-data logging issues found.');
  process.exit(0);
}

if (educational.length > 0) {
  console.log('Policy/template/example mentions found:\n');
  for (const finding of educational.slice(0, 80)) {
    console.log(`- ${finding.file}:${finding.line} (${finding.terms.join(', ')})`);
    console.log(`  ${finding.sample}`);
  }
  if (educational.length > 80) console.log(`... ${educational.length - 80} additional educational findings omitted`);
}

if (findings.length === 0) {
  console.log('\nOnly policy/template/example paths matched. Treat this as an educational pass.');
  process.exit(0);
}

console.log('\nPotential sensitive-data logging or documentation issues found:\n');
for (const finding of findings) {
  console.log(`- ${finding.file}:${finding.line} (${finding.terms.join(', ')})`);
  console.log(`  ${finding.sample}`);
}
console.log('\nSuggested next step: confirm this is policy/example content, redact the data, or attach the relevant privacy/security review artifact.');
process.exit(1);
