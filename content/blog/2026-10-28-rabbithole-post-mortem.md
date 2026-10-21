+++
title = "RabbitHole: The Post-Mortem"
template = "blog-post.html"
description = "What launching my first SaaS taught me about product development"
draft = true
[taxonomies]
tags = ["best-practices"]
[extra]
series = "rabbithole"
cover_image = "/images/blog/2026-10-25-rabbithole-post-mortem/cover.webp"
+++

![blog-cover](/images/blog/2026-10-25-rabbithole-post-mortem/cover.webp)

> **TL;DR**
> - I launched RabbitHole on LinkedIn with a **€35** promotion. It reached **12,091** impressions, a few people tried it, and **nobody bought a single carrot**.
> - The engineering was not the problem. The product decisions were: a vague target user, a two-year MVP, no funnel tracking and validation that only came from friends.
> - Next time: one user, one problem, one hypothesis, and measure everything from the first day.

---

<p>On launch day I had a Stripe account, three pricing tiers, a trailer, and a rabbit with headphones.</p>

<p>A few weeks later I had twelve thousand impressions and zero euros.</p>

<p>If you haven't read it yet, <a class="link-text" href="/blog/building-rabbithole/"><b>Building RabbitHole</b></a> tells how the product came to be. This one is about what happened once it met the real world, and about the mistakes I can only see now that it's over. I'm writing it down because post-mortems are useful exactly in proportion to how honest they are, and because I'd rather make each of these mistakes only once.</p>

---

<h4>The launch</h4>

<p>I announced RabbitHole in a LinkedIn post: the problem (learning in an endless chat window is a mess), the solution (structured guides with analogies, flashcards, quizzes and podcasts), the link, and the one-minute trailer. Then I paid <b>€35</b> to promote it to an English-speaking audience in Spain.</p>

<figure class="post-figure post-figure--narrow">
  <img src="/images/blog/2026-10-25-rabbithole-post-mortem/linkedin-post.webp" alt="LinkedIn post announcing RabbitHole with the trailer video" width="499" height="802">
  <figcaption>The launch post. #buildinpublic, as one does.</figcaption>
</figure>

<p>Here is the result:</p>

<figure class="post-figure">
  <img src="/images/blog/2026-10-25-rabbithole-post-mortem/linkedin-impressions.webp" alt="LinkedIn stats: 10 reactions, 3 comments, 2 shares and 12,091 impressions" width="496" height="206">
  <figcaption>12,091 impressions, 10 reactions, 3 comments, 2 shares.</figcaption>
</figure>

<p>Twelve thousand people saw the post. A few of them opened the app and tried it. <b>Nobody bought carrots.</b></p>

---

<h4>What went well</h4>

<p>Let me start with the good part, because there is one, and it's not small.</p>

<p><b>I built a complete SaaS on my own.</b> Accounts, a database, three AI modes, billing, podcasts, a landing page, a public demo and a test suite. Two years ago I had a React dashboard with sonar buttons. Along the way I learned more about AI integration, UI/UX and payments than any course would have taught me, because every lesson came attached to a bug I had to fix myself.</p>

<p>And the project is on my CV now (hehe).</p>

---

<h4>What went wrong</h4>

<p>It didn't work as a product. Which, to be fair, is what happens to most first products. The interesting question is not whether it failed but <b>why</b>, and after a few weeks of thinking about it I keep coming back to the same four reasons.</p>

<b>1. "Curious people" is not a target user</b>

<p>RabbitHole was for curious people. That sounds like a target, but it's a mood. Everyone is curious about something, which means nobody in particular wakes up needing RabbitHole.</p>

<p>The product sat somewhere between <b>ChatGPT</b>, which is for everyone, and <b>NotebookLM</b>, which is for students working with their own material. And for a normal person it was hard to picture the exact moment when they'd open RabbitHole instead of just asking ChatGPT. If I can't describe that moment in one sentence, a stranger scrolling LinkedIn definitely won't figure it out for me.</p>

<p>The irony is that StudyMesh, the version before, had a clearer target: <b>a student a week before an exam</b>. That's a person, with a deadline and a problem. When I broadened the audience to make the idea bigger, I also made it harder to want.</p>

<b>2. An MVP that took two years</b>

<p>An MVP is supposed to answer one question as cheaply as possible: <i>does anyone need this?</i> Mine answered a different question for two years: <i>what else can I build?</i></p>

<p>I never wrote down a hypothesis. Each version came from the previous one, through experimentation and whatever idea excited me that month: AI widgets, then study paths, then pets, then podcasts. For long stretches I had no clear next thing to test, so I built the next feature instead. That's how development turns into open-ended experimentation rather than validated iteration.</p>

<p>Everything in RabbitHole that matters (a guide, explained through what you already know) could have been tested in <b>a couple of months</b>. The carrots could have waited.</p>

<b>3. No funnel, no answers</b>

<p>This one hurts the most, because it was so easy to avoid.</p>

<p>I didn't track the funnel: <b>landing page visit → sign-up → first guide created</b>. Without it, 12,091 impressions is a number with nothing behind it. Did people see the post and not click? Click, look at the landing page and leave? Sign up and never create a guide? Create one and never come back? Each of those has a completely different fix, and <b>I have no idea which one happened</b>.</p>

<p>Twelve thousand impressions, and the only thing I learned from them is that I should have measured them.</p>

<b>4. Validation by WhatsApp group</b>

<p>My feedback came from a WhatsApp group: my three siblings, all developers, and six or seven friends. They are smart, honest and generous with their time. They were also <b>not the target user</b>, and people who love you are not the right people to tell you your product is unnecessary.</p>

<p>Looking back, the most valuable feedback I ever got was the first one, about AquaMesh: <i>nice idea, but not very practical</i>. I answered it by renaming the product and adding AI. What I should have done is sit down with real students, ask how they actually study, and build the smallest thing that helped with that.</p>

---

<h4>What I'd do differently</h4>

1. **Pick one specific user.** Not "curious people", but someone with a name, a moment and a problem.
2. **Build the MVP in weeks, not years**, and make it validate a single core problem.
3. **Write the hypothesis before the code.** If there is no clear next hypothesis, the next feature is probably a guess.
4. **Instrument the funnel from day one:** landing visits, sign-ups and the first real action.
5. **Validate with people who match the target user**, not only with friends and family.
6. **Care about the "why" as much as the "how".** Why would someone use this instead of what they already use?

<p>That last point is the one I'm working on now. Engineering taught me <b>how</b> to build things; it never forced me to ask <b>why</b> anyone would want them. That's why I'm reading <a class="link-text" target="_blank" href="/readings/"><b>Escaping the Build Trap</b></a> by Melissa Perri. The "build trap" is what happens when a team measures success by the features it ships instead of the value it delivers, and reading it after RabbitHole has been slightly uncomfortable, in a good way. I was a one-person team, stuck in the trap.</p>

---

<!-- Visual break before conclusion - changes based on time of year -->
{{ seasonal_image() }}

<p>RabbitHole didn't find its users. It did find me a better way to work: I'm a better engineer for having built it, and a better product thinker for having watched it not sell.</p>

<p>The app is still online, and the rabbit still answers questions. If you're curious, <a class="link-text" target="_blank" href="https://rabbithole.cosmevalera.dev/try"><b>try a guide</b></a>, no account needed.</p>

<p>And next time, the first thing I build won't be the product. It will be the question.</p>
