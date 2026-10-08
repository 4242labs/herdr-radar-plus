# Pi model-logo contract

**Verdict: READY.** Implementation and deployment require separate authorization.

Card: `42L-2130`. Repository: `4242labs/herdr-radar-plus`.
Compatibility baseline: Radar `0.42.0`, native Pi `1.0.4`, Herdr `0.9.1`; Darkseid/macOS and Alghul/Linux.

## 1. Problem, goal and authority

Radar already renders a model-family mark beside the agent mark. Its title-based model lookup cannot reliably identify Pi's selected model. The goal is to show the family of Pi's actual selected model beside Pi's agent logo on both named hosts, or no model mark when the model cannot be established. Preserve Pi's terminal title, session/project naming, existing Hermes behavior and the managed Herdr lifecycle integration.

The operator owns implementation, deployment, activation and live model-selection authorization. The implementing engineer owns the producer, Pi-only consumer, tests and runbook; the authorized deployer owns host preflight, source readback and rollback. Pi owns model selection and terminal titles; the managed Herdr integration owns lifecycle/session reporting; Herdr owns pane identity and token storage; Radar alone owns rendered model glyphs.

Current authority is contract/evidence amendment only. Do not implement, install, upgrade, reload, restart, change a live model, submit a prompt, modify credentials, dispatch reviewers or merge on the strength of this document.

## 2. Scope, dependencies and flow

In scope: one standalone global native-Pi extension; a narrowly scoped metadata consumer in Radar; reuse of the existing model-family keys, glyphs, sidebar cells, scheduler and token-write pipeline; automated feature/regression tests; two-host deployment and rollback procedures. No new service or dependency.

Out of scope: terminal-title transport or interception; modifying Pi internals or `herdr-agent-state.ts`; adopting the community integration wholesale; changing Hermes/other harnesses; font, palette or sidebar redesign; providers, authentication, upgrades, inference, Telegram/bots, Night Watch, Windows, other hosts, new live Pi sessions and service/Pi restarts.

Existing interfaces: `lib/state.js` obtains agents and their tokens, composes rows and publishes `model`/`model_stale`; `lib/logos.js` owns family lookup and glyphs; `lib/managed-config.js` already puts model cells after agent cells. Modify the Pi branch only, retaining the legacy non-Pi lookup. The prospective extension artifact is `extensions/pi-model-logo.js`; deliver it beside the managed extension, never over it. README/CHANGELOG receive only feature behavior, activation, troubleshooting and rollback instructions when implementation is authorized.

Prerequisites: supported Pi public lifecycle/model/session getters; Herdr token patches, TTL, sequence numbers and authoritative session references; a native interactive Pi pane with its managed lifecycle integration; active Radar model cells with matching glyph variant. Deployment must verify these immediately before mutation. A failed prerequisite blocks that host without repairing unrelated configuration.

Happy path: native Pi `session_start` reads the current selected ID and session reference; the extension publishes distinct input tokens; Radar validates the current Pi occupant and reference, resolves the ID to an existing family, and publishes its usual model glyph tokens. Herdr renders them beside the existing Pi mark. Model selection replaces the inputs; unknown selection clears the model cells. Pi's own later title writes do not participate in this flow.

Assumptions used as execution facts: none. Live configuration, token capacity and activation safety are explicit preflight gates, not claimed passes. API availability is not live rendering acceptance.

## 3. Input, ownership and transport contract

### Token ownership

| Key | Writer | Value | Expiry |
|---|---|---|---|
| `pi_model_id` | New Pi extension only | Exact selected `ctx.model.id`, or JSON null | `ttl_ms: 60000` |
| `pi_model_ref` | New Pi extension only | Lowercase SHA256 reference digest, or JSON null | Same report and TTL as ID |
| `model`, `model_stale` | Radar only | Existing family glyph or null | Existing Radar behavior |

Use the single fixed metadata source `user:radar-pi-model`; never create a source per reload/session. Input tokens are not sidebar cells and are not Radar-owned cleanup keys. Token sources are not separate namespaces. Do not write `title`, `display_agent`, state labels, lifecycle state, session authority or resume commands. Do not write model output keys from Pi.

