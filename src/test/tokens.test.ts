import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

// Read from disk: vitest stubs CSS imports, so `?raw` would come back empty.
const tokens = readFileSync(resolve(__dirname, "../tokens.css"), "utf8");

describe("tokens.css", () => {
  it.each([
    ["--atlas-color-bg", "#070d18"],
    ["--atlas-color-accent", "#d4a64a"],
    ["--atlas-color-documented", "#6fbf8e"],
    ["--atlas-color-inferred", "#e0a458"],
  ])("declares %s", (name, value) => {
    expect(tokens).toContain(`${name}: ${value};`);
  });
});
