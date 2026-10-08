# Fresh source-first compliance pass

Scope: re-amend and personally verify the existing contract, not implement/deploy it. Prior pass violated AM03: filesystem support was checked after the counter draft. That history remains NONCOMPLIANT; the following pass does not retroactively repair it.

| Finding | Claim | Planned correction | Destination | Status |
|---|---|---|---|---|
| A7 | Prior all-rules claim concealed verify-after-write chronology | Preserve historical failure; re-read current contract, full review, primary docs, live schemas/code and template before reissuing; rerun final checklist | Compliance receipts, adjudication, versioned contract | RESOLVED in fresh pass; prior violation remains |
| F6 adjacency | Current ledger says only net/crypto while the current contract also uses built-in fs/path | Correct both human and machine ledger descriptions; no dependency or feature change | Finding ledgers | Evidence verified before amendment |

Existing finding dispositions, rechecked against full report and fresh source:

| ID | Status | Claim | Change | Evidence |
|---|---|---|---|---|
| F1 | RESOLVED | Pi overwrites startup/restoration extension titles | Zero-title metadata transport; R1–R4 | pi-output.json: title writer/bind/reset; socket.mdx: metadata API |
| F2 | RESOLVED | Restoration cannot rely on a restore model event | Fresh session_start context; R4,R10 | pi-output.json: session_start reasons and public model getter; no restore emit claimed |
| F3 | RESOLVED | Whole-title family matching guesses from names | Pi-only ID/ref consumer; R6,R8,R9 | source-output.json: state 263–320,474–475; logos 247–262 |
| F4 | RESOLVED | Mapping reuse alone does not provide coverage | Dedicated shipped family/boundary/clear tests and guard mutation; R6,R8,R9 | source-output.json: registry/output path; historical snapshot absence not asserted as current test census |
| F5 | DISPUTED | Uncolored glyphs may be mistaken for wrong glyphs | Do not redesign palette; require exact existing variant/adjacency; R16 | source-output.json: managed-config 353–379,439–456; palette 78–88,97–114 |
| F6 | RESOLVED | Radar imports in Pi could trigger font subprocess/module coupling | Only built-in net/crypto/fs/path in producer; R1,R13 | source-output.json: glyph owner; pi-output.json: public model getter |
| F7 | RESOLVED | Unkeyed title ownership/reload conflict | No title API calls; session resource generation/cleanup; R2,R10,R11,R17 | pi-output.json: title passthrough/reset; extensions.md 58–60,251,262–263 |
| F8 | DISPUTED | Windows title restoration may overwrite model title | No title writer; Windows excluded; no Windows scope added | pi-output.json: OS Darwin; alghul identity Linux; original Windows claim treated as historical |
| U1 | RESOLVED | Direction of glyph-mapping reuse ambiguous | Pi emits ID/ref; Radar alone resolves glyphs; R1,R6 | source-output.json: family registry and output token pipeline |
| U2 | RESOLVED | Default title literal missing in supplied snapshot | Host title left untouched; no literal reconstruction; R2 | pi-output.json: host title composition |
| U3 | RESOLVED | Title suffix location ambiguous | No suffix; exact metadata ownership/wire; R1,R9 | socket.mdx 751–769; schema-fields.json |
| U4 | RESOLVED | Live sidebar/variant unknown | Runnable preflight plus actual host gate retained; R15,R16; not claimed passed | source-output.json: managed-config 376–379,439–456 |
| U5 | RESOLVED | Actual Pi detection unknown | Authoritative Pi/session reference preflight and host acceptance; R15,R16; not claimed passed | schema-fields.json and schema-fields-alghul.json: AgentInfo/AgentSessionInfo |
| U6 | RESOLVED | Extension discovery destination undecided | Native global directories; R15,R17 | pi-output.json: global managed extension; alghul-paths.json |
| U7 | RESOLVED | Partial reviewer tree and no extension artifact | Actual source re-read; new artifact explicitly prospective; R13,R15 | source-output.json, identity.json; no shipping implementation claim |
| T1 | RESOLVED | Additional lifecycle/title-write surfaces omitted | Full lifecycle matrix; rename does not touch model/title; R2,R10 | pi-output.json: session_start reasons and title owner |
| T2 | RESOLVED | Prefer one fresh-context apply path | One latest-value serialized snapshot publisher; R5,R10,R11 | public model/session getters and lifecycle guidance in pi-output.json/extensions.md |
| T3 | DISPUTED | Prefer already-shipped title transport | Official metadata avoids title ownership; original assistant quick proposal is not operator title authority; no provider fallback | socket.mdx 725–769; original spec.txt; latest operator research/amendment request |
| T4 | RESOLVED | Narrow model matching rather than whole-title scan | Strict Pi-only ID classifier; other agents unchanged; R6,R7,R9 | source-output.json: logos 247–262 |
| A1 | RESOLVED | 250ms persistent title reconciliation not accepted | Zero title writes; explicit metadata lease renewal; R1,R2,R11 | operator investigate/amendment; primary metadata/lifecycle guidance |
| A2 | RESOLVED | Metadata token/source ownership and identity unspecified | Distinct ID/ref inputs, Radar-only outputs, digest, durable sequence ownership and capacity refusal; R1,R6,R9,R15 | socket.mdx 751–769; both installed schemas; managed session-source code |
| A3 | RESOLVED | Expiry/server restart recovery unspecified | 30s refresh/60s lease, current-context reread and explicit identity refusal; R10,R14 | socket.mdx 767; typed pane/reference schema; lifecycle guidance |
| A4 | RESOLVED | Failures, stale callbacks and sequence reuse unspecified | Bounded serialized socket, durable persist-before-send counter and readback, process-shared generation serialization, failure cancellation, first-install provisioning and safe rollback; R5,R11,R14,R15,R17 | socket.mdx 753,767,769; installed seq/TTL schema; filesystem-sources.json with fresh Node fs and POSIX rename; final read-only counter policy audit |
| A5 | RESOLVED | Truncation/normalization can change an identifier | Reject invalid/overlength input, strict ID-only boundaries; R9,R12 | socket.mdx 763; no title/provider inference |
| A6 | RESOLVED | Mandate provenance, review history and receipts polluted the contract | Shorter implementation-only document; provenance/history and R19 authoring check moved to ledger | skill-amend-specs rules 1–4/checklist; SPEC-before.md; latest operator instruction |

## Fresh documentation identities

Retrieved current official documents plus the pinned Pi types; source data follows. Protocol constants/paths for the unbuilt extension are design choices, not claims that files or live tests exist.

```json
[
  {
    "file": "socket.mdx",
    "url": "https://raw.githubusercontent.com/herdrdev/herdr/master/docs/next/website/src/content/docs/socket-api.mdx",
    "retrieved_at": "2026-10-08T09:57:47.018678-03:00",
    "sha256": "0f0aa15b4f3204cb121c9a05c37c195de5f0fe57252803eae15a526d9cb4aa50"
  },
  {
    "file": "extensions.md",
    "url": "https://raw.githubusercontent.com/earendil-works/pi/main/packages/coding-agent/docs/extensions.md",
    "retrieved_at": "2026-10-08T09:57:47.049654-03:00",
    "sha256": "bd2ed1f728173c1defc035e90c3894c308ae153fa08575c12b4a9988e11f8108"
  },
  {
    "file": "types-1.0.4.ts",
    "url": "https://raw.githubusercontent.com/earendil-works/pi/v1.0.4/packages/coding-agent/src/core/extensions/types.ts",
    "retrieved_at": "2026-10-08T09:57:47.458257-03:00",
    "sha256": "33be19555ad54f9e10a3436ce51f54bd6b27cc870a7d9ecc0e4997aeeaa3ae0b"
  },
  {
    "file": "node-fs.html",
    "url": "https://nodejs.org/api/fs.html",
    "retrieved_at": "2026-10-08T09:57:47.574060-03:00",
    "sha256": "6d9c4ac5b87a3dcdab2f31258e05fee8b797d05403584a5b32fe1e150625ed52"
  },
  {
    "file": "posix-rename.html",
    "url": "https://pubs.opengroup.org/onlinepubs/9799919799/functions/rename.html",
    "retrieved_at": "2026-10-08T09:57:47.668227-03:00",
    "sha256": "06671610134b0a52cdf4dcdaf382f72fef85ef51088b8a52b8679c7f03829318"
  }
]
```

