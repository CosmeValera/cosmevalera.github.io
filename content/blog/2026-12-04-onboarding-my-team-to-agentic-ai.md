+++
title = "Onboarding My Team to Agentic AI"
template = "blog-post.html"
description = "How I prepared a workshop to onboard my team to agentic AI with GitHub Copilot CLI: the mental model, the building blocks, and how to keep the human in charge"
draft = true
[taxonomies]
tags = ["ai", "best-practices"]
[extra]
# TODO: cover image
# cover_image = "/images/blog/2026-12-04-onboarding-my-team-to-agentic-ai/cover.webp"
+++

<!--
TODO before publishing:
- Fill the TODO sections with the real feedback from the workshop (27/10/2026).
- Decide whether to name the company. No internal policy details, project names, tenant URLs or colleague names.
- Publish constellation-board as a public starter repo and link it in "Try it yourself".
- Cover image + one or two figures (e.g. the context window grid, the plan/build slide).
- Spanish version (.es.md).
- Link it from /CV #projects, like RabbitHole.
-->

<!-- ![blog-cover](/images/blog/2026-11-04-onboarding-my-team-to-agentic-ai/cover.webp) -->

> **TL;DR**
> - AI tools were off-limits at my job for years. When **GitHub Copilot** became the official tool, I prepared a workshop to onboard my team of seven developers to **agentic AI**.
> - The mental model: an agent is a **new teammate** who has read every book but has never seen your repo. Your job is its onboarding.
> - The building blocks (AGENTS.md, rules, skills, agents, hooks and MCP) are **plain files** in the repo, and the same ideas work in every agentic tool.
> - TODO: one line about how the team reacted.

---

<p>Until a few months ago, using AI at work was simply not allowed. ChatGPT lived in a browser tab at home, and work code stayed far away from it.</p>

<p>Then, in October 2026, <b>GitHub Copilot became our official tool</b>. The permission arrived overnight. The know-how did not. So I offered to run a workshop for my team: seven developers, from the very curious to the openly sceptical.</p>

<p>This post is that workshop, condensed, plus what my colleagues asked me afterwards.</p>

---

<h4>A teammate, not a chat tab</h4>

<p>Most of us knew AI as a chat in the browser. You copy code into it, it guesses without knowing your repo, you copy the answer back, and then <b>you</b> run it, test it and fix it. AI as a search engine.</p>

<p>An agent works differently. It lives in your terminal, inside the repository, and runs a loop: it <b>reads</b> the code, <b>acts</b> (edits a file, runs the tests), <b>checks</b> the result and repeats until the task is done. You approve each step.</p>

<p>That is why the metaphor of the whole workshop was a <b>new teammate</b>. A very smart one, who has read every book, but who has never seen our repo, our conventions or yesterday's conversation. And like any new teammate, it needs onboarding.</p>

---

<h4>Context is the whole game</h4>

<p>Everything the agent knows lives in its <b>context window</b>, its working memory. Every session starts blank.</p>

<p>The surprising part for most people is what fills it. The setup (system prompt, project instructions, skill descriptions) takes a sliver. <b>The conversation takes almost everything else</b>: your prompts, its replies, every file it reads and every command output. When it fills up, the agent compacts the conversation into a summary and loses detail.</p>

<p>Two practical consequences:</p>

- **A short AGENTS.md is the best deal you will find**: it costs almost nothing and shapes every answer.
- **Start fresh when you change task** (`/clear`), instead of dragging one endless conversation around. `/context` shows you what is filling yours.

---

<h4>The onboarding kit</h4>

<p>These are the pieces you give your new teammate. All of them are plain files in the repo, reviewed in a pull request like any other code. The order matters: <b>add each one in response to real friction, not upfront</b>.</p>

| Block | What it is | Add it when |
| --- | --- | --- |
| **AGENTS.md** | The onboarding doc: stack, commands, conventions, don'ts. `/init` drafts one for you. | Day one |
| **Permissions** | What the agent may do without asking, and what it may never do. | Day one |
| **Skill** | A procedure in a `SKILL.md`, loaded only when needed. | You repeat the same steps |
| **Rule** | Instructions for some files only (e.g. `applyTo: src/components/**`). | It breaks a convention |
| **Hook** | Your own script, run automatically at a fixed moment (e.g. format every edited file). | It should happen every time |
| **MCP server** | A new tool for the agent, like a browser through Playwright so it can see the app. | It needs an outside tool |
| **Custom agent** | A specialist with its own instructions and tools, like a read-only reviewer. | A specialist would help |

