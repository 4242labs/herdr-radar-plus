# Pi model-logo contract

**Verdict: BLOCKED.** Personal audit has not established full rule compliance. The proposed persistent terminal-title reconciliation requires an explicit operator decision before this can become an execution-ready contract; no implementation or deployment is authorized.

Current task: specification/evidence only. Card `42L-2130`; branch `docs/adhoc-L2130-pi-model-logo-spec`.
Baseline: Radar `0.42.0`, commit `e258108012cc45ac18c8b3e7bb6b5e1dab1b3b2d`; native Pi `1.0.4` on both targets.

## 1. Mandate and authority

Original proposal is preserved byte-for-byte at `evidence/spec.txt`; its source hash is in `evidence/source-manifest.json`. The operator's actual problem is: “we have added the logo of the model being used besides the agents logo. It works for Hermes. It doesnt for PI.” The operator subsequently requested: “Write the specs. Follow every single rule in tortuga/dead-mans-chest/skills/skill-write-specs.md.” The original proposal is design context, not independent operator authorization. Ledger rows labelled “Current mandate” below were inherited from the author's delegation brief, not verbatim operator requirements; their provenance must be corrected before readiness is established. Do not treat either that brief or the Opus report as a new operator mandate.

Granted now: read relevant repository/installed API/primary documentation, read-only source identity checks on the two hosts, isolated offline probes, document/evidence creation in an isolated card-linked worktree and a local documentation commit. Reserved: implementation, reviewer dispatch, deployment, activation/reload of running Pi, changing model selections in live panes, any restart, merge, bot/provider/credential changes. No runtime authority is implicitly granted. Unresolved product decision: whether continuous 250ms terminal-title rewriting is acceptable. A later execution/deployment authorization remains a separate safety gate.

### Obligation ledger

| ID | Source wording/reference | Required outcome | Destination | Status |
|---|---|---|---|---|
| O1 | Original proposal bullet 1: includes selected model in terminal title | Selected model id transported by title; metadata alternative not selected | R1 | resolved |
| O2 | Original proposal bullet 1: preserving session/project name | Preserve Pi title base and naming | R2 | resolved |
| O3 | Original proposal bullet 2: session start | Startup survives later Pi default writer | R3 | resolved |
| O4 | Original proposal bullet 2: restoration | Resume uses session_start, not hypothetical restore model event | R4 | resolved |
| O5 | Original proposal bullet 2: model_select | Set/cycle selected model replaces former brand | R5 | resolved |
| O6 | Original proposal bullet 2: reuse Radar mapping | Reuse existing family keys, glyphs and token pipeline; narrow Pi matching | R6 | resolved |
| O7 | Original proposal bullet 3: Darkseid | Local host installation and separate acceptance gate | R15 | resolved |
| O8 | Original proposal bullet 3: Alghul | SSH host installation and separate acceptance gate | R15 | resolved |
| O9 | Original proposal bullet 3: without changing Hermes | Non-Pi model behavior unchanged | R7 | resolved |
| O10 | Original proposal bullet 3: without hardcoding provider | Never infer Pi model from harness/provider | R6 | resolved |
| O11 | Original proposal bullet 4: unknown models | Unknown/missing model clears model cells | R8 | resolved |
| O12 | Original proposal bullet 4: never guessed | Names/malformed suffixes never infer a brand | R9 | resolved |
| O13 | Original proposal bullet 5: startup tests | Offline automated startup acceptance | R3 | resolved |
| O14 | Original proposal bullet 5: restoration tests | Offline automated resume acceptance | R4 | resolved |
| O15 | Original proposal bullet 5: switching tests | Offline automated set/cycle acceptance | R5 | resolved |
| O16 | Original proposal bullet 5: unknown tests | Automated unknown-to-known and known-to-unknown clearing | R8 | resolved |
| O17 | Original proposal bullet 5: logo beside Pi on both hosts | Distinct glyph/token and cropped visual evidence per host | R16 | resolved |
| O18 | Original proposal bullet 6: remove extension | Removal/reload retires title reconciler | R17 | resolved |
| O19 | Original proposal bullet 6: restore normal title | Default title restored without restarting session | R17 | resolved |
| O20 | Original proposal bullet 6: no upgrades | Installed pinned API only | R13 | resolved |
| O21 | Original proposal bullet 6: no paid model requests | No provider operation in verification/deployment | R13 | resolved |
| O22 | Current mandate: SPECONLY no implementation/reviewer/merge | Only contract/evidence authoring now | R19 | resolved |
| O23 | Current mandate: full canonical skill and linked examples | Whole-rule compliance receipts, no summary-only drafting | R19 | resolved |
| O24 | Current mandate: branch worktree with Linear before edit; preserve WIP | Isolated durable project artifact with custody | R19 | resolved |
| O25 | Current mandate: original proposal versus unvalidated metadata | Evidence-backed title repair; no metadata architecture swap | R1 | resolved |
| O26 | Current mandate: full Opus adjudication against actual sources | F1–F8, U1–U7, T1–T4 and every coverage subcriterion disposition | R19 | resolved |
| O27 | Current mandate: startup/restoration/reload/switch/rename timing | Reconciler accounts for every scoped title-write surface | R10 | resolved |
| O28 | Current mandate: suffix identifier boundary, false matches | Final structured token and anchored id-only family predicate | R9 | resolved |
| O29 | Current mandate: existing extensions and title naming preserved | No competing title-writer adoption; lifecycle only resources | R11 | resolved |
| O30 | Current mandate: safe offline supported sequencing proof | Actual installed host ordering probe plus implementation tests | R3 | resolved |
| O31 | Current mandate: global deployment conventions and authority none | Host-global artifact delivery gated by separate authorization | R15 | resolved |
| O32 | Current mandate: privacy only model/provider not prompts/tokens | Title uses model id only; evidence crops/redacts session content | R12 | resolved |
| O33 | Current mandate: actors/happy/edge/failure/recovery/rollback/observability | Explicit bounded contract and error behavior | R14 | resolved |
| O34 | Current mandate: traceability counts computed, commands executed, hashes/paths sourced | Machine-auditable graph and real command receipts | R19 | resolved |
| O35 | Current mandate: never live acceptance claim from unverified commands | Future live gates stay unexecuted; authoring proof separate | R16 | resolved |
| O36 | Current mandate: executable slices and project sizing | One feature, deterministic slices, no speculative subsystem | R18 | resolved |
| O37 | Current mandate: final verdict all rules attended no placeholders | Single verdict and reconciled ledger, audit receipt | R19 | resolved |

