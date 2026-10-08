// pi-model-logo (42L-2130). Publishes Pi's own selected model to Herdr so
// Radar can draw the family glyph beside the Pi mark — spec
// specs/pi-model-logo/SPEC.md §3-4. This file is the PRODUCER half only: it
// never resolves a family itself, it only reports `pi_model_id` and
// `pi_model_ref` through `pane.report_metadata`. The consumer that turns
// those into a glyph lives in herdr-radar-plus (lib/pi-model.js), a
// different repository/release — this file has no dependency on it and
// must keep working even if that consumer is absent or outdated.
//
// Spec §3 "Serialization and sequence recovery": built-in node:net,
// node:crypto, node:fs, node:path only, never a Radar import or subprocess.
import net from 'node:net';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const SOURCE = 'user:radar-pi-model';
const REFRESH_MS = 30000; // spec §3 Lifecycle: "one unrefed 30000ms metadata-refresh timer"
const REQUEST_TIMEOUT_MS = 1000; // spec §3: "a 1000ms deadline"
const MAX_REPLY_BYTES = 1024 * 1024; // spec §3: "Limit a reply buffer to 1 MiB"
const TTL_MS = 60000; // spec §3 Token ownership table
const MAX_ID_LENGTH = 80; // spec §3: "at most 80 Unicode scalar values"
const SHUTDOWN_BUDGET_MS = 4000; // spec §3 Lifecycle: "Bound cleanup to 4000ms in total"

// C0/C1 controls + whitespace (spec §3: "no whitespace or C0/C1 control characters").
// eslint-disable-next-line no-control-regex
const FORBIDDEN_ID_CHARS = /[\u0000-\u001f\u007f-\u009f\s]/;

function isValidSelectedId(id) {
  return typeof id === 'string' && id.length > 0 && id.length <= MAX_ID_LENGTH && !FORBIDDEN_ID_CHARS.test(id);
}

// spec §3 "Reference construction": hash UTF-8 bytes of `kind + U+0000 + value`.
function referenceDigest(kind, value) {
  return crypto.createHash('sha256').update(`${kind}\u0000${value}`, 'utf8').digest('hex');
}

// spec §3 "Serialization and sequence recovery": environment gating.
function envReady() {
  return (
    process.env.HERDR_ENV === '1' &&
    typeof process.env.HERDR_SOCKET_PATH === 'string' &&
    process.env.HERDR_SOCKET_PATH.length > 0 &&
    typeof process.env.HERDR_PANE_ID === 'string' &&
    process.env.HERDR_PANE_ID.length > 0
  );
}

function socketEndpoint() {
  const socketPath = process.env.HERDR_SOCKET_PATH;
  return process.platform === 'win32' ? `\\\\.\\pipe\\${socketPath}` : socketPath;
}

// One request/response over a fresh connection. Spec §3: distinct id, 1000ms
// deadline, complete-line JSON/error validation, socket destruction on
// completion/error/timeout, 1 MiB reply cap, no CLI fallback, never a
// focused-pane default (pane id is always the pinned env value).
function request(method, params) {
  return new Promise((resolve) => {
    const id = `pi-model-logo:${Date.now()}:${Math.random().toString(36).slice(2)}`;
    let done = false;
    let buffer = '';
    let timer;

    const finish = (result) => {
      if (done) return;
      done = true;
      if (timer) clearTimeout(timer);
      try {
        socket.destroy();
      } catch {
        // Already gone.
      }
      resolve(result);
    };

    let socket;
    try {
      socket = net.createConnection(socketEndpoint());
    } catch {
      resolve(null);
      return;
    }

    socket.on('error', () => finish(null));
    socket.on('close', () => finish(null));
    socket.on('connect', () => {
      try {
        socket.write(`${JSON.stringify({ id, method, params })}\n`);
      } catch {
        finish(null);
      }
    });
    socket.on('data', (chunk) => {
      buffer += chunk.toString('utf8');
      if (buffer.length > MAX_REPLY_BYTES) {
        finish(null); // spec §3: "excessive ... replies fail the operation"
        return;
      }
      const newline = buffer.indexOf('\n');
      if (newline === -1) return; // wait for a complete line
      const line = buffer.slice(0, newline);
      let parsed;
      try {
        parsed = JSON.parse(line);
      } catch {
        finish(null); // malformed reply fails the operation
        return;
      }
      if (parsed?.id !== id || parsed?.error || typeof parsed?.result !== 'object' || parsed.result === null) {
        finish(null);
        return;
      }
      finish(parsed.result);
    });

    timer = setTimeout(() => finish(null), REQUEST_TIMEOUT_MS);
    timer.unref?.();
  });
}

