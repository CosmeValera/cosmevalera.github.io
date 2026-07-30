# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — installs `zola-bin`, an npm wrapper that ships the Zola binary, so no separate Zola install (scoop/brew/cargo) is needed.
- `npm start` — runs `zola serve` and hosts the site at http://localhost:1111/
- `npm run build` — one-shot build into `public/` (gitignored); the only way to verify a change compiles, since there are no test/lint scripts.
- Deployment: GitHub Actions (`.github/workflows/main.yml`) runs `shalzz/zola-deploy-action` on push to `master`, publishing to the `gh-pages` branch.

Prerequisites: Node.js ≥ 20 (required by `zola-bin`).

Zola version: `zola-bin@^1.0.0` pins Zola **0.19.2**. Do not bump to `zola-bin@2.x` (Zola 0.21/0.22) without migrating `config.toml` — 0.22 renamed the `[markdown]` keys `highlight_code`/`highlight_theme` to a `highlighting` table and now rejects unknown fields. Note CI's deploy action is pinned to Zola 0.16.1, older than local.

This file lives at the repo root. `AGENTS.md`, its sibling, is a copy for non-Claude agents — keep both in sync when editing either. Claude-specific config sits one level down in `.claude/`: `settings.local.json` (permissions) and `skills/` (e.g. `.claude/skills/commit/SKILL.md`).

## Architecture

