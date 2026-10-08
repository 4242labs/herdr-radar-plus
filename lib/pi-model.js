'use strict';

// pi-model-logo (42L-2130), spec §4 "Pi-only consumer and family resolution".
//
// This is the CONSUMER half only: given the raw `agent_session` Herdr
// reports for a pane and the token map already read off it, decide whether
// the pane's `pi_model_id`/`pi_model_ref` inputs are trustworthy, and if so
// resolve an existing family key from the id. It never talks to a socket and
// never writes a token — that is the producer extension's job
// (extensions/pi-model-logo.js). Keeping them apart means a consumer bug
// cannot touch the wire protocol, and a producer bug cannot forge a family.
//
// R9 "no unrelated-text inference": every input here is the Pi extension's
// own narrow channel (agent_session + the two pi_model_* tokens), never the
// pane title, project/session name, provider label or the old vendor-glyph
// output token (`model`/`model_stale`, which this module never reads).

const crypto = require('node:crypto');

const REF_SOURCE = 'herdr:pi';
const REF_KINDS = new Set(['path', 'id']);
const MAX_ID_LENGTH = 80; // spec §3 "at most 80 Unicode scalar values"

// C0 (U+0000-001F, U+007F) and C1 (U+0080-009F) control characters, plus
// ASCII/Unicode whitespace. The id must contain none of these (spec §3).
// eslint-disable-next-line no-control-regex
const FORBIDDEN_ID_CHARS = /[\u0000-\u001f\u007f-\u009f\s]/;

// Family table: spec §4 table, row order matters only for readability — each
// alias is matched independently and the spec requires "exactly one family
// may match, otherwise null", so overlapping aliases across rows would be a
// spec bug, not a resolver one. Shared with lib/logos.js's own copy is
// deliberately NOT done: logos.js serves the free-text legacy lookup
// (modelFor/MODEL_FAMILIES) and must keep scanning anywhere in a title; nothing
// here may import that lookup without pulling its scanning behavior along.
const FAMILIES = [
  ['claude', ['claude', 'opus', 'sonnet', 'haiku', 'fable']],
  ['gpt', ['gpt', 'codex']],
  ['gemini', ['gemini']],
  ['deepseek', ['deepseek']],
  ['qwen', ['qwen']],
  ['grok', ['grok']],
  ['glm', ['glm']],
  ['kimi', ['kimi', 'moonshot']],
];
// Every alias boundary is end, digit, hyphen, dot or underscore (spec §4),
// except the reasoning alias below, which excludes a trailing digit so
// `o10`/`o1-preview`-with-trailing-digit do not match `o1`.
const BOUNDARY = '(?:[-._0-9]|$)';
const REASONING_RE = /^o[1-9](?:[-._]|$)/i;
const ANY_ALIAS_RE = new RegExp(
  `^(?:${FAMILIES.flatMap(([, aliases]) => aliases).join('|')})${BOUNDARY}`,
  'i',
);

function isValidId(id) {
  return typeof id === 'string' && id.length > 0 && id.length <= MAX_ID_LENGTH && !FORBIDDEN_ID_CHARS.test(id);
}

// Final nonempty slash-delimited component; a trailing slash is unknown
// (spec §4 "a trailing slash is unknown").
function lastComponent(id) {
  const parts = id.split('/');
  const last = parts[parts.length - 1];
  return last === '' ? null : last;
}

// Resolve a validated, already-component-isolated id to a family key, or
// null when no alias matches. Exported separately from the full guard chain
// so test:pi-model-known-families and test:pi-model-suffix-boundaries can
// drive the alias table directly without constructing a fake agent_session.
function familyForId(id) {
  if (!isValidId(id)) return null;
  const component = lastComponent(id);
  if (component === null) return null;
  if (REASONING_RE.test(component)) return 'gpt';
  if (!ANY_ALIAS_RE.test(component)) return null;
  for (const [family, aliases] of FAMILIES) {
    for (const alias of aliases) {
      const re = new RegExp(`^${alias}${BOUNDARY}`, 'i');
      if (re.test(component)) return family;
    }
  }
  return null;
}

// Lowercase SHA256 hex of `kind + U+0000 + value`, matching the producer's
// construction exactly (spec §3 "Reference construction"). Exported so the
// extension and this consumer can never drift into two different digests.
function referenceDigest(kind, value) {
  return crypto.createHash('sha256').update(`${kind}\u0000${value}`, 'utf8').digest('hex');
}

// spec §4: "accept inputs only when the raw authoritative agent is `pi`,
// `agent_session.agent` is `pi`, session source is `herdr:pi`, kind is `path`
// or `id`, and the digest of its nonempty exact value equals `pi_model_ref`.
// Missing, expired, malformed or foreign data yields no model family."
//
// `rawAgent` is the caller's own already-checked `a.agent === 'pi'` (spec:
// "do not mistake metadata `agent`/`applies_to_source` for token guards;
// enforcement is in this consumer" — the raw-agent check happens once at the
// call site in lib/state.js, not duplicated here, because this function has
// no access to anything BUT agent_session/tokens by design).
function resolvePiFamily(agentSession, tokens) {
  if (!agentSession || typeof agentSession !== 'object') return null;
  if (agentSession.agent !== 'pi') return null;
  if (agentSession.source !== REF_SOURCE) return null;
  const kind = agentSession.kind;
  if (!REF_KINDS.has(kind)) return null;
  const value = agentSession.value;
  if (typeof value !== 'string' || value.length === 0) return null;

  const reportedRef = tokens?.pi_model_ref;
  if (typeof reportedRef !== 'string' || reportedRef.length === 0) return null;
  if (referenceDigest(kind, value) !== reportedRef) return null;

  const id = tokens?.pi_model_id;
  if (id === null || id === undefined) return null;
  // Revalidate without repairing (spec §4): an id that already failed the
  // producer's own §3 shape check is foreign/malformed to this consumer too,
  // never trimmed or substituted.
  if (!isValidId(id)) return null;

  return familyForId(id);
}

module.exports = {
  resolvePiFamily,
  familyForId,
  referenceDigest,
  isValidId,
  MAX_ID_LENGTH,
};
