import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src"],
      exclude: ["src/**/*.test.ts", "src/**/*.test.tsx", "src/test"],
    }),
  ],
  build: {
    lib: {
      entry: resolve(rootDir, "src/index.ts"),
      name: "AtlasDesignSystem",
      fileName: "index",
      formats: ["es"],
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        assetFileNames: (asset) =>
          asset.name?.endsWith(".css") ? "atlas-design-system.css" : asset.name ?? "asset",
        // The whole library bundles into one file and interactive components need
        // client hooks, so the bundle is client-only. Rollup strips inline
        // "use client" directives from source files, so it's re-added here.
        banner: '"use client";',
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      // Barrels only re-export; the test setup is not library code
      // (see the ecosystem's architecture.md, "Test coverage").
      exclude: ["src/**/index.ts", "src/**/*.d.ts", "src/test/**", "src/**/*.test.{ts,tsx}"],
      reporter: ["text", "text-summary", "json-summary", "html"],
      // A floor, not a target: raise it whenever coverage goes up, never lower it.
      thresholds: {
        statements: 100,
        branches: 95,
        functions: 100,
        lines: 100,
      },
    },
  },
});