## 2. Boundaries, actors and flows

**Problem/current behavior:** Radar already publishes a model mark from `modelFor(title, agent)` and draws it beside the harness logo. Native Pi default titles contain project/session names, not selected model ids. Whole-title matching can mistake a project/session family word for the selected model. Pi rewrites its title after extension startup/restoration handlers return, and on reload/reset/rename. Existing Pi global extensions are operationally independent; none of the inventoried loose source files writes a title.

**Goal:** each native Pi pane on Darkseid and Alghul has Pi's harness glyph followed by the family glyph of the actual selected model, or no model glyph when it cannot be identified. Preserve existing Hermes/non-Pi behavior and Pi naming.

**Actors:** operator `42piratas` owns authorization and native Pi UI actions; implementing engineer owns future code/tests; authorized deployer acting as `42piratas` owns future host installation/readback; Pi's interactive host owns default-title writes; the new Pi title extension owns reconciliation; Radar daemon/parser owns model glyph tokens; Herdr owns Pi detection and sidebar rendering. No reviewer is authorized for this authoring task.

**Happy path:** authorize future implementation → prove protocol/parser offline → prove installed Pi ordering/lifecycle offline → pass regression/cost/privacy gates → authorize host deployment → preflight active title owners/native installation/Herdr glyph cells → deliver the reviewed Radar parser to each already-linked native plugin checkout and activate only Radar's own plugin daemon through its existing stop/start actions under separate authority → verify strict Pi parser in the active plugin and non-Pi regression readbacks → copy the same reviewed extension bytes globally to each host → operator activates via idle `/reload` without a restart or prompt → extension reads synchronous selected model id and current session/project names → publishes structured title → Radar decodes only the Pi model suffix and selects an existing family/glyph → Herdr renders existing `$model` beside existing Pi `$logo` → separately authorized token readback and cropped host screenshots demonstrate adjacency.

**Edge path:** unknown or absent model produces the explicit empty suffix; parser returns null and Radar clears model/model_stale, preserving Pi glyph. Names such as `opus-project`, `qwen-research`, `gpt-notes`, and embedded suffix-looking text do not participate in model classification. Rename/name clearing, new/fork/resume/reload repeat the same fresh-value path. Non-TUI factory/session load allocates nothing.

**In scope:** one native Pi global title extension; narrowly scoped Pi-only parsing/family predicates in existing Radar model mapping; offline tests; deployment/rollback/preflight runbook for the two named hosts; contract/evidence artifacts. A single feature unit, not a new platform.

**Out of scope:** metadata-channel replacement, Pi internals/monkey patches, Hermes producers/configuration, other harness behavior, fonts/marks/palette redesign, provider/auth/model installation or upgrades, paid/inference requests, Telegram/ccgram/NightWatch/bot work, new Pi sessions, service/Pi restarts, auto-deployment, other hosts, upstream fixes outside the model feature, reviewer dispatch or merge. Windows is not a target.

**Repositories/modules/interfaces/data/documents:** `4242labs/herdr-radar-plus`: future `extensions/pi-model-title.js`, Pi-only branch of `lib/logos.js`, new node:test cases and README/CHANGELOG integration/runbook. Existing `lib/state.js`/`lib/managed-config.js` pipelines are consumed, not rebuilt. Pi installed distributions are read-only dependencies, not patch targets. New protocol is terminal-title text; payload is selected model id only. Current documentation artifact location is `specs/pi-model-logo/`; this project has no prior tracked specs location or AGENTS convention, so this location is explicitly established here.

**Dependencies/prerequisites:** installed supported Pi API (verified), Radar family/glyph/token pipeline (verified), pinned Node requirements from package manifests (Radar >=18; Pi >=22.19.0). Actual host activation additionally requires native interactive Pi, correct Herdr Pi detection, matching managed model cells/glyph variant, no competing active title writer, idle safe reload and separate operator authority. Preflight failure prevents writes/activation; it does not silently fix unrelated configuration.

