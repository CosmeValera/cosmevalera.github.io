# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Commands

- `npm start` — runs `zola serve` and hosts the site at http://localhost:1111/
- No build/test/lint scripts are defined. Deployment is handled by GitHub Actions (`.github/workflows/main.yml`) using `shalzz/zola-deploy-action` on push to `master`, publishing to the `gh-pages` branch.

Prerequisites: Node.js ≥ 16.13.2 and Zola ≥ 0.17.2 installed locally.

## Architecture

This is a [Zola](https://www.getzola.org) static site (personal portfolio + blog at cosmevalera.dev). Zola compiles `content/` (Markdown) + `templates/` (Tera) + `sass/` (SCSS) into `public/`.

### Bilingual content (EN / ES)
`default_language = "en"` with a parallel `[languages.es]` block in `config.toml`. Every page has two files: `name.md` (English) and `name.es.md` (Spanish). All user-facing strings live in `config.toml` under `[translations]` and `[languages.es.translations]` — when adding UI text, add keys to **both** tables and reference them in templates via `{{ trans(key="...") }}`.

### Content layout
- `content/blog/` — dated posts (`YYYY-MM-DD-slug.md` + `.es.md`). See `content/README.md` for scheduling semantics and `content/README-tags-in-blogs.md` for the tag system.
- `content/projects/`, `content/readings/`, `content/sponsor/` — section pages.
- `content/blog/2000-01-01-template.md` — starting template for new posts.

### Blog scheduling convention
Filename date in the future → the post displays today's date (updating per commit) until the scheduled date arrives. Use `draft = true` in front matter to hide in-progress posts. The date-swap logic lives in `templates/blog.html` (see `content/README.md` for the exact Tera snippet).

### Blog tags
Tag list is defined in `config.toml` as `extra.blog_post_tags`. Each post must have ≥1 topic tag as its **first** tag; optional helper tags (`recommended`, `for-beginners`) go **last** and trigger icon badges. Full rules in `content/README-tags-in-blogs.md`.

### Templates
Tera templates in `templates/` — `base.html` is the layout root; page-specific templates (`blog.html`, `blog-post.html`, `projects.html`, `readings.html`, `sponsor.html`, `index.html`) extend it. Shortcodes live in `templates/shortcodes/`. Tag pages are in `templates/tags/`.

### Styles
SCSS in `sass/` compiled by Zola (`compile_sass = true`). `index.scss` and `main.scss` are the entry points; partials are split by feature (`_blog-cards.scss`, `_blog-filters.scss`, etc.). Variables in `_variables.scss`.

### Static assets
`static/` is copied verbatim to the site root — includes `CNAME` (custom domain), `fontawesome/`, `fonts/`, `images/`, and any hand-written `js/`.
