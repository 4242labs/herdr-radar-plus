# Pi model-logo documentation research

Scope: primary-documentation and source research only; no implementation, installation, upgrade, provider request, new session or runtime change.

## Version distinction
GitHub releases/latest returned Pi v1.1.0, published 2026-10-07T22:26:31Z. The deployment baseline previously observed is Pi 1.0.4. Latest upstream guidance was compared with the v1.0.4 tagged API/source; no upgrade is authorized or needed merely to access session_start, model_select and ctx.model.

## Official evidence
- Pi extensions documentation requires session-scoped resource creation/cleanup and TUI guards. Public ctx.ui.setTitle exists, but startup binding is followed by InteractiveMode's own updateTerminalTitle. The official titlebar-spinner example concerns animation while working; it does not demonstrate persistent selected-model display on idle startup/restoration.
- Herdr socket documentation explicitly recommends pane.report_metadata for display customization without taking over lifecycle authority. Pane token patches are exposed through pane/agent get/list, and null clears a token. Different reporters are not separate token namespaces: latest accepted key update wins. Tokens are not restored across a server restart. Values are normalized and capped at 80 characters.
- A narrow metadata-based candidate therefore must use a distinct input token such as pi_model_id rather than model, which Radar already uses for its rendered glyph; only Radar should own the existing output glyph keys. This is an author recommendation, not an authorized or live-verified design.

## Community evidence and forum qualification
- The author-maintained @narumitw/pi-herdr README and source publish selected-model metadata on session_start/model_select and other lifecycle events, coalesce unchanged values, clear unavailable fields and clear on shutdown. It uses a 30-minute TTL refresh, not four title writes per second. This establishes a concrete implementation precedent, not production reliability or compatibility with our existing managed integration.
- Its broad widget/lifecycle behavior and model token naming make direct installation inappropriate without explicit scope/compatibility review. Our installed managed herdr-agent-state.ts itself instructs custom hooks to live beside it; do not hand-edit that managed file.
- Upstream issue #3686 is a historical report for Pi 0.70.2 about session naming/title restoration. Maintainer badlogic explicitly reported it fixed on April 25, 2026, with regression coverage. It is not evidence of a current Pi 1.0.4 defect or a ready-made model-logo solution.
- Also inspected the author-maintained fangwangme/pi-dynamic-title implementation: it uses delayed refreshes, periodic session-name polling and Object.defineProperty interception of ui.setTitle. It does not establish a supported, polling-free solution to our title-ownership problem; do not adopt it merely because its README advertises model display.

## Research conclusion and remaining design obligations
A separate event-driven metadata producer and a Pi-only Radar consumer is evidence-backed as a candidate without continuous terminal-title rewriting. No end-to-end success is claimed. Before a READY amended spec, define token naming and size/family handling, shutdown/model-unknown clearing, ordering/session replacement, bounded transport failure behavior and re-publication after a Herdr server restart. Preserve Hermes and the current managed lifecycle integration. Do not hide the community implementation's timer/TTL recovery policy behind the phrase timer-free.

The existing title-based spec remains BLOCKED; this research does not silently replace it or approve implementation.
