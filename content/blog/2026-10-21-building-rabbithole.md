+++
title = "Building RabbitHole"
template = "blog-post.html"
description = "How I built my own AI learning product alone, from a first prototype to launch: two years, three names and one rabbit."
[taxonomies]
tags = ["product", "ai"]
[extra]
series = "rabbithole"
cover_image = "/images/blog/2026-10-18-building-rabbithole/cover.webp"
+++

![blog-cover](/images/blog/2026-10-18-building-rabbithole/cover.webp)

> **TL;DR**
> - **RabbitHole** is an AI curiosity wiki: you type a topic and get a structured, multi-page guide, explained through the things you **already know**.
> - Every guide ends with a quiz, flashcards, a podcast and a few new rabbit holes to fall into next.
> - It took me about **two years and three names** to get there: AquaMesh, then StudyMesh, then RabbitHole.
> - You can <a target="_blank" href="https://rabbithole.cosmevalera.dev/try">try a sample guide</a> without creating an account.

---

<p>RabbitHole started its life as a submarine.</p>

<p>Not a real one. A dark green dashboard full of sonar buttons and depth controls, built in September 2024 for one reason only: <b>I wanted to prove I could build something serious with React</b>. There was no user, no problem to solve and no plan beyond "make it look good".</p>

<p>Two years later that same repository is a full SaaS with AI guides, a billing system, a landing page, a trailer, and a rabbit with headphones that answers your questions. This post is the story of how one turned into the other, and of the ideas that only appeared because I kept building.</p>

---

<h4>What RabbitHole is</h4>

<p>If you have ever tried to learn something complex in a chat window, you know how it goes. You ask a question, get a wall of text, ask a follow-up, get another wall, and twenty minutes later the useful part is buried somewhere above you. I used to copy AI answers into my notes app just to keep them.</p>

<p>RabbitHole takes a prompt and gives you a <b>guide</b> instead of an answer: a few short pages, each one building on the previous, with a sidebar to move between them and an AI chat that only talks about what is on the page.</p>

<p>The part I am most proud of is small and easy to miss. Before you start, you tell RabbitHole <b>what you already know</b>: Docker, cooking, football, Java, whatever. Then every new topic gets explained through it.</p>

<figure class="post-figure post-figure--narrow">
  <img src="/images/blog/2026-10-18-building-rabbithole/what-you-already-know.webp" alt="The 'What you already know' panel with Docker, Node, Java and React added" width="421" height="680">
  <figcaption>The list RabbitHole uses to pick its analogies.</figcaption>
</figure>

<p>So if you know Docker and ask "What is Kubernetes?", the guide opens with a <b>Quick Start</b> that starts from the containers you already understand and only then explains what changes when there is a whole cluster of machines underneath. It even tells you where the analogy breaks.</p>

<figure class="post-figure post-figure--wide">
  <img src="/images/blog/2026-10-18-building-rabbithole/quick-start-analogy.webp" alt="Quick Start of a Kubernetes guide, explained through Docker" width="1005" height="624">
  <figcaption>Kubernetes, explained to someone who knows Docker.</figcaption>
</figure>

<p>The <b>Key idea</b> is a 20-second skim, the <b>Quick summary</b> a 60-second version, and only then come the full pages. You choose how deep to go.</p>

<p>That is the product today. Getting there was much less tidy.</p>

---

<h4>AquaMesh: the submarine era</h4>

<p>The first version was called <b>AquaMesh</b>, and the water theme went all the way down. The idea was an organisation app: you had <b>Dashboards</b>, and inside each dashboard you placed boxes called <b>Widgets</b>, which you could move around and resize. In the screenshot below, the whole screen is a dashboard and each panel inside it is a widget.</p>

<figure class="post-figure post-figure--wide">
  <img src="/images/blog/2026-10-18-building-rabbithole/aquamesh.webp" alt="AquaMesh: a dashboard with two widgets, Control Flow and System Lens" width="1400" height="660">
  <figcaption>AquaMesh: one dashboard (red 1) with two widgets, Control Flow and System Lens (purple 1 and 2).</figcaption>
</figure>

<p>At first there were only a couple of predefined widgets, which made it more of a showroom than a tool. So the second version added a <b>Widget Editor</b>: a drag-and-drop page where you could build your own widgets out of text, fields, buttons, switches and charts. Something like HTML and CSS, minus the code. There was even a mock login with different roles, because a dashboard app without roles did not feel real enough.</p>

<figure class="post-figure post-figure--wide">
  <video class="post-video" src="/images/blog/2026-10-18-building-rabbithole/aquamesh-live-demo.mp4" aria-label="Building a widget in the AquaMesh Widget Editor" width="1600" height="754" autoplay loop muted playsinline></video>
  <figcaption>The Widget Editor: build a widget once, then drop it into any dashboard.</figcaption>
