#!/usr/bin/env node
'use strict';

// local patch (2026-09-27): keep agent groups in step across machines. The hub (the box whose
// lanes.json lists `peers`) holds one SSH pipe per peer running this script with --spoke. Each side
// sends its files as one JSON line whenever they change, and takes from the other only what that
// side owns: a machine owns its own `HOST/…` panes and presence entry, the hub owns group names.
require('../lib/node-version');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');
const lanes = require('../lib/lanes');
const { stateRoot, ensureDir } = require('../lib/paths');

const spoke = process.argv.includes('--spoke');
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function take(line, seen) {
  const peer = JSON.parse(line);
  seen.add(peer.host);
  const theirs = spoke ? (host) => host !== lanes.HOST : (host) => host === peer.host;
  const hostOf = (k) => k.split('/')[0];
  const d = lanes.load();
  const incoming = lanes.normalize(peer.lanes);
  const next = {
    ...d,
    ...(spoke ? { groups: incoming.groups } : {}),
    panes: Object.fromEntries([
      ...Object.entries(d.panes).filter(([k]) => !theirs(hostOf(k))),
      ...Object.entries(incoming.panes).filter(([k]) => theirs(hostOf(k))),
    ]),
  };
  if (!same(next, d)) lanes.save(next);
  const p = lanes.loadPresence();
  const nextP = Object.fromEntries([
    ...Object.entries(p).filter(([h]) => !theirs(h)),
    ...Object.entries(peer.presence ?? {}).filter(([h]) => theirs(h)),
  ]);
  if (!same(nextP, p)) lanes.savePresence(nextP);
}

function link(input, output) {
  const seen = new Set();
  let last = '';
  const send = () => {
    const line = JSON.stringify({ host: lanes.HOST, lanes: lanes.load(), presence: lanes.loadPresence() });
    if (line === last || !output.writable) return;
    last = line;
    output.write(`${line}\n`);
  };
  const watcher = fs.watch(ensureDir(stateRoot), (_, f) => {
    if (f === 'lanes.json' || f === 'presence.json') send();
  });
  let buf = '';
  input.setEncoding('utf8');
  input.on('data', (chunk) => {
    buf += chunk;
    for (let i; (i = buf.indexOf('\n')) >= 0;) {
      const line = buf.slice(0, i);
      buf = buf.slice(i + 1);
      try {
        if (line) take(line, seen);
      } catch {
        // A torn or foreign line; the next change resends everything.
      }
    }
  });
  send();
  return () => {
    watcher.close();
    // A peer we cannot hear from holds no rows: drop its presence so dividers fall back here.
    const p = lanes.loadPresence();
    const nextP = Object.fromEntries(Object.entries(p).filter(([h]) => h === lanes.HOST || !seen.has(h)));
    if (!same(nextP, p)) lanes.savePresence(nextP);
  };
}

if (spoke) {
  const close = link(process.stdin, process.stdout);
  process.stdin.on('end', () => {
    close();
    process.exit(0);
  });
} else {
  const rel = path.relative(os.homedir(), path.resolve(__dirname, '..'));
  const connect = (peer) => {
    const ssh = spawn(
      'ssh',
      [
        '-T',
        '-o',
        'BatchMode=yes',
        '-o',
        'ServerAliveInterval=15',
        '-o',
        'ServerAliveCountMax=2',
        peer,
        `export PATH="$HOME/.local/bin:$PATH"; cd ~/'${rel}' && exec node bin/lane-sync.js --spoke`,
      ],
      { stdio: ['pipe', 'pipe', 'ignore'] },
    );
    ssh.stdin.on('error', () => {});
    const close = link(ssh.stdout, ssh.stdin);
    ssh.on('exit', () => {
      close();
      setTimeout(() => connect(peer), 10000);
    });
  };
  for (const peer of lanes.load().peers ?? []) connect(peer);
  // Die with the daemon that started us.
  const parent = process.ppid;
  setInterval(() => process.ppid !== parent && process.exit(0), 5000);
}