This is a [Zola](https://www.getzola.org) static site (personal portfolio + blog at cosmevalera.dev). Zola compiles `content/` (Markdown) + `templates/` (Tera) + `sass/` (SCSS) into `public/`.

### Bilingual content (EN / ES)
`default_language = "en"` with a parallel `[languages.es]` block in `config.toml`. Every page has two files: `name.md` (English) and `name.es.md` (Spanish); ES pages are served under `/es/...`. All user-facing strings live in `config.toml` under `[translations]` and `[languages.es.translations]` — when adding UI text, add keys to **both** tables and reference them in templates via `{{ trans(key="...", lang=lang) }}`.

### Content layout
- `content/blog/` — dated posts (`YYYY-MM-DD-slug.md` + `.es.md`). See `content/README.md` for scheduling semantics and `content/README-tags-in-blogs.md` for the tag system.
- `content/readings/` — one Markdown file per book; the card data lives in front matter `[extra]`: `author`, `cover_image`, `rating`, `key_insights` (array). Rendered by `templates/reading_card.html`.
- `content/projects/_index.md` and `content/sponsor/` — near-empty stubs that only select a template; their real content is in the templates (see below).
- `content/cv/_index.md` (+ `.es.md`) — the whole CV dataset in front matter `[extra]` (see below).
- `content/blog/2000-01-01-template.md` — starting template for new posts.

### Where project data actually lives
Projects are **not** content files. Each project card is hardcoded markup in `templates/projects.html` (`.project-card`, with `<span class="tag">` entries driving the tech filter) and, for the featured subset, again in `templates/index.html`. Only the descriptions are externalized, as `proj_*` translation keys in `config.toml`. Adding or editing a project therefore touches: `templates/projects.html`, optionally `templates/index.html`, and both `[translations]` tables. Home-page cards use shorter `proj_*_short` keys because the full descriptions get clipped at that width.

### Where CV data actually lives
The CV is the opposite of projects: fully data-driven. `content/cv/_index.md` and `content/cv/_index.es.md` hold every entry in front matter — profile scalars plus `[[extra.experience]]`, `[[extra.projects]]`, `[[extra.skills]]`, `[[extra.education]]`, `[[extra.languages]]` — and `templates/cv.html` only loops over them, so editing the CV means editing those two Markdown files and nothing else. Section headings are the exception: they are UI chrome and live in `config.toml` as `cv_*` translation keys in both tables. `sass/cv.scss` ends with an `@media print` block, so the page itself prints as a clean one-column CV alongside the PDF in `static/assets/`. A company that held several positions omits `role` and lists them under `[[extra.experience.roles]]`, which must come last in that entry (in TOML every key after the first sub-table header belongs to it). The CV is deliberately **not** in `lateral-menu.html`: the only way in is the trailing "See my CV" link inside the home page's `.status-badge`, which already names the current job, so no second current-role block is needed on the home page.

### Blog post front matter
```toml
+++
title = "..."
template = "blog-post.html"
description = "..."          # feeds <meta description>, OpenGraph and JSON-LD
date = YYYY-MM-DD
[taxonomies]
tags = ["bitcoin", "finance"]
[extra]
cover_image = "/images/blog/<slug>/cover-webp.webp"   # also the OG/Twitter preview image
custom_word_count = 1765     # optional override for the reading-time footer
+++
```

### Blog scheduling convention
Filename date in the future: the post displays today's date (updating per commit) until the scheduled date arrives. Use `draft = true` in front matter to hide in-progress posts. The date-swap logic lives in `templates/blog.html` (see `content/README.md` for the exact Tera snippet).

### Blog tags
Tag list is defined in `config.toml` as `extra.blog_post_tags`. Each post must have ≥1 topic tag as its **first** tag; optional helper tags (`recommended`, `for-beginners`) go **last** and trigger icon badges. Every tag also needs matching translation keys in both `[translations]` tables. Full rules in `content/README-tags-in-blogs.md`.

### Blog series
The Bitcoin series is assembled implicitly: `templates/blog.html` collects posts whose **title starts with `BTC 1`**, sorts them by title, and renders the series carousel. Series links append `?mode=series`; `templates/related-container.html` + `static/js/blog-post.js` read that query param to swap the "related posts" block for prev/next series navigation. Renaming a `BTC 1*` post silently changes series membership and ordering.

### Templates
Tera templates in `templates/` — `base.html` is the layout root; page templates (`index.html`, `blog.html`, `blog-post.html`, `projects.html`, `readings.html`, `sponsor.html`, `cv.html`) and `templates/tags/{list,single}.html` extend it. `lateral-menu.html` and `related-container.html` are includes/macros. Shortcodes live in `templates/shortcodes/` (e.g. `seasonal_image` picks an image from the current month).

`base.html` also owns the SEO head block: title/description/OG/Twitter/canonical and EN↔ES `hreflang` links, all derived from `page`/`section` `title`, `description` and `extra.cover_image`. `blog-post.html` adds a `BlogPosting` JSON-LD block. New pages should set `description` and `extra.cover_image` or they fall back to generic values.

### Assets wiring (per-page CSS/JS)
`base.html` loads globally: Bootstrap 5.3 CDN, Google Fonts, FontAwesome kit, Cronitor RUM, `main.css`, and `js/lateralMenu.js`, `js/themeToggle.js`, `js/easter-egg.js`. Each page template then adds its own bundle via `{% block styles %}` / `{% block scripts %}` — e.g. `blog.html` pulls `blog.css` + `js/blog.js`. Adding a page means wiring both blocks.

### Styles
SCSS in `sass/` compiled by Zola (`compile_sass = true`). Every top-level (non-underscore) file compiles to a same-named `.css`: `main.scss` (global, just `@import 'core'`), plus `index`, `blog`, `blog-post`, `projects`, `readings`, `sponsor`, `cv`, `tags-list`, `tags-single`. Partials: feature files at `sass/_*.scss`, shared helpers in `sass/utils/` and `sass/components/`, imported as `@import 'utils/mixins'` / `@import 'components/reading-card'`. `_core.scss` is the shared bundle (variables, mixins, base, layout, lateral menu, grid background); `_variables.scss` holds the tokens. Page entry files import `variables` + the `utils/` mixins directly rather than all of `main`, so a new page stylesheet must import them itself.

### Static assets
`static/` is copied verbatim to the site root — includes `CNAME` (custom domain), `fontawesome/`, `fonts/`, `images/` (subfoldered by `blog/`, `home/`, `projects/`, `readings/`), and hand-written `js/` (no bundler; plain scripts).

## Conventions

- Commit subjects are short and imperative ("Improve SEO", "Add tags to RabbitHole"); commits carry no `Co-Authored-By` trailer. See `.claude/skills/commit/SKILL.md`.
- `content/README-example-prompt-create-imgs.md` holds the prompt template used to generate blog cover images.
