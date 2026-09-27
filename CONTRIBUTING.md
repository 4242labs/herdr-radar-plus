# Contributing

Bug reports, questions and pull requests are all welcome. Open an
[issue](https://github.com/4242labs/herdr-radar-plus/issues/new) for the first two.

## Where a change belongs

This repo is [herdr-radar](https://github.com/hhdebb/herdr-radar) plus a small set of features:
the attention view, named groups, groups across machines, the model mark and the machine row.
A fix to anything else, such as vendor logos, state marks, the settings popup or the font, is
better sent upstream. It reaches this repo when upstream is merged in, and every herdr-radar user
gets it too.

The plus features live in:

| File | What |
|:--|:--|
| `lib/lanes.js` | Group store, presence, divider ownership. Self-test: `node lib/lanes.js` |
| `bin/lane.js` | The `lane-up` / `lane-down` actions |
| `bin/lane-sync.js` | Hub and spoke sync over SSH |
| `lib/frame.js` | `laneLayout`, `laneJobs`: dividers, gaps, indents |
| `lib/view.js` | The `attention` sort, the default order |
| `lib/logos.js` | `modelFor`, the model families |
| `lib/state.js`, `lib/managed-config.js` | Model and machine tokens and their sidebar cells |

## Working on it

```sh
npm ci
npm run check     # identity, vendor roster, font and README invariants
npm test          # node --test
npm run prove     # the checks above can still fail
npm run format    # prettier
node lib/lanes.js # group store self-test
```

Link a checkout into Herdr to try a change live:

```sh
herdr plugin link .
herdr plugin action invoke 4242labs.herdr-radar-plus.state-stop
herdr plugin action invoke 4242labs.herdr-radar-plus.state-start
```

## Pull requests

- One change per pull request, with CI green.
- Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`.
- Say which of the plus features it touches, or that it touches none.

## Licence of contributions

By submitting a pull request you agree that your contribution is licensed under the same MIT
terms as the rest of the project. See [LICENSING.md](LICENSING.md).
