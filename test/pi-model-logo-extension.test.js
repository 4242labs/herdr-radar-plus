'use strict';

// pi-model-logo (42L-2130). Unit coverage for the producer's pure/file-local
// helpers (extensions/pi-model-logo.js) — digest construction, id
// validation, and the durable-counter guard. No socket, no live Pi/Herdr
// process: this is NOT T1's full test:pi-title-protocol/test:pi-title-*
// acceptance suite, only a red-green receipt for this PATCH.
//
// extensions/pi-model-logo.js is ESM (Pi requires `export default` per
// docs/extensions.md), so it is loaded here with dynamic import() rather
// than require().

const test = require('node:test');
const assert = require('node:assert/strict');

const { resolvePiFamily, referenceDigest: consumerDigest } = require('../lib/pi-model');

test('producer/consumer parity and end-to-end wire format', async () => {
  const ext = await import('../extensions/pi-model-logo.js');

  assert.equal(ext.referenceDigest('id', 'sess-123'), consumerDigest('id', 'sess-123'));
  assert.equal(ext.referenceDigest('path', '/tmp/session.json'), consumerDigest('path', '/tmp/session.json'));

  assert.equal(ext.isValidSelectedId('claude-sonnet-4'), true);
  assert.equal(ext.isValidSelectedId(''), false);
  assert.equal(ext.isValidSelectedId(null), false);
  assert.equal(ext.isValidSelectedId('has space'), false);
  assert.equal(ext.isValidSelectedId('has\ttab'), false);
  assert.equal(ext.isValidSelectedId('has\u0000null'), false);
  assert.equal(ext.isValidSelectedId(`x-${'y'.repeat(80)}`), false); // 82 chars, over 80
  assert.equal(ext.isValidSelectedId('x'.repeat(80)), true); // exactly 80 is fine

  const refused = ext.provisionZeroCounterWithEvidence(false);
  assert.equal(refused.ok, false);

  // Confirms the two modules' wire format actually interoperates: the
  // producer's digest and the consumer's acceptance check agree on the same
  // {kind, value} pair, independent of any socket.
  const agentSession = { agent: 'pi', source: 'herdr:pi', kind: 'id', value: 'sess-abc' };
  const tokens = {
    pi_model_id: 'claude-sonnet-4',
    pi_model_ref: ext.referenceDigest(agentSession.kind, agentSession.value),
  };
  assert.equal(resolvePiFamily(agentSession, tokens), 'claude');

  const tamperedTokens = { pi_model_id: 'claude-sonnet-4', pi_model_ref: ext.referenceDigest('id', 'different-session') };
  assert.equal(resolvePiFamily(agentSession, tamperedTokens), null);
});
