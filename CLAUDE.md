# atlas-migracoes-design-system

Before changing anything, read the ecosystem docs in the main repo: `../atlas-migracoes/docs/ai/README.md` (architecture, conventions, non-negotiables).

Quick rules: each component gets `Name.tsx` + `Name.module.css` + `Name.test.tsx` + `index.ts` and is exported from `src/index.ts`; use `--atlas-*` tokens only; bump the version on public API changes. Verify with `yarn lint && yarn typecheck && yarn test && yarn build`.

## Scope and PR workflow (decided by Alisson, 2026-10-17)

- This design system belongs to the Atlas Migrações Leste-Sul platform only (a separate package from `@alishenriques/design-system`, by decision). Components stay content-agnostic: every visible text is a prop, so the app controls language (PT/EN) and data.
- Visual reference: the dark Atlas screens in the project deck (`ap_MIGRACOES.pptx`, slides 12–21): night-blue surfaces, one gold accent, serif headings, small uppercase sans labels.
- Big changes: new branch, then a detailed PR (what changed, what problem it solves, new or changed components with what they are for and a usage snippet, the version bump, architecture decisions, how it was verified). **Never merge without Alisson's explicit approval on the PR**; he reviews by commenting, so reply and fix on the same branch.
