+++
title = "SSGs vs SPAs vs Meta-frameworks"
template = "blog-post.html"
description = "When to use Zola, Astro, React, Vue, or Next/Nuxt; and the cost of picking the wrong tool for the job"
draft = true
[taxonomies]
tags = ["frontend", "architecture"]
[extra]
cover_image = "/images/blog/2026-04-21-ssg-vs-spa-vs-metaframework/cover-image.webp"
+++

![blog-cover](/images/blog/2026-04-21-ssg-vs-spa-vs-metaframework/cover-image.webp)

<h4>🧐 The question</h4>

You want to build a website. Do you reach for **Zola**, **Astro**, **React**, **Vue**, or **Next.js**? They all produce websites, but they're solving very different problems.

This post untangles the three big categories — *Static Site Generators (SSGs), **Single Page Application frameworks (SPAs), and **Meta-frameworks* — and explains when to use each one.

---

<h4>📚 The three categories</h4>

*1. Static Site Generators (SSGs)* — Zola, Hugo, Jekyll, Astro, VitePress

They take content (usually Markdown) + templates, and at *build time* spit out plain HTML/CSS/JS files. Zero runtime overhead. Perfect for content-heavy sites.

*2. SPA frameworks* — React, Vue, Angular

They build *interactive apps* in the browser. JS takes over the page and renders everything client-side. Perfect for apps with lots of state, interactions, and behind-a-login UIs where SEO doesn't matter.

*3. Meta-frameworks* — Next.js, Nuxt, SvelteKit

They sit on top of React/Vue/Svelte and add SSG and SSR capabilities. They let you mix static pages and interactive pages *in the same codebase*.

---

<h4>🎯 The "ideal use case" table</h4>

| Use case | Recommended tool |
|---|---|
| Blog, portfolio, marketing site | Astro, Zola, Hugo |
| Technical documentation | VitePress, Docusaurus, MkDocs |
| Complex interactive SPA (no SEO needs) | React, Vue, Angular |
| Mix of static + interactive pages in one app | Next.js, Nuxt, SvelteKit |

This table shows the *ideal* tool for each use case — where the tool's defaults align perfectly with what you're building.

---

<h4>🚫 The cost of picking the wrong tool</h4>

You can use any of these tools for any use case, but you pay a price when you go against the grain.

*Using React for a blog:*
- You have to build your own content pipeline from scratch (reading Markdown, parsing frontmatter, generating routes, syntax highlighting, RSS...). SSGs give you all of this for free.
- Your bundle ships 100KB+ of JS before the user sees any content.
- SEO and initial load performance suffer because content is rendered client-side.

*Using Zola for an interactive page:*
- You lose the component model. No declarative rendering, no reactivity, no npm install for that fancy date picker.
- State management with plain JS gets messy fast once you have more than one or two interacting pieces.
- You're reinventing what React/Vue already solved.

Each tool has a *happy path*. Swimming against the current is possible, but costly in either DX or performance.

---

<h4>🌉 Where meta-frameworks fit</h4>

Meta-frameworks (Next.js, Nuxt, SvelteKit) earn their complexity when you need *both* paradigms in one codebase:

- An e-commerce site: product pages need SSG for SEO, but the cart and checkout are interactive.
- A SaaS product: marketing pages are static, the dashboard is a full SPA.
- A blog platform: public posts are statically generated, the editor is interactive.

If your needs are cleanly one side or the other (pure blog, pure app), a meta-framework is overkill. Reach for them when you genuinely need the mix.

<details class="expandable-info">
    <summary><i class="fas fa-lightbulb"></i> What about Angular?</summary>
    <div class="expandable-content">
        <p>Angular lives in the SPA row alongside React and Vue. It's a client-side UI framework, traditionally heavy on the "enterprise app behind a login" use case.</p>
        <p>Angular does have SSR support (Angular SSR, formerly Angular Universal), but there's no widely-adopted meta-framework in the Angular ecosystem like Next/Nuxt. Angular projects are almost always pure SPAs, which is why you won't often see it in meta-framework territory.</p>
    </div>
</details>

---

<h4>✨ Astro: the modern SSG sweet spot</h4>

If you're starting a content-focused site today, *Astro* is the most recommended SSG. Why?

- You can write *React/Vue/Svelte components* and it compiles them to plain HTML at build time.
- It supports *islands architecture*: only the components you mark as interactive ship JavaScript to the browser.
- Great MDX support (Markdown with components embedded).
- Huge ecosystem of integrations and themes.

It's essentially an SSG that borrowed the best ideas from the framework world. If you want simpler and faster, *Zola* is still excellent — no Node.js, no npm, just a single Rust binary and your content.

---

<h4>📖 Documentation SSGs are a special case</h4>

*VitePress, **Docusaurus, **MkDocs, and **Nextra* are all technically SSGs, but specialized for *technical documentation*. They come preconfigured with:

- Sidebar navigation with nested sections
- Full-text search
- Code blocks with syntax highlighting, line highlighting, language tabs
- Prev/next page navigation
- Callouts for tips/warnings/danger

You can bend them toward blog or portfolio use, but you'll fight the framework the whole way. Their defaults assume you're documenting a library or product. If that's what you need — a docs site for your open-source project, for example — reach for VitePress (Vue) or Docusaurus (React). If you need a blog or portfolio, pick a general-purpose SSG like Astro or Zola instead.

---

<h4>💡 Key Takeaways</h4>

- *SSGs* (Zola, Astro) → content-heavy sites: blogs, portfolios, marketing.
- *SPA frameworks* (React, Vue, Angular) → interactive apps, usually behind a login.
- *Meta-frameworks* (Next.js, Nuxt) → when you need both in one codebase.
- *Specialized SSGs* (VitePress, Docusaurus) → technical documentation sites.
- Using a tool outside its happy path costs you — either in DX (reinventing features) or in performance (bundle size, SEO).

> If you want to read more about architectural patterns, check out my post on <a class="link-text" target="_blank" href="https://cosmevalera.dev/blog/solid-principles/"><b>SOLID Principles</b></a>.

---

<!-- Visual break before conclusion - changes based on time of year -->
{{ seasonal_image() }}

<h4>Conclusion</h4>

There's no single "best" web framework — only the best tool for what you're building. Pick based on the shape of your content and how interactive it needs to be, not based on what's trendy.

Next time you start a new project, stop and ask yourself: is this a content site, an app, or both? The answer tells you which category to reach for. 🎯