For the selected ID, require a nonempty string with no whitespace or C0/C1 control characters and at most 80 Unicode scalar values. Do not trim, normalize, truncate or substitute a provider/display name. Invalid, missing or overlength ID becomes null. A valid unrecognized ID may travel unchanged; it resolves to no family.

Reference construction follows the managed native integration: use a nonempty absolute `ctx.sessionManager.getSessionFile()` first with kind `path`; otherwise a nonempty `getSessionId()` with kind `id`. Do not read a session file. Hash UTF-8 bytes of `kind + U+0000 + value` with Node's built-in SHA256. Never transmit or persist the unhashed reference. If neither accessor provides a valid reference, clear both ID and reference instead of reusing a prior session. A failed model getter produces a null ID. This digest is a correlation guard, not authentication against another local process able to forge tokens.

### Serialization and sequence recovery

Use built-in `node:net`, `node:crypto`, `node:fs` and `node:path`, not a Radar import or subprocess. Environment gating requires `HERDR_ENV === '1'`, nonempty `HERDR_SOCKET_PATH`, nonempty `HERDR_PANE_ID`, and `ctx.mode === 'tui'`. Never guess a socket/pane or use the currently focused pane. Send newline-delimited JSON to the supplied local socket. Each request has a distinct ID, a 1000ms deadline, complete-line JSON/error validation, and socket destruction on completion/error/timeout. Limit a reply buffer to 1 MiB; partial, excessive or malformed replies fail the operation. No CLI fallback or external HTTP/provider call.

The write envelope is `{id, method: "pane.report_metadata", params: {pane_id, source, seq, tokens, ttl_ms}}`, with the pinned environment pane ID, fixed source above, reserved numeric sequence, exactly the two input token keys, and `ttl_ms: 60000`. Serialize to UTF-8 JSON plus one newline; omit presentation/lifecycle fields. Readback uses `{id, method: "pane.get", params: {pane_id}}` with the same pinned ID. Require the matching string response ID, an object `result` and no `error`; pane readback additionally requires `result.type === "pane_info"`, the matching `result.pane.pane_id`, and its `tokens` map. A null patch succeeds only when that key is absent on readback. Never use a focused-pane default.

Maintain one session generation and one serialized drain. Retain at most one latest pending snapshot; model events supersede older pending values. A callback from a retired generation cannot read context or initiate another request. Capture plain values before asynchronous work; never read an invalidated context.

Keep a durable counter independent of Herdr's ephemeral tokens. Its prospective directory is `pi-model-logo-state` beside the global native `extensions` directory. Its filename is the lowercase SHA256 of UTF-8 `HERDR_SOCKET_PATH + U+0000 + HERDR_PANE_ID`, followed by `.json`; its sole content is `{"last":N}`. Require N to be a nonnegative JavaScript safe integer. Initial-install preflight provisions zero before activation only with release evidence that this source has never published for that socket/pane; token absence is not that evidence. Otherwise preserve the existing counter or stop. Runtime never initializes a missing counter. Cap reads at 64 bytes. Directory/file modes are 0700/0600, with current-user ownership and no symlink traversal. Corrupt, foreign-owned, symlinked, missing, unwritable or exhausted state stops publication with a generic warning; it is never silently reset. No session reference, title or transcript enters this store. Preflight forbids multiple producer processes for the same socket/pane. Within one process, serialize counter updates across reload generations using a process-scoped registry; retire old generation work before a new generation can publish. No lock file or wall-clock seed.

For each update, including refresh and clearing:

1. Read the owned counter, choose N = last + 1, and require N to be a safe integer. Persist `{"last":N}` to an exclusively created same-directory temporary file, sync and close it, then atomically rename it over the counter before any IPC write. Remove only this operation's own temporary file on failure. If persistence fails, send nothing. Read back the reserved counter before proceeding.
2. Report ID and reference together with source `user:radar-pi-model`, `seq: N` and `ttl_ms: 60000`. Clear both with null for shutdown or unavailable reference; clear ID alone for an unavailable model when the reference remains valid. Every attempt reserves a fresh number, including retries and cleanup.
3. Read back the pinned pane's inputs before acknowledging success; an API success may be an ignored old sequence. If a newer desired snapshot arrived, drain that snapshot next; do not resend the superseded one. Failure leaves only the latest desired snapshot pending for the next trigger.