**Assumptions:** none used as execution facts. The full configured/project-local extension set and live sidebar/detection state were deliberately not collected from private runtime context. They are explicit deployment gates, with refusal behavior; READY does not claim live prerequisites passed.

**Security/privacy/cost:** no credential/session/transcript access; title data and evidence are model-id/source identity only, with cropped/redacted visual evidence. Encode model id, remove terminal controls from base strings, never log names/prompts/tokens. Existing dependencies only. Four title writes per second per active TUI session is the defined reconciliation overhead; no network/process/font query in extension. No costs beyond that local callback/OSC traffic, no inference/auth calls. No telemetry service.

**Operational impact:** title contains a visible versioned model-id suffix; sidebar still uses existing cells. All ordinary title naming is retained. During an initialization/replacement default-title overwrite, the suffix returns on the next scheduled callback after the final host write. Event-loop stalls can delay callbacks: no absolute wall-clock SLA is asserted. Unconditional reconciliation is intentional because supported Pi API has no readable title/ownership slot; suppressing unchanged writes would fail to recover a same-model host overwrite.

**Failure/degraded/recovery:** malformed/missing model suffix or id returns null. Cancel existing resources before rebinding; invalidated-context read failure retires that session's reconciler. Terminal-write failure retires the timer and emits at most one generic warning without values or stack. Pi remains usable with its host-managed title; next safe explicit reload/rebind recovers, not provider retry or restart. A terminal that rejects writes cannot be promised a repaired title; host reset is the fallback. No unauthorized automatic reload. Competing active title writers fail preflight and must be resolved by the operator outside this change, not silently overridden.

**Rollback:** remove only the new global extension file, then invoke `/reload` in each affected idle native Pi session under separate authorization. Streaming/compacting sessions wait until idle; never restart/interrupt. `session_shutdown` clears the old timer idempotently and writes the normal sanitized Pi title while context is still valid; installed host reset also restores that title. Reload cannot rediscover the removed file. Keep the narrow fail-closed Pi parser so a default title containing `opus`/`qwen` is not mistaken for a model. Do not revert glyph/font/sidebar/Hermes/other extension state. For an interrupted deployment restore/remove only the extension bytes added by this release, preserve all other files, and verify per-host hash/absence before activation or rollback. No whole-repo reset.

### Future deployment targets and ordering

| Host | Verified linked Radar checkout | Native global extension destination (new file, prospective) |
|---|---|---|
| Darkseid | `/Users/42piratas/42labs/herdr-radar-plus` | `/Users/42piratas/.pi/agent/extensions/pi-model-title.js` |
| Alghul | `/mnt/HC_Volume_106886629/workspace/herdr-radar-plus` (same tree as `/home/42piratas/42labs/herdr-radar-plus`) | `/home/42piratas/.pi/agent/extensions/pi-model-title.js` |

`evidence/darkseid-plugin-list.json`, `evidence/alghul-plugin-list.json` and `evidence/alghul-checkout-identity-retry.json` are successful read-only source/link receipts, not deployment receipts. Both checkouts currently report the baseline head. Future deployment must preserve checkout WIP, use the approved reviewed Radar release flow (never copy a worktree over main or reset unrelated changes), and verify the active linked parser's digest. Only after strict Pi parsing is loaded may the title extension be activated; otherwise the old whole-title mapper can select the wrong brand. Radar's documented plugin `state-stop`/`state-start` actions are for its own daemon, not Pi/bots/services. They require separate runtime authorization; no such action was invoked while writing this contract. If active parser uptake cannot be demonstrated, stop before extension activation. Missing sidebar setup is a preflight refusal, not authorization to repair user configuration.

**Observability:** offline assertions cover final title, suffix, family, glyph tokens, timer count and zero forbidden API calls. Future host receipts record source digest, pinned package version, active native mode, Pi/model glyph values, model id and glyph variant, plus cropped sidebar adjacency; no full pane transcripts, raw task titles, session names, credentials or secret-bearing logs. Generic warning only on extension failure, once per session generation.

## 3. Evidence ledger

All `E` sources below are local relative evidence files, with original absolute paths and full-file SHA256 values in `evidence/source-manifest.json`. Primary upstream retrieval is timestamped separately. The whole Opus report is retained without presenting unverified snapshot claims as live facts.

