// Offline research receipt: exercise installed Pi host title ordering, not a shipping extension.
// No Pi session, provider, credentials, process terminal, transcript or network is created.
import assert from 'node:assert/strict';
import { InteractiveMode } from '/opt/homebrew/lib/node_modules/@earendil-works/pi-coding-agent/dist/modes/interactive/interactive-mode.js';
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let title = '';
let name = 'opus-project';
let selected = 'gpt-5';
let interval;
let writes = 0;
const host = {
  session: {},
  sessionManager: { getCwd: () => '/offline/qwen-research', getSessionName: () => name },
  ui: {
    terminal: {
      setTitle: (value) => {
        title = value;
        writes++;
      },
    },
  },
  applyRuntimeSettings() {},
  subscribeToAgent() {},
  updateAvailableProviderCount() {},
  updateEditorBorderColor() {},
  updateTerminalTitle: InteractiveMode.prototype.updateTerminalTitle,
  async bindCurrentSessionExtensions() {
    const ui = InteractiveMode.prototype.createExtensionUIContext.call(this);
    assert.equal(typeof ui.setTitle, 'function');
    interval = setInterval(
      () => ui.setTitle(`π - ${name} - qwen-research | pi-model:v1=${encodeURIComponent(selected)}`),
      250,
    );
    interval.unref();
    // A later extension/resources await exceeds the first timer callback.
    await pause(400);
  },
};
try {
  await InteractiveMode.prototype.rebindCurrentSession.call(host);
  assert.equal(title, 'π - opus-project - qwen-research');
  await pause(300);
  assert.equal(title, 'π - opus-project - qwen-research | pi-model:v1=gpt-5');
  selected = 'gemini-2.5-pro';
  name = 'renamed';
  await pause(300);
  assert.equal(title, 'π - renamed - qwen-research | pi-model:v1=gemini-2.5-pro');
  clearInterval(interval);
  host.updateTerminalTitle();
  const before = writes;
  await pause(300);
  assert.equal(writes, before);
  assert.equal(title, 'π - renamed - qwen-research');
  console.log(
    JSON.stringify({
      passed: true,
      actualInstalledMethods: ['rebindCurrentSession', 'createExtensionUIContext.setTitle', 'updateTerminalTitle'],
      scenarios: [
        'delayed post-hook overwrite',
        'next 250ms callback repairs',
        'fresh name and model read',
        'timer retirement plus normal title',
      ],
      providerRequests: 0,
      liveSessions: 0,
    }),
  );
} finally {
  clearInterval(interval);
}
