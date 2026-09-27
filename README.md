# herdr-radar-plus

[![Project Status: Active](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
[![Maintenance](https://img.shields.io/badge/maintenance-passively--maintained-yellowgreen.svg)](CONTRIBUTING.md)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Herdr plugin](https://img.shields.io/badge/herdr-plugin-0797ff.svg)](https://herdr.dev/plugins/)

> Your Herdr agents, sorted by what needs you, in groups you name, across every machine you run.

A [Herdr](https://herdr.dev) plugin built on [herdr-radar](https://github.com/hhdebb/herdr-radar).
Everything herdr-radar does is here: vendor logos and colours, state marks that hold until you
look, idle rows that fade. On top of it, the Agents panel gets a new default order. Agents that
are waiting on you come first, idle ones next, busy ones last. You can sort them into named
groups with one key, and those groups hold even when your agents run on more than one machine.

## What it adds

| Feature | What you see |
|:--|:--|
| **Attention view** | Blocked and done agents at the top, idle next, working last. Newest first inside each tier. The default order. |
| **Named groups** | Move the focused agent up or down a group with a key. A divider names each group once two of them have members. |
| **Groups across machines** | Herdr can show agents from other machines in one panel. Their groups stay in one list, with one divider per group. |
| **Model mark** | A second logo beside the harness logo names the model family. Hermes running Claude shows both marks. |
| **Machine row** | A grey line under each agent names the machine it runs on. |

The other halves of a split screen draw as plain rows, which herdr-radar 1.3.18 also made the
default.

## Install

```sh
herdr plugin install 4242labs/herdr-radar-plus
```

> [!IMPORTANT]
> **Remove herdr-radar first if you have it.** Both plugins write the same sidebar blocks, and
> two daemons fighting over one panel is what you will get otherwise:
>
> ```sh
> herdr plugin action invoke hhdebb.herdr-radar.unconfigure
> herdr plugin uninstall hhdebb.herdr-radar
> ```
>
> Your herdr-radar settings do not carry over. They lived in herdr-radar's own config
> directory. Set them again from the settings popup.

On its first start the plugin sets itself up. It writes three managed blocks into Herdr's
`config.toml`, fenced by marker comments. It installs the icon font into your user font
directory, no admin rights needed. And it writes the codepoint map into Ghostty or kitty
configs if they exist.

If the sidebar has not changed after installing, start the daemon once:

```sh
herdr plugin action invoke 4242labs.herdr-radar-plus.state-start
```

Requires Herdr 0.9.0+ and Node 18+.

### Keys

Paste into `config.toml`. They go through Herdr's prefix (`ctrl+b` by default), so they cannot
collide with anything running inside a pane:

```toml
[[keys.command]]
key = "prefix+up"
type = "plugin_action"
command = "4242labs.herdr-radar-plus.lane-up"     # focused agent: one group up

[[keys.command]]
key = "prefix+down"
type = "plugin_action"
command = "4242labs.herdr-radar-plus.lane-down"   # focused agent: one group down

[[keys.command]]
key = "prefix+a"
type = "plugin_action"
command = "4242labs.herdr-radar-plus.view-flip"   # order: active -> attention -> recent

[[keys.command]]
key = "prefix+comma"
type = "plugin_action"
command = "4242labs.herdr-radar-plus.settings"    # settings popup
```

On Ghostty, `cmd+up` and `cmd+down` work too once Ghostty lets go of them. Add
`keybind = super+arrow_up=unbind` and `keybind = super+arrow_down=unbind` to Ghostty's
config.

### From a checkout

```sh
git clone https://github.com/4242labs/herdr-radar-plus.git
herdr plugin link ./herdr-radar-plus
herdr plugin action invoke 4242labs.herdr-radar-plus.state-start
```

`plugin link` runs no build step. The daemon does the same setup on its first start, which is
what the third line is for.

### Or hand it to an agent

```text
Install the herdr-radar-plus plugin for Herdr on this machine.

1. If `herdr plugin list` shows hhdebb.herdr-radar, run
   `herdr plugin action invoke hhdebb.herdr-radar.unconfigure`, then
   `herdr plugin uninstall hhdebb.herdr-radar`.
2. herdr plugin install 4242labs/herdr-radar-plus
3. herdr plugin action invoke 4242labs.herdr-radar-plus.state-start
4. Check it took: `herdr plugin list` shows 4242labs.herdr-radar-plus as enabled,
   and `herdr agent list` shows `sort_key` and `lane` tokens on panes running an agent.

Do NOT run `herdr server stop`, and do not kill the Herdr process. That ends
every program in every pane, including whatever is running you.

Needs Herdr 0.9.0 or newer and Node 18 or newer. Troubleshooting is at
https://github.com/4242labs/herdr-radar-plus
```

## The attention view

```
✓ ✳ Wire retry budget into dispatcher    ← done: waits for you to look
? ✳ Which env file should I edit?        ← blocked: it is asking you
  DARKSEID
── REVIEW ───────────────
✳ ✳ Trace duplicate charges              ← idle, most recent first
  ALGHUL
⣟ ✳ Implement OAuth scopes               ← working: last, it does not need you
  DARKSEID
```

The panel answers one question: who needs me now? Done and blocked agents share the top tier,
because both wait on you. Idle agents come next, then the ones still working. Inside a tier the
newest activity wins.

It is the order a fresh install lands on. `prefix+a` steps through the plugin's three orders:
`active`, then `attention`, then `recent`. The settings popup's `order` row sets it too.

## Groups

Groups split the attention view into named sections. Every agent starts in the first group.
`lane-up` and `lane-down` move the focused one. A group's divider shows only while at least two
groups have members, so a single group looks like no groups at all.

The names live in `lanes.json`, in the plugin's state directory:

```sh
$EDITOR ~/.local/state/herdr/plugins/4242labs.herdr-radar-plus/lanes.json
```

```json
{ "groups": ["NOW", "REVIEW", "PARKED"], "panes": { "DARKSEID/w6:p3": 1 } }
```

Rename a group or add one by editing `groups`. The order of the list is the order on screen.
The panel repaints the moment you save. `panes` maps a pane to its group index. You never need
to edit it by hand, the keys do that.

## Groups across machines

[Herdr can attach panes from other machines](https://herdr.dev/docs/connecting-machines/) (`herdr machine add`).
Each machine's Herdr server paints its own rows, so without help each machine would keep its own
groups and draw its own dividers. Two things fix that.

**One machine is the hub.** It lists the others under `peers` in its `lanes.json`, by SSH host
name:

```json
{ "groups": ["NOW", "REVIEW"], "panes": {}, "peers": ["buildbox"] }
```

The hub's daemon keeps one SSH link open to each peer. Every change to groups or membership
crosses it at once. Each machine owns its own panes, and the hub owns the group names, so rename
groups on the hub. A dropped link retries every 10 seconds.

**Dividers are drawn once.** Each machine writes where its rows fall in each group to
`presence.json`. The machine holding a group's first row draws its divider. The one holding the
last row draws the gap after it. Ties go to the lower hostname.

What a peer needs:

- The plugin installed the same way as on the hub, so it sits at the same path under `$HOME`.
- `ssh <peer>` working without a prompt: key auth, `BatchMode` is on.
- `node` on the `PATH` of a non-interactive SSH shell. `~/.local/bin` is added for you.

Pane keys carry the machine name, `HOST/pane`. `HOST` is the short hostname in capitals. Set
`HERDR_RADAR_HOST` to override it.

## Model mark

The mark beside the harness logo names the model family the agent runs. It is read from the
pane title, where Hermes and many statuslines print the model id. When the title names none,
single-vendor harnesses fall back to their own: `claude` shows Claude, `codex` shows GPT,
`gemini` shows Gemini.

Families with a mark: Claude, GPT, Gemini, DeepSeek, Qwen, Grok, GLM, Kimi. Adding one is a
regex line in `MODEL_FAMILIES` in `lib/logos.js`, plus a glyph in the font.

## Machine row

The second line under each agent names its machine in capitals, aligned under the state mark.
It is what tells two panes apart when the same agent runs on two machines.

## What the rows look like

```
dashboard
  ⣟ ✳ Implement OAuth scopes            ← working: braille spinner, title in the vendor's colour
  ✓ ✳ Wire retry budget into dispatcher ← done: green tick, held until you look
  └─  feature/mc-13200                  ← a worktree under its repository
    ? Λ Which env file should I edit?   ← blocked: a pulsing red mark, it is asking you
billing
  ✳ Trace duplicate charges             ← idle: just stopped
  ✳ Migrate invoices table              ← idle for two hours: the whole row dims
```

One row per agent: logo, title, colour by state, motion and marks in front of the title. The
sketch shows the `active` order, which keeps the workspace groups and ranks by activity at both
levels. `recent` is a flat list by activity, and `attention` is described above. The whole panel can be handed
back to Herdr's own rendering from the settings popup.

## What the colours mean

Two things are worth knowing about a row at a glance, and they are carried separately: the
**logo** says whose agent it is, the **title** says what that agent is doing. Neither reading
depends on the other.

The logo wears the vendor's own colour, and only ever the one the vendor publishes. A brand
that signs itself in black or white has no hue to borrow, so its mark is simply drawn in ink —
black on a light panel, white on a dark one — rather than in a colour this project invented for
it. Nothing about a row's state changes the logo.

The title carries the state, and shape carries it too, so the panel still reads without colour:

| State | Title | In front of it |
| --- | --- | --- |
| working | the vendor's colour | a braille spinner, turning |
| waiting on you | red | a question mark, pulsing |
| done | green | a tick, held until you focus the pane |
| idle | the freshness scale, below | a ring |
| unknown | violet | a ring |

Green and red are semantic and outrank branding: they are there to pull the eye, so no vendor
colour is allowed to be either. A working title takes its vendor's hue rather than one shared
"busy" colour because with thirty rows on screen the hue is what separates one running session
from the next before any of them is read.

**Idle is a gradient, not a state.** Once an agent stops, the only question left is how long
ago, so the title cools with the time since its last turn: the first 15 minutes read as just
stopped, then plain text out to two hours, after which the whole row dims — logo, marks and all
— and sinks to the bottom of its group. Both thresholds are settings
(`activity_fresh_minutes`, `activity_stale_minutes`). All three tiers draw the same ring, and
colour alone says which one: a mark that changed shape as it aged would have to be learned
three times.

The Spaces column takes the same vendor colours, so a workspace running Claude and one running
Gemini are told apart there too.

## Which agents it knows

Twenty-four vendors have a mark of their own:

<!-- prettier-ignore -->
| | | | |
| --- | --- | --- | --- |
| <img src="assets/marks/amp.svg" width="15" align="top"> Amp | <img src="assets/marks/agy.svg" width="15" align="top"> Antigravity | <img src="assets/marks/claude.svg" width="15" align="top"> Claude Code | <img src="assets/marks/cline.svg" width="15" align="top"> Cline |
| <img src="assets/marks/codex.svg" width="15" align="top"> Codex | <img src="assets/marks/copilot.svg" width="15" align="top"> Copilot | <img src="assets/marks/cursor.svg" width="15" align="top"> Cursor | <img src="assets/marks/deepseek.svg" width="15" align="top"> DeepSeek |
| <img src="assets/marks/devin.svg" width="15" align="top"> Devin | <img src="assets/marks/gemini.svg" width="15" align="top"> Gemini | <img src="assets/marks/glm.svg" width="15" align="top"> GLM | <img src="assets/marks/gpt.svg" width="15" align="top"> GPT |
| <img src="assets/marks/grok.svg" width="15" align="top"> Grok | <img src="assets/marks/hermes.svg" width="15" align="top"> Hermes | <img src="assets/marks/kilo.svg" width="15" align="top"> Kilo | <img src="assets/marks/kimi.svg" width="15" align="top"> Kimi |
| <img src="assets/marks/kiro.svg" width="15" align="top"> Kiro | <img src="assets/marks/maki.svg" width="15" align="top"> Maki | <img src="assets/marks/mastracode.svg" width="15" align="top"> Mastra | <img src="assets/marks/omp.svg" width="15" align="top"> Oh My Pi |
| <img src="assets/marks/opencode.svg" width="15" align="top"> OpenCode | <img src="assets/marks/pi.svg" width="15" align="top"> Pi | <img src="assets/marks/qodercli.svg" width="15" align="top"> Qoder | <img src="assets/marks/qwen.svg" width="15" align="top"> Qwen |

Herdr detects three more — Droid, Letta and Muse — and none publishes a mark this project can use.
Those rows behave like any other — state, colour, ordering, grouping — they just wear the
generic mark instead of one of their own. A pull request adding either is welcome; the marks
for Antigravity and Kiro arrived that way.

Anything else Herdr recognises is shown the same way: the generic mark, a colour of its own,
and everything else intact.

### When the process name is not the vendor

A GLM session runs the stock `claude` binary against an Anthropic-compatible endpoint, so
Herdr detects `claude` — correctly, and always will. The same is true of any wrapper around
a known binary. Detection cannot see through that, and neither can this plugin: what the
pane is doing is known only to whoever started it.

So let the wrapper say so. Herdr keeps a display-only field for exactly this, and one line
before the `exec` fills it in:

```sh
herdr pane report-metadata "$HERDR_PANE_ID" --source user:cglm --display-agent glm
exec claude "$@"
```

The row then wears the GLM mark and name. `--clear-display-agent` takes it back. A value
this plugin does not recognise is ignored rather than blanking the row, so a human label
such as `Claude: auth` still leaves the Claude mark in place.

## Settings

`prefix+,` opens the settings popup: `↑↓` select, `←→` change, `↵` edit a text value, `r`
reset to default, `s` save and apply, `q` close. Saving rewrites only the changed lines of
the config file and restarts the daemon.

| Option | Default | Does |
| --- | --- | --- |
| `agents_panel` | `plugin` | this plugin's panel, or `herdr` for Herdr's own |
| `order` | `attention` | `attention` by what needs you, in your groups / `active` grouped by activity / `recent` flat / `off` Herdr's order |
| `variant` | `auto` | logos from the icon font (`font`), plain Unicode (`text`), or `none`; `auto` recognises the font the plugin installed |
| `done_hold` | `until_seen` | keep the tick until the pane is focused, or a number of seconds |
| `blocked_hold` | `true` | keep the question mark until the agent works again |
| `idle_grace_seconds` | `2.5` | idle must persist this long to count as a finished turn |
| `activity_fresh_minutes` | `15` | how long after the last turn a pane still reads as fresh |
| `activity_stale_minutes` | `120` | how long without a turn before the row dims |
| `group_indent` | `2` | member indent under a header; `0` for a flat list |
| `group_gap` | `true` | a blank row between groups |
| `split_corner` | `false` | hang the other panes of a split screen off the first with a `├─` corner |
| `reorder_workspaces` | `false` | make Herdr's workspace indices follow the panel's activity order |
| `show_tab` | `false` | tab number in front of the title |
| `trim_group_prefix` | `true` | drop the workspace name from a title when the header above already shows it |
| `worktree_mark` | `U+F418` | the mark on a worktree header, needs a Nerd Font; empty for none |
| `follow_appearance` | `true` | switch Herdr's theme with the desktop's light/dark |
| `colors.active_row_bg_light` | `#b9cdf2` | selected-row fill for a light theme; empty keeps the theme's own |
| `colors.active_row_bg_dark` | `#414868` | selected-row fill for a dark theme |

Set `reorder_workspaces = true` to make Herdr's actual workspace order follow the panel's
most-active-first order, so the Spaces list reads in the same order as the Agents panel and
the indexed jump lands on the row you are looking at. Worktree families stay together;
workspaces with nothing running keep their relative order at the end, and the reorder stops
while the panel is handed back to Herdr's own order. It is off by default because it changes
the global Spaces order, which every connected client sees, and because the order then moves
as you work — the number that reaches a project today is not the one that reaches it tomorrow.

Herdr leaves the workspace jump **unbound by default** — `switch_tab` ships as `prefix+1..9`,
the workspace one does not ship at all — so bind it before expecting the keys to do anything:

```toml
[keys]
switch_workspace = "prefix+shift+1..9"
```

The first two are live state; the rest live in
`$(herdr plugin config-dir 4242labs.herdr-radar-plus)/config.toml` and can be edited by hand —
then `state-stop` and `state-start`. The file appears the first time the popup saves; before
that, create it with the keys above (booleans unquoted: `group_gap = false`).

## Troubleshooting

Start with `herdr plugin log list --plugin 4242labs.herdr-radar-plus --limit 20`: every plugin command
leaves its output and errors there.

<details>
<summary><b>Font installed, logos still show as boxes or question marks</b></summary>

The terminal has not reloaded its fonts. Open a new window; if that is not enough, quit the
terminal and reopen it. macOS keeps an extra cache: `killall fontd fontworker`, then reopen.
</details>

<details>
<summary><b>A logo renders as a random CJK character</b></summary>

Another font claimed the same Private Use Area — CJK fonts often do. The terminal must map the
codepoints to `Herdr Agent Icons Max`; adding it as a fallback family is not enough. Ghostty /
kitty: `herdr plugin action invoke 4242labs.herdr-radar-plus.install-font` writes the map. Other
terminals: map `U+E1A0–U+E1B7` and `U+E1C0–U+E1C5` by hand. Terminals with no codepoint map
(Windows Terminal, iTerm): use `dist/JetBrainsMonoHerdr-Regular.ttf` as the terminal font —
JetBrains Mono with the icons patched in.

On Ghostty, `ghostty +show-face` is the only command that says whether the map resolved;
`+show-config` and `+list-fonts` pass either way. The map written by v1.3.7 and earlier was
inert — it quoted the family name, so run the install action once more.
</details>

<details>
<summary><b>Nothing changed after installing</b></summary>

The daemon is not running: `herdr plugin action invoke 4242labs.herdr-radar-plus.state-start`. If it
still does not, read that command's output in the plugin log
(`herdr plugin log list --plugin 4242labs.herdr-radar-plus --limit 20`). The usual causes: no
Node 18+ on the PATH Herdr sees, no `[ui]` table in `config.toml` for the managed block to
attach to. A table the plugin writes that is already in your file is not one: see the next entry.
</details>

<details>
<summary><b>A toast says a block was skipped, or <code>configure failed (exit 1)</code></b></summary>

Your `config.toml` already has a `[theme.custom]` or `[ui.sidebar.*]` table — as a header, a
dotted key (`custom.name = …` under `[theme]`) or an inline table. The plugin writes those
tables itself, and TOML allows each table once, so the block that would collide stays out and
the rest installs: without the sidebar block the Agents panel is Herdr's own; without the theme
block your theme keeps its colours. To have the plugin's, delete your table and run the
configure action again, then put any keys the block does not set back inside it. Older
versions refused the whole install instead, with the reason only in the plugin log
(`herdr plugin log list --plugin 4242labs.herdr-radar-plus --limit 20`).
</details>

<details>
<summary><b>Changed a setting, nothing happened</b></summary>

The daemon reads its config at start. `s` in the settings popup restarts it; after a hand edit,
`state-stop` then `state-start`. Editing the three managed blocks in `config.toml` directly
does not stick — the next `configure` writes them back.
</details>

<details>
<summary><b>The tab bar path disappeared, or shows in one workspace only</b></summary>

Herdr drops the whole status area when it is one column too wide rather than truncating it.
Lower the `HERDR_RADAR_TABBAR_MAX` environment variable (default 48) or narrow the sidebar. Or
Herdr's client and server versions differ (`restart_needed: yes` in `herdr status`):
`herdr server stop` and reopen.
</details>

<details>
<summary><b>On Windows the tab bar shows the directory a pane started in</b></summary>

Herdr cannot follow `cd` on Windows. Source `shell/herdr-osc7.zsh` / `.bash` from your
`~/.zshrc` or `~/.bashrc` so the shell reports it; applies to panes opened afterwards.
</details>

<details>
<summary><b>The settings popup closes at once</b></summary>

On Windows, `herdr plugin pane open` needs `--cwd <plugin directory>`; without it Herdr hands
the pane an extended-length path Git Bash cannot enter. The bound `prefix+,` already passes it.
</details>

<details>
<summary><b>The agent is asking me something, but there is no question mark</b></summary>

The plugin does no detection of its own; it mirrors Herdr's verdict. Herdr recognises
`blocked` from the shape of the dialog on screen and treats anything it does not recognise as
idle. `herdr agent explain <pane> --verbose` shows which rules matched.
</details>

## Uninstall

In this order — `unconfigure` stops the daemon, clears every token it wrote and removes the
managed blocks, and it needs the plugin still installed to be invoked at all:

```sh
herdr plugin action invoke 4242labs.herdr-radar-plus.unconfigure
herdr plugin action invoke 4242labs.herdr-radar-plus.uninstall-font
herdr plugin uninstall 4242labs.herdr-radar-plus
```

What stays is the state directory with its config backups,
`~/.local/state/herdr/plugins/4242labs.herdr-radar-plus` (`%LOCALAPPDATA%\herdr\plugins\...` on
Windows); delete it by hand if you want nothing left.

## How it works

One resident daemon, woken by Herdr's event stream, takes a snapshot from `herdr agent list`
each frame and writes only states, groups and sort keys as sidebar tokens. No network, except
the SSH links a hub opens to the peers you list for shared groups. Outside
Herdr's config and its own state directory it reads one thing, the tail of a session's own
transcript, to give panes older than the plugin a last-activity time. Like every Herdr plugin
it runs as your user and Herdr does not sandbox it — read `herdr-plugin.toml` and `bin/` before
installing if that matters to you.

## Credits

Built on [hhdebb/herdr-radar](https://github.com/hhdebb/herdr-radar) 1.3.18, MIT, with its full
history kept here. herdr-radar was itself forked from
[qintmb/herdr-icon-agent-ui](https://github.com/qintmb/herdr-icon-agent-ui), which contributed the
icon font and the one-codepoint-per-logo idea. Vendor marks in the font belong to their owners;
sources in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). `dist/JetBrainsMonoHerdr-Regular.ttf`
is JetBrains Mono modified and renamed under the SIL OFL 1.1; the licence text ships as
`dist/OFL.txt`.

## Contributing

Bug reports, questions and pull requests are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md)
first. A fix that belongs to herdr-radar itself is better sent
[upstream](https://github.com/hhdebb/herdr-radar), and it reaches this repo from there.

## Contributors

<!-- contributors:start -->
<!-- contributors:end -->

## License

Open source — [MIT](LICENSE).

---
If it earned its keep, [coffee is appreciated](https://buymeacoffee.com/42piratas). ☕