| ID / claim | Source | Observed evidence | Status |
|---|---|---|---|
| E1 Existing mapping scans whole title; no Pi fallback | source-excerpts, radar-logos | `modelFor` scans MODEL_FAMILIES regexes and only claude/codex/gemini have fallback | verified |
| E2 Supported title/model/mode/naming APIs; literal π | source-excerpts, pi-types/pi-config/pi-title/pi-runner | UI setTitle; mode tui; model getter; read-only session getters; title π and preserved name/cwd shape | verified |
| E3 Startup/resume default-title clobber and cleanup | source-excerpts, pi-title/pi-runtime/pi-switch | awaited extension bind followed by host updateTerminalTitle; reload emits shutdown before invalidating old runner; reset/title restore | verified |
| E4 Selected model event semantics | source-excerpts, pi-runtime/pi-types | set/cycle emit after model assignment; same-model event suppressed; restore exists in type but not installed emit sites | verified |
| E5 Existing token/sidebar/family glyph pipeline | source-excerpts, radar-state/radar-sidebar | state uses modelFor→logoFor; model/model_stale cell already follows harness glyph cells | verified |
| E6 No title-ownership bookkeeping; old resources retire | source-excerpts, pi-title/pi-runtime/pi-runner | direct setTitle passthrough; runner contexts assert active; shutdown precedes invalidation | verified |
| E7 Terminal transport does not sanitize automatically | installed pi-tui/dist/terminal.js:421-424 | OSC title is interpolated into process.stdout; suffix encoding/base control stripping required | verified |
| E8 Host/version/global-convention identity | darkseid-read-only.json; alghul-read-only.json; pi-loader | Darwin/Linux; native Pi1.0.4; same title-source hash; discover global extensions; loose existing sources lack title writes | verified |
| E9 Offline safe sequencing probe | probe-title-order.mjs and probe-title-order-output.json | actual installed host methods clobber then periodic callback repairs; fresh reads and cancellation assertions passed; no live session/provider | verified |
| E10 Lifecycle guidance | official-doc-retrieval.json; installed docs/extensions.md:58,60,251,262 | no factory timers, session resources, tui guard, idempotent shutdown cleanup | verified |
| E11 Original quick proposal ready unchanged | spec.txt + formal-review.json | F1/F3 demonstrated flaws require repair; original straight-through design cannot meet all bullets | contradicted |
| E12 Live managed sidebar/detection and all active package/project title owners | deployment gate R15, not claimed as source fact | intentionally unexecuted runtime preflight; must pass before any host write | unknown; not asserted |
| E13 No pre-existing canonical specs/AGENTS/sizing limits | evidence/ground-truth.md; CONTRIBUTING.md | no tracked AGENTS/specs; one-change-per-PR and green CI are project rules; no numerical sizing limit declared | verified |

### Decisions resolved inside the existing mandate

- **D1:** repair the original title-based transport, not the challenged metadata alternative. Extension emits model id only; Radar emits existing glyph. This keeps the shipped channel and avoids Pi importing Radar's glyph/font/CommonJS dependency graph. No operator architecture choice remains.
- **D2:** one 250ms unrefed, session-scoped reconciliation timer plus immediate event refresh. A deferred one-shot is not enough because later extension/resource awaits can extend bind beyond any chosen delay. Supported public UI APIs and lifecycle handlers only; actual installed host-method probe is the feasibility receipt. This local implementation detail is the smallest supported reliable repair without modifying Pi or creating a metadata service.
- **D3:** keep legacy non-Pi mapping byte-for-byte semantically; require Pi's final structured suffix and strict anchored id-only predicates in the existing MODEL_FAMILIES registry, reusing family keys/glyphs/tokens. Do not add Pi to MODEL_FALLBACK. No whole-title match for Pi.
- **D4:** global native Pi extension directories on both hosts, following existing conventions; activation and full active-resource inventory remain explicit authorized deployment gates. No runtime change during authoring.

## 4. Exact title protocol and supported sequencing

**Title:** sanitized installed default base + literal ` | pi-model:v1=` + `encodeURIComponent(ctx.model?.id ?? '')`. The suffix is always present while enabled, including the empty payload for missing model. Emit one suffix per fresh composition; never append to a prior published title. The project/session strings may contain literal protocol-like text; parsing selects only the final suffix (greedy base, end anchored), and missing-model empty final suffix wins over text embedded earlier. Provider name, display name, prompt and session path are not payload inputs. A missing/non-string id or an id that cannot be percent encoded uses the empty payload, never a cached prior id; malformed selected-model metadata therefore clears the model mark rather than retaining it. Base strips C0/C1 controls (`U+0000–001F`, `U+007F–009F`) to prevent OSC/BEL injection while retaining ordinary Unicode/name separators.

**Pi parser:** only when resolved Radar agent key is `pi`. Require exact final separator/version; reject trailing text/whitespace, invalid percent escapes, noncanonical encoding (round-trip encode must equal payload), decoded controls, and malformed input. Empty decoded id returns null. No matching of prefix, provider or whole title. Before family matching, take the last slash-delimited nonempty identifier component; a trailing slash/empty leaf is unknown. No Unicode normalization or identifier rewriting beyond percent decoding and the explicit namespace leaf selection. Arbitrary terminal-title forgery by another writer is not an authenticity/security guarantee; it is why competing writers are an explicit deployment gate.

**Family predicates:** extend each existing family row with the strict Pi predicate below, leaving its legacy regex untouched. Use case-insensitive ASCII identifier starts. Boundary after alias is end-of-id or one of digit, hyphen, dot or underscore. Aliases remain from the existing table; numeric model suffixes (such as Qwen3) are explicit rather than accidentally excluded by a word boundary. GPT's reasoning alias is `o[1-9]` with end/hyphen/dot/underscore boundary, so `o10` is not guessed. Each family has its existing glyph key; select only exactly one matching family, otherwise null.

| Existing key | Pi identifier-start aliases | Positive fixtures | Negative fixtures |
|---|---|---|---|
| claude | claude, opus, sonnet, haiku, fable | claude-sonnet-4; opus-4; anthropic/claude-opus-4 | my-claude; claudelike |
| gpt | gpt, codex; reasoning o[1-9] with non-digit boundary | gpt-5; codex-mini; o3; o1-preview | notgpt; project-o3; o10 |
| gemini | gemini | gemini-2.5-pro | mygemini |
| deepseek | deepseek | deepseek-r1 | notdeepseek |
| qwen | qwen | Qwen3-Coder-Next-80B-A3B; qwen-2.5 | qwenish; project-qwen |
| grok | grok | grok-4 | groklike |
| glm | glm | glm-4.5 | glmlike |
| kimi | kimi, moonshot | kimi-k2; moonshot-v1 | kimono; moonshotlike |

