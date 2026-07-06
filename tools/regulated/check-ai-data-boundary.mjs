#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '.');
const extensions = new Set(['.md', '.txt', '.js', '.mjs', '.ts', '.tsx', '.json', '.yaml', '.yml']);
const ignoredDirs = new Set(['.git', 'node_modules', 'dist', 'build', 'coverage']);
const sensitiveTerms = ['ssn', 'bank account', 'card data', 'patient', 'phi', 'ephi', 'diagnosis', 'clinical note', 'pii', 'npi'];
const aiPatterns = [
  /\bllm\b/i,
  /\bprompt\b/i,
  /\bcompletion\b/i,
  /\bembedding\b/i,
  /clinical summary/i,
  /model\/provider/i,
  /model provider/i,
  /\[x\].*\bAI processes/i,
  /\[x\].*\bAI influences/i,
  /\[x\].*\bAI generates customer-facing/i,
  /\[x\].*\bAI generates patient-facing/i,
  /\[x\].*\bAI generates clinician-facing/i,
];
const boundaryArtifactPatterns = [
  /AI_DATA_BOUNDARY_REVIEW/i,
  /AI_CLINICAL_SUMMARY_REVIEW/i,
  /AI_DEPLOYMENT_CLASSIFICATION/i,
  /ai-data-boundary-review/i,
  /ai-clinical-summary-review/i,
  /ai-deployment-classification/i,
  /ai-data-boundary/i,
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    if (entry.isFile() && extensions.has(path.extname(entry.name))) files.push(full);
  }
  return files;
}

function nearbyBoundaryArtifact(file) {
  let dir = path.dirname(file);
  while (dir.startsWith(root)) {
    const entries = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
    if (entries.some((entry) => boundaryArtifactPatterns.some((pattern) => pattern.test(entry)))) return true;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return false;
}

const findings = [];
for (const file of walk(root)) {
  const rel = path.relative(root, file).replaceAll(path.sep, '/');
  const isReadme = path.basename(file).toLowerCase() === 'readme.md';
  if (rel.startsWith('docs/') || rel.startsWith('rules/') || rel.startsWith('experts/') || rel === 'START_HERE.md') continue;
  if (isReadme && !rel.includes('/examples/')) continue;
  if (rel.includes('/rules/') || rel.includes('/agents/')) continue;
  const text = fs.readFileSync(file, 'utf8').toLowerCase();
  const hasSensitive = sensitiveTerms.some((term) => text.includes(term));
  const hasAi = aiPatterns.some((pattern) => pattern.test(text));
  const promptLike = rel.includes('/agents/') || rel.includes('/templates/') || rel.includes('prompt') || rel.endsWith('.md');
  if (promptLike && hasSensitive && hasAi && !nearbyBoundaryArtifact(file)) {
    findings.push(rel);
  }
}

if (findings.length === 0) {
  console.log('No AI data-boundary gaps found.');
  process.exit(0);
}

console.log('AI and sensitive-data terms appear together without a nearby AI data-boundary artifact:\n');
for (const finding of findings) console.log(`- ${finding}`);
console.log('\nSuggested next step: add AI_DATA_BOUNDARY_REVIEW, AI_CLINICAL_SUMMARY_REVIEW, or a scenario-specific equivalent before merge/deploy.');
process.exit(1);