// spec §3 "Serialization and sequence recovery": write envelope + readback.
async function writePatch(paneId, seq, tokens) {
  const wrote = await request('pane.report_metadata', {
    pane_id: paneId,
    source: SOURCE,
    seq,
    tokens,
    ttl_ms: TTL_MS,
  });
  if (!wrote) return false;

  const readback = await request('pane.get', { pane_id: paneId });
  if (!readback || readback.type !== 'pane_info' || readback.pane?.pane_id !== paneId) return false;
  const liveTokens = readback.pane.tokens ?? {};
  // "A null patch succeeds only when that key is absent on readback."
  for (const [key, value] of Object.entries(tokens)) {
    if (value === null) {
      if (Object.prototype.hasOwnProperty.call(liveTokens, key)) return false;
    } else if (liveTokens[key] !== value) {
      return false;
    }
  }
  return true;
}

// spec §3 "Keep a durable counter independent of Herdr's ephemeral tokens."
// Directory/file modes 0700/0600, current-user ownership, no symlink
// traversal, corrupt/foreign/exhausted state stops publication rather than
// resetting it.
function counterDir() {
  // Beside the global native `extensions` directory this file itself lives in.
  return path.join(path.dirname(__dirname), 'pi-model-logo-state');
}

function counterFile() {
  const digest = crypto
    .createHash('sha256')
    .update(`${process.env.HERDR_SOCKET_PATH}\u0000${process.env.HERDR_PANE_ID}`, 'utf8')
    .digest('hex');
  return path.join(counterDir(), `${digest}.json`);
}

function safeStat(file) {
  try {
    return fs.lstatSync(file);
  } catch {
    return null;
  }
}

// Returns { last } on a trustworthy existing counter, 'missing' when there is
// none yet, or null when the state is corrupt/foreign/symlinked and
// publication must stop rather than guess.
function readCounter() {
  const dir = counterDir();
  const file = counterFile();
  const dirStat = safeStat(dir);
  if (dirStat) {
    if (dirStat.isSymbolicLink() || !dirStat.isDirectory()) return null;
    try {
      if (dirStat.uid !== process.getuid?.()) return null;
    } catch {
      // getuid unavailable (Windows): ownership check skipped, mode check below still applies.
    }
  }
  const fileStat = safeStat(file);
  if (!fileStat) return 'missing';
  if (fileStat.isSymbolicLink() || !fileStat.isFile()) return null;
  try {
    if (fileStat.uid !== process.getuid?.()) return null;
  } catch {
    // Windows: skip.
  }
  let raw;
  try {
    const fd = fs.openSync(file, 'r');
    try {
      const buf = Buffer.alloc(64); // spec §3: "Cap reads at 64 bytes."
      const bytesRead = fs.readSync(fd, buf, 0, 64, 0);
      raw = buf.slice(0, bytesRead).toString('utf8');
    } finally {
      fs.closeSync(fd);
    }
  } catch {
    return null;
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!parsed || typeof parsed.last !== 'number' || !Number.isSafeInteger(parsed.last) || parsed.last < 0) return null;
  return { last: parsed.last };
}

// Persist-before-send: exclusive temp file, sync, close, atomic rename.
// Returns the reserved N, or null if persistence failed (send nothing).
function reserveNext(current) {
  const dir = counterDir();
  try {
    fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
  } catch {
    return null;
  }
  const n = current.last + 1;
  if (!Number.isSafeInteger(n)) return null;
  const file = counterFile();
  const tmp = `${file}.${process.pid}.${Date.now()}.tmp`;
  let fd;
  try {
    fd = fs.openSync(tmp, 'wx', 0o600); // exclusive create
    fs.writeSync(fd, JSON.stringify({ last: n }));
    fs.fsyncSync(fd);
    fs.closeSync(fd);
    fd = undefined;
    fs.renameSync(tmp, file);
  } catch {
    try {
      if (fd !== undefined) fs.closeSync(fd);
    } catch {
      // Already closed.
    }
    try {
      fs.rmSync(tmp, { force: true });
    } catch {
      // Best effort.
    }
    return null;
  }
  // Read back the reserved counter before proceeding (spec §3 step 1).
  const confirmed = readCounter();
  if (!confirmed || confirmed.last !== n) return null;
  return n;
}

// Preflight-only entry point: provisions a zero counter, but ONLY under
// release evidence this source never published for this socket/pane before.
// Runtime itself never calls this — "Runtime never initializes a missing
// counter" (spec §3). Exported for the deployment preflight (T4/T5), not
// used by the lifecycle hooks below.
function provisionZeroCounterWithEvidence(hasPriorPublicationEvidence) {
  if (!hasPriorPublicationEvidence) return { ok: false, reason: 'no prior-publication evidence supplied' };
  const existing = readCounter();
  if (existing === 'missing') {
    const n = reserveNext({ last: -1 }); // first reservation becomes 0
    return n === 0 ? { ok: true } : { ok: false, reason: 'failed to provision' };
  }
  if (existing === null) return { ok: false, reason: 'existing counter state is untrustworthy' };
  return { ok: true, reason: 'counter already exists; preserved' };
}

// ---------------------------------------------------------------------------
// Generation-scoped publisher: one per session_start, retired on the next
// session_start/session_shutdown. Spec §3 "Maintain one session generation
// and one serialized drain... A callback from a retired generation cannot
// read context or initiate another request."
// ---------------------------------------------------------------------------