Fixtures are parser contracts derived from existing family aliases, not claims that these models are installed or universally supported. If an id does not match this explicit contract, omit the model mark; never use provider or model display name to guess.

**Extension:** standalone dependency-free JS compatible with Pi's loader, stored prospectively at `extensions/pi-model-title.js`. Export Pi extension factory that only registers session_start, model_select, session_info_changed and session_shutdown. In session_start, first retire the previous generation; if mode != tui return without writes/timers. Set current context, immediate apply, then allocate exactly one unrefed 250ms interval. Each tick reads model/sessionManager live, composes one fresh title and calls supported ui.setTitle, even if data is unchanged. model_select/session_info_changed immediate apply use current valid context. On session_shutdown, cancel timer before any read; restore sanitized normal base while supported context is valid; clear context/generation and warning state. Cancellation is idempotent; stale scheduled callbacks check generation before context access. No timers in factory and no custom TUI/terminal internals, injected default-title method, monkey patch, provider API, subprocess or glyph import.

**Why not setTimeout(0):** runner awaits each handler, then resource discovery; host writes default after binding returns. Another handler or discovery can wait on I/O after the first scheduled callback. Proof uses a delayed bind longer than the first 250ms tick and exercises the installed default writer. The periodic callback recovers regardless of that delay once Pi's final scoped writer settles, without claiming a nonexistent post-bind extension event.

## 5. Requirements and fixed verification

All tests below are **required future implementation tests**, not existing passed tests. Stable `test:` labels are acceptance identities, not runnable file-path claims. T1/T2/T3 must implement these cases using existing node:test, fake public UI/model/session collaborators and installed-source order fixtures. `cmd:spec-audit` is runnable now with exact working directory in §7. Visual adjacency is the only screenshot-dependent criterion; metadata and all other behavior are runnable assertions.

### R1 — Title transport

Pi interactive session; selected ctx.model.id; on each apply, append exactly one versioned model suffix to the default title base. Missing model uses an empty suffix. The extension emits no glyph and uses no pane model metadata API.

**Acceptance:** `test:pi-title-protocol` asserts the stated observable result and failure/edge clauses. **Authority/evidence:** E2,D1,O1,O25. **Delivery:** T1. **Status:** specified; implementation not executed.

### R2 — Preserved naming

Pi operator; any nonempty/cleared session name or project basename; default prefix remains π and name/cwd order exactly follows installed Pi. Preserve ordinary Unicode and delimiters; strip terminal control characters only. Never derive names from prompts or transcript.

**Acceptance:** `test:pi-title-naming` asserts the stated observable result and failure/edge clauses. **Authority/evidence:** E2,O2. **Delivery:** T1. **Status:** specified; implementation not executed.

### R3 — Startup after host overwrite

Pi interactive startup; after every Pi default write in the bind path settles, the next session-scoped reconciliation callback publishes the currently selected id, including when another extension delays bind beyond the first callback. No fixed one-shot timeout is sufficient.

**Acceptance:** `test:pi-title-startup-order` asserts the stated observable result and failure/edge clauses. **Authority/evidence:** E3,E9,D2,O3,O13,O30. **Delivery:** T2. **Status:** specified; implementation not executed.

### R4 — Restored selection

Pi operator resumes a session; retire previous reconciler, read restored ctx.model from the new session_start context, publish that id after the replacement host default write. Do not depend on model_select source restore.

**Acceptance:** `test:pi-title-resume` asserts the stated observable result and failure/edge clauses. **Authority/evidence:** E3,E4,O4,O14. **Delivery:** T2. **Status:** specified; implementation not executed.

### R5 — Model switch

Pi operator selects/cycles a model without submitting a prompt; model_select reads fresh context after Pi assignment, replaces the suffix, and Radar replaces/clears the previous model glyph. Re-selecting the same model leaves state unchanged.

**Acceptance:** `test:pi-title-model-switch` asserts the stated observable result and failure/edge clauses. **Authority/evidence:** E4,O5,O15. **Delivery:** T2. **Status:** specified; implementation not executed.

### R6 — Known family resolution

Radar receives a Pi title with a valid final suffix; decode only selected model id and match one anchored known-family predicate at the leaf identifier start. Existing glyph table and state token pipeline remain authoritative. Provider/harness alone never supplies a Pi model brand.

**Acceptance:** `test:pi-model-known-families` asserts the stated observable result and failure/edge clauses. **Authority/evidence:** E1,E5,D3,O6,O10. **Delivery:** T1. **Status:** specified; implementation not executed.

### R7 — Hermes/non-Pi compatibility

Radar receives any non-Pi agent/title pair; modelFor return remains exactly the old behavior, including existing fallbacks and regex priority. No Hermes code/config/title producer or palette/font assets change.

**Acceptance:** `test:pi-model-non-pi-regression` asserts the stated observable result and failure/edge clauses. **Authority/evidence:** E1,D3,O9. **Delivery:** T3. **Status:** specified; implementation not executed.

