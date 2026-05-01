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

You want to build a website. Do you reach for **React**, **Vue**, **Zola**, **Astro**, or **Next.js**?

They all produce something that runs in a browser, but they are optimized for different problems. The question is not *which framework is best?*

The real question is: **what kind of website am I building?**

---

<h4>The practical buckets</h4>

There are three big families: SSGs, SPA frameworks, and meta-frameworks. I split documentation tools into their own bucket because their defaults differ from a normal blog or portfolio.

**1. Static Site Generators (SSGs):** Astro, Zola, Hugo, Jekyll

They take content (usually Markdown) + templates and generate plain HTML/CSS/JS before deployment. In production, the page already exists as a file; the browser just downloads it. Great for content-heavy sites.

**2. Documentation SSGs:** VitePress, Docusaurus, Nextra

They are still SSGs, but their defaults assume you're documenting a library, API, or product: sidebars, search, nested pages, callouts, and code-focused navigation. For blogs or portfolios, pick Astro or Zola instead.

**3. App frameworks / SPA tools:** React, Vue, Angular, Svelte

They are commonly used to build *interactive apps* where JavaScript handles routing, state, and UI updates in the browser. Best for stateful, interactive UIs behind a login where SEO doesn't matter.

**4. Meta-frameworks:** Next.js, Nuxt, SvelteKit

They sit on top of React/Vue/Svelte and add routing, SSG, SSR, data loading, and deployment conventions. Use them when static content pages and app-like pages need to live in the same codebase.

![table-tech](/images/blog/2026-05-06-ssg-vs-spas-vs-meta-frameworks/table.jpeg)

---

<h4>The cost of picking the wrong tool</h4>

You *can* use any of these for any use case, but you pay a price when the tool doesn't match the problem.

*Using React for a blog:*
- You build your own content pipeline from scratch (Markdown parsing, frontmatter, route generation, syntax highlighting, RSS...). SSGs give you all of this for free.
- Your bundle ships 100KB+ of JS before the user sees any content.
- SEO and initial load can suffer if content depends too much on client-side rendering.

*Using Zola for an interactive app:*
- No built-in component model, declarative rendering, or reactivity system.
- State management with plain JS gets messy fast once you have more than a couple of interacting pieces.
- You start reinventing what React/Vue already solve well.

*Using Next.js when Astro or Zola is enough:*
- You add more concepts, dependencies, and deployment concerns than the project needs.
- You may spend time managing rendering modes and framework conventions instead of shipping the site.

---

<h4>Where meta-frameworks fit</h4>

Meta-frameworks make sense when you need *both* paradigms in one codebase:

- **E-commerce**: product pages need SSG for SEO, but the cart and checkout are interactive.
- **SaaS**: marketing pages are static, the dashboard is a full SPA.
- **Blog platform**: public posts are statically generated, the editor is interactive.

If your needs are cleanly one side or the other, a meta-framework is overkill.

<details class="expandable-info">
    <summary><i class="fas fa-lightbulb"></i> What about Angular?</summary>
    <div class="expandable-content">
        <p>Angular lives in the interactive app (or SPA tool) row alongside React and Vue, traditionally used for enterprise apps behind a login.</p>
        <p>It does have SSR support (Angular SSR, formerly Angular Universal), but there's no widely-adopted meta-framework in the Angular ecosystem like Next/Nuxt. Angular projects are almost always pure SPAs.</p>
    </div>
</details>

---

<h4>Astro: the modern SSG</h4>

If you're starting a content site today and want modern frontend features, *Astro* is the strongest default:

- Write *React/Vue/Svelte components*, Astro compiles them to plain HTML at build time.
- *Islands architecture*: only components you mark as interactive ship JS to the browser.
- Great MDX support (Markdown with embedded components).
- Large ecosystem of integrations and themes.

If you want something simpler, *Zola* is excellent, with no Node.js, no npm, just a single Rust binary.

---

<!-- Visual break before conclusion - changes based on time of year -->
{{ seasonal_image() }}

<h4>Tiny summary</h4>

There's no single best web framework, only the right tool for what you're building. Before starting a new project, ask: is this a content site, an interactive app, or both? The answer picks the category for you.