Persist-before-send allows skipped numbers after failure but prevents reuse after a process crash, reload, lease expiry, server restart between requests, or wall-clock change. Server token loss cannot erase the counter. Preserve counters during shutdown and rollback so same-pane reinstall remains safe; do not delete/reset them while the server can retain this source's sequence history. They are invisible feature-owned state, not sidebar tokens. Cleanup is allowed only after separately verifying that the pane lifetime has ended. Never allocate another sequence source to bypass a refusal. The reservation precedes the IPC request even if shutdown reaches its deadline; no unreserved clear may be sent.

### Lifecycle, expiry and recovery

The factory registers handlers only; it starts no sockets, processes or timers. `session_start` first retires old generation resources, then initializes eligible native TUI state, publishes fresh values and starts one unrefed 30000ms metadata-refresh timer. `model_select` publishes freshly read current values immediately; restoration uses `session_start`, not a presumed restore-sourced model event. Startup/reload/new/resume/fork all reinitialize from the supplied current context. Rename does not affect the model/reference or call a title API.

The refresh is a metadata lease renewal, not terminal-title reconciliation: there are zero title writes. It republishes fresh values even if unchanged, so server token loss is recoverable without a prompt/restart. Recovery occurs on the next event or refresh after the same socket/pane becomes reachable and its authoritative Pi reference is available; no absolute wall-clock SLA under event-loop stalls is promised. If the reference is absent/mismatched, Radar remains blank until the existing integration establishes it. If the pane no longer exists, retire the publisher and its timer; never redirect to another pane. Changed socket/pane environment requires later separately authorized idle reload, not discovery or restart.

On `session_shutdown`, retire generation/timer first, cancel outstanding sockets, discard old pending updates, and attempt the serialized null patch from captured data. Bound cleanup to 4000ms in total and destroy its sockets at that deadline. If clearing fails, the last successful ID/ref expires after its 60000ms lease; then Radar clears the model cells on its next successful frame. Leave Pi usable and the managed lifecycle integration untouched. Repeated shutdown is idempotent. Warn at most once per generation using generic text without identifiers, references, names, stack traces or payloads.

Transient socket/server failure gets no tight retry loop: retain only the latest desired snapshot and retry on the next model/session trigger or scheduled refresh. Do not mark a failed or ignored write delivered. A valid empty agent list is not a failed list read: preserve Radar's existing failed-read semantics. No stale model cache or title/provider fallback is added.

## 4. Pi-only consumer and family resolution

In `lib/state.js`, carry the authoritative agent/session information and input tokens through the snapshot to row composition. For a resolved Pi entry, accept inputs only when the raw authoritative agent is `pi`, `agent_session.agent` is `pi`, session source is `herdr:pi`, kind is `path` or `id`, and the digest of its nonempty exact value equals `pi_model_ref`. Missing, expired, malformed or foreign data yields no model family. Do not mistake metadata `agent`/`applies_to_source` for token guards; enforcement is in this consumer.

For Pi, never use terminal title, project/session names, provider or the old output token to find a model. Revalidate the input ID without repairing it. Select the final nonempty slash-delimited ID component; a trailing slash is unknown. Match case-insensitive ASCII aliases anchored at the identifier start. Alias boundary is end, digit, hyphen, dot or underscore; the reasoning alias `o[1-9]` allows end, hyphen, dot or underscore, not another digit. Exactly one family may match, otherwise return null.

