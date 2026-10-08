import path from "node:path";
import fs from "node:fs";
import os from "node:os";
import { exec } from "node:child_process";
import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import { loadConfig, setSegments, type DynamicTitleConfig } from "./config.js";
import {
  formatTitle,
  shortModelName,
  type AgentStatus,
  type TitleState,
} from "./title-formatter.js";

export default function (pi: ExtensionAPI) {
  // ===== Configuration =====
  const config = loadConfig();

  // ===== State =====
  let status: AgentStatus = "idle";
  let modelName = "";           // Short model name (e.g. "claude-sonnet-4")
  let worktreeName = "";        // Git worktree name or cwd basename fallback
  let isUpdatingSelf = false;   // Guard flag to prevent infinite loops in setTitle wrapping
  let hasPrompts = false;       // Track if we have prompts in history or agent run started
  let cachedFirstPrompt = "";   // Cached first user message to avoid repeated array traversal in animation loop
  let currentCtx: ExtensionContext | null = null;
  let lastSessionName = "";
  let titleManagementEnabled = false;
  
  let finishedTimer: ReturnType<typeof setTimeout> | null = null;
  let delayedRefreshTimers: ReturnType<typeof setTimeout>[] = [];
  let sessionNamePollTimer: ReturnType<typeof setInterval> | null = null;

  // Focus-tracking state
  let supportsFocusEvents = false; // Set to true dynamically when focus events are received
  let isFocused = true;           // Assume focused initially

  // ===== Animation control =====
  let animationTimer: ReturnType<typeof setInterval> | null = null;
  let frameIndex = 0;

  // ===== Input Subscription =====
  let inputUnsubscribe: (() => void) | null = null;

  const titleRefreshDelaysMs = [50, 150, 400, 1000, 5000, 10000, 20000, 45000];

  function stopAnimation() {
    if (animationTimer) {
      clearInterval(animationTimer);
      animationTimer = null;
    }
    frameIndex = 0;
  }

  function isCliTitleContext(ctx: ExtensionContext): boolean {
    return Boolean(ctx.hasUI && process.stdin.isTTY && process.stdout.isTTY);
  }

  function getPromptTextFromEntries(entries: readonly any[]): string {
    const firstUserMsg = entries.find(
      (e: any) => e.type === "message" && e.message && e.message.role === "user"
    ) as any;
    if (!firstUserMsg || !firstUserMsg.message) return "";
    const content = firstUserMsg.message.content;
    if (typeof content === "string") return content;
    if (Array.isArray(content)) {
      return content
        .filter((c) => c && typeof c === "object" && c.type === "text" && typeof c.text === "string")
        .map((c) => c.text)
        .join("");
    }
    return "";
  }

  function getFirstUserPrompt(ctx: ExtensionContext): string {
    try {
      const branchPrompt = getPromptTextFromEntries(ctx.sessionManager.getBranch());
      if (branchPrompt) return branchPrompt;

      // On some resume/switch paths the current leaf can be late to settle; the
      // full entry list still gives us a stable first prompt fallback.
      return getPromptTextFromEntries(ctx.sessionManager.getEntries());
    } catch (err) {
      console.error("[pi-dynamic-title] failed to get first user prompt:", err);
    }
    return "";
  }

  function resolveSessionTitle(ctx: ExtensionContext): string {
    return pi.getSessionName() || cachedFirstPrompt || worktreeName;
  }

  function startAnimation(ctx: ExtensionContext) {
    if (!titleManagementEnabled || !isCliTitleContext(ctx)) return;
    if (!hasPrompts) return;
    stopAnimation();

    animationTimer = setInterval(() => {
      const frame = config.spinnerFrames[frameIndex % config.spinnerFrames.length];
      const title = formatTitle(
        {
          status: "running",
          agentName: config.agentName,
          modelName,
          worktreeName,
          sessionTitle: resolveSessionTitle(ctx),
          animationFrame: frame,
        },
        config
      );

      if (ctx.hasUI) {
        isUpdatingSelf = true;
        try {
          ctx.ui.setTitle(title);
        } finally {
          isUpdatingSelf = false;
        }
      }
      frameIndex++;
    }, config.animationInterval);
  }

  function updateTitle(ctx: ExtensionContext) {
    if (!titleManagementEnabled || !isCliTitleContext(ctx)) return;
    // Update the cache of the first user prompt to avoid branch traversal inside the 80ms animation timer
    const firstPrompt = getFirstUserPrompt(ctx);
    if (firstPrompt) {
      cachedFirstPrompt = firstPrompt;
      hasPrompts = true;
    }

    // If agent is currently running, the animation interval handles title updates.
    if (status === "running" && animationTimer) return;

    const title = formatTitle(
      {
        status,
        agentName: config.agentName,
        modelName,
        worktreeName,
        sessionTitle: resolveSessionTitle(ctx),
      },
      config
    );
    if (ctx.hasUI) {
      isUpdatingSelf = true;
      try {
        ctx.ui.setTitle(title);
      } finally {
        isUpdatingSelf = false;
      }
    }
  }

  // ===== Finished Status Fade-out =====
  function scheduleFinishedFade(ctx: ExtensionContext) {
    clearFinishedTimer();

    if (!supportsFocusEvents) {
      // If terminal doesn't support focus events, wait 5 seconds and fade out.
      finishedTimer = setTimeout(() => {
        if (status === "finished") {
          status = "idle";
          updateTitle(ctx);
        }
        finishedTimer = null;
      }, config.successDurationMs);
      return;
    }

    if (isFocused) {
      // If the user has been active in this window, wait 2 seconds and fade out.
      finishedTimer = setTimeout(() => {
        if (status === "finished") {
          status = "idle";
          updateTitle(ctx);
        }
        finishedTimer = null;
      }, 2000);
    }
  }

  function clearFinishedTimer() {
    if (finishedTimer) {
      clearTimeout(finishedTimer);
      finishedTimer = null;
    }
  }

  function clearDelayedRefreshTimers() {
    for (const timer of delayedRefreshTimers) {
      clearTimeout(timer);
    }
    delayedRefreshTimers = [];
  }

  function scheduleDelayedTitleRefreshes(ctx: ExtensionContext) {
    clearDelayedRefreshTimers();

    for (const delay of titleRefreshDelaysMs) {
      const timer = setTimeout(() => {
        if (currentCtx !== ctx) return;
        ensureUiWrapped(ctx);
        updateTitle(ctx);
      }, delay);
      timer.unref?.();
      delayedRefreshTimers.push(timer);
    }
  }

  function startSessionNamePolling() {
    stopSessionNamePolling();

    sessionNamePollTimer = setInterval(() => {
      const currentName = pi.getSessionName() || "";
      if (currentName !== lastSessionName) {
        lastSessionName = currentName;
        if (currentCtx) {
          if (currentName) {
            hasPrompts = true;
          }
          updateTitle(currentCtx);
        }
      }
    }, 1000);
    sessionNamePollTimer.unref?.();
  }

  function stopSessionNamePolling() {
    if (sessionNamePollTimer) {
      clearInterval(sessionNamePollTimer);
      sessionNamePollTimer = null;
    }
  }

  // Intercept extension-level setTitle calls so Pi/other extensions cannot leave
  // a raw title in place after our session context is ready.
  function ensureUiWrapped(ctx: ExtensionContext) {
    const ui = ctx.ui as any;
    if (!ui) return;

    try {
      // Wrap setTitle using Object.defineProperty to intercept all future assignments
      if (!ui.__setTitleWrapped) {
        let originalSetTitle = ui.setTitle;
        const currentSetTitle = function (newTitle: string) {
          if (isUpdatingSelf) {
            if (originalSetTitle) {
              originalSetTitle.call(ui, newTitle);
            } else {
              process.stdout.write(`\x1b]0;${newTitle}\x07`);
            }
            return;
          }
          if (titleManagementEnabled && isCliTitleContext(ctx)) {
            updateTitle(ctx);
          } else {
            if (originalSetTitle) {
              originalSetTitle.call(ui, newTitle);
            } else {
              process.stdout.write(`\x1b]0;${newTitle}\x07`);
            }
          }
        };
        (currentSetTitle as any).__isWrapped = true;

        Object.defineProperty(ui, "setTitle", {
          get() {
            return currentSetTitle;
          },
          set(newVal) {
            if (newVal === currentSetTitle) return;
            originalSetTitle = newVal;
          },
          configurable: true,
          enumerable: true,
        });
        ui.__setTitleWrapped = true;
      }
    } catch (err) {
      console.error("[pi-dynamic-title] failed to wrap UI context methods:", err);
    }
  }

  // ===== Helpers =====
  function refreshModelName(ctx: ExtensionContext) {
    const model = ctx.model;
    modelName = model ? shortModelName(model.id) : "";
  }

  function saveConfigToGlobalSettings() {
    const settingsDir = path.join(os.homedir(), ".pi", "agent");
    const settingsPath = path.join(settingsDir, "settings.json");
    try {
      let settings: any = {};
      if (fs.existsSync(settingsPath)) {
        settings = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));
      }
      if (!settings || typeof settings !== "object") {
        settings = {};
      }

      const existingDynamicTitle =
        settings.dynamicTitle && typeof settings.dynamicTitle === "object"
          ? settings.dynamicTitle
          : {};
      const {
        notifications: _notifications,
        notifyOnComplete: _notifyOnComplete,
        notifyMinDurationMs: _notifyMinDurationMs,
        ...dynamicTitleSettings
      } = existingDynamicTitle;

      settings.dynamicTitle = {
        ...dynamicTitleSettings,
        segments: config.segments,
        agentName: config.agentName,
        separatorChar: config.separatorChar,
        separatorPadding: config.separatorPadding,
        maxTitleLength: config.maxTitleLength,
      };

      if (!fs.existsSync(settingsDir)) {
        fs.mkdirSync(settingsDir, { recursive: true });
      }
      fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + "\n", "utf-8");
    } catch (err) {
      console.error("[pi-dynamic-title] failed to write global settings.json:", err);
    }
  }

  // ===== Event Listeners =====

  // Session start -> Load base settings and check saved/active state overrides
  pi.on("session_start", async (_event, ctx) => {
    currentCtx = ctx;
    lastSessionName = pi.getSessionName() || "";
    titleManagementEnabled = isCliTitleContext(ctx);
    clearDelayedRefreshTimers();
    stopSessionNamePolling();

    if (!titleManagementEnabled) {
      stopAnimation();
      clearFinishedTimer();
      if (inputUnsubscribe) {
        inputUnsubscribe();
        inputUnsubscribe = null;
      }
      return;
    }

    // Enable DECSET 1004 focus tracking
    if (process.stdout.isTTY) {
      process.stdout.write("\x1b[?1004h");
    }

    // Reset focus variables
    supportsFocusEvents = false;
    isFocused = true;

    // Load configs
    const baseConfig = loadConfig(ctx.cwd);
    Object.assign(config, baseConfig);

    const entries = ctx.sessionManager.getEntries();
    const hasUserMsg = entries.some(
      (e) => e.type === "message" && e.message.role === "user"
    );
    hasPrompts = hasUserMsg;
    cachedFirstPrompt = getFirstUserPrompt(ctx);

    status = "idle";
    refreshModelName(ctx);

    // Resolve default fallback name: Git worktree/repository root, then project directory, then empty.
    let fallbackName = "";
    try {
      // Resolve the top-level directory of the Git worktree/repository
      const gitRoot = await new Promise<string>((resolve, reject) => {
        exec("git rev-parse --show-toplevel", { cwd: ctx.cwd || process.cwd() }, (err, stdout) => {
          if (err) reject(err);
          else resolve(stdout.trim());
        });
      });
      if (gitRoot) {
        fallbackName = path.basename(gitRoot);
      }
    } catch {
      // ignore git error, fallback to CWD
    }

    if (!fallbackName) {
      fallbackName = path.basename(ctx.cwd || process.cwd());
    }

    worktreeName = fallbackName || "";

    // Wrap UI context immediately for interaction hooks
    ensureUiWrapped(ctx);

    // Setup raw terminal input listener for DECSET 1004 focus events
    if (inputUnsubscribe) {
      inputUnsubscribe();
      inputUnsubscribe = null;
    }

    inputUnsubscribe = ctx.ui.onTerminalInput((data: string) => {
      // \x1b[I -> Terminal Focus In
      if (data === "\x1b[I") {
        supportsFocusEvents = true;
        isFocused = true;
        if (status === "finished") {
          status = "idle";
          updateTitle(ctx);
        }
        return { consume: true };
      }
      // \x1b[O -> Terminal Focus Out
      if (data === "\x1b[O") {
        supportsFocusEvents = true;
        isFocused = false;
        clearFinishedTimer();
        return { consume: true };
      }
      return undefined;
    });

    startSessionNamePolling();
    updateTitle(ctx);
    scheduleDelayedTitleRefreshes(ctx);
  });

  // Model changes -> Update segment dynamically
  pi.on("model_select", async (event, ctx) => {
    currentCtx = ctx;
    modelName = shortModelName(event.model.id);
    updateTitle(ctx);
  });

  // Before agent start -> Reset states
  pi.on("before_agent_start", async (event, ctx) => {
    currentCtx = ctx;
    hasPrompts = true;
    if (event.prompt && !cachedFirstPrompt) {
      cachedFirstPrompt = event.prompt;
    }
    clearFinishedTimer();
    ensureUiWrapped(ctx);

    updateTitle(ctx);
  });

  // Agent loop begins -> Set to running and spin
  pi.on("agent_start", async (_event, ctx) => {
    currentCtx = ctx;
    status = "running";
    ensureUiWrapped(ctx);
    startAnimation(ctx);
  });

  // Agent loop terminates -> Stop animation and show completion state
  pi.on("agent_end", async (_event, ctx) => {
    currentCtx = ctx;
    stopAnimation();
    clearFinishedTimer();

    status = "finished";
    updateTitle(ctx);

    scheduleFinishedFade(ctx);
  });

  // Session shut down -> Clean up timers and unregister focus tracking
  pi.on("session_shutdown", async (_event, ctx) => {
    stopAnimation();
    clearFinishedTimer();
    clearDelayedRefreshTimers();
    stopSessionNamePolling();
    if (inputUnsubscribe) {
      inputUnsubscribe();
      inputUnsubscribe = null;
    }
    currentCtx = null;
    titleManagementEnabled = false;
    // Turn off DECSET 1004 Focus Tracking
    if (process.stdout.isTTY) {
      process.stdout.write("\x1b[?1004l");
    }
  });

  // ===== Commands Registration =====
  pi.registerCommand("dynamic-title", {
    description: "Manage dynamic title: segments, separator, max-length, rename",
    getArgumentCompletions: (prefix: string) => {
      const subcmds = ["segments", "separator", "max-length", "rename"];
      const matches = subcmds.filter((s) => s.startsWith(prefix));
      return matches.length > 0 ? matches.map((s) => ({ value: s, label: s })) : null;
    },
    handler: async (args, ctx) => {
      if (!isCliTitleContext(ctx)) return;
      ensureUiWrapped(ctx);
      const parts = args.trim().split(/\s+/);
      const subcmd = parts[0]?.toLowerCase();

      if (!subcmd) {
        // Main select menu
        const action = await ctx.ui.select("π Dynamic Title", [
          "Segments...",
          "Separator...",
          "Max Length...",
          "Rename Session...",
          "Show Config",
        ]);
        if (!action) return;
        if (action === "Segments...") await handleSegments(ctx);
        else if (action === "Separator...") await handleSeparator(ctx);
        else if (action === "Max Length...") await handleMaxLength(ctx);
        else if (action === "Rename Session...") await handleRename(ctx);
        else if (action === "Show Config") showConfig(ctx);
        return;
      }

      if (subcmd === "segments") {
        await handleSegments(ctx);
      } else if (subcmd === "separator") {
        await handleSeparator(ctx);
      } else if (subcmd === "max-length") {
        await handleMaxLength(ctx);
      } else if (subcmd === "rename") {
        await handleRename(ctx);
      } else {
        ctx.ui.notify("Usage: /dynamic-title [segments|separator|max-length|rename]", "info");
      }
    },
  });

  // Segments config menu
  async function handleSegments(ctx: ExtensionContext) {
    const presets = [
      {
        label: "agent | model | title  (default)",
        segments: ["agent", "model", "title"],
      },
      {
        label: "agent | worktree | model | title  (all 4)",
        segments: ["agent", "worktree", "model", "title"],
      },
      { label: "worktree | title", segments: ["worktree", "title"] },
      { label: "worktree", segments: ["worktree"] },
      { label: "title", segments: ["title"] },
      { label: "Custom...", segments: null },
    ];

    const choice = await ctx.ui.select("Title Segments", presets.map((p) => p.label));
    if (!choice) return;

    if (choice === "Custom...") {
      const custom = await ctx.ui.input(
        "Enter custom segments (separated by '|', e.g. agent | model)\n" +
        "Options: \x1b[90magent | worktree | model | title\x1b[0m",
        config.segments.join(" | ")
      );
      if (custom) {
        const result = setSegments(config, custom);
        if (result.ok) {
          hasPrompts = true;
          updateTitle(ctx);
          saveConfigToGlobalSettings();
          ctx.ui.notify(`Segments: ${config.segments.join(" | ")}`, "info");
        } else {
          ctx.ui.notify(result.error || "Invalid segments configuration", "error");
        }
      }
      return;
    }

    const preset = presets.find((p) => p.label === choice);
    if (preset && preset.segments) {
      config.segments = [...preset.segments] as any;
      hasPrompts = true;
      updateTitle(ctx);
      saveConfigToGlobalSettings();
      ctx.ui.notify(`Segments: ${config.segments.join(" | ")}`, "info");
    }
  }

  // Interactive session renaming
  async function handleRename(ctx: ExtensionContext) {
    const currentName = pi.getSessionName() || "";
    const newName = await ctx.ui.input(
      "Enter session name (leave blank to use default)",
      currentName
    );
    if (newName !== undefined) {
      const trimmed = newName.trim();
      pi.setSessionName(trimmed);
      hasPrompts = true;
      updateTitle(ctx);
      ctx.ui.notify(`Session renamed to: ${trimmed || "(default)"}`, "info");
    }
  }

  // Interactive separator configuration
  async function handleSeparator(ctx: ExtensionContext) {
    const charChoice = await ctx.ui.select("Select Separator Character", [
      "/  (Slash - default)",
      "|  (Vertical Line)",
      "-  (Dash)",
      "·  (Middle Dot)",
    ]);
    if (!charChoice) return;

    const newChar = charChoice.split(" ")[0];

    const paddingChoice = await ctx.ui.select("Select Separator Spacing", [
      "No spaces (e.g. status/agent/model - default)",
      "With spaces (e.g. status / agent / model)",
    ]);
    if (!paddingChoice) return;

    const newPadding = paddingChoice.includes("With spaces");

    config.separatorChar = newChar;
    config.separatorPadding = newPadding;
    hasPrompts = true;
    updateTitle(ctx);
    saveConfigToGlobalSettings();
    ctx.ui.notify(
      `Separator updated to: "${newPadding ? " " + newChar + " " : newChar}"`,
      "info"
    );
  }

  // Interactive max length configuration
  async function handleMaxLength(ctx: ExtensionContext) {
    const currentLen = config.maxTitleLength.toString();
    const newLen = await ctx.ui.input(
      "Enter maximum segment length (positive number)",
      currentLen
    );
    if (newLen !== undefined) {
      const parsed = parseInt(newLen.trim(), 10);
      if (isNaN(parsed) || parsed <= 0) {
        ctx.ui.notify("Invalid: must be a positive number", "error");
        return;
      }
      config.maxTitleLength = parsed;
      hasPrompts = true;
      updateTitle(ctx);
      saveConfigToGlobalSettings();
      ctx.ui.notify(`Max segment length updated to: ${parsed}`, "info");
    }
  }

  // Show config values
  function showConfig(ctx: ExtensionContext) {
    const displaySep = config.separatorPadding
      ? `"${config.separatorChar}" (with padding)`
      : `"${config.separatorChar}" (no padding)`;
    ctx.ui.notify(
      `Dynamic Title Config:\n` +
        `  segments: ${config.segments.join(" | ")}\n` +
        `  separator: ${displaySep}\n` +
        `  agentName: ${config.agentName}\n` +
        `  animationInterval: ${config.animationInterval}ms\n` +
        `  successDuration: ${config.successDurationMs}ms\n` +
        `  maxTitleLength: ${config.maxTitleLength}`,
      "info"
    );
  }

}
