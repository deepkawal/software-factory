#!/usr/bin/env node
// decisions — verify ADR/PD decision records against code markers and tests.
//
// Zero dependencies (Node 18+). Reusable across projects: it reads decision
// records from `docs/decisions/` (ADRs) and `docs/product-decisions/` (PDs) and
// scans source for `<PREFIX>-ADR-NNN` / `<PREFIX>-PD-NNN` markers.
//
// Usage:
//   node decisions.mjs [--root DIR] [--strict] <command>
// Commands:
//   check (default)   run all checks; exit 1 on errors (or on warnings with --strict)
//   list              list every record with its status
//   show <ID>         print a record (e.g. show PROJ-ADR-001)
//   for <file>        list record IDs referenced by markers in <file>

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const argv = process.argv.slice(2);
let root = process.cwd();
let strict = false;
const rest = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--root') root = argv[++i];
  else if (argv[i] === '--strict') strict = true;
  else rest.push(argv[i]);
}
const cmd = rest[0] || 'check';

const DECISION_DIRS = ['docs/decisions', 'docs/product-decisions'];
const SKIP_DIRS = new Set(['node_modules', '.git', '.gc', '.beads', 'dist', 'build', '.next', 'coverage', 'docs']);
const CODE_EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.py', '.go', '.java', '.kt', '.swift', '.rb', '.rs', '.c', '.h', '.cpp', '.cc', '.css', '.scss', '.sql', '.vue', '.svelte']);
const MARKER_RE = /\b[A-Z]{2,}-(?:ADR|PD)-\d+\b/g;
const HEADING_RE = /^#\s*([A-Z]{2,}-(?:ADR|PD)-\d+)\s*:\s*(.+)$/m;

const clean = (v) => {
  if (!v) return null;
  v = v.trim();
  return v === '—' || v === '-' || v === '' ? null : v;
};

function walk(dir, onFile) {
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      if (!SKIP_DIRS.has(e.name)) walk(full, onFile);
    } else if (e.isFile()) onFile(full);
  }
}

function parseRecords() {
  const records = new Map();
  for (const d of DECISION_DIRS) {
    const dir = join(root, d);
    let files;
    try { files = readdirSync(dir); } catch { continue; }
    for (const f of files) {
      if (!f.endsWith('.md') || f === 'index.md' || f.startsWith('_')) continue;
      const path = join(dir, f);
      const text = readFileSync(path, 'utf8');
      const head = text.match(HEADING_RE);
      if (!head) continue;
      const id = head[1];
      const type = id.includes('-ADR-') ? 'ADR' : 'PD';
      const status = (text.match(/^Status:\s*(\w+)/m) || [])[1] || 'Unknown';
      const supersededBy = clean((text.match(/^Superseded-by:\s*(.+)$/m) || [])[1]);
      const tm = text.match(/^\s*-\s*test:\s*`?([^`\n(]+?)`?\s*(\(planned\))?\s*$/m);
      const test = tm ? tm[1].trim() : null;
      const planned = tm ? /\(planned\)/.test(tm[0]) : false;
      records.set(id, { id, type, status, supersededBy, test, planned, title: head[2].trim(), file: relative(root, path) });
    }
  }
  return records;
}

function scanMarkers() {
  const markers = new Map(); // id -> Set(files)
  walk(root, (file) => {
    if (!CODE_EXT.has(extname(file))) return;
    let text;
    try { text = readFileSync(file, 'utf8'); } catch { return; }
    const found = text.match(MARKER_RE);
    if (!found) return;
    for (const id of found) {
      if (!markers.has(id)) markers.set(id, new Set());
      markers.get(id).add(relative(root, file));
    }
  });
  return markers;
}

function check() {
  const records = parseRecords();
  const markers = scanMarkers();
  const errors = [];
  const warns = [];

  for (const [id, files] of markers) {
    const rec = records.get(id);
    const where = [...files].join(', ');
    if (!rec) errors.push(`dangling marker: ${id} in ${where} — no such record`);
    else if (rec.status === 'Rejected') errors.push(`marker → Rejected record: ${id} in ${where}`);
    else if (rec.status === 'Superseded') warns.push(`marker → Superseded: ${id}${rec.supersededBy ? ` (use ${rec.supersededBy})` : ''} in ${where}`);
  }

  for (const rec of records.values()) {
    if (rec.status === 'Accepted' && !markers.has(rec.id))
      warns.push(`orphan: ${rec.id} Accepted but no code marker (${rec.file})`);
    if (rec.type === 'PD' && rec.status === 'Accepted') {
      if (!rec.test) warns.push(`PD without test link: ${rec.id} (${rec.file})`);
      else if (rec.planned || !existsSync(join(root, rec.test)))
        warns.push(`PD test missing: ${rec.id} → ${rec.test}${rec.planned ? ' (planned)' : ''}`);
    }
  }

  const adrs = [...records.values()].filter((r) => r.type === 'ADR').length;
  const pds = [...records.values()].filter((r) => r.type === 'PD').length;
  console.log(`scanned: ${adrs} ADRs, ${pds} PDs, ${markers.size} marker id(s) in code\n`);
  for (const e of errors) console.log(`  ✗ ${e}`);
  for (const w of warns) console.log(`  ⚠ ${w}`);
  if (!errors.length && !warns.length) console.log('  ✓ all decision records consistent');
  console.log(`\n${errors.length} error(s), ${warns.length} warning(s)`);

  const fail = errors.length > 0 || (strict && warns.length > 0);
  process.exit(fail ? 1 : 0);
}

function list() {
  const records = [...parseRecords().values()].sort((a, b) => a.id.localeCompare(b.id));
  if (!records.length) { console.log('no records found'); return; }
  for (const r of records) console.log(`${r.id.padEnd(16)} ${r.status.padEnd(11)} ${r.title}`);
}

function show(id) {
  if (!id) { console.error('usage: show <ID>'); process.exit(2); }
  const rec = parseRecords().get(id);
  if (!rec) { console.error(`no record: ${id}`); process.exit(1); }
  process.stdout.write(readFileSync(join(root, rec.file), 'utf8'));
}

function forFile(file) {
  if (!file) { console.error('usage: for <file>'); process.exit(2); }
  let text;
  try { text = readFileSync(file, 'utf8'); } catch { console.error(`cannot read ${file}`); process.exit(1); }
  const ids = [...new Set(text.match(MARKER_RE) || [])];
  if (!ids.length) { console.log(`no decision markers in ${file}`); return; }
  const records = parseRecords();
  for (const id of ids.sort()) {
    const rec = records.get(id);
    console.log(rec ? `${id.padEnd(16)} ${rec.status.padEnd(11)} ${rec.title}` : `${id.padEnd(16)} (no record!)`);
  }
}

switch (cmd) {
  case 'check': check(); break;
  case 'list': list(); break;
  case 'show': show(rest[1]); break;
  case 'for': forFile(rest[1]); break;
  default: console.error(`unknown command: ${cmd}\nrun with: check | list | show <ID> | for <file>`); process.exit(2);
}
