# herdr-radar-plus

[![Project Status: Active](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
[![Maintenance](https://img.shields.io/badge/maintenance-passively--maintained-yellowgreen.svg)](CONTRIBUTING.md)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Herdr plugin](https://img.shields.io/badge/herdr-plugin-0797ff.svg)](https://herdr.dev/plugins/)

> Your Herdr agents, sorted by what needs you, in groups you name, across every machine you run.

<p align="center"><img src="assets/demo.gif" alt="The Agents panel: a finished agent and a blocked one rise to the top, then two agents move into a REVIEW group" width="348"></p>

[herdr-radar](https://github.com/hhdebb/herdr-radar), plus:

| Feature | What you see |
|:--|:--|
| **Attention view** | Blocked and done agents first, idle next, working last. |
| **Named groups** | One key moves the focused agent between groups you name. |
| **Groups across machines** | Agents from every [connected machine](https://herdr.dev/docs/connecting-machines/) share one set of groups. |
| **Model mark** | A second logo names the model family. Hermes on Claude shows both. |
| **Machine row** | A grey line under each agent names its machine. |

Twenty-four vendors have a mark of their own. Everything else, colours, settings,
troubleshooting, is herdr-radar's. [Its README](https://github.com/hhdebb/herdr-radar#readme)
covers it.

## Install

Using herdr-radar? Remove it first. Two plugins cannot share one panel.

```sh
herdr plugin action invoke hhdebb.herdr-radar.unconfigure
herdr plugin uninstall hhdebb.herdr-radar
```

Then:

```sh
herdr plugin install 4242labs/herdr-radar-plus
```

Needs Herdr 0.9.0+ and Node 18+.

The icon font maps itself in Ghostty and kitty. Other terminals: map `U+E1A0–U+E1B7` and
`U+E1C0–U+E1C5` by hand.

## Keys

Add to Herdr's `config.toml`:

```toml
[[keys.command]]
key = "prefix+a"
type = "plugin_action"
command = "4242labs.herdr-radar-plus.view-flip"   # active -> attention -> recent

[[keys.command]]
key = "prefix+up"
type = "plugin_action"
command = "4242labs.herdr-radar-plus.lane-up"     # focused agent: one group up

[[keys.command]]
key = "prefix+down"
type = "plugin_action"
command = "4242labs.herdr-radar-plus.lane-down"   # focused agent: one group down
```

## Groups

Name them in `lanes.json`, in the plugin's state directory. List order is screen order.

```sh
$EDITOR ~/.local/state/herdr/plugins/4242labs.herdr-radar-plus/lanes.json
```

```json
{ "groups": ["NOW", "REVIEW", "PARKED"], "panes": {} }
```

Dividers show once two groups have members. The keys fill `panes` for you.

### Across machines

Pick one machine as the hub. List the others as `peers`, by SSH host name:

```json
{ "groups": ["NOW", "REVIEW"], "panes": {}, "peers": ["buildbox"] }
```

The hub keeps one SSH link per peer and syncs every move. Each peer needs:

- The plugin at the same path under `$HOME` as on the hub.
- `ssh <peer>` working without a prompt.
- `node` on the `PATH` of a non-interactive SSH shell.

## Model mark

Read from the pane title. Knows Claude, GPT, Gemini, DeepSeek, Qwen, Grok, GLM and Kimi.
Add one with a regex line in `MODEL_FAMILIES`, [`lib/logos.js`](lib/logos.js).

## Uninstall

```sh
herdr plugin action invoke 4242labs.herdr-radar-plus.unconfigure
herdr plugin action invoke 4242labs.herdr-radar-plus.uninstall-font
herdr plugin uninstall 4242labs.herdr-radar-plus
```

## Credits

Built on [hhdebb/herdr-radar](https://github.com/hhdebb/herdr-radar) 1.3.15, MIT, full history
kept. Icon font from [qintmb/herdr-icon-agent-ui](https://github.com/qintmb/herdr-icon-agent-ui).
Font and mark sources in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md). Fixes to herdr-radar itself belong
[upstream](https://github.com/hhdebb/herdr-radar).

## Contributors

<!-- contributors:start -->
<!-- contributors:end -->

## License

Open source — [MIT](LICENSE).

---
If it earned its keep, [coffee is appreciated](https://buymeacoffee.com/42piratas). ☕