</figure>

<p>I was happy with it, so I showed it to some friends. Their verdict was polite and accurate: <b>nice idea, not very practical</b>. Nobody could tell me what they would actually use it for, and neither could I.</p>

<p>So AquaMesh went into a drawer for a few months.</p>

---

<h4>StudyMesh: the AI arrives</h4>

<p>In September 2025 I wanted to add the project to my CV, and I did not want to add it as it was. I needed one new idea that made the whole thing worth opening. The obvious candidate was AI: instead of building every widget by hand, <b>what if you could ask for them?</b></p>

<p>That question gave the project its first real user in my head: <b>a student</b>. A student keeps their subjects in folders (Mathematics, Anatomy, Literature), each folder holds dashboards, and each dashboard mixes widgets with an image, a PDF, a YouTube video or some notes. On top of that, two new buttons: <b>Create Study Pack</b>, which generated one dashboard from a photo or a piece of text, and <b>Create Study Path</b>, which generated several of them in order.</p>

<p>I also switched the design to white, mostly so it would look professional. The logo still said AquaMesh, but it was already StudyMesh in spirit.</p>

<figure class="post-figure post-figure--wide">
  <video class="post-video" src="/images/blog/2026-10-18-building-rabbithole/studymesh-first-ai.mp4" aria-label="A Mathematics dashboard with AI-generated widgets about derivatives" width="1280" height="608" autoplay loop muted playsinline></video>
  <figcaption><b>Create Study Pack:</b> from text or image generate markdown, key facts and quizzes.</figcaption>
</figure>

<p>It worked, but it was rudimentary. You got some markdown, a few key facts and a quiz, glued into widgets that had been designed for something else entirely.</p>

<p>The next iteration got the name and a new logo for real. Dashboards moved into a <b>Library</b>, and the screen settled into three columns: what you can create on the left, what you created in the middle, and an AI chat on the right that only answers about the middle. The study pack split into four quicker options (quiz, flashcards, clear notes and "create from material"), and generations now appeared as pills in a queue at the bottom, so you could keep working while the AI was busy.</p>

<figure class="post-figure post-figure--wide">
  <div class="post-mosaic">
    <img src="/images/blog/2026-10-18-building-rabbithole/studymesh-three-panels.webp" alt="StudyMesh with three panels: creation menu, study content and AI chat" width="1400" height="696">
    <video class="post-video post-video--tile" src="/images/blog/2026-10-18-building-rabbithole/studymesh-phone-video.mp4" poster="/images/blog/2026-10-18-building-rabbithole/studymesh-phone-poster.webp" data-label="Phone" aria-label="StudyMesh on a phone" width="382" height="850" preload="none" loop muted playsinline></video>
    <video class="post-video post-video--tile post-video--left" src="/images/blog/2026-10-18-building-rabbithole/studymesh-dark-video.mp4" poster="/images/blog/2026-10-18-building-rabbithole/studymesh-dark-poster.webp" data-label="Generating" data-sublabel="in dark mode" aria-label="StudyMesh in dark mode, with the generation queue" width="1280" height="640" preload="none" loop muted playsinline></video>
  </div>
  <figcaption>StudyMesh: create on the left, read in the middle, ask on the right. Tap the small ones to see it on a phone, and generating material in dark mode.</figcaption>
</figure>

<p>I would love to tell you this layout came from a clear plan. It didn't. I was learning while building, trying things, keeping what worked and deleting what didn't, and checking on my phone the whole time that nothing broke on a small screen. A lot of what I built in that period no longer exists, and that is fine; it is how I found out what the product should not be.</p>

---

<h4>From a project to a product</h4>

<p>Up to this point StudyMesh was an app. What turned it into a <b>product</b> was all the boring, invisible work around it:</p>

- **Real accounts**, with Google sign-in and the data in Supabase.
- **A landing page**, which got a full second version a few months later.
- **Three AI modes**: *Hosted*, where I pay for the model and you pay me in credits; *Local*, which runs a model on your own machine; and *BYOK* (bring your own key), for people who already pay for an API key.
- **Billing** with Stripe and a currency of its own, Study Credits: a guide cost 3, everything else 1, and a €2 pack gave you 150 of them.
- **Podcasts**, so you can listen to a guide on the bus.
- **An AI pet**, because the chat felt cold without a face. It started as a single dolphin and ended up as a small cast to pick from: a bee, a dolphin and a parrot.

