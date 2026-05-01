+++
title = "SPAs vs SSGs vs Meta-frameworks"
template = "blog-post.html"
description = "When to use React, Vue, Zola, Astro or Next/Nuxt; and the cost of picking the wrong tool for the job"
[taxonomies]
tags = ["frontend", "architecture"]
[extra]
cover_image = "/images/blog/2026-05-06-ssg-vs-spas-vs-meta-frameworks/cover-image.webp"
+++

![blog-cover](/images/blog/2026-05-06-ssg-vs-spas-vs-meta-frameworks/cover-image.webp)

> **TL;DR**
> - **SPAs / interactive apps** built with React, Vue and Angular are best for stateful interfaces.
> - **SSGs** like Zola and Astro are best for content-heavy sites: blogs, portfolios and landing pages.
> - **Meta-frameworks** like Next.js and Nuxt are best when you need both interactivity and content pages in the same project.
> - **Documentation SSGs** like VitePress and Docusaurus are SSGs specialized for documentation.
> - The wrong tool can still work, but it usually costs you performance, simplicity, or developer experience.

Someone spent three weeks building a content pipeline in React: Markdown parsing, frontmatter, route generation, RSS..., before realising Astro ships all of that for free. The code worked. It just didn't need to exist.

The question isn't *which framework is best?*

The real question is: **what kind of website am I building?**

---

<h4>The practical buckets</h4>

There are three big families: SSGs, SPAs, and meta-frameworks. Documentation tools get their own note because their defaults differ from a normal blog or portfolio.

**1. Static Site Generators (SSGs):** Astro, Zola, Hugo, Jekyll

They take content (usually Markdown) + templates and using a build command they generate plain HTML/CSS/JS (the built pages are stored in a `dist`/`public` folder). In production, the page already exists as a file; the browser just downloads it. Great for content-heavy sites. 

Tools like VitePress, Docusaurus and Nextra are SSGs too, but their defaults assume you're documenting a library (sidebars, search, code-focused navigation). For a blog or portfolio, pick Astro or Zola instead.

**2. SPAs / interactive apps:** React, Vue, Angular, Svelte

React, Vue, Angular and Svelte are commonly used to build *SPAs*: interactive apps where JavaScript handles routing, state, and UI updates in the browser. Best for stateful UIs behind a login, where SEO usually matters less. Angular in particular is mostly used for enterprise app-first projects; it has SSR support but no widely-adopted meta-framework equivalent to Next or Nuxt.

**3. Meta-frameworks:** Next.js, Nuxt, SvelteKit

They sit on top of React/Vue/Svelte and add routing, SSG, SSR, data loading, and deployment conventions. Use them when static content pages and app-like pages need to live in the same codebase: e-commerce (static product pages, interactive cart), SaaS (static marketing, full SPA dashboard), or a blog platform (generated posts, interactive editor). If your needs are cleanly one side or the other, a meta-framework is overkill.

![Comparison table of SSGs, SPAs, documentation SSGs and meta-frameworks](/images/blog/2026-05-06-ssg-vs-spas-vs-meta-frameworks/table.jpeg)

---

<h4>The cost of picking the wrong tool</h4>

You *can* use any of these for any use case, but you pay a price when the tool doesn't match the problem.

*Using React for a blog:*
- You build your own content pipeline from scratch (Markdown parsing, frontmatter, route generation, syntax highlighting, RSS...). SSGs give you all of this for free.
- You usually ship much more JavaScript than a content site actually needs.
- SEO and initial load can suffer if content depends too much on client-side rendering.

*Using Zola for an interactive app:*
- No built-in component model, declarative rendering, or reactivity system.
- State management with plain JS gets messy fast once you have more than a couple of interacting pieces.
- You start reinventing what React/Vue already solve well.

*Using Next.js when Astro or Zola is enough:*
- You add more concepts, dependencies, and deployment concerns than the project needs.
- You may spend time managing rendering modes and framework conventions instead of shipping the site.

---

<h4>Astro: the modern SSG</h4>

If you're starting a content site today and want modern frontend features, **Astro** would probably be my default:

- Write *React/Vue/Svelte components*, Astro compiles them to plain HTML at build time.
- *Islands architecture*: only components you mark as interactive ship JS to the browser.
- Great MDX support (Markdown with embedded components).
- Large ecosystem of integrations and themes.

If you want something simpler, *Zola* is excellent: no Node.js, no npm, just a single Rust binary.

---

<!-- Visual break before conclusion - changes based on time of year -->
{{ seasonal_image() }}

There's no single best web framework, only the right tool for what you're building. 

Before starting a new project, ask: is this a content site, an interactive app, or both?


Those answers pick the category. The category picks the tool.