| Existing family key | Identifier-start aliases | Positive fixtures | Negative fixtures |
|---|---|---|---|
| claude | claude, opus, sonnet, haiku, fable | claude-sonnet-4; anthropic/claude-opus-4 | my-claude; claudelike |
| gpt | gpt, codex; reasoning o[1-9] | gpt-5; codex-mini; o3; o1-preview | notgpt; project-o3; o10 |
| gemini | gemini | gemini-2.5-pro | mygemini |
| deepseek | deepseek | deepseek-r1 | notdeepseek |
| qwen | qwen | Qwen3-Coder-Next-80B-A3B; qwen-2.5 | qwenish; project-qwen |
| grok | grok | grok-4 | groklike |
| glm | glm | glm-4.5 | glmlike |
| kimi | kimi, moonshot | kimi-k2; moonshot-v1 | kimono; moonshotlike |

These are mapping fixtures, not an installed-model inventory. Reuse the existing registry keys and glyph lookup; do not duplicate glyph/font code in Pi or add a Pi provider fallback. Non-Pi entries keep their existing title regex priority and harness fallbacks. The existing output pipeline selects `model` versus `model_stale`; a missing family clears both while retaining the Pi mark. Existing glyph variant and palette behavior remain unchanged, including plain-ink families and variant `none`.

## 5. Requirements and acceptance

Each `test:` label is a required future automated implementation test, not a claim that it exists or has passed. Preserve these acceptance identities while testing the behavior specified here. Test the shipped producer and consumer, not a test-local substitute; removing each shipped guard must make its associated test fail. Use public Pi collaborators and isolated fake socket/server/clock behavior; no paid model calls or live sessions.

### R1 — Selected-model transport

Eligible Pi publishes its current exact model ID and reference through the defined input protocol; unknown metadata clears instead of guessing. It never publishes a glyph or terminal-title suffix.

**Acceptance:** `test:pi-title-protocol` checks the full wire method, source, allowed keys, values, reservation/readback, TTL, and null/invalid-input cases. **Task:** T1.

### R2 — Preserved naming

Pi's title, session/project naming and other extensions' title behavior remain untouched through startup, delayed binding, rename and shutdown.

**Acceptance:** `test:pi-title-naming` supplies a title writer that throws on any call and verifies ordinary Unicode/naming state is unchanged. **Task:** T1.

### R3 — Startup publication

Startup makes fresh selected-model metadata available independently of any default title write after binding, including delayed extension/resource binding.

**Acceptance:** `test:pi-title-startup-order` performs late host title writes around publication and verifies the same selected-model inputs/family without a title write from this extension. **Task:** T2.

### R4 — Restored selection

Resume uses its fresh session-start context and reference; previous session data/callbacks cannot supply the restored model.

**Acceptance:** `test:pi-title-resume` changes model/reference, invalidates the old context, omits restore model events and verifies the restored family plus refusal of the old digest. **Task:** T2.

### R5 — Model switch

Set/cycle replaces the former selected ID and glyph after accepted publication; same-model selection remains consistent. Latest pending selection wins over delayed earlier requests.

**Acceptance:** `test:pi-title-model-switch` checks recognized-to-recognized and rapid A→B→C transitions, delayed replies and same-model selection through the shipped consumer/output path. **Task:** T2.

### R6 — Known family resolution

Only the matching occupant's selected ID determines Pi's family; the existing glyph keys and cells provide the mark.

**Acceptance:** `test:pi-model-known-families` tests every table row and namespace leaf in font/text/none variants, including numeric Qwen IDs and the reasoning boundary. **Task:** T1.

### R7 — Hermes/non-Pi compatibility

Non-Pi lookup, output and presentation remain semantically identical; no Hermes, palette/font or managed integration changes are made.

**Acceptance:** `test:pi-model-non-pi-regression` compares old/new non-Pi regex/fallback fixtures and output snapshots exactly, and hashes protected artifacts. **Task:** T3.

### R8 — Unknown/missing model clearing

Missing/invalid/unrecognized/expired or mismatched Pi input clears both model cells on the next successful frame and preserves the agent mark; it never caches the preceding family.

**Acceptance:** `test:pi-model-unknown-clear` covers known→unknown→known, TTL expiry, missing inputs, wrong reference and preserved Pi mark in fresh/stale rows. **Task:** T3.