## source-output.json
```sh
python3 -c 'from pathlib import Path
import hashlib,json
root=Path.cwd()
for name in ["lib/state.js","lib/logos.js","lib/herdr.js","lib/ipc.js","lib/managed-config.js","lib/palette.js","package.json","CONTRIBUTING.md"]:
 p=root/name;s=p.read_text().splitlines();print("SOURCE",name,"sha256",hashlib.sha256(p.read_bytes()).hexdigest())
 ranges={"lib/state.js":[(263,320),(474,475),(585,593)],"lib/logos.js":[(247,279)],"lib/herdr.js":[(204,235)],"lib/ipc.js":[(18,51)],"lib/managed-config.js":[(353,379),(439,456)],"lib/palette.js":[(78,88),(97,114)],"package.json":[(1,20)],"CONTRIBUTING.md":[(1,len(s))]}[name]
 for lo,hi in ranges:
  for i in range(lo-1,hi):print(f"{i+1}|{s[i]}")
print("EXIT_CODE 0")
'
```
Cwd: `/Users/42piratas/42labs/herdr-radar-plus/.worktrees/docs/adhoc-L2130-pi-model-logo-spec`; exit code: 0
```text
SOURCE lib/state.js sha256 3f3d8aa6cd174ec8314e51c6787f70ae5cb4aae675e609bd6333362eb8c1f2ea
263|// One entry per live agent pane, with everything a frame needs. Null when the
264|// list could not be fetched at all — which is not the same as no agents.
265|async function snapshot() {
266|  const agents = await herdr.agentsAsync();
267|  if (agents === null) return null;
268|  return agents.flatMap((a) => {
269|    const pane = a.pane_id;
270|    const status = a.agent_status;
271|    if (typeof pane !== 'string' || typeof status !== 'string') return [];
272|    const tokens = a.tokens && typeof a.tokens === 'object' ? a.tokens : {};
273|    return [
274|      {
275|        pane,
276|        status,
277|        // `display_agent` is Herdr's channel for a pane to say what it is when
278|        // the process name cannot: a GLM session runs the stock `claude` binary
279|        // against an Anthropic-compatible endpoint, so detection reports
280|        // `claude` and always will. Whoever launched it knows; this is where
281|        // they say so (`pane.report_metadata --display-agent glm`).
282|        //
283|        // It is free text — Herdr's own example is "Claude: auth" — and every
284|        // consumer of `name` treats it as a VENDOR KEY (logoFor, brandVendors,
285|        // the activity key). So it only outranks detection when it names a
286|        // vendor this plugin can actually draw; anything else falls through and
287|        // the row keeps the mark it already had.
288|        name: hook.apply('agent', declaredVendor(a) || (a.agent ?? ''), pane),
289|        session: a.agent_session?.value ?? '',
290|        // The hook runs on the resolved title, so a user hook still has the
291|        // last word on what the row shows.
292|        //
293|        // Three sources, first one that says anything. A mirrored pane runs no
294|        // program of its own, so it has no terminal title at all: the remote's
295|        // task title arrives in the `title` metadata slot instead, and a row
296|        // built from `terminal_title_stripped` alone comes out blank. The raw
297|        // title is last because it still carries whatever mark the agent puts
298|        // in front of its own title — a stray glyph beats an empty row, but
299|        // only just.
300|        title: hook.apply(
301|          'title',
302|          vendorTitle(
303|            a.agent ?? '',
304|            stripVendorPulse(said(a.terminal_title_stripped, a.title, a.terminal_title)),
305|            a.foreground_cwd || a.cwd || '',
306|          ),
307|          pane,
308|        ),
309|        focused: Boolean(a.focused),
310|        tab: a.tab_id ?? '',
311|        workspace: a.workspace_id ?? '',
312|        // What the sidebar is showing right now. A held "done" cannot live in
313|        // this process — the animator exits as soon as nothing is animating —
314|        // so the published token doubles as the record.
315|        showing: Object.keys(tokens)
316|          .find((key) => key.startsWith('state_'))
317|          ?.slice('state_'.length),
318|      },
319|    ];
320|  });
474|  const logo = logoFor(entry.name);
475|  const model = logoFor(modelFor(entry.title, entry.name)) ?? '';
585|  for (const name of LOGO_TOKENS) tokens[name] = null;
586|  tokens[SPLIT_TOKEN] = line.split || null;
587|  if (line.logo) {
588|    const name = display === 'working' ? 'logo_working' : display === 'idle_stale' ? 'logo_stale' : 'logo';
589|    tokens[name] = line.logo;
590|  }
591|  // local patch: model mark, greyed with the row when stale.
592|  tokens.model = line.model && display !== 'idle_stale' ? line.model : null;
593|  tokens.model_stale = line.model && display === 'idle_stale' ? line.model : null;
SOURCE lib/logos.js sha256 7b375ace1e07e14e827d75779958716e63bd73ff568e6bc5f1ad1c82a938946f
247|const MODEL_FAMILIES = [
248|  ['claude', /\b(claude|opus|sonnet|haiku|fable)\b/i],
249|  ['gpt', /\b(gpt|o[1-9](-\w+)?|codex)\b/i],
250|  ['gemini', /\bgemini\b/i],
251|  ['deepseek', /\bdeepseek\b/i],
252|  ['qwen', /\bqwen\b/i],
253|  ['grok', /\bgrok\b/i],
254|  ['glm', /\bglm\b/i],
255|  ['kimi', /\b(kimi|moonshot)\b/i],
256|];
257|const MODEL_FALLBACK = { claude: 'claude', codex: 'gpt', gemini: 'gemini' };
258|
259|function modelFor(title, agent) {
260|  for (const [family, re] of MODEL_FAMILIES) if (re.test(title ?? '')) return family;
261|  return MODEL_FALLBACK[agent] ?? null;
262|}
263|
264|module.exports = {
265|  modelFor,
266|  logoFor,
267|  nameFor,
268|  blockedFrame,
269|  PULSE_STEPS,
270|  glyphs,
271|  resolveVariant,
272|  stateGlyph,
273|  STATE_PUA,
274|  PUA,
275|  TEXT,
276|  DISPLAY,
277|  FONT_FAMILY,
278|  fontAvailable,
279|};
SOURCE lib/herdr.js sha256 ef90febd3f898014142073179969c11ebedcec8dfa56ba6d2b20a45b879a8060
204|// The socket API's token patch: name -> value, null meaning clear — the same
205|// contract the CLI flags encode, minus the process spawn.
206|function tokenPatch(tokens) {
207|  const patch = {};
208|  for (const [name, value] of Object.entries(tokens)) patch[name] = value ?? null;
209|  return patch;
210|}
211|
212|// Async twins of the two report calls, over the socket. The CLI wrapper costs
213|// a process spawn per write — 40-80ms on Windows — which turns any repaint
214|// touching every pane into seconds of visible catching-up. Socket calls run
215|// in parallel; a transport failure falls back to one CLI attempt so a machine
216|// where the socket misbehaves degrades to slow, not broken.
217|//
218|// A report to a pane or workspace that no longer exists is DONE, not failed.
219|// Herdr answers it with a not-found error, and that answer is final: the
220|// target is gone, and its tokens went with it. Reporting it as a failure put
221|// the target into the frame's retry backoff, which caps at a minute and never
222|// gives up — so every pane and workspace that ever closed was cleared again
223|// once a minute for the daemon's whole life, most of its IPC calls ended in
224|// errors, and each pending retry kept waking the scheduler (#21).
225|const GONE = new Set(['pane_not_found', 'workspace_not_found']);
226|const landed = (reply) => !reply.error || GONE.has(reply.error.code);
227|
228|async function reportMetadataAsync(paneId, source, tokens) {
229|  const reply = await ipc.call('pane.report_metadata', {
230|    pane_id: paneId,
231|    source,
232|    tokens: tokenPatch(tokens),
233|  });
234|  if (reply) return landed(reply);
235|  return reportMetadata(paneId, source, tokens);
SOURCE lib/ipc.js sha256 723766a95ab6350d735010ae4e4c5e548e7ae2557adcf742d1297d594f8b4fde
18|const TIMEOUT_MS = 4000;
19|const MAX_IN_FLIGHT = 16;
20|
21|function pipePath() {
22|  const sock = process.env.HERDR_SOCKET_PATH ?? path.join(path.dirname(herdrConfigPath()), 'herdr.sock');
23|  // Herdr's Windows listener registers the whole path string as a named pipe.
24|  return process.platform === 'win32' ? `\\\\.\\pipe\\${sock}` : sock;
25|}
26|
27|function rawCall(method, params) {
28|  return new Promise((resolve) => {
29|    let settled = false;
30|    const finish = (value) => {
31|      if (settled) return;
32|      settled = true;
33|      stream.destroy();
34|      resolve(value);
35|    };
36|    const stream = net.connect({ path: pipePath() });
37|    let body = '';
38|    stream.setTimeout(TIMEOUT_MS, () => finish(null));
39|    stream.on('error', () => finish(null));
40|    stream.on('connect', () => stream.write(`${JSON.stringify({ id: 'plugin-ipc', method, params })}\n`));
41|    stream.on('data', (chunk) => {
42|      body += chunk;
43|      const line = body.indexOf('\n');
44|      if (line < 0) return;
45|      try {
46|        finish(JSON.parse(body.slice(0, line)));
47|      } catch {
48|        finish(null);
49|      }
50|    });
51|  });
SOURCE lib/managed-config.js sha256 46241e7d0d2678e7ab694bfd2975119d073190172b36275842bbccfdddff8c0b
353|function logoCell(token, glyphs, ink, { bold = false, dim = false } = {}) {
354|  const rules = Object.entries(palette.brand)
355|    .filter(([vendor]) => vendor !== 'other' && glyphs[vendor])
356|    .slice(0, RULE_LIMIT)
357|    // `contains`, not `equals`: the value is the mark with its indent in front
358|    // — a zero-width space and a couple of spaces for anything below a group
359|    // header — so an exact match only ever caught the first row of a group and
360|    // left every member wearing the fallback colour.
361|    .map(([vendor, fg]) => `{ contains = "${glyphs[vendor]}", fg = "${fg}" }`);
362|  // The cell's own `fg` is the ink, and every rule above overrides it. So a
363|  // vendor with a hue wears it and everything else — a brand that signs in
364|  // black, an agent we have no mark for — is drawn in plain ink rather than in
365|  // a colour we made up for it. Leaving `fg` out instead, which is what this
366|  // did first, hands the mark Herdr's contextual default: a second-rank grey
367|  // that made those marks read as switched off (palette's `inkFor`).
368|  const base = `token = "${token}", fg = "${ink}", bold = ${bold}, dim = ${dim}`;
369|  return rules.length ? `{ ${base}, rules = [${rules.join(', ')}] }` : `{ ${base} }`;
370|}
371|
372|// Which glyph table the rules above were written against. The rules match
373|// literal strings, so a block written for the icon font means nothing once the
374|// variant flips to plain Unicode — the daemon compares this line with what it
375|// resolves and rewrites the block when they disagree (lib/daemon.js).
376|const VARIANT_TAG = '# logo glyphs: ';
377|
378|function blockVariant(text) {
379|  return new RegExp(`^${escapeRegExp(VARIANT_TAG)}(\\w+)$`, 'm').exec(text ?? '')?.[1] ?? null;
439|        cell('$split_mark', state.idleStale),
440|        logoCell('$logo', glyphs, ink),
441|        // Deliberately the same style as `$logo`, bold included. Working used
442|        // to be the same glyph set bolder, which works for a letter and not
443|        // for a mark: the icon font ships one weight, so bold is SYNTHESISED
444|        // by dilating the outline — the glyph does not thicken, it grows. A
445|        // logo that changes size the moment a session stops working reads as a
446|        // rendering fault, and it is the first thing the eye catches in a
447|        // column of thirty. Working is already said three ways beside it: the
448|        // spinner in front of the title, the ring, and the title in the
449|        // vendor's colour. The two tokens stay apart because which NAME holds
450|        // the glyph is how a row's state is written (lib/state.js), not
451|        // because they have to look different.
452|        logoCell('$logo_working', glyphs, ink),
453|        cell('$logo_stale', state.idleStale),
454|        // local patch (2026-09-27): model family mark beside the harness logo.
455|        logoCell('$model', glyphs, ink),
456|        cell('$model_stale', state.idleStale),
SOURCE lib/palette.js sha256 2e603fd3106a4842e09c1817d35b8a05dcfd78d85aa2e13e1cc527fd839e620e
78|const brand = {
79|  claude: '#d97757', // Anthropic coral, as published
80|  gemini: '#4285f4', // the blue out of Google's four
81|  kimi: '#1783ff', // as published
82|  deepseek: '#4d6bfe', // as published
83|  qwen: '#615ced', // as published
84|  kiro: '#9046ff', // as published
85|  cline: '#586876', // #323b43 lightened: as published it dies on a dark panel
86|  kilo: '#9a9808', // #f8f676 darkened: as published it dies on a light one
87|  other: '#c78a1f', // a recognised harness with no hue of its own
88|};
97|// The ink a hueless mark is drawn in: black on a light panel, white on a dark
98|// one, which is how a monochrome brand signs itself.
99|//
100|// This used to be done by leaving the cell's `fg` out and letting Herdr keep
101|// the contextual default. That reads well as a sentence and rendered as a
102|// muted grey — the sidebar's default ink is second-rank text, not the ink a
103|// logo wants, and it left the black-signing brands looking switched off beside
104|// the coloured ones. Naming the value is the only way to get the two ends of
105|// the scale, and the sidebar block is rebuilt per appearance anyway
106|// (`sidebarBlock(variant)`), so a static hex here still follows the desktop.
107|const inks = {
108|  light: '#16161c',
109|  dark: '#e9e9f0',
110|};
111|
112|function inkFor(variant) {
113|  return inks[variant] ?? inks.light;
114|}
SOURCE package.json sha256 fa7eb3d4082730f9abb47c82295820000144151265c197c755c4c1641fbd1448
1|{
2|  "name": "herdr-radar-plus",
3|  "version": "0.42.0",
4|  "description": "Vendor logos, lifecycle-state glyphs, workspace grouping and a path tab-bar for the Herdr sidebar.",
5|  "license": "MIT",
6|  "private": true,
7|  "engines": {
8|    "node": ">=18"
9|  },
10|  "scripts": {
11|    "check": "node tools/check.js",
12|    "test": "node --test",
13|    "prove": "node tools/prove-checks.js",
14|    "format": "prettier --check .",
15|    "format:fix": "prettier --write ."
16|  },
17|  "devDependencies": {
18|    "prettier": "^3.9.9"
19|  }
20|}
SOURCE CONTRIBUTING.md sha256 c5cb0b7a759f24707547b3f389b68e9fa2ed231aee00f151bd40764d54a202bd
1|# Contributing
2|
3|Bug reports, questions and pull requests are all welcome. Open an
4|[issue](https://github.com/4242labs/herdr-radar-plus/issues/new) for the first two.
5|
6|## Where a change belongs
7|
8|This repo is [herdr-radar](https://github.com/hhdebb/herdr-radar) plus a small set of features:
9|the attention view, named groups, groups across machines, the model mark and the machine row.
10|A fix to anything else, such as vendor logos, state marks, the settings popup or the font, is
11|better sent upstream. It reaches this repo when upstream is merged in, and every herdr-radar user
12|gets it too.
13|
14|The plus features live in:
15|
16|| File | What |
17||:--|:--|
18|| `lib/lanes.js` | Group store, presence, divider ownership. Self-test: `node lib/lanes.js` |
19|| `bin/lane.js` | The `lane-up` / `lane-down` actions |
20|| `bin/lane-sync.js` | Hub and spoke sync over SSH |
21|| `lib/frame.js` | `laneLayout`, `laneJobs`: dividers, gaps, indents |
22|| `lib/view.js` | The `attention` sort |
23|| `lib/logos.js` | `modelFor`, the model families |
24|| `lib/state.js`, `lib/managed-config.js` | Model and machine tokens and their sidebar cells |
25|
26|## Working on it
27|
28|```sh
29|npm ci
30|npm run check     # identity, vendor roster, font and README invariants
31|npm test          # node --test
32|npm run prove     # the checks above can still fail
33|npm run format    # prettier
34|node lib/lanes.js # group store self-test
35|```
36|
37|Link a checkout into Herdr to try a change live:
38|
39|```sh
40|herdr plugin link .
41|herdr plugin action invoke 4242labs.herdr-radar-plus.state-stop
42|herdr plugin action invoke 4242labs.herdr-radar-plus.state-start
43|```
44|
45|## Pull requests
46|
47|- One change per pull request, with CI green.
48|- Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`.
49|- Say which of the plus features it touches, or that it touches none.
50|
51|## Licence of contributions
52|
53|By submitting a pull request you agree that your contribution is licensed under the same MIT
54|terms as the rest of the project. See [LICENSING.md](LICENSING.md).
EXIT_CODE 0
```

## pi-output.json
```sh
python3 -c 'from pathlib import Path
import hashlib,json,platform
print("OS",platform.system())
r=Path("/opt/homebrew/lib/node_modules/@earendil-works/pi-coding-agent")
print("PI",json.loads((r/"package.json").read_text())["version"])
for name,ranges in [("dist/modes/interactive/interactive-mode.js",[(810,819),(1584,1604),(1893,1915),(2053,2069)]),("dist/core/extensions/types.d.ts",[(210,227),(550,563),(846,856),(1153,1162),(1187,1188)]),("dist/core/session-manager.d.ts",[(174,179)])]:
 p=r/name;s=p.read_text().splitlines();print(name,"sha256",hashlib.sha256(p.read_bytes()).hexdigest())
 for lo,hi in ranges:
  for i in range(lo-1,min(hi,len(s))):print(f"{i+1}|{s[i]}")
