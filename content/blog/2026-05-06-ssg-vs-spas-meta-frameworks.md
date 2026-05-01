+++
title = "SSGs vs SPAs vs Meta-frameworks"
template = "blog-post.html"
description = "When to use Zola, Astro, React, Vue, or Next/Nuxt; and the cost of picking the wrong tool for the job"
[taxonomies]
tags = ["frontend", "architecture"]
[extra]
cover_image = "/images/blog/2026-05-06-ssg-vs-spas-vs-meta-frameworks/cover-image.webp"
+++

![blog-cover](/images/blog/2026-05-06-ssg-vs-spas-vs-meta-frameworks/cover-image.webp)

> **TL;DR**
> - **SPA frameworks** like React, Vue and Angular are best for interactive applications.
> - **SSGs** like Zola and Astro are best for content-heavy sites: blogs, portfolios and landing pages.
> - **Meta-frameworks** like Next.js and Nuxt are best when you need both interactivity and content pages in the same project.
> - **Documentation SSGs** like VitePress and Docusaurus are SSGs specialized for documentation.
> - The wrong tool can still work, but it usually costs you performance, simplicity, or developer experience.

You want to build a website. Do you reach for **React**, **Vue**, **Zola**, **Astro**, or **Next.js**?

They all produce something that runs in a browser, but they are optimized for different problems. The question is not *which framework is best?*

The real question is: **what kind of website am I building?**

---

<h4>The main categories</h4>

**1. Static Site Generators (SSGs):** Zola, Hugo, Jekyll, Astro

They take content (usually Markdown) + templates, and at *build time* output plain HTML/CSS/JS. Zero runtime overhead. Great for content-heavy sites.

**2. Documentation SSGs:** Vitepress, Docusaurus, Nextra

Their defaults assume you're documenting a library or product. If that's your goal, use VitePress (Vue) or Docusaurus (React). For blogs or portfolios, pick Astro or Zola instead.

**3. SPA frameworks:** React, Vue, Angular, Svelte

They build *interactive apps* in the browser. JS renders everything client-side. Best for stateful, interactive UIs behind a login where SEO doesn't matter.

**4. Meta-frameworks:** Next.js, Nuxt, SvelteKit

They sit on top of React/Vue/Svelte and add SSG and SSR capabilities, letting you mix static and interactive pages *in the same codebase*.

> **Summary:**
> 
> ![table-tech](/images/blog/2026-05-06-ssg-vs-spas-vs-meta-frameworks/table.jpeg)

---

<h4>The cost of picking the wrong tool</h4>

You *can* use any of these for any use case, but you pay a price when the tool doesn't match the problem.

*Using React for a blog:*
- You build your own content pipeline from scratch (Markdown parsing, frontmatter, route generation, syntax highlighting, RSS...). SSGs give you all of this for free.
- Your bundle ships 100KB+ of JS before the user sees any content.
- SEO and initial load suffer because content is rendered client-side.

*Using Zola for an interactive app:*
- No component model. No declarative rendering, no reactivity, no npm ecosystem.
- State management with plain JS gets messy fast once you have more than a couple of interacting pieces.
- You're reinventing what React/Vue already solved.

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
        <p>Angular lives in the SPA row alongside React and Vue, traditionally used for enterprise apps behind a login.</p>
        <p>It does have SSR support (Angular SSR, formerly Angular Universal), but there's no widely-adopted meta-framework in the Angular ecosystem like Next/Nuxt. Angular projects are almost always pure SPAs.</p>
    </div>
</details>

---

<h4>Astro: the modern SSG sweet spot</h4>

If you're starting a content site today, *Astro* is the strongest default:

- Write *React/Vue/Svelte components*, Astro compiles them to plain HTML at build time.
- *Islands architecture*: only components you mark as interactive ship JS to the browser.
- Great MDX support (Markdown with embedded components).
- Large ecosystem of integrations and themes.

If you want something simpler, *Zola* is excellent, with no Node.js, no npm, just a single Rust binary.

---

<h4>Documentation SSGs</h4>

**VitePress**, **Docusaurus**, **MkDocs**, and **Nextra** are SSGs specialized for *technical documentation*. They ship with:

- Sidebar navigation with nested sections
- Full-text search
- Code blocks with syntax highlighting, line highlighting, language tabs
- Prev/next page navigation
- Callouts for tips/warnings/danger

Their defaults assume you're documenting a library or product. If that's your goal, use VitePress (Vue) or Docusaurus (React). For blogs or portfolios, pick Astro or Zola instead.

---

<!-- Visual break before conclusion - changes based on time of year -->
{{ seasonal_image() }}

<h4>Tiny summary</h4>

There's no single best web framework, only the right tool for what you're building. Before starting a new project, ask: is this a content site, an app, or both? The answer picks the category for you.