#!/usr/bin/env node
'use strict';

// Move the focused agent one group up or down.
require('../lib/node-version');
const { execFileSync } = require('node:child_process');
const lanes = require('../lib/lanes');

const dir = process.argv[2] === '--down' ? 'down' : 'up';
// Unset so `pane current` reports the focused pane, not the one that ran us.
const env = { ...process.env };
delete env.HERDR_PANE_ID;
const herdr = (...args) => JSON.parse(execFileSync('herdr', args, { env, encoding: 'utf8' })).result;
const pane = process.env.HERDR_ACTIVE_PANE_ID || herdr('pane', 'current').pane.pane_id;
lanes.save(lanes.move(lanes.load(), pane, dir));