### R8 — Unknown/missing model clearing

Radar Pi row transitions from a recognized id to missing, empty or unrecognized id; model and model_stale cells clear, Pi agent mark remains. No previous-family caching, provider fallback or neutral guessed model glyph.

**Acceptance:** `test:pi-model-unknown-clear` asserts the stated observable result and failure/edge clauses. **Authority/evidence:** E1,E5,O11,O16. **Delivery:** T3. **Status:** specified; implementation not executed.

### R9 — No name-derived model

Radar Pi row with misleading family words in session/project/provider/title prefix, malformed percent encoding, extra trailing text, or no final suffix; returns no model family. A genuine final suffix alone is authoritative; older embedded suffix-like text in names is not.

**Acceptance:** `test:pi-model-suffix-boundaries` asserts the stated observable result and failure/edge clauses. **Authority/evidence:** E1,D3,O12,O28. **Delivery:** T1. **Status:** specified; implementation not executed.

### R10 — All scoped lifecycle writes

Pi reload, new session, fork, resume and rename/name clearing; title reconciles fresh model/name/cwd on the next callback after host write, and session_info_changed/model_select immediately apply using live values. Never reuse an invalidated context. Windows is out of scope because targets are Darwin/Linux.

**Acceptance:** `test:pi-title-lifecycle-matrix` asserts the stated observable result and failure/edge clauses. **Authority/evidence:** E2,E3,E4,E8,O27. **Delivery:** T2. **Status:** specified; implementation not executed.

### R11 — Resource/extension compatibility

Pi extension factory loads in any mode; creates no timer. Only session_start in mode tui allocates one unrefed 250ms timer. session_shutdown cancels it idempotently before invalidation; next session starts only its own timer. Deployment refuses unresolved other active title writers rather than fighting them; all other extension files/behavior stay untouched.

**Acceptance:** `test:pi-title-resource-lifecycle` asserts the stated observable result and failure/edge clauses. **Authority/evidence:** E6,E8,D2,O29. **Delivery:** T2. **Status:** specified; implementation not executed.

### R12 — Privacy and terminal safety

Pi/Radar test/deployment evidence uses only model identifiers, glyph/token values, source/package identities and redacted host metadata. No prompt, transcript, auth file, token/secret, raw user title/session name is persisted. Model id is percent encoded; control characters cannot terminate OSC.

**Acceptance:** `test:pi-title-privacy-controls` asserts the stated observable result and failure/edge clauses. **Authority/evidence:** E2,E7,O32. **Delivery:** T3. **Status:** specified; implementation not executed.

### R13 — Pinned, request-free execution

Implementer/tests and later deployer use Pi 1.0.4 and Radar 0.42.0 baseline, existing dependencies and synchronous ctx.model. No package upgrades, provider discovery/auth/request, inference, bot changes or live prompt are needed; forbidden dependencies are mocked to throw in offline tests.

**Acceptance:** `test:pi-title-no-provider-operations` asserts the stated observable result and failure/edge clauses. **Authority/evidence:** E2,E4,E8,O20,O21. **Delivery:** T3. **Status:** specified; implementation not executed.

### R14 — Failures and observability

Reconciler metadata getter failure retires timer rather than touching invalid context; a write failure stops timer and gives one generic UI warning without model/name/stack contents. Explicit successful reload/rebind is recovery. Known-to-unknown normally clears immediately; host reset supplies default after teardown. No telemetry service or prompt/state logs are added.

**Acceptance:** `test:pi-title-failure-retirement` asserts the stated observable result and failure/edge clauses. **Authority/evidence:** E3,E6,O33. **Delivery:** T3. **Status:** specified; implementation not executed.

### R15 — Both-host global delivery gate

Authorized deployer on Darkseid and Alghul separately verifies active extension resources/no competing title owner, native pinned Pi, Herdr Pi detection, managed model cells and matching resolved glyph variant. Deliver and activate the reviewed strict Pi-only Radar parser in each existing linked checkout first; read back its hash and passing protocol/non-Pi fixture assertions before any extension activation. Then install byte-identical reviewed extension into each discovered native global extension directory, not wrapper/bot/project-local copies. No activation/restart/write authorized by this specification-authoring task.

**Acceptance:** `test:pi-logo-deployment-preflight` asserts the stated observable result and failure/edge clauses. **Authority/evidence:** E5,E8,O7,O8,O31. **Delivery:** T4. **Status:** specified; implementation not executed.

### R16 — Both-host visible acceptance

After separate live-test authorization, operator/deployer verifies an idle native Pi pane on each host with one known selected family and its existing configured glyph variant: Pi harness mark followed by the selected-family model mark in managed Agents row. Unknown clears only model mark. Model selection is request-free; no new session/restart/prompt required. Metadata assertion is automated and one cropped screenshot per host establishes adjacency; no brand hue beyond existing palette is required.

**Acceptance:** `screenshot:pi-logo-darkseid-and-alghul` asserts the stated observable result and failure/edge clauses. **Authority/evidence:** E5,E8,O17,O35. **Delivery:** T5. **Status:** specified; implementation not executed.

### R17 — Safe rollback

