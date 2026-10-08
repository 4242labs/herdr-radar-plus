import fs from "node:fs";
import path from "node:path";
import os from "node:os";

export type TitleSegment = "agent" | "worktree" | "model" | "title";

export interface DynamicTitleConfig {
  /** Enabled segments, at least one required. Default: ["agent", "model", "title"] */
  segments: TitleSegment[];
  /** Agent display name. Default: "π" */
  agentName: string;
  /** Spinner frame interval in ms. Default: 80 */
  animationInterval: number;
  /** Duration in ms to show the success dot ● in title. Default: 5000 (5 seconds) */
  successDurationMs: number;
  /** Spinner frame characters */
  spinnerFrames: string[];
  /** Separator character (e.g. "/", "|", "-", "·"). Default: "·" */
  separatorChar: string;
  /** Add padding spaces around separator. Default: true */
  separatorPadding: boolean;
  /** Maximum characters per segment before truncating with "…". Default: 50 */
  maxTitleLength: number;
}

const DEFAULT_SEGMENTS: TitleSegment[] = ["agent", "model", "title"];

export const DEFAULT_CONFIG: DynamicTitleConfig = Object.freeze({
  segments: [...DEFAULT_SEGMENTS],
  agentName: "π",
  animationInterval: 80,
  successDurationMs: 5000,
  spinnerFrames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
  separatorChar: "·",
  separatorPadding: true,
  maxTitleLength: 50,
});

const VALID_SEGMENTS = new Set<string>(["agent", "worktree", "model", "title"]);

/** Parse segment options string (e.g. "status | agent | model | title") */
export function parseSegments(input: string): TitleSegment[] | null {
  const separator = input.includes("|") ? "|" : /\s+/;
  const parts = input.trim().split(separator);
  const segments: TitleSegment[] = [];
  
  for (const part of parts) {
    const trimmed = part.trim().toLowerCase();
    if (!trimmed) continue;
    if (VALID_SEGMENTS.has(trimmed)) {
      segments.push(trimmed as TitleSegment);
    } else {
      return null; // Invalid segment detected
    }
  }
  return segments.length > 0 ? segments : null;
}

/** Recursively read settings from a settings object (from settings.json) */
function mergeSettingsJson(config: DynamicTitleConfig, settingsObj: any) {
  if (!settingsObj || typeof settingsObj !== "object") return;
  const dt = settingsObj.dynamicTitle;
  if (!dt || typeof dt !== "object") return;

  if (Array.isArray(dt.segments)) {
    const parsed = dt.segments.filter((s: any) => typeof s === "string" && VALID_SEGMENTS.has(s)) as TitleSegment[];
    if (parsed.length > 0) config.segments = parsed;
  }
  if (typeof dt.agentName === "string" && dt.agentName.trim()) config.agentName = dt.agentName.trim();
  if (typeof dt.animationInterval === "number" && dt.animationInterval > 0) config.animationInterval = dt.animationInterval;
  if (typeof dt.successDurationMs === "number" && dt.successDurationMs >= 0) config.successDurationMs = dt.successDurationMs;
  if (Array.isArray(dt.spinnerFrames) && dt.spinnerFrames.length > 0 && dt.spinnerFrames.every((f: any) => typeof f === "string")) {
    config.spinnerFrames = dt.spinnerFrames;
  }
  if (typeof dt.separatorChar === "string") config.separatorChar = dt.separatorChar;
  if (typeof dt.separatorPadding === "boolean") config.separatorPadding = dt.separatorPadding;
  if (typeof dt.maxTitleLength === "number" && dt.maxTitleLength > 0) config.maxTitleLength = dt.maxTitleLength;
}

/** Load config by merging defaults, settings.json, and env variables */
export function loadConfig(cwd: string = process.cwd()): DynamicTitleConfig {
  const config = { ...DEFAULT_CONFIG };

  // 1. Load from Global settings.json (~/.pi/agent/settings.json)
  try {
    const home = os.homedir();
    const globalSettingsPath = path.join(home, ".pi", "agent", "settings.json");
    if (fs.existsSync(globalSettingsPath)) {
      const globalSettings = JSON.parse(fs.readFileSync(globalSettingsPath, "utf-8"));
      mergeSettingsJson(config, globalSettings);
    }
  } catch (err) {
    console.error("[pi-dynamic-title] failed to load global settings.json:", err);
  }

  // 2. Load from Project settings.json (cwd/.pi/settings.json)
  try {
    const projectSettingsPath = path.join(cwd, ".pi", "settings.json");
    if (fs.existsSync(projectSettingsPath)) {
      const projectSettings = JSON.parse(fs.readFileSync(projectSettingsPath, "utf-8"));
      mergeSettingsJson(config, projectSettings);
    }
  } catch (err) {
    console.error("[pi-dynamic-title] failed to load project settings.json:", err);
  }

  // 3. Environment variable overrides
  if (process.env.PI_DYNAMIC_TITLE_SEGMENTS) {
    const parsed = parseSegments(process.env.PI_DYNAMIC_TITLE_SEGMENTS);
    if (parsed && parsed.length > 0) config.segments = parsed;
  }
  if (process.env.PI_DYNAMIC_TITLE_AGENT_NAME) {
    config.agentName = process.env.PI_DYNAMIC_TITLE_AGENT_NAME;
  }

  return config;
}

/** Modify segments configuration dynamically, returning whether it succeeded */
export function setSegments(config: DynamicTitleConfig, input: string): { ok: boolean; error?: string } {
  if (input === "reset") {
    config.segments = [...DEFAULT_SEGMENTS];
    return { ok: true };
  }
  const parsed = parseSegments(input);
  if (!parsed) {
    return {
      ok: false,
      error: "Invalid segments. Supported options: status, agent, worktree, model, title",
    };
  }
  config.segments = parsed;
  return { ok: true };
}