<p>The best news for a team that may switch tools again: <b>these concepts are not Copilot's</b>. Copilot keeps them in <code>.github/</code>, Claude Code in <code>.claude/</code>, Codex in <code>.codex/</code>, Cursor in <code>.cursor/</code> and Gemini in <code>.gemini/</code>. AGENTS.md is read by almost all of them, skills use the same <code>SKILL.md</code> format everywhere, and MCP is a shared standard. Learn the concept once, use it in any tool.</p>

<p>If you want to go deeper into each folder, <a class="link-text" target="_blank" href="https://chemaclass.com/blog/inside-the-claude-folder/"><b>Inside the .claude folder</b></a> explains it very well (the adoption order above comes from there), and <a class="link-text" target="_blank" href="https://agnostic-ai.org"><b>agnostic-ai.org</b></a> generates every tool's files from a single source.</p>

---

<h4>Plan with a strong model, build with a light one</h4>

<p>The habit I insisted on most: <b>think first, then build</b>. In Copilot CLI you press <code>Shift+Tab</code> (or type <code>/plan</code>) and the agent investigates the code, asks clarifying questions and writes a plan, without editing anything. You review that plan the way you would review a colleague's design, correct it, and only then let it implement.</p>

<p>That split also lets you choose the right model for each half. Planning is few calls and hard thinking, so it is worth the strongest model you have. Following a good plan is many small, simple steps, so a lighter and faster model does it just as well, for fewer credits:</p>

```
/model                # pick a strong model, e.g. gpt-5.6-sol
Shift+Tab             # switch to Plan mode
> Add a plane filter (All, A, B, C) next to the status filter
/model                # plan approved: pick a light model, e.g. gpt-5.6-luna
> Implement the plan
```

<p>If the light model gets stuck, switch back. The plan stays in the conversation.</p>

---

<h4>You stay in charge</h4>

<!-- TODO: confirm after the workshop that this was the part sceptics cared about most -->
<p>For a team new to this, the most important slide was not about features. It was about <b>control</b>. I presented permissions as a spectrum:</p>

- **Manual approval** (the default): the agent asks before every command and every edit. Perfect while learning, and for anything sensitive.
- **The middle ground**, once you trust it: let it run freely, but keep the dangerous commands blocked. Deny rules always win over allow rules.
- **`--yolo`**: skips every permission. A bad prompt, or a web page with injected instructions, can delete files, push code or leak data. Know it exists, and only use it inside a throwaway container.

```sh
copilot --allow-all-tools --deny-tool='shell(rm)' --deny-tool='shell(git push)'
```

<p>And whatever mode you use, the agent never commits for you unless you ask. You review the diff (<code>/diff</code>), you undo what you don't like (<code>/rewind</code>), and you commit. <b>The agent proposes, the engineer decides.</b></p>

---

<h4>How I designed the session</h4>

<p>A few decisions that worked well, in case you need to prepare something similar:</p>

- **35 minutes plus questions**, not a full morning. Short enough that nobody had to defend the time spent.
- **A tiny demo repo with exactly one of each block**: a React dashboard for a fictional satellite constellation, mock data only. Live, I added one small feature and every block did its job: plan mode, the rule, the skill, the hook, a browser through MCP and a read-only reviewer agent.
- **No hands-on exercise.** Installing and configuring tools in the middle of a meeting creates friction, especially for the sceptics. Instead, everybody got the demo repo as a starter kit to try at their own pace.
- **A backup recording** of the whole demo, in case the network or the model decided to be slow that day.
- **Slides in English, talk in Spanish**, so the slides can be reused by other teams.

---

<h4>What my team asked</h4>

<!--
TODO after the workshop: 4-6 real questions, short answers. Ideas of what to capture:
- The objections (privacy, quality, "will it make juniors worse?") and how I answered them.
- Which block they found most useful and which one they didn't get.
- What they tried in the first week.
-->

<p>TODO</p>

---

<h4>What I would change</h4>

<!-- TODO after the workshop: what didn't land, what took longer than expected, what I'd cut or add. -->

<p>TODO</p>

---

<h4>Try it yourself</h4>

<!-- TODO: link to the public starter repo once published -->
<p>The demo repo is public: TODO link. Open it, run <code>copilot</code>, trust the folder and type <code>/env</code> to see every block it loads. Then copy the <code>.github/</code> pattern into a real project, one piece at a time.</p>

---

<!-- Visual break before conclusion - changes based on time of year -->
{{ seasonal_image() }}

<p>The tools will change. Some of the commands in this post will probably be outdated in a year. The idea underneath will not: <b>an agent is only as good as its onboarding</b>, and onboarding is something developers already know how to do.</p>

<p>We have been writing READMEs, conventions and review checklists for new colleagues for years. Now we have one more colleague to write them for.</p>
