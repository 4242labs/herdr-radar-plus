# Infra: herdr-radar-plus

What changes when the code changes: deploy, environment, build/run, per-host install state.

## Pi model-logo extension (42L-2130)

`extensions/pi-model-logo.js` is a separate file installed into Pi's own
per-user extensions directory, outside this repo's own install/build. It is
infra per host, not per checkout: copying the repo elsewhere does nothing on
its own.

**Hosts with it installed:**

| Host | Installed at | Pi extensions dir |
|:--|:--|:--|
| Darkseid | 2026-10-08 | `~/.pi/agent/extensions/pi-model-logo.js` |
| Alghul | 2026-10-08 | `~/.pi/agent/extensions/pi-model-logo.js` |

**Install/update procedure, per host:**

1. `cp extensions/pi-model-logo.js ~/.pi/agent/extensions/pi-model-logo.js`
2. First install only, per pane that will use it: provision that pane's
   durable sequence counter (`~/.pi/agent/pi-model-logo-state/`) by calling
   `provisionZeroCounterWithEvidence(true)` from the extension module with
   `HERDR_SOCKET_PATH` and `HERDR_PANE_ID` set for that pane. A pane with no
   counter silently declines to publish — this is the spec's refusal
   behavior, not a bug, but it means **every new Pi pane on a host needs
   this step once**, not just the first pane.
3. Restart the running `herdr-radar-plus` sidebar daemon
   (`bin/agent-state.js --stop` then `bin/agent-state.js --animate`) so the
   consumer half (`lib/pi-model.js`, `lib/state.js`) picks up the installed
   code. A long-running daemon started before a merge does not pick up the
   merge on its own.
4. Reload or start a new Pi session for the extension file itself to load.

Health check: `herdr pane get <pane_id>` should show `pi_model_id` and
`pi_model_ref` tokens once a Pi pane has run `session_start`, and a `model`
token once the daemon resolves them.

See `README.md` → "Model mark" for the user-facing feature description.