<div class="phone-images-row">
  <img class="phone-image" src="/images/blog/2026-10-18-building-rabbithole/studymesh-landing-phone.webp" alt="StudyMesh landing page on a phone"></img>
  <img class="phone-image" src="/images/blog/2026-10-18-building-rabbithole/studymesh-pet-phone.webp" alt="StudyMesh AI chat with the dolphin pet on a phone"></img>
</div>

<p>None of these features is what a user remembers. All of them are what a user needs before they can trust you with an email address, let alone a card number. If you have only built side projects, this is the part that surprises you: <b>the app took months, and making it a product took about as long again</b>.</p>

---

<h4>RabbitHole: finding the one idea</h4>

<p>In June 2026 one feature changed the shape of everything else: the <b>"What you already know"</b> list from the beginning of this post.</p>

<p>Once guides could be explained through your own knowledge, they stopped being study material. A developer learning Kubernetes, a cook curious about fermentation, a football fan reading about game theory: none of them is studying for an exam. They are following their curiosity, one link at a time. The name "StudyMesh" suddenly sounded like homework.</p>

<p>That is how it became <b>RabbitHole</b>. And the name pulled the last missing piece into place: what happens when a guide ends. Now the final page gives you a quiz, and after it, a handful of <b>new rabbit holes</b>, topics that build on the one you just finished. One more button, <b>Add to what I know</b>, puts the topic into your list, so the next guide can use it as an analogy.</p>

<figure class="post-figure post-figure--wide">
  <img src="/images/blog/2026-10-18-building-rabbithole/end-of-guide.webp" alt="Quiz results with 'Add to what I know' and suggested follow-up guides" width="1117" height="872">
  <figcaption>The end of a guide is the start of the next one.</figcaption>
</figure>

<p>That loop is the whole product in one picture. <b>Every guide you finish makes the next one easier to understand.</b></p>

<p>The rest followed the name, as these things do. The interface was redesigned, the dolphin became a rabbit with a headset and a green bandana, and Study Credits became <b>carrots</b>.</p>

<figure class="post-figure">
  <img src="/images/blog/2026-10-18-building-rabbithole/carrots.webp" alt="Carrot balance, the cost of each action and three carrot packs" width="931" height="728">
  <figcaption>The carrot shop. A couple of guides a day are free; after that, carrots.</figcaption>
</figure>

<figure class="post-figure post-figure--wide">
  <img src="/images/blog/2026-10-18-building-rabbithole/rabbithole-workspace.webp" alt="RabbitHole workspace with pages, a Kubernetes guide and the rabbit AI chat" width="1400" height="666">
  <figcaption>RabbitHole today: pages on the left, the guide in the middle, the rabbit on the right.</figcaption>
</figure>

---

<h4>Under the hood</h4>

<p>For the developers reading: RabbitHole is a <b>React + TypeScript</b> app inside a <b>Turborepo</b> monorepo, with serverless functions on <b>Vercel</b> as the backend. <b>Supabase</b> holds the data and the accounts, <b>Stripe</b> handles the carrots, and the guides themselves are written by models from <b>OpenAI</b>, <b>Gemini</b> and <b>Cerebras</b>. Tests run with <b>Vitest</b> for the logic and <b>Playwright</b> for the E2E.</p>

<details class="expandable-info">
    <summary><i class="fas fa-info-circle"></i> Every external service RabbitHole uses</summary>
    <div class="expandable-content">
        <p><b>Vercel</b>: hosting and serverless functions.<br/>
        <b>Supabase</b>: database and authentication.<br/>
        <b>Google Auth</b>: one-click sign-in.<br/>
        <b>Stripe</b>: payments for carrot packs.<br/>
        <b>OpenAI, Gemini and Cerebras</b>: the models behind guides, quizzes, flashcards and chat.<br/>
        <b>Unreal Speech</b>: the voices in the podcasts.<br/>
        <b>Tavily</b>: web search inside the AI chat.</p>
        <p>The code is public on <a class="link-text" target="_blank" href="https://github.com/CosmeValera/RabbitHole"><b>GitHub</b></a>.</p>
    </div>
</details>

---

<!-- Visual break before conclusion - changes based on time of year -->
{{ seasonal_image() }}

<p>AquaMesh was built to prove I could write React. RabbitHole proved something more useful to me: that I can take an empty repository all the way to a product with accounts, payments, a landing page and an idea of its own.</p>

<p>Whether it was a <b>good</b> product is a different question, and the numbers have a clear opinion about it. That is the next post: <a class="link-text" href="/blog/rabbithole-post-mortem/"><b>RabbitHole: The Post-Mortem</b></a>.</p>

<p>In the meantime, the rabbit is still answering questions. <a class="link-text" target="_blank" href="https://rabbithole.cosmevalera.dev/try"><b>Pick a topic and fall in</b></a>.</p>