function createPublisher(paneId) {
  let alive = true;
  let drainInFlight = false;
  let pendingSnapshot; // latest desired {id, ref} or undefined
  let timer;

  function retire() {
    alive = false;
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
  }

  async function drain() {
    if (drainInFlight) return;
    drainInFlight = true;
    try {
      while (alive && pendingSnapshot !== undefined) {
        const snapshot = pendingSnapshot;
        pendingSnapshot = undefined;
        if (!alive) return;
        const current = readCounter();
        // `readCounter()` returning 'missing' or null both block sending —
        // runtime never auto-provisions (spec §3 "Runtime never initializes
        // a missing counter"), and untrustworthy state stops publication.
        if (current === 'missing' || current === null) return; // generic refusal, no resend
        const n = reserveNext(current);
        if (n === null) return; // persistence failed: send nothing
        const tokens = { pi_model_id: snapshot.id, pi_model_ref: snapshot.ref };
        const ok = alive && (await writePatch(paneId, n, tokens));
        if (!ok) return; // do not mark a failed/ignored write delivered; no tight retry
      }
    } finally {
      drainInFlight = false;
      if (alive && pendingSnapshot !== undefined) void drain();
    }
  }

  function publish(id, ref) {
    if (!alive) return;
    // Model events supersede older pending values — only the latest matters.
    pendingSnapshot = { id, ref };
    void drain();
  }

  function startRefreshTimer(readCurrent) {
    const tick = () => {
      if (!alive) return;
      const current = readCurrent();
      publish(current.id, current.ref);
      timer = setTimeout(tick, REFRESH_MS);
      timer.unref?.();
    };
    timer = setTimeout(tick, REFRESH_MS);
    timer.unref?.();
  }

  async function shutdown() {
    retire();
    const deadline = Date.now() + SHUTDOWN_BUDGET_MS;
    const current = readCounter();
    if (current === 'missing' || current === null) return;
    const n = reserveNext(current);
    if (n === null) return;
    const remaining = deadline - Date.now();
    if (remaining <= 0) return;
    await Promise.race([
      writePatch(paneId, n, { pi_model_id: null, pi_model_ref: null }),
      new Promise((resolve) => setTimeout(resolve, Math.max(0, remaining))),
    ]);
  }

  return { publish, startRefreshTimer, shutdown, retire };
}

// ---------------------------------------------------------------------------
// Session reference + model snapshot readers.
// ---------------------------------------------------------------------------

// spec §3 "Reference construction": absolute getSessionFile() first (kind
// path), else nonempty getSessionId() (kind id). Never reuse a prior session
// when neither accessor supplies a valid value.
function readSessionRef(ctx) {
  try {
    const file = ctx?.sessionManager?.getSessionFile?.();
    if (typeof file === 'string' && (path.posix.isAbsolute(file) || path.win32.isAbsolute(file)) && file.length > 0) {
      return { kind: 'path', value: file };
    }
  } catch {
    // Fall through to the id accessor.
  }
  try {
    const id = ctx?.sessionManager?.getSessionId?.();
    if (typeof id === 'string' && id.length > 0) return { kind: 'id', value: id };
  } catch {
    // No reference available.
  }
  return null;
}

// A failed model getter produces a null ID (spec §3).
function readSelectedId(ctx) {
  try {
    const id = ctx?.model?.id;
    return isValidSelectedId(id) ? id : null;
  } catch {
    return null;
  }
}

function currentSnapshot(ctx) {
  const ref = readSessionRef(ctx);
  if (!ref) return { id: null, ref: null }; // clear both when no reference
  const id = readSelectedId(ctx);
  return { id, ref: referenceDigest(ref.kind, ref.value) };
}

// ---------------------------------------------------------------------------
// Extension factory. Registers handlers only — no socket/process/timer is
// started here (spec §3 Lifecycle: "The factory registers handlers only").
// ---------------------------------------------------------------------------

export default function piModelLogo(pi) {
  let publisher = null;

  function retireCurrent() {
    publisher?.retire();
    publisher = null;
  }

  pi.on('session_start', async (event, ctx) => {
    retireCurrent(); // retire old generation resources first
    if (ctx?.mode !== 'tui') return; // TUI-only, matches the managed integration's own gate
    if (!envReady()) return; // headless/outside-Herdr allocates nothing
    const paneId = process.env.HERDR_PANE_ID;

    const next = createPublisher(paneId);
    publisher = next;
    const snapshot = currentSnapshot(ctx);
    next.publish(snapshot.id, snapshot.ref);
    next.startRefreshTimer(() => currentSnapshot(ctx));
  });

  pi.on('model_select', (_event, ctx) => {
    if (!publisher) return;
    const snapshot = currentSnapshot(ctx);
    publisher.publish(snapshot.id, snapshot.ref);
  });

  pi.on('session_shutdown', async () => {
    const current = publisher;
    publisher = null;
    if (current) await current.shutdown();
  });
}

export { referenceDigest, isValidSelectedId, provisionZeroCounterWithEvidence };