Authorized deployer removes only the added extension file; operator invokes idle /reload (if streaming/compacting, wait, never interrupt/restart). Old session_shutdown clears timer and restores normal sanitized Pi base via supported ui.setTitle; removing file prevents rediscovery. Session/PID and all pre-existing extensions remain. Retain Pi fail-closed Radar parser so default title has no guessed mark. No undo of sidebar/font/Hermes/credentials.

**Acceptance:** `test:pi-title-rollback-reload` asserts the stated observable result and failure/edge clauses. **Authority/evidence:** E2,E3,E6,O18,O19. **Delivery:** T4. **Status:** specified; implementation not executed.

### R18 — Bounded delivery

Implementer delivers protocol/mapping with tests, extension with lifecycle tests, regression/failure gates, then deployment/rollback runbook, then separately authorized host checks. Each preceding slice has an independent offline acceptance gate; later live execution is explicitly held. No new metadata service, provider integration, family-logo/font rebuild or fleet rollout outside the two hosts.

**Acceptance:** `test:pi-logo-delivery-order` asserts the stated observable result and failure/edge clauses. **Authority/evidence:** D1,D3,O36. **Delivery:** T4. **Status:** specified; implementation not executed.

### R19 — Specification-only handoff

Author emits a durable project specification, source/decision/obligation/requirement/task/check graph, full rule receipts and a single readiness verdict, with all counts recomputed and no invented execution results. Branch/card custody exists before document edit; original main/WIP remains intact; no implementation/reviewer/merge/deploy.

**Acceptance:** `cmd:spec-audit` asserts the stated observable result and failure/edge clauses. **Authority/evidence:** O22,O23,O24,O26,O34,O37. **Delivery:** T0. **Status:** specified; implementation not executed.

### Test matrix and unambiguous expected values

- Startup tests include Pi default write immediately after bind and a delayed later extension/resource path; final title after next reconciliation tick must contain only the live selected id, not the project family word. Never assert a fixed setTimeout is the post-bind event.
- Resume tests change both model and names from prior session, retire stale callbacks before invalidation, exercise host reset before new bind and final host overwrite after it. No fake model_select restore emission.
- Lifecycle matrix covers startup/reload/new/resume/fork, rename/name clearing, set/cycle/same-model selection, repeated startup/shutdown, stale callback after generation replacement, and non-TUI rpc/json/print guards.
- Model tests cover every family row, names containing every family alias, embedded older suffix, empty final suffix, no suffix, invalid/truncated percent escape, unsupported version, trailing data, controls/Unicode, namespace leaf, near-prefix names, unknown and known→unknown token clearing. Run both font and text mappings; variant none intentionally emits no logos and is not the live visibility acceptance configuration.
- Hermes and each old non-Pi fallback/title fixture must compare old/new return values exactly; no palette or font changes. State composition tests preserve Pi logo and clear both fresh/stale model tokens; managed-config snapshot confirms model cell remains after harness cell. A GPT/grok/glm mark in plain ink is accepted existing behavior, not a hue defect.
- Resource tests assert zero factory timer, one unrefed timer in tui, no rpc/json/print title write, no timers after reload/shutdown/error, no invalidated-context read, and normal title restoration. Forbidden provider/registry/auth/HTTP/process APIs are mocked to throw; no prompts or new sessions are used.
- Preflight/runbook tests model two independent hosts, missing native Pi, wrong version, mismatched glyph variant, no managed model cell, non-Pi detection, other active title writer and missing authority. All fail closed before any mutation. Successful simulated preflight records both host digests and preserves every unrelated extension/file. Actual host preflight must re-validate drift immediately before a later authorized deployment.
- Live evidence is separately authorized: request-free native model selection only in existing idle sessions; no prompt/inference. Automated token and byte-digest readbacks are prerequisites to cropped sidebar screenshots on both hosts. If idle access or any precondition is unavailable, record deployment blocked and leave host state untouched; do not claim completion from offline mocks.

## 6. Source disposition

The separate evidence ledger `evidence/finding-adjudication.md` adjudicates every source claim against current installed/repository evidence; `evidence/review-adjudication.json` maps all source coverage obligations to the requirements below. These files are authoring receipts, not part of the implementation behavior contract. No unresolved execution-critical source dispute remains.

## 7. Delivery trace and commands

