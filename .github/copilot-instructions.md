# Copilot instructions (Hextech ARAM Wiki)

## Big picture
- This repo supports **Nuxt static generation** (framework-driven, can be deployed as plain static files).
- Most “content” is still **data-driven** (arrays/strings) and rendered into consistent card/tile markup.

## How to run locally

### Nuxt
- `npm install`
- `npm run dev` then open the printed URL (usually `http://localhost:3000`)

## Key files and responsibilities

### Nuxt version
- `pages/index.vue`: main page markup and filtering state (search + role) using Vue reactivity.
- `data/wikiData.ts`: all content data.
  - Data: `metaTiles`, `hextechMarkdown`, `champions`, `items`, `playbook`, `tips`, `roleLabels`.
- `utils/markdownToHtml.ts`: minimal markdown (supports `###` headings, `- ` lists, and paragraphs).
- `assets/styles.css`: global styling (same class names as the legacy version).
- `nuxt.config.ts`: app head, global CSS, color-mode module, and static generation preset.
- `plugins/primevue.ts`: PrimeVue plugin registration (no UI components required unless explicitly requested).

## Project conventions (follow these)
- Prefer updating **data arrays** over adding bespoke rendering logic.
  - Example: add a new champion by adding an object to `champions` with `{ name, role, build, micro, warning }`.
- Keep `role` values aligned with `roleLabels` and the role `<select>` in `pages/index.vue`.
- Keep markup consistent with existing class names (cards use `.card`, lists use `.card__list`, grids use `.grid--2`/`.grid--3`).
- Text/content is primarily Chinese; keep tone and formatting consistent.

## Safe editing guidelines for this repo
- Don’t introduce additional heavy dependencies unless explicitly requested.
- Avoid injecting user-controlled HTML.
  - Nuxt page uses `v-html` for `hextechMarkdown` after `markdownToHtml()`; keep `hextechMarkdown` as trusted, static content.
  - If you ever add externally sourced content, sanitize it first.

## Quick change checklists
- **Add a champion card**: edit `champions` in `data/wikiData.ts`.
- **Add a meta tile**: edit `metaTiles` in `data/wikiData.ts`.
- **Edit “Hextech mode” article**: edit `hextechMarkdown` in `data/wikiData.ts` (only `###` and `-` syntax is supported).
- **Add items/tips/playbook entries**: edit `items` / `tips` / `playbook` in `data/wikiData.ts`.

## Champion avatars (convention)
- Each champion markdown in `content/champions/*.md` can optionally define `avatar:` in frontmatter.
- Preferred source: Riot Data Dragon champion square icons.
  - Find the latest patch from: `https://ddragon.leagueoflegends.com/api/versions.json` (use the first entry).
  - URL format: `https://ddragon.leagueoflegends.com/cdn/<PATCH>/img/champion/<ChampionId>.png`
  - Examples:
    - Lux: `.../Lux.png`
    - Katarina: `.../Katarina.png`
    - Seraphine: `.../Seraphine.png`