### R9 — No unrelated-text inference

Names, titles, provider labels, malformed identifiers, other agents and other sessions cannot supply a guessed Pi model.

**Acceptance:** `test:pi-model-suffix-boundaries` supplies family words/old suffix-like text in unrelated fields, near-prefix IDs, trailing slash, whitespace, controls, overlength IDs and foreign references; only a valid selected-ID input can resolve. **Task:** T1.

### R10 — Lifecycle matrix

Startup/reload/new/resume/fork republish fresh state; rename does not change the model; shutdown retires old work. Session replacement cannot reuse an invalid context.

**Acceptance:** `test:pi-title-lifecycle-matrix` covers those paths, name clearing, deferred old callbacks, both reference kinds and server token loss followed by fresh republishing. **Task:** T2.

### R11 — Resource and extension compatibility

Factory/headless/outside-Herdr execution allocates nothing. An eligible session owns one refresh timer and serialized bounded socket work; shutdown releases them without changing the managed extension.

**Acceptance:** `test:pi-title-resource-lifecycle` checks zero factory/rpc/json/print resources, one unrefed timer, missing-environment refusal, repeated shutdown/reload, zero old sockets/timers, and duplicate-publisher/preflight refusal. **Task:** T2.

### R12 — Privacy and payload safety

Only model ID, reference digest, sequence counter and source/host/glyph identities enter feature metadata/evidence. Counter files contain only the last reserved integer. No session file content/path, prompt, transcript, credential, user title or task name is persisted; no payload controls are normalized into another model.

**Acceptance:** `test:pi-title-privacy-controls` uses secret sentinels in forbidden inputs, checks exact allowed payload keys and generic diagnostics, and verifies control/Unicode/length rejection and digest construction. **Task:** T3.

### R13 — Request-free pinned compatibility

Pi 1.0.4 and existing dependencies suffice; selection/readback does not require inference, authentication, discovery, upgrades, process spawning or bot changes.

**Acceptance:** `test:pi-title-no-provider-operations` imports the shipped extension through the installed compatible loader and exercises it with forbidden provider/HTTP/process operations set to throw. **Task:** T3.

### R14 — Failure, ordering and restart recovery

Socket refusal, partial/malformed/oversized replies, timeout, ignored sequences, clock changes and capacity refusals do not hang Pi, invent delivery or resurrect old state. Session loss fails closed; recoverable token loss republishes without a prompt.

**Acceptance:** `test:pi-title-failure-retirement` covers those failures, persistence-before-send, counter-write/rename/crash failures, corrupt/symlink/ownership refusal, reload after TTL expiry, server restart between requests followed by producer crash/reload, delayed old clears, sequence recovery without wall-clock assumptions, server reset, pane-not-found retirement, bounded cleanup and single generic warning. **Task:** T3.

### R15 — Two-host deployment gate

Only an authorized deployer may activate the reviewed consumer first, then the byte-identical global native extension on each host after independent successful preflight. No unrelated files or integrations are altered.

**Acceptance:** `test:pi-logo-deployment-preflight` dry-runs both hosts; missing authority, native Pi, managed reference, model cell, glyph match, token/source capacity, input ownership, active consumer or idle activation safety must refuse mutation. It checks zero-counter provisioning before first activation with prior-publication evidence, refusing initialization without that evidence. Success verifies shipped source hashes and protected files. **Task:** T4.

### R16 — Two-host visible acceptance

On each authorized existing idle native Pi pane, the selected known model's glyph is shown after Pi's mark; changing to an unknown selection removes only the model mark. No prompt/inference/new session/restart is needed.

**Acceptance:** `screenshot:pi-logo-darkseid-and-alghul` requires per-host automated selected-ID/reference/input/output/digest readbacks plus cropped sidebar evidence of adjacency and unknown clearing, in the actual configured visible glyph variant. Existing plain ink is valid. Offline tests are not this acceptance. **Task:** T5.

### R17 — Safe rollback