p=Path("/Users/42piratas/.pi/agent/extensions/herdr-agent-state.ts");s=p.read_text().splitlines();print("managed integration sha256",hashlib.sha256(p.read_bytes()).hexdigest())
for lo,hi in [(1,20),(74,111),(229,241)]:
 for i in range(lo-1,hi):print(f"{i+1}|{s[i]}")
print("EXIT_CODE 0")
'
```
Cwd: `/Users/42piratas/42labs/herdr-radar-plus/.worktrees/docs/adhoc-L2130-pi-model-logo-spec`; exit code: 0
```text
OS Darwin
PI 1.0.4
dist/modes/interactive/interactive-mode.js sha256 89ad3129807c036820c746ef4e0e930292b4ea7ab8150c085e75148a581793c4
810|    updateTerminalTitle() {
811|        const cwdBasename = path.basename(this.sessionManager.getCwd());
812|        const sessionName = this.sessionManager.getSessionName();
813|        if (sessionName) {
814|            this.ui.terminal.setTitle(`${APP_TITLE} - ${sessionName} - ${cwdBasename}`);
815|        }
816|        else {
817|            this.ui.terminal.setTitle(`${APP_TITLE} - ${cwdBasename}`);
818|        }
819|    }
1584|    async rebindCurrentSession(options = {}) {
1585|        const session = this.session;
1586|        this.unsubscribe?.();
1587|        this.unsubscribe = undefined;
1588|        this.applyRuntimeSettings();
1589|        if (options.renderBeforeBind) {
1590|            this.renderCurrentSessionState();
1591|            this.subscribeToAgent();
1592|        }
1593|        await this.bindCurrentSessionExtensions();
1594|        if (this.session !== session) {
1595|            return;
1596|        }
1597|        if (!options.renderBeforeBind) {
1598|            this.subscribeToAgent();
1599|        }
1600|        await this.updateAvailableProviderCount();
1601|        this.updateEditorBorderColor();
1602|        this.updateTerminalTitle();
1603|    }
1604|    async handleFatalRuntimeError(prefix, error) {
1893|    resetExtensionUI() {
1894|        if (this.extensionSelector) {
1895|            this.hideExtensionSelector();
1896|        }
1897|        if (this.extensionInput) {
1898|            this.hideExtensionInput();
1899|        }
1900|        if (this.extensionEditor) {
1901|            this.hideExtensionEditor();
1902|        }
1903|        this.ui.hideOverlay();
1904|        this.clearExtensionTerminalInputListeners();
1905|        this.setExtensionFooter(undefined);
1906|        this.setExtensionHeader(undefined);
1907|        this.clearExtensionWidgets();
1908|        this.footerDataProvider.clearExtensionStatuses();
1909|        this.footer.invalidate();
1910|        this.autocompleteProviderWrappers = [];
1911|        this.setCustomEditorComponent(undefined);
1912|        this.setupAutocompleteProvider();
1913|        this.defaultEditor.onExtensionShortcut = undefined;
1914|        this.updateTerminalTitle();
1915|        this.workingMessage = undefined;
2053|            notify: (message, type) => this.showExtensionNotify(message, type),
2054|            onTerminalInput: (handler) => this.addExtensionTerminalInputListener(handler),
2055|            setStatus: (key, text) => this.setExtensionStatus(key, text),
2056|            setWorkingMessage: (message) => {
2057|                this.workingMessage = message;
2058|                if (this.activeStatusIndicator?.kind === "working") {
2059|                    this.activeStatusIndicator.setMessage(message ?? this.defaultWorkingMessage);
2060|                }
2061|            },
2062|            setWorkingVisible: (visible) => this.setWorkingVisible(visible),
2063|            setWorkingIndicator: (options) => this.setWorkingIndicator(options),
2064|            setHiddenThinkingLabel: (label) => this.setHiddenThinkingLabel(label),
2065|            setWidget: (key, content, options) => this.setExtensionWidget(key, content, options),
2066|            setFooter: (factory) => this.setExtensionFooter(factory),
2067|            setHeader: (factory) => this.setExtensionHeader(factory),
2068|            setTitle: (title) => this.ui.terminal.setTitle(title),
2069|            custom: (factory, options) => this.showExtensionCustom(factory, options),
dist/core/extensions/types.d.ts sha256 5e43b8423ee2454959b987007292fd1514fe168dbe58a04d9b9d951b10bf2123
210| * Context passed to extension event handlers.
211| */
212|export type ExtensionMode = "tui" | "rpc" | "json" | "print";
213|export interface ExtensionContext {
214|    /** UI methods for user interaction */
215|    ui: ExtensionUIContext;
216|    /** Current run mode. Use "tui" to guard terminal-only UI such as custom components. */
217|    mode: ExtensionMode;
218|    /** Whether dialog-capable UI is available (true in TUI and RPC modes) */
219|    hasUI: boolean;
220|    /** Current working directory */
221|    cwd: string;
222|    /** Session manager (read-only) */
223|    sessionManager: ReadonlySessionManager;
224|    /** Model registry for API key resolution */
225|    modelRegistry: ModelRegistry;
226|    /** Current model (may be undefined) */
227|    model: Model<any> | undefined;
550|    type: "mcp_servers_change";
551|    /** Every registered server after the change. */
552|    servers: RegisteredMcpServer[];
553|}
554|/** Fired when a session is started, loaded, or reloaded */
555|export interface SessionStartEvent {
556|    type: "session_start";
557|    /** Why this session start happened. */
558|    reason: "startup" | "reload" | "new" | "resume" | "fork";
559|    /** Previously active session file. Present for "new", "resume", and "fork". */
560|    previousSessionFile?: string;
561|}
562|/** Fired when the current session metadata changes. */
563|export interface SessionInfoChangedEvent {
846|    parentToolCallId?: string;
847|}
848|export type ModelSelectSource = "set" | "cycle" | "restore";
849|/** Fired when a new model is selected */
850|export interface ModelSelectEvent {
851|    type: "model_select";
852|    model: Model<any>;
853|    previousModel: Model<any> | undefined;
854|    source: ModelSelectSource;
855|}
856|/** Fired when a new thinking level is selected */
1153|    on(event: "resources_discover", handler: ExtensionHandler<ResourcesDiscoverEvent, ResourcesDiscoverResult>): () => void;
1154|    on(event: "session_start", handler: ExtensionHandler<SessionStartEvent>): () => void;
1155|    on(event: "session_info_changed", handler: ExtensionHandler<SessionInfoChangedEvent>): () => void;
1156|    on(event: "session_before_switch", handler: ExtensionHandler<SessionBeforeSwitchEvent, SessionBeforeSwitchResult>): () => void;
1157|    on(event: "session_before_fork", handler: ExtensionHandler<SessionBeforeForkEvent, SessionBeforeForkResult>): () => void;
1158|    on(event: "session_before_compact", handler: ExtensionHandler<SessionBeforeCompactEvent, SessionBeforeCompactResult>): () => void;
1159|    on(event: "session_compact", handler: ExtensionHandler<SessionCompactEvent>): () => void;
1160|    on(event: "session_compact_failed", handler: ExtensionHandler<SessionCompactFailedEvent>): () => void;
1161|    on(event: "session_shutdown", handler: ExtensionHandler<SessionShutdownEvent>): () => void;
1162|    on(event: "mcp_servers_change", handler: ExtensionHandler<McpServersChangeEvent>): () => void;
1187|    on(event: "model_select", handler: ExtensionHandler<ModelSelectEvent>): () => void;
1188|    on(event: "thinking_level_select", handler: ExtensionHandler<ThinkingLevelSelectEvent>): () => void;
dist/core/session-manager.d.ts sha256 2288b69c82272311dc877da61ff2057bb04df49038ddef7eef6c8753c09f5313
174|    messageCount: number;
175|    firstMessage: string;
176|    allMessagesText: string;
177|}
178|export type ReadonlySessionManager = Pick<SessionManager, "getCwd" | "getSessionDir" | "getSessionId" | "getSessionFile" | "getLeafId" | "getLeafEntry" | "getEntry" | "getLabel" | "getBranch" | "buildContextEntries" | "buildSessionProjection" | "getHeader" | "getEntries" | "getTree" | "getSessionName">;
179|export declare function assertValidSessionId(id: string): void;
managed integration sha256 2c5272d732b475bbf91a027203b1f98d25fe43d2c1402530a442b288aeaca1e4
1|// installed by herdr
2|// managed by herdr; reinstalling or updating the integration overwrites this file.
3|// add custom hooks/plugins beside this file instead of editing it.
4|// HERDR_INTEGRATION_ID=pi
5|// HERDR_INTEGRATION_VERSION=9
6|// @ts-nocheck
7|
8|import net from "node:net";
9|import path from "node:path";
10|
11|const HERDR_ENV = process.env.HERDR_ENV;
12|const socketPath = process.env.HERDR_SOCKET_PATH;
13|const socketEndpoint =
14|  process.platform === "win32" && socketPath ? `\\\\.\\pipe\\${socketPath}` : socketPath;
15|const paneId = process.env.HERDR_PANE_ID;
16|const source = "herdr:pi";
17|
18|function enabled() {
19|  return HERDR_ENV === "1" && !!socketPath && !!paneId;
20|}
74|function updateSessionRef(ctx: any): void {
75|  try {
76|    const file = ctx?.sessionManager?.getSessionFile?.();
77|    currentAgentSessionPath =
78|      typeof file === "string" &&
79|      (path.posix.isAbsolute(file) || path.win32.isAbsolute(file))
80|        ? file
81|        : undefined;
82|  } catch {
83|    currentAgentSessionPath = undefined;
84|  }
85|
86|  try {
87|    const id = ctx?.sessionManager?.getSessionId?.();
88|    currentAgentSessionId = typeof id === "string" && id.length > 0 ? id : undefined;
89|  } catch {
90|    currentAgentSessionId = undefined;
91|  }
92|}
93|
94|function withSessionRef(params: Record<string, unknown>): Record<string, unknown> {
95|  if (currentAgentSessionPath) {
96|    return { ...params, agent_session_path: currentAgentSessionPath };
97|  }
98|  if (currentAgentSessionId) {
99|    return { ...params, agent_session_id: currentAgentSessionId };
100|  }
101|  return params;
102|}
103|
104|function currentSessionRef(): Record<string, unknown> | undefined {
105|  if (currentAgentSessionPath) {
106|    return { agent_session_path: currentAgentSessionPath };
107|  }
108|  if (currentAgentSessionId) {
109|    return { agent_session_id: currentAgentSessionId };
110|  }
111|  return undefined;
229|  pi.on("session_start", async (event, ctx) => {
230|    // TUI only: RPC/JSON/print modes are headless (no PTY herdr can display),
231|    // and RPC still reports hasUI=true, so mode is the reliable gate.
232|    if (ctx?.mode !== "tui") {
233|      return;
234|    }
235|    rootSession = true;
236|    updateSessionRef(ctx);
237|    await reportSession(event?.reason);
238|    // A reload can replace this extension mid-run without emitting another agent_start.
239|    agentActive = ctx?.isIdle?.() === false;
240|    publishState(true);
241|  });
EXIT_CODE 0
```

## schema-fields.json
```sh
python3 -c 'import subprocess,json
p=subprocess.run(["herdr","api","schema","--json"],capture_output=True,text=True,timeout=15); d=json.loads(p.stdout)
for group,name in [("request","PaneReportMetadataParams"),("success_response","AgentSessionInfo"),("success_response","AgentSessionRefKind")]:
 print(group,name,json.dumps(d["schemas"][group]["$defs"][name],indent=2))
for name in ["AgentInfo","PaneInfo"]:
 v=d["schemas"]["success_response"]["$defs"][name]; print(name,json.dumps({k:v["properties"][k] for k in ["agent","agent_session","tokens"]},indent=2))
print("exit_code",p.returncode)
'
```
Cwd: `/Users/42piratas/42labs/herdr-radar-plus/.worktrees/docs/adhoc-L2130-pi-model-logo-spec`; exit code: 0
```text
request PaneReportMetadataParams {
  "properties": {
    "agent": {
      "type": [
        "string",
        "null"
      ]
    },
    "applies_to_source": {
      "type": [
        "string",
        "null"
      ]
    },
    "clear_display_agent": {
      "default": false,
      "type": "boolean"
    },
    "clear_state_labels": {
      "default": false,
      "type": "boolean"
    },
    "clear_title": {
      "default": false,
      "type": "boolean"
    },
    "display_agent": {
      "type": [
        "string",
        "null"
      ]
    },
    "pane_id": {
      "type": "string"
    },
    "seq": {
      "format": "uint64",
      "minimum": 0,
      "type": [
        "integer",
        "null"
      ]
    },
    "source": {
      "type": "string"
    },
    "state_labels": {
      "additionalProperties": {
        "type": "string"
      },
      "type": "object"
    },
    "title": {
      "type": [
        "string",
        "null"
      ]
    },
    "tokens": {
      "additionalProperties": {
        "type": [
          "string",
          "null"
        ]
      },
      "maxProperties": 16,
      "propertyNames": {
        "pattern": "^[A-Za-z0-9_-]{1,32}$"
      },
      "type": "object"
    },
    "ttl_ms": {
      "format": "uint64",
      "maximum": 86400000,
      "minimum": 1,
      "type": [
        "integer",
        "null"
      ]
    }
  },
  "required": [
    "pane_id",
    "source"
  ],
  "type": "object"
}
success_response AgentSessionInfo {
  "properties": {
    "agent": {
      "type": "string"
    },
    "kind": {
      "$ref": "#/schemas/success_response/$defs/AgentSessionRefKind"
    },
    "source": {
      "type": "string"
    },
    "value": {
      "type": "string"
    }
  },
  "required": [
    "source",
    "agent",
    "kind",
    "value"
  ],
  "type": "object"
}
success_response AgentSessionRefKind {
  "enum": [
    "id",
    "path"
  ],
  "type": "string"
}
AgentInfo {
  "agent": {
    "type": [
      "string",
      "null"
    ]
  },
  "agent_session": {
    "anyOf": [
      {
        "$ref": "#/schemas/success_response/$defs/AgentSessionInfo"
      },
      {
        "type": "null"
      }
    ]
  },
  "tokens": {
    "additionalProperties": {
      "type": "string"
    },
    "maxProperties": 32,
    "propertyNames": {
      "pattern": "^[A-Za-z0-9_-]{1,32}$"
    },
    "type": "object"
  }
}
PaneInfo {
  "agent": {
    "type": [
      "string",
      "null"
    ]
  },
  "agent_session": {
    "anyOf": [
      {
        "$ref": "#/schemas/success_response/$defs/AgentSessionInfo"
      },
      {
        "type": "null"
      }
    ]
  },
  "tokens": {
    "additionalProperties": {
      "type": "string"
    },
    "maxProperties": 32,
    "propertyNames": {
      "pattern": "^[A-Za-z0-9_-]{1,32}$"
    },
    "type": "object"
  }
}
exit_code 0
```

## schema-fields-alghul.json
```sh
ssh -o BatchMode=yes -o ConnectTimeout=10 alghul 'python3 -c '"'"'import subprocess,json
p=subprocess.run(["herdr","api","schema","--json"],capture_output=True,text=True,timeout=15); d=json.loads(p.stdout)
for group,name in [("request","PaneReportMetadataParams"),("success_response","AgentSessionInfo"),("success_response","AgentSessionRefKind")]:
 print(group,name,json.dumps(d["schemas"][group]["$defs"][name],indent=2))
for name in ["AgentInfo","PaneInfo"]:
 v=d["schemas"]["success_response"]["$defs"][name]; print(name,json.dumps({k:v["properties"][k] for k in ["agent","agent_session","tokens"]},indent=2))
print("exit_code",p.returncode)
'"'"''
```
Cwd: `/Users/42piratas/42labs/herdr-radar-plus/.worktrees/docs/adhoc-L2130-pi-model-logo-spec`; exit code: 0
```text
request PaneReportMetadataParams {
  "properties": {
    "agent": {
      "type": [
        "string",
        "null"
      ]
    },
    "applies_to_source": {
      "type": [
        "string",
        "null"
      ]
    },
    "clear_display_agent": {
      "default": false,
      "type": "boolean"
    },
    "clear_state_labels": {
      "default": false,
      "type": "boolean"
    },
    "clear_title": {
      "default": false,
      "type": "boolean"
    },
    "display_agent": {
      "type": [
        "string",
        "null"
      ]
    },
    "pane_id": {
      "type": "string"
    },
    "seq": {
      "format": "uint64",
      "minimum": 0,
      "type": [
        "integer",
        "null"
      ]
    },
    "source": {
      "type": "string"
    },
    "state_labels": {
      "additionalProperties": {
        "type": "string"
      },
      "type": "object"
    },
    "title": {
      "type": [
        "string",
        "null"
      ]
    },
    "tokens": {
      "additionalProperties": {
        "type": [
          "string",
          "null"
        ]
      },
      "maxProperties": 16,
      "propertyNames": {
        "pattern": "^[A-Za-z0-9_-]{1,32}$"
      },
      "type": "object"
    },
    "ttl_ms": {
      "format": "uint64",
      "maximum": 86400000,
      "minimum": 1,
      "type": [
        "integer",
        "null"
      ]
    }
  },
  "required": [
    "pane_id",
    "source"
  ],
  "type": "object"
}
success_response AgentSessionInfo {
  "properties": {
    "agent": {
      "type": "string"
    },
    "kind": {
      "$ref": "#/schemas/success_response/$defs/AgentSessionRefKind"
    },
    "source": {
      "type": "string"
    },
    "value": {
      "type": "string"
    }
  },
  "required": [
    "source",
    "agent",
    "kind",
    "value"
  ],
  "type": "object"
}
success_response AgentSessionRefKind {
  "enum": [
    "id",
    "path"
  ],
  "type": "string"
}
AgentInfo {
  "agent": {
    "type": [
      "string",
      "null"
    ]
  },
  "agent_session": {
    "anyOf": [
      {
        "$ref": "#/schemas/success_response/$defs/AgentSessionInfo"
      },
      {
        "type": "null"
      }
    ]
  },
  "tokens": {
    "additionalProperties": {
      "type": "string"
    },
    "maxProperties": 32,
    "propertyNames": {
      "pattern": "^[A-Za-z0-9_-]{1,32}$"
    },
    "type": "object"
  }
}
PaneInfo {
  "agent": {
    "type": [
      "string",
      "null"
    ]
  },
  "agent_session": {
    "anyOf": [
      {
        "$ref": "#/schemas/success_response/$defs/AgentSessionInfo"
      },
      {
        "type": "null"
      }
    ]
  },
  "tokens": {
    "additionalProperties": {
      "type": "string"
    },
    "maxProperties": 32,
    "propertyNames": {
      "pattern": "^[A-Za-z0-9_-]{1,32}$"
    },
    "type": "object"
  }
}
exit_code 0
```

## alghul-paths.json
```sh
ssh -o BatchMode=yes -o ConnectTimeout=10 alghul "/home/42piratas/.npm-global/bin/pi --version; test -d /home/42piratas/.pi/agent/extensions; test -d /home/42piratas/42labs/herdr-radar-plus; readlink -f /home/42piratas/42labs/herdr-radar-plus; /usr/bin/git -C /home/42piratas/42labs/herdr-radar-plus rev-parse HEAD"
```
Cwd: `/Users/42piratas/42labs/herdr-radar-plus/.worktrees/docs/adhoc-L2130-pi-model-logo-spec`; exit code: 0
```text
1.0.4
/mnt/HC_Volume_106886629/workspace/herdr-radar-plus
e258108012cc45ac18c8b3e7bb6b5e1dab1b3b2d
```

## callers-loader.json
```sh
python3 -c 'from pathlib import Path
import json,hashlib
root=Path("/opt/homebrew/lib/node_modules/@earendil-works/pi-coding-agent")
for p,ranges in [(root/"dist/core/extensions/loader.js",[(490,550),(623,694)]),(root/"dist/core/extensions/runner.js",[(632,647)]),(Path("lib/daemon.js"),[(3,10),(35,42),(288,294),(339,343)]),(Path("lib/frame.js"),[(112,117),(185,200)])]:
 lines=p.read_text().splitlines();print("SOURCE",str(p),hashlib.sha256(p.read_bytes()).hexdigest())
 for lo,hi in ranges:
  for i in range(lo-1,min(hi,len(lines))):print(str(i+1)+"|"+lines[i])
print("EXIT_CODE 0")
'
```
Cwd: `/Users/42piratas/42labs/herdr-radar-plus/.worktrees/docs/adhoc-L2130-pi-model-logo-spec`; exit code: 0
```text
SOURCE /opt/homebrew/lib/node_modules/@earendil-works/pi-coding-agent/dist/core/extensions/loader.js 44a356da552c9cf2ea619c61944cfb28f81b45f09b325f152c91a914bfce1bc0
490|}
491|/**
492| * Create an Extension object with empty collections.
493| */
494|function createExtension(extensionPath, resolvedPath) {
495|    const source = getSyntheticPathSource(extensionPath) ?? "local";
496|    const baseDir = isSyntheticPath(extensionPath) ? undefined : path.dirname(resolvedPath);
497|    return {
498|        path: extensionPath,
499|        resolvedPath,
500|        sourceInfo: createSyntheticSourceInfo(extensionPath, { source, baseDir }),
501|        handlers: new Map(),
502|        tools: new Map(),
503|        messageRenderers: new Map(),
504|        entryRenderers: new Map(),
505|        commands: new Map(),
506|        flags: new Map(),
507|        shortcuts: new Map(),
508|    };
509|}
510|async function initializeExtension(factory, extensionPath, resolvedPath, cwd, eventBus, runtime) {
511|    const extension = createExtension(extensionPath, resolvedPath);
512|    const load = createExtensionAPI(extension, runtime, cwd, eventBus);
513|    try {
514|        await factory(load.api);
515|        load.commit();
516|    }
517|    catch (error) {
518|        load.discard();
519|        throw error;
520|    }
521|    time(`${extensionPath} factory`, "extensions");
522|    return extension;
523|}
524|async function loadExtension(extensionPath, cwd, eventBus, runtime, cacheToken) {
525|    const resolvedPath = resolvePath(extensionPath, cwd, { normalizeUnicodeSpaces: true });
526|    try {
527|        const factory = await loadExtensionModule(resolvedPath, cacheToken);
528|        time(`${extensionPath} module import`, "extensions");
529|        if (!factory) {
530|            return { extension: null, error: `Extension does not export a valid factory function: ${extensionPath}` };
531|        }
532|        const extension = await initializeExtension(factory, extensionPath, resolvedPath, cwd, eventBus, runtime);
533|        return { extension, error: null };
534|    }
535|    catch (err) {
536|        const message = err instanceof Error ? err.message : String(err);
537|        return { extension: null, error: `Failed to load extension: ${message}` };
538|    }
539|}
540|/**
541| * Create an Extension from an inline factory function.
542| */
543|export async function loadExtensionFromFactory(factory, cwd, eventBus, runtime, extensionPath = "<inline>") {
544|    const resolvedCwd = resolvePath(cwd);
545|    return initializeExtension(factory, extensionPath, extensionPath, resolvedCwd, eventBus, runtime);
546|}
547|/**
548| * Load extensions from paths.
549| */
550|async function loadExtensionsInternal(paths, cwd, eventBus, runtime, useCache = false) {
623| * Discover extensions in a directory.
624| *
625| * Discovery rules:
626| * 1. Direct files: `extensions/*.ts` or `*.js` → load
627| * 2. Subdirectory with index: `extensions/* /index.ts` or `index.js` → load
628| * 3. Subdirectory with package.json: `extensions/* /package.json` with "pi" field → load what it declares
629| *
630| * No recursion beyond one level. Complex packages must use package.json manifest.
631| */
632|function discoverExtensionsInDir(dir) {
633|    if (!fs.existsSync(dir)) {
634|        return [];
635|    }
636|    const discovered = [];
637|    try {
638|        const entries = fs.readdirSync(dir, { withFileTypes: true });
639|        for (const entry of entries) {
640|            const entryPath = path.join(dir, entry.name);
641|            // 1. Direct files: *.ts or *.js
642|            if ((entry.isFile() || entry.isSymbolicLink()) && isExtensionFile(entry.name)) {
643|                discovered.push(entryPath);
644|                continue;
645|            }
646|            // 2 & 3. Subdirectories
647|            if (entry.isDirectory() || entry.isSymbolicLink()) {
648|                const entries = resolveExtensionEntries(entryPath);
649|                if (entries) {
650|                    discovered.push(...entries);
651|                }
652|            }
653|        }
654|    }
655|    catch {
656|        return [];
657|    }
658|    return discovered;
659|}
660|/**
661| * Discover and load extensions from standard locations.
662| */
663|export async function discoverAndLoadExtensions(configuredPaths, cwd, agentDir = getAgentDir(), eventBus) {
664|    const resolvedCwd = resolvePath(cwd);
665|    const resolvedAgentDir = resolvePath(agentDir);
666|    const allPaths = [];
667|    const seen = new Set();
668|    const addPaths = (paths) => {
669|        for (const p of paths) {
670|            const resolved = path.resolve(p);
671|            if (!seen.has(resolved)) {
672|                seen.add(resolved);
673|                allPaths.push(p);
674|            }
675|        }
676|    };
677|    // 1. Project-local extensions: cwd/${CONFIG_DIR_NAME}/extensions/
678|    const localExtDir = path.join(resolvedCwd, CONFIG_DIR_NAME, "extensions");
679|    addPaths(discoverExtensionsInDir(localExtDir));
680|    // 2. Global extensions: agentDir/extensions/
681|    const globalExtDir = path.join(resolvedAgentDir, "extensions");
682|    addPaths(discoverExtensionsInDir(globalExtDir));
683|    // 3. Explicitly configured paths
684|    for (const p of configuredPaths) {
685|        const resolved = resolvePath(p, resolvedCwd, { normalizeUnicodeSpaces: true });
686|        if (fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) {
687|            // Check for package.json with pi manifest or index.ts
688|            const entries = resolveExtensionEntries(resolved);
689|            if (entries) {
690|                addPaths(entries);
691|                continue;
692|            }
693|            // No explicit entries - discover individual files in directory
694|            addPaths(discoverExtensionsInDir(resolved));
SOURCE /opt/homebrew/lib/node_modules/@earendil-works/pi-coding-agent/dist/core/extensions/runner.js 258f142bc56cc84d953ef6146222e5ff3a94cc908592a1b3d075d34bbcd68b36
632|                return runner.cwd;
633|            },
634|            get sessionManager() {
635|                runner.assertActive();
636|                return runner.sessionManager;
637|            },
638|            get modelRegistry() {
639|                runner.assertActive();
640|                return runner.modelRegistry;
641|            },
642|            get model() {
643|                runner.assertActive();
644|                return getModel();
645|            },
646|            get scopedModels() {
647|                runner.assertActive();
SOURCE lib/daemon.js 4c8b75c9ee3b94387a33d9741bfd5c5b24b39495dd53d21376042814f716e2cd
3|// The resident daemon: one process that owns the sidebar for as long as
4|// Herdr runs.
5|//
6|// A read-only event subscription (lib/subscribe.js) wakes it, a next-deadline
7|// scheduler sleeps it, and an idle daemon blocked on a pipe costs nothing but
8|// memory. Events are WAKE HINTS only — every frame's truth is a fresh
9|// agent-list snapshot (lib/frame.js), which makes replayed, throttled, or
10|// missed events all equally harmless.
35|// frame N schedules frame N+1 early, forever.
36|const FRAME_FLOOR_MS = 120;
37|const POLL_MS = 150;
38|const WAKE_DEBOUNCE_MS = 50;
39|const TABLINE_MS = 2000;
40|// How long a title change can sit unnoticed. See the heartbeat below.
41|const HEARTBEAT_MS = 2000;
42|const APPEARANCE_MS = 60000;
288|  subscription = subscribe.start({
289|    onWake: wake,
290|    // The server's socket marker is gone: herdr is not coming back on this
291|    // endpoint. The next herdr start runs the startup hook and spawns a fresh
292|    // daemon.
293|    onGone: () => shutdown(),
294|  });
339|  // Terminal titles and working directories change without an event now that
340|  // `pane.updated` is off (lib/subscribe.js says why). They change rarely, and
341|  // a frame that finds nothing different writes nothing, so a slow heartbeat
342|  // is the whole cost of not listening to our own echo.
343|  timers.push(setInterval(wake, HEARTBEAT_MS));
SOURCE lib/frame.js 51039c2b9d2860e645425056f2de5ed5e1aab2b6602b6b7e057ed83863520c2a
112|  // Draw one frame. Returns when the next one is due, or null when the
113|  // snapshot failed — a failed fetch is not an empty session, and acting on
114|  // it as one would clear every token and delete every activity stamp.
115|  async render(now) {
116|    const entries = await state.snapshot();
117|    if (entries === null) return null;
185|      const indent = state.INDENTS[Math.min(depth, state.INDENTS.length - 1)];
186|      // The other halves of a split screen hang off the pane they were split
187|      // from, drawn the way a worktree hangs off its checkout.
188|      const corner = ''; // local patch: no split tree (operator ask 2026-09-27)
189|      // The header text this row will sit under, for the prefix trim. Empty
190|      // in the flat view: nothing is repeated there.
191|      const header = grouped && config.trimGroupPrefix ? (workspaces.get(entry.workspace) ?? '') : '';
192|      this.paneJobs(entry, display, { tabs, keys, indent, corner, spinStep, header }, now, deadlines, jobs);
193|    }
194|
195|    this.clearGone(live, now, jobs);
196|    this.spaceJobs(wsAgents, workspaces, now, jobs);
197|    await (viewMode === 'attention'
198|      ? this.laneJobs(entries, laneLayout.layout, now, deadlines)
199|      : this.groupJobs(entries, displayEntries, viewMode, grouped, wsAgents, workspaces, keys, now, deadlines));
200|    await Promise.all(jobs);
EXIT_CODE 0
```

## versions.json
```sh
herdr --version; pi --version; node --version; ssh -o BatchMode=yes -o ConnectTimeout=10 alghul "uname -s; herdr --version; /home/42piratas/.npm-global/bin/pi --version; node --version"
```
Cwd: `/Users/42piratas/42labs/herdr-radar-plus/.worktrees/docs/adhoc-L2130-pi-model-logo-spec`; exit code: 0
```text
herdr 0.9.1
1.0.4
v26.7.0
Linux
herdr 0.9.1
1.0.4
v24.21.0
```

## Filesystem support opened before amendment

```json
[
  {
    "file": "node-fs.html",
    "term": "filehandle.sync()",
    "observed": ".\u00a0\nDefault:\n \nundefined\n.\n\n\n\n\n\n\nReturns: \n<Promise>\n Fulfills with an \n<fs.Stats>\n for the file.\n\n\n\n\nfilehandle.sync()\n#\nAdded in: v10.0.0\n\n\nReturns: \n<Promise>\n Fulfills with\u00a0\nundefined\n upon success.\n\n\nRequest that all data for the open file descriptor is flushed to the storage\ndevice. The specific implementation is operating system and device specific.\nRefer to the POSIX \nfsync(2)\n documentation for more detail.\n\n\nfilehandle.truncate(len)\n#\nAdded in: v10.0.0\n\n\nlen\n\u00a0\n<integer>\n\u00a0\nDefault:\n \n0\n\n\nReturns: \n<Promise>\n Fulfills with\u00a0\nundefined\n upon success.\n\n\nTruncates the file.\nIf the file was larger than \nlen\n bytes, only the first \nlen\n bytes will be\nretained in the file.\nThe following example retains only the first four bytes of the file:\nimport\n {\n open \n}\n from\n 'node:fs/promises'\n;\n\n\n\n\nlet\n filehandle \n=\n null\n;\n\n\ntry\n {\n\n\n  filehandle \n=\n await\n open\n(\n'temp.txt'\n,\n 'r+'\n)\n;\n\n\n  await\n filehandle\n.\ntruncate\n(\n4\n)\n;\n\n\n}\n finally\n {\n\n\n  await\n filehandle\n?.\nclose\n()\n;\n\n\n}\n\n\nmjs\ncop"
  },
  {
    "file": "node-fs.html",
    "term": "fsPromises.rename(oldPath, newPath)",
    "observed": "st\nbe mounted on \n/proc\n in order for this function to work. Glibc does not have\nthis restriction.\n\n\nfsPromises.rename(oldPath, newPath)\n#\nAdded in: v10.0.0\n\n\noldPath\n\u00a0\n<string>\n | \n<Buffer>\n | \n<URL>\n\n\nnewPath\n\u00a0\n<string>\n | \n<Buffer>\n | \n<URL>\n\n\nReturns: \n<Promise>\n Fulfills with\u00a0\nundefined\n upon success.\n\n\nRenames \noldPath\n to \nnewPath\n.\n\n\nfsPromises.rmdir(path[, options])\n#\nAdded in: v10.0.0\nHistory\nVersion\nChanges\nv25.0.0\nRemove \nrecursive\n option.\nv16.0.0\nUsing \nfsPromises.rmdir(path, { recursive: true })\n on a \npath\n that is a file is no longer permitted and results in an \nENOENT\n error on Windows and an \nENOTDIR\n error on POSIX.\nv16.0.0\nUsing \nfsPromises.rmdir(path, { recursive: true })\n on a \npath\n that does not exist is no longer permitted and results in a \nENOENT\n error.\nv16.0.0\nThe \nrecursive\n option is deprecated, using it triggers a deprecation warning.\nv14.14.0\nThe \nrecursive\n option is deprecated, use \nfsPromises.rm\n instead.\nv13.3.0, v12.16.0\nThe \nmaxBusyTries\n option i"
  },
  {
    "file": "node-fs.html",
    "term": "fsPromises.open(path, flags[, mode])",
    "observed": "ng an encoding, or an\nobject with an \nencoding\n property specifying the character encoding to use.\n\n\nfsPromises.open(path, flags[, mode])\n#\nAdded in: v10.0.0\nHistory\nVersion\nChanges\nv11.1.0\nThe \nflags\n argument is now optional and defaults to \n'r'\n.\n\n\npath\n\u00a0\n<string>\n | \n<Buffer>\n | \n<URL>\n\n\nflags\n\u00a0\n<string>\n | \n<number>\n See\u00a0\nsupport of file system \nflags\n.\n\nDefault:\n \n'r'\n.\n\n\nmode\n\u00a0\n<string>\n | \n<integer>\n Sets the file mode (permission and sticky bits)\nif the file is created. See\u00a0\nFile modes\n for more details.\n\nDefault:\n \n0o666\n (readable and writable)\n\n\nReturns: \n<Promise>\n Fulfills with a \n<FileHandle>\n object.\n\n\nOpens a \n<FileHandle>\n.\nRefer to the POSIX \nopen(2)\n documentation for more detail.\nSome characters (\n< > : \" / \\ | ? *\n) are reserved under Windows as documented\nby \nNaming Files, Paths, and Namespaces\n. Under NTFS, if the filename contains\na colon, Node.js will open a file system stream, as described by\n\nthis MSDN page\n.\n\n\nfsPromises.opendir(path[, options])\n#\nAdded in:"
  },
  {
    "file": "posix-rename.html",
    "term": "requires that the action of the function be atomic",
    "observed": "nd specifies behavior when the \nnew\n parameter names a file that\nalready exists. That specification requires that the action of the function be atomic.\n\n\nOne of the reasons for introducing this function was to have a means of renaming directories while permitting implementations to\nprohibit the use of \nlink\n()\n and \nunlink\n()\n\nwith directories, thus constraining links to directories to those made by \nmkdir\n()\n.\n\n\nThe specification that if \nold\n and \nnew\n refer to the same file is intended to guarantee that:\n\n\n\n\nrename(\"x\", \"x\");\n\n\n\ndoes not remove the file.\n\n\nRenaming dot or dot-dot is prohibited in order to prevent cyclical file system paths.\n\n\nSee also the descriptions of [ENOTEMPTY] and [ENAMETOOLONG] in \nrmdir\n()\n and [EBUSY]\nin \nunlink\n()\n. For a discussion of [EXDEV], see \nlink\n()\n.\n\n\nThe purpose of the \nrenameat\n() function is to rename files in directories other than the current working directory without\nexposure to race conditions. Any part of the path of a file could be chang"
  },
  {
    "file": "posix-rename.html",
    "term": "shall remain visible",
    "observed": "exists, it shall be removed and \nold\n\nrenamed to \nnew\n. In this case, a directory entry named \nnew\n shall remain visible to other threads throughout the\nrenaming operation and refer either to the file referred to by \nnew\n or \nold\n before the operation began.\n\n\nIf either \npathname\n argument refers to a path whose final component is either dot or dot-dot, \nrename\n() shall\nfail.\n\n\nIf the \nold\n argument points to a pathname of a symbolic link, the symbolic link shall be renamed. If the \nnew\n\nargument points to a pathname of a symbolic link, the symbolic link shall be removed.\n\n\nThe \nold\n pathname shall not name an ancestor directory of the \nnew\n pathname. Write access permission is required for\nthe directory containing \nold\n and the directory containing \nnew\n. If the \nold\n argument points to the pathname of a\ndirectory, write access permission may be required for the directory named by \nold\n, and, if it exists, the directory named by\n\nnew\n.\n\n\nIf the \nnew\n argument names an existing file an"
  }
]
```

Socket/Pi passages were printed before amendment: socket.mdx 131–145,617–626,725–769,868–887; extensions.md 50–65,243–265. The fresh source files and pasted API dumps are the references; no previous failed retrieval/parse is proof.

Required template and example opened in full; preserved all requirement IDs/fixed test or screenshot methods, both-host scope, no model guessing/title changes, Hermes preservation and separate execution authority. Final whole-document reread, source sweep, length, graph and whitespace gates are pending.

## hash-bounds-identity.json
```sh
node -e "const c=require('node:crypto'),f=require('node:fs'),p=require('node:path'); console.log(JSON.stringify({sha256:c.createHash('sha256').update('id\u0000example','utf8').digest('hex'),open:typeof f.promises.open,rename:typeof f.promises.rename,absolute:p.isAbsolute('/example'),maxCounterBytes:Buffer.byteLength(JSON.stringify({last:Number.MAX_SAFE_INTEGER})),inputKeys:['pi_model_id','pi_model_ref'].length}));"; /opt/homebrew/bin/git branch --show-current; /opt/homebrew/bin/git rev-parse HEAD
```
Cwd: `/Users/42piratas/42labs/herdr-radar-plus/.worktrees/docs/adhoc-L2130-pi-model-logo-spec`; exit code: 0
```text
{"sha256":"dbd4920b9568f39da10981eae4541060152eaa18fcbf9d1d2197a591da9e8531","open":"function","rename":"function","absolute":true,"maxCounterBytes":25,"inputKeys":2}
docs/adhoc-L2130-pi-model-logo-spec
6d3151132ffc0ecd2bc2f8fad01aee5661c940fd
```

## Crypto source opened during the untouched-claim sweep

```json
{
  "url": "https://nodejs.org/api/crypto.html",
  "retrieved_at": "2026-10-08T10:07:54.590075-03:00",
  "sha256": "95a4f04a73cd44279a1f20f65a2d285b83f055074f8eac820b5e98650a0ba12d",
  "passages": [
    {
      "term": "crypto.createHash(algorithm[, options])",
      "observed": "\ncrypto.createHash(algorithm[, options])\n#\nAdded in: v0.1.92\nHistory\nVersion\nChanges\nv26.9.0\nHash algorithms exposed by OpenSSL providers are now supported. The \nfunctionName\n and \ncustomization\n options were added for cSHAKE hash functions.\nv12.8.0\nThe \noutputLength\n option was added for XOF hash functions.\n\n\nalgorithm\n\u00a0\n<string>\n\n\noptions\n\u00a0\n<Object>\n\u00a0\nstream.transform\n options\n\n\n\n\ncustomization\n\u00a0\n<string>\n | \n<ArrayBuffer>\n | \n<Buffer>\n | \n<TypedArray>\n | \n<DataView>\n For cSHAKE\nhash functions, specifies the customization byte string.\u00a0\nDefault:\n an\nempty byte string.\n\n\nfunctionName\n\u00a0\n<string>\n | \n<ArrayBuffer>\n | \n<Buffer>\n | \n<TypedArray>\n | \n<DataView>\n For cSHAKE\nhash functions, specifies the NIST function-name byte string.\u00a0\nDefault:\n\nan empty byte string.\n\n\noutputLength\n\u00a0\n<number>\n For XOF hash functions, specifies the desired\noutput length in bytes.\n\n\n\n\n\n\nReturns: \n<Hash>\n\n\nCreates and returns a \nHash\n object that can be used to generate hash digests\nusing the given \nalgorithm\n. Optional \noptions\n argument controls stream\nbehavior. For XOF hash functions such as \n'shake256'\n, the \noutputLength\n option\ncan be used to specify the desired output length in bytes.\nThe \nfunctionName\n and \ncustomization\n options apply only to cSHAKE-128 and\ncSHAKE-256. They are supported only when Node.js is built with OpenSSL 4.0 or\nlater and the selected provider supports the corresponding digest parameters.\nStrings are encoded as UTF-8, and neither strings nor byte values may contain\nNUL bytes. Both options default to an empty byte string. For OpenSSL's built-in\nproviders, \nfunctionName\n"
    },
    {
      "term": "hash.update(data[, inputEncoding])",
      "observed": "\nhash.update(data[, inputEncoding])\n#\nAdded in: v0.1.92\nHistory\nVersion\nChanges\nv6.0.0\nThe default \ninputEncoding\n changed from \nbinary\n to \nutf8\n.\n\n\ndata\n\u00a0\n<string>\n | \n<Buffer>\n | \n<TypedArray>\n | \n<DataView>\n\n\ninputEncoding\n\u00a0\n<string>\n The\u00a0\nencoding\n of the \ndata\n string.\n\n\nUpdates the hash content with the given \ndata\n, the encoding of which\nis given in \ninputEncoding\n.\nIf \nencoding\n is not provided, and the \ndata\n is a string, an\nencoding of \n'utf8'\n is enforced. If \ndata\n is a \nBuffer\n, \nTypedArray\n, or\n\nDataView\n, then \ninputEncoding\n is ignored.\nThis can be called many times with new data as it is streamed.\n\n\nClass: \nHmac\n#\nAdded in: v0.1.94\n\n\nExtends: \n<stream.Transform>\n\n\nThe \nHmac\n class is a utility for creating cryptographic HMAC digests. It can\nbe used in one of two ways:\n\n\nAs a \nstream\n that is both readable and writable, where data is written\nto produce a computed HMAC digest on the readable side, or\n\n\nUsing the \nhmac.update()\n and \nhmac.digest()\n methods to produce the\ncomputed HMAC digest.\n\n\nThe \ncrypto.createHmac()\n method is used to create \nHmac\n instances. \nHmac\n\nobjects are not to be created directly using the \nnew\n keyword.\nExample: Using \nHmac\n objects as streams:\nconst\n {\n\n\n  createHmac\n,\n\n\n}\n =\n await\n import\n(\n'node:crypto'\n)\n;\n\n\n\n\nconst\n hmac \n=\n createHmac\n(\n'sha256'\n,\n 'a secret'\n)\n;\n\n\n\n\nhmac\n.\non\n(\n'readable'\n,\n ()\n =>\n {\n\n\n  // Only one element is going to be produced by the\n\n\n  // hash stream.\n\n\n  const\n data \n=\n hmac\n.\nread\n()\n;\n\n\n  if\n (data) \n{\n\n\n    console\n.\nlog\n(data\n.\ntoString\n(\n'hex'\n))\n;\n\n\n    // Prints:\n\n\n    //   7fd04df92f636fd45"
    },
    {
      "term": "hash.digest([encoding])",
      "observed": "\nhash.digest([encoding])\n#\nAdded in: v0.1.92\n\n\nencoding\n\u00a0\n<string>\n The\u00a0\nencoding\n of the return value.\n\n\nReturns: \n<Buffer>\n | \n<string>\n\n\nCalculates the digest of all of the data passed to be hashed (using the\n\nhash.update()\n method).\nIf \nencoding\n is provided a string will be returned; otherwise\na \nBuffer\n is returned.\nThe \nHash\n object can not be used again after \nhash.digest()\n method has been\ncalled. Multiple calls will cause an error to be thrown.\n\n\nhash.update(data[, inputEncoding])\n#\nAdded in: v0.1.92\nHistory\nVersion\nChanges\nv6.0.0\nThe default \ninputEncoding\n changed from \nbinary\n to \nutf8\n.\n\n\ndata\n\u00a0\n<string>\n | \n<Buffer>\n | \n<TypedArray>\n | \n<DataView>\n\n\ninputEncoding\n\u00a0\n<string>\n The\u00a0\nencoding\n of the \ndata\n string.\n\n\nUpdates the hash content with the given \ndata\n, the encoding of which\nis given in \ninputEncoding\n.\nIf \nencoding\n is not provided, and the \ndata\n is a string, an\nencoding of \n'utf8'\n is enforced. If \ndata\n is a \nBuffer\n, \nTypedArray\n, or\n\nDataView\n, then \ninputEncoding\n is ignored.\nThis can be called many times with new data as it is streamed.\n\n\nClass: \nHmac\n#\nAdded in: v0.1.94\n\n\nExtends: \n<stream.Transform>\n\n\nThe \nHmac\n class is a utility for creating cryptographic HMAC digests. It can\nbe used in one of two ways:\n\n\nAs a \nstream\n that is both readable and writable, where data is written\nto produce a computed HMAC digest on the readable side, or\n\n\nUsing the \nhmac.update()\n and \nhmac.digest()\n methods to produce the\ncomputed HMAC digest.\n\n\nThe \ncrypto.createHmac()\n method is used to create \nHmac\n instances. \nHmac\n\nobjects are not to be created directly "
    }
  ]
}
```

README.md 1–35, CHANGELOG.md 1–35 and original evidence/spec.txt 1–7 were opened; these references exist and support model-mark history and prospective documentation destinations. The Node probe printed two input keys and a 25-byte maximum-integer counter representation; the 64-byte read cap fits it. This probe is not a shipped implementation test.

Failed tooling lookup in this pass: attempting recheck/identity.json raised FileNotFoundError (execute-code exit 1); no absence claim relies on that result. The successful hash-bounds-identity.json and versions.json provide current identity/version evidence instead.

## Final recorded gates

```sh
env -i PATH=/opt/homebrew/bin:/usr/bin:/bin python3 specs/pi-model-logo/evidence/audit-spec.py && env -i PATH=/opt/homebrew/bin:/usr/bin:/bin python3 specs/pi-model-logo/evidence/amendment/audit-amendment.py && /opt/homebrew/bin/git diff --check
```
Cwd: `/Users/42piratas/42labs/herdr-radar-plus/.worktrees/docs/adhoc-L2130-pi-model-logo-spec`; exit code: 0
```text
{
  "verdict": "READY",
  "audit_passed": true,
  "counts": {
    "obligations": 38,
    "implementation_requirements": 18,
    "implementation_verifications": 18,
    "authoring_verifications": 1,
    "delivery_tasks": 5
  },
  "finding_statuses": {
    "report_findings": 8,
    "report_unknowns": 7,
    "report_taste": 4,
    "amendment_findings": 7,
    "coverage_subcriteria": 23,
    "resolved": 23,
    "disputed": 3,
    "escalated": 0
  },
  "rules_attended": 15,
  "length": {
    "before_bytes": 46695,
    "after_bytes": 27271,
    "before_words": 6065,
    "after_words": 3664,
    "before_lines": 341,
    "after_lines": 232
  },
  "cross_references": [
    "lib/logos.js",
    "lib/managed-config.js",
    "lib/state.js"
  ],
  "sequence_policy_cases": 96,
  "dependency_cycle": false,
  "orphan_tasks": 0,
  "spec_sha256": "30e9921892ecfc8545b4c12dd1283001e0afb93ec78745ccc88ce7aa03bacdc3",
  "assumptions": [],
  "implementation_tests_executed": false,
  "live_acceptance_executed": false,
  "deployment_executed": false,
  "scope": "structural/provenance/schema-bound and declared-policy audit; final semantic sweep is author judgment"
}
{
  "verdict": "READY",
  "audit_passed": true,
  "counts": {
    "obligations": 38,
    "implementation_requirements": 18,
    "implementation_verifications": 18,
    "authoring_verifications": 1,
    "delivery_tasks": 5
  },
  "finding_statuses": {
    "report_findings": 8,
    "report_unknowns": 7,
    "report_taste": 4,
    "amendment_findings": 7,
    "coverage_subcriteria": 23,
    "resolved": 23,
    "disputed": 3,
    "escalated": 0
  },
  "rules_attended": 15,
  "length": {
    "before_bytes": 46695,
    "after_bytes": 27271,
    "before_words": 6065,
    "after_words": 3664,
    "before_lines": 341,
    "after_lines": 232
  },
  "cross_references": [
    "lib/logos.js",
    "lib/managed-config.js",
    "lib/state.js"
  ],
  "sequence_policy_cases": 96,
  "dependency_cycle": false,
  "orphan_tasks": 0,
  "spec_sha256": "30e9921892ecfc8545b4c12dd1283001e0afb93ec78745ccc88ce7aa03bacdc3",
  "assumptions": [],
  "implementation_tests_executed": false,
  "live_acceptance_executed": false,
  "deployment_executed": false,
  "scope": "structural/provenance/schema-bound and declared-policy audit; final semantic sweep is author judgment"
}
```

The final full 232-line disk contract was personally reread after its last edit. Source and template checks agree; the body and all acceptance identities/methods are unchanged from this pass baseline, and the spec has not grown. Source receipt timestamps precede final reissue. All current finding rows and rule receipts, along with assumptions and verification limits, are reproduced in final-checks.json. Prior AM03 failure remains recorded as a historical failure, not repaired retroactively.

Assumptions: none. Feature tests, live host preflight/visual acceptance, activation/deployment and rollback remain unexecuted; no reviewer, implementation, provider request, commit/push/merge or live service change occurred.

**Version:** V2610081008. **Last updated:** 2026-10-08T10:08:50-03:00.
