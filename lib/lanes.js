'use strict';

// local patch (2026-09-27): manual agent groups for the attention view, shared across machines.
// lanes.json = { groups: ["NAME", ...], panes: { "HOST/<pane id>": <group index> }, peers?: ["ssh host"] }.
// Edit or add names in `groups` on the hub (the box that lists `peers`); bin/lane-sync.js copies them out.
// Unassigned panes sit in the first group. Dividers show only once two groups have members anywhere.
// presence.json = { HOST: { "<group index>": [firstRank, lastRank] } }: each box writes its own entry,
// so every box can tell which machine holds a group's first and last row.

const fs = require('node:fs');
const path = require('node:path');
const { stateRoot, ensureDir } = require('./paths');

const HOST = (process.env.HERDR_RADAR_HOST ?? require('node:os').hostname().split('.')[0]).toUpperCase();
const FILE = () => path.join(stateRoot, 'lanes.json');
const PRESENCE = () => path.join(stateRoot, 'presence.json');
const DEFAULT = ['GROUP 1', 'GROUP 2'];
const WIDTH = 24;

const key = (pane) => `${HOST}/${pane}`;

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function writeJson(file, d) {
  ensureDir(stateRoot);
  const tmp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, `${JSON.stringify(d, null, 2)}\n`);
  fs.renameSync(tmp, file);
}

function normalize(d) {
  const groups = Array.isArray(d?.groups) && d.groups.length ? d.groups.map(String) : DEFAULT;
  const raw = d?.panes && !Array.isArray(d.panes) ? d.panes : {};
  const panes = Object.fromEntries(Object.entries(raw).map(([k, v]) => [k.includes('/') ? k : key(k), v]));
  return Array.isArray(d?.peers) ? { groups, panes, peers: d.peers } : { groups, panes };
}

const load = () => normalize(readJson(FILE()));
const save = (d) => writeJson(FILE(), d);

function laneOf(d, pane) {
  const i = Number(d.panes[key(pane)] ?? 0);
  return Math.min(Math.max(Number.isInteger(i) ? i : 0, 0), d.groups.length - 1);
}

function move(d, pane, dir) {
  const i = Math.min(Math.max(laneOf(d, pane) + (dir === 'up' ? -1 : 1), 0), d.groups.length - 1);
  if (i === 0) delete d.panes[key(pane)];
  else d.panes[key(pane)] = i;
  return d;
}

const loadPresence = () => readJson(PRESENCE()) ?? {};
const savePresence = (p) => writeJson(PRESENCE(), p);

// Record this box's groups, keyed by the ranks of their first and last rows; returns every box's.
function publish(mine) {
  const all = loadPresence();
  if (JSON.stringify(all[HOST] ?? {}) !== JSON.stringify(mine)) {
    all[HOST] = mine;
    savePresence(all);
  }
  return { ...all, [HOST]: mine };
}

// Does this box hold the group's first (end 0) or last (end 1) row across all machines?
function holds(all, lane, end) {
  const spans = Object.entries(all)
    .filter(([, lanes]) => lanes?.[lane])
    .map(([host, lanes]) => [lanes[lane][end], host])
    .sort((a, b) => (a[0] === b[0] ? (a[1] < b[1] ? -1 : 1) : a[0] < b[0] ? -1 : 1));
  const pick = end === 0 ? spans[0] : spans[spans.length - 1];
  return pick?.[1] === HOST;
}

// Rank that sorts like the attention view: urgency first, then newest activity.
const rank = (attn, minuteKey) => `${attn}${[...(minuteKey ?? '')].map((c) => (/\d/.test(c) ? 9 - c : c)).join('')}`;

// Sort token: group order first; `head` pins the divider pane to its group's top.
function token(lane, head) {
  return `${String(lane).padStart(3, '0')}${head ? '0' : '1'}`;
}

function divider(name) {
  const text = `── ${name} `;
  return text + '─'.repeat(Math.max(3, WIDTH - [...text].length));
}

module.exports = {
  HOST,
  load,
  save,
  normalize,
  move,
  laneOf,
  loadPresence,
  savePresence,
  publish,
  holds,
  rank,
  token,
  divider,
  FILE,
  PRESENCE,
};

if (require.main === module) {
  const assert = require('node:assert');
  const d = { groups: DEFAULT, panes: {} };
  assert.strictEqual(laneOf(d, 'a'), 0);
  move(d, 'a', 'up');
  assert.strictEqual(laneOf(d, 'a'), 0);
  move(d, 'a', 'down');
  assert.strictEqual(d.panes[`${HOST}/a`], 1);
  move(d, 'a', 'down');
  assert.strictEqual(laneOf(d, 'a'), 1);
  move(d, 'a', 'up');
  assert.deepStrictEqual(d.panes, {});
  assert.deepStrictEqual(normalize({ panes: { 'w1:p1': 1, 'X/w2:p1': 1 } }).panes, {
    [`${HOST}/w1:p1`]: 1,
    'X/w2:p1': 1,
  });
  assert.ok(rank('1', '000000000009') < rank('1', '000000000001') && rank('1', '0') < rank('2', '9'));
  const all = { [HOST]: { 1: ['2a', '3a'] }, '~OTHER': { 1: ['1a', '2b'] } };
  assert.strictEqual(holds(all, 1, 0), false);
  assert.strictEqual(holds(all, 1, 1), true);
  assert.ok(token(0, true) < token(0, false) && token(0, false) < token(1, true));
  assert.strictEqual([...divider('X')].length, WIDTH);
  console.log('lanes ok');
}