| Requirement | Evidence/decision | Delivery task | Verification | Status |
|---|---|---|---|---|
| R1 | E2,D1,O1,O25 | T1 | `test:pi-title-protocol` | specified; live/implementation acceptance unexecuted |
| R2 | E2,O2 | T1 | `test:pi-title-naming` | specified; live/implementation acceptance unexecuted |
| R3 | E3,E9,D2,O3,O13,O30 | T2 | `test:pi-title-startup-order` | specified; live/implementation acceptance unexecuted |
| R4 | E3,E4,O4,O14 | T2 | `test:pi-title-resume` | specified; live/implementation acceptance unexecuted |
| R5 | E4,O5,O15 | T2 | `test:pi-title-model-switch` | specified; live/implementation acceptance unexecuted |
| R6 | E1,E5,D3,O6,O10 | T1 | `test:pi-model-known-families` | specified; live/implementation acceptance unexecuted |
| R7 | E1,D3,O9 | T3 | `test:pi-model-non-pi-regression` | specified; live/implementation acceptance unexecuted |
| R8 | E1,E5,O11,O16 | T3 | `test:pi-model-unknown-clear` | specified; live/implementation acceptance unexecuted |
| R9 | E1,D3,O12,O28 | T1 | `test:pi-model-suffix-boundaries` | specified; live/implementation acceptance unexecuted |
| R10 | E2,E3,E4,E8,O27 | T2 | `test:pi-title-lifecycle-matrix` | specified; live/implementation acceptance unexecuted |
| R11 | E6,E8,D2,O29 | T2 | `test:pi-title-resource-lifecycle` | specified; live/implementation acceptance unexecuted |
| R12 | E2,E7,O32 | T3 | `test:pi-title-privacy-controls` | specified; live/implementation acceptance unexecuted |
| R13 | E2,E4,E8,O20,O21 | T3 | `test:pi-title-no-provider-operations` | specified; live/implementation acceptance unexecuted |
| R14 | E3,E6,O33 | T3 | `test:pi-title-failure-retirement` | specified; live/implementation acceptance unexecuted |
| R15 | E5,E8,O7,O8,O31 | T4 | `test:pi-logo-deployment-preflight` | specified; live/implementation acceptance unexecuted |
| R16 | E5,E8,O17,O35 | T5 | `screenshot:pi-logo-darkseid-and-alghul` | specified; live/implementation acceptance unexecuted |
| R17 | E2,E3,E6,O18,O19 | T4 | `test:pi-title-rollback-reload` | specified; live/implementation acceptance unexecuted |
| R18 | D1,D3,O36 | T4 | `test:pi-logo-delivery-order` | specified; live/implementation acceptance unexecuted |
| R19 | O22,O23,O24,O26,O34,O37 | T0 | `cmd:spec-audit` | specified; live/implementation acceptance unexecuted |

### Ordered independently verifiable slices

| Task | Deliverable | Depends on | Requirement ownership | Gate |
|---|---|---|---|---|
| T0 | Specification and audited evidence handoff only (current authorization) | none | R19 | all mapped acceptance methods |
| T1 | Pi suffix formatter and strict Pi-only family parser; existing non-Pi semantics preserved | T0 | R1,R2,R6,R9 | all mapped acceptance methods |
| T2 | Session-scoped supported-title reconciliation extension and lifecycle proof | T1 | R3,R4,R5,R10,R11 | all mapped acceptance methods |
| T3 | Non-Pi/unknown/privacy/cost/failure regression gates | T2 | R7,R8,R12,R13,R14 | all mapped acceptance methods |
| T4 | Both-host preflight, install and rollback runbook; implementation release is held pending authorization | T3 | R15,R17,R18 | all mapped acceptance methods |
| T5 | Separately authorized request-free host readback and cropped visual acceptance | T4 | R16 | all mapped acceptance methods |

T0 is the current authorized documentation outcome. T1–T4 are prospective, independently offline-verifiable delivery slices of one model-feature change; they need implementation authorization first. T5 needs additional live/deployment authority. No task is a spare/orphan future subsystem. Project has no declared numerical sizing limit; CONTRIBUTING requires one change per PR, which this single feature satisfies. Existing open runtime PRs must be conflict-checked before implementation; authoring does not alter their files.

**Runnable authoring checks (all executed; receipts in evidence):**

Working directory `/Users/42piratas/42labs/herdr-radar-plus/.worktrees/docs/adhoc-L2130-pi-model-logo-spec`:

```sh
python3 specs/pi-model-logo/evidence/audit-spec.py
node specs/pi-model-logo/evidence/probe-title-order.mjs
npm test
npm run check
npm run prove
```

These commands do not install/upgrade/start Pi or make a provider request. The probe imports actual installed Pi methods with offline collaborators; it is a feasibility check, not the shipping extension. Test/prove receipts distinguish existing baseline passes from future feature tests. Formatter gate is run using the already-installed local Prettier binary; no package installation is performed. No untested deploy/restart/remove commands are published as if verified; deployment/rollback are exact bounded procedures above, and T4 must produce/run safe dry-run tests before any operator-authorized mutation.

## 8. Authoring verdict, audit and limits

**BLOCKED:** the author must correct obligation provenance and personally verify remaining rule receipts; the operator must decide whether to accept the proposed persistent 250ms terminal-title reconciliation. Structural/probe checks passed, but they do not establish semantic compliance, independent approval or implementation acceptance. Do not begin implementation from this draft.

Readiness counts are machine-computed in `traceability.json` and verified by `evidence/audit-spec.py`: 37 obligations; 19 requirements; 19 distinct verification methods; 6 delivery tasks. These inherited counts describe the current draft graph, not a verified operator-obligation ledger. Their source classifications and compliance claims remain under personal audit. Deployment authority and live acceptance remain withheld.

Rule-by-rule receipts: `rule-compliance.md`; adversarial whole-document sweep and command/readback receipts: `evidence/audit-output.json` and final checks evidence. Source and original-report provenance: `evidence/source-manifest.json`, `evidence/ground-truth.md`. No persistent runtime source edits or external deployment occurred. The baseline mutation-proof command temporarily rewrites its fixtures/source and reports restoration; final source digests and main status are rechecked.

**Version:** V2610072244. **Last updated:** 2026-10-07T22:44:52-03:00. Personal audit supersedes the inherited READY claim; this draft is BLOCKED.
