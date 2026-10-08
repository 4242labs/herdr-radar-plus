'use strict';

// pi-model-logo (42L-2130). Fixture coverage for lib/pi-model.js: the
// Pi-only consumer spec §4 defines (digest guard + family resolution). This
// is a starter contract test ahead of the full T1 acceptance suite
// (test:pi-model-known-families, test:pi-model-suffix-boundaries) — it
// exists so this PATCH itself has a red-green receipt, not a claim that T1
// is complete; the SPEC.md task table still gates T1-T5 on implementation
// authority.

const test = require('node:test');
const assert = require('node:assert/strict');

const { resolvePiFamily, familyForId, referenceDigest, isValidId } = require('../lib/pi-model');

const REF = { agent: 'pi', source: 'herdr:pi', kind: 'id', value: 'sess-123' };
const validTokens = (id) => ({ pi_model_id: id, pi_model_ref: referenceDigest(REF.kind, REF.value) });

test('spec table positive fixtures resolve to their family', () => {
  const cases = [
    ['claude-sonnet-4', 'claude'],
    ['anthropic/claude-opus-4', 'claude'],
    ['gpt-5', 'gpt'],
    ['codex-mini', 'gpt'],
    ['o3', 'gpt'],
    ['o1-preview', 'gpt'],
    ['gemini-2.5-pro', 'gemini'],
    ['deepseek-r1', 'deepseek'],
    ['Qwen3-Coder-Next-80B-A3B', 'qwen'],
    ['qwen-2.5', 'qwen'],
    ['grok-4', 'grok'],
    ['glm-4.5', 'glm'],
    ['kimi-k2', 'kimi'],
    ['moonshot-v1', 'kimi'],
  ];
  for (const [id, family] of cases) assert.equal(familyForId(id), family, id);
});

test('spec table negative fixtures resolve to no family', () => {
  const cases = ['my-claude', 'claudelike', 'notgpt', 'project-o3', 'o10', 'mygemini', 'notdeepseek', 'qwenish', 'project-qwen', 'groklike', 'glmlike', 'kimono', 'moonshotlike'];
  for (const id of cases) assert.equal(familyForId(id), null, id);
});

test('a trailing slash is unknown', () => {
  assert.equal(familyForId('claude/'), null);
});

test('an id with whitespace or control characters is rejected (R9, R12)', () => {
  assert.equal(familyForId('claude sonnet'), null);
  assert.equal(familyForId('claude\tsonnet'), null);
  assert.equal(familyForId('claude\u0000x'), null);
  assert.equal(isValidId('claude\u0000x'), false);
});

test('an overlength id is rejected', () => {
  assert.equal(familyForId(`claude-${'x'.repeat(80)}`), null);
});

test('resolvePiFamily accepts a matching agent_session + digest + id', () => {
  const family = resolvePiFamily(REF, validTokens('claude-sonnet-4'));
  assert.equal(family, 'claude');
});

test('resolvePiFamily rejects a non-pi agent_session (R9)', () => {
  const foreign = { ...REF, agent: 'codex' };
  assert.equal(resolvePiFamily(foreign, validTokens('claude-sonnet-4')), null);
});

test('resolvePiFamily rejects a foreign source (R9)', () => {
  const foreign = { ...REF, source: 'herdr:codex' };
  assert.equal(resolvePiFamily(foreign, validTokens('claude-sonnet-4')), null);
});

test('resolvePiFamily rejects an unmatched reference digest (R8)', () => {
  const tokens = { pi_model_id: 'claude-sonnet-4', pi_model_ref: referenceDigest('id', 'wrong-session') };
  assert.equal(resolvePiFamily(REF, tokens), null);
});

test('resolvePiFamily rejects a missing/null id (R8)', () => {
  const tokens = { pi_model_id: null, pi_model_ref: referenceDigest(REF.kind, REF.value) };
  assert.equal(resolvePiFamily(REF, tokens), null);
});

test('resolvePiFamily rejects a missing agent_session entirely', () => {
  assert.equal(resolvePiFamily(null, validTokens('claude-sonnet-4')), null);
  assert.equal(resolvePiFamily(undefined, validTokens('claude-sonnet-4')), null);
});

test('resolvePiFamily accepts path-kind references the same way', () => {
  const pathRef = { agent: 'pi', source: 'herdr:pi', kind: 'path', value: '/tmp/session.json' };
  const tokens = { pi_model_id: 'gpt-5', pi_model_ref: referenceDigest('path', '/tmp/session.json') };
  assert.equal(resolvePiFamily(pathRef, tokens), 'gpt');
});

test('resolvePiFamily rejects an unrecognized reference kind', () => {
  const badKind = { ...REF, kind: 'focused' };
  assert.equal(resolvePiFamily(badKind, validTokens('claude-sonnet-4')), null);
});