Remove only the delivered global extension after authorization; activate removal through idle `/reload`, with no session/process restart or interruption. Retire publication, clear/expire ID/ref and preserve the invisible sequence counters, Pi's normal title, existing extensions and Hermes. Keep the fail-closed Pi consumer; never restore whole-title guessing.

**Acceptance:** `test:pi-title-rollback-reload` verifies file ownership, removal/reload discovery, unchanged session/PID/title, immediate successful clear versus failed-clear lease expiry, retained counters and safe reinstall without stale writes. **Task:** T4.

### R18 — Bounded delivery

Deliver one feature through the ordered slices below, each with its own gate; hold live execution until authorized. Do not introduce a metadata service, integration replacement or additional-host rollout.

**Acceptance:** `test:pi-logo-delivery-order` dry-runs missing/failed earlier gates and verifies no consumer/extension activation or live action is reachable until its prerequisites and authority pass. **Task:** T4.

## 6. Delivery order and operational procedure

| Task | Deliverable | Prerequisite | Requirements / fixed gates |
|---|---|---|---|
| T1 | Shipped selected-ID/ref publisher and Pi-only consumer; contract tests | Implementation authority | R1, R2, R6, R9; their automated tests |
| T2 | Complete native lifecycle/serialization; their implementation tests | T1 passes | R3, R4, R5, R10, R11; their automated tests |
| T3 | Compatibility, privacy, expiry, ordering and failure tests | T2 passes | R7, R8, R12, R13, R14; their automated tests |
| T4 | Release/preflight/activation/rollback runbook and dry-run gates | T3 and project CI pass | R15, R17, R18; their automated tests |
| T5 | Authorized host input/output readback and visible acceptance | T4 and per-host live authority | R16; automated readbacks and cropped visual evidence |

Use the project's existing node:test and CI invariant/format/mutation gates. Feature guard mutations must target the shipped entry points and be restored; baseline tests alone do not establish feature acceptance. One model-feature change per PR. Do not publish unexecuted shell snippets as tested procedures; the runbook's exact commands must receive successful safe dry-run receipts before use.

### Host destinations and activation

| Host | Existing linked Radar checkout | Prospective global native extension |
|---|---|---|
| Darkseid | `/Users/42piratas/42labs/herdr-radar-plus` | `/Users/42piratas/.pi/agent/extensions/pi-model-logo.js` |
| Alghul | `/mnt/HC_Volume_106886629/workspace/herdr-radar-plus` | `/home/42piratas/.pi/agent/extensions/pi-model-logo.js` |

Before writes, inventory active native/project/package producers, input/output ownership, managed Pi reference reporting, token/source capacity, active socket protocol, resolved agent key, sidebar model cells and glyph variant. Refuse conflicting producers, existing destination ownership, missing source readback or configuration drift. Do not inspect credentials/transcripts or silently change configuration.

Deliver the reviewed consumer through the approved repository/release path, preserve WIP and verify its active hash/non-Pi fixtures before extension activation. Radar's existing daemon uptake mechanism may be used only under runtime authority; no Pi/bot/service restart. Copy the reviewed extension bytes beside the managed integration and read back their digest and protected-file hashes. Then the operator activates in existing idle native Pi sessions using `/reload`; streaming/compacting sessions wait until safe. Do not start sessions or submit prompts. Treat the two hosts as separate gates: failure on one is not success on both.

Authorized live evidence contains only selected IDs, digests, glyph/input/output values, versions, host/source identities and cropped sidebar state. Never capture full terminal transcripts or secret-bearing logs. Test selection must preserve/restore the operator's original model without inference; if an existing session cannot safely expose the required selection, stop that host's live acceptance and report it unavailable.

Rollback removes/restores only bytes owned by this release, never resets a checkout or reverts unrelated configuration. Consumer rollback, if separately ordered, requires a fail-closed Pi variant rather than reintroducing guessed logos. Retain counters until their pane lifetimes have ended. A failed transport clear is reported as pending TTL expiry, not successful clearing.

**Version:** V2610081008. **Last updated:** 2026-10-08T10:08:50-03:00.
