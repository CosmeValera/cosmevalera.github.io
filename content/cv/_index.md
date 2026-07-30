+++
title = "CV"
template = "cv.html"
description = "CV of Cosme Valera Reales, frontend developer at GMV working on ESA's Galileo programme, building with React, TypeScript and AI tooling from Madrid, Spain."

# All CV data lives here (and in _index.es.md) rather than in [translations],
# because it is content, not UI chrome. Section titles are the chrome and stay
# in config.toml as cv_* keys. templates/cv.html only loops over these tables.
[extra]
role = "Software Developer"
location = "Madrid, Spain"
email = "cosmevalerareales@gmail.com"
linkedin = "https://www.linkedin.com/in/cosmevalera/"
linkedin_label = "linkedin.com/in/cosmevalera"
github = "https://github.com/CosmeValera"
github_label = "github.com/CosmeValera"
website = "https://cosmevalera.dev"
website_label = "cosmevalera.dev"
pdf = "assets/CV-Cosme_Valera_Reales-2026-04-30.pdf"
about = [
  "Four years building web applications. Right now I work at GMV on Galileo, Europe's satellite navigation system, where most of my day is React and TypeScript and the rest is Node, Java and getting things deployed to Kubernetes.",
  "AI is part of how I work every day. I've built projects with Claude Code, Codex and Cursor, and I go well past the chat box into agents, skills, rules and MCP servers. I follow the space closely and keep whatever survives contact with a real project, which is also how RabbitHole got built.",
  "That raised the bar for the basics instead of lowering it. A lot of what I ship now starts as agent output, so reviews, tests and refactoring are what keep it honest, and a clear codebase is the one an agent gets right on the first try. The standard does not change because the author is not human.",
]

[[extra.experience]]
company = "GMV"
company_url = "https://www.gmv.com/en-es"
role = "Mid-Level Frontend Developer"
period = "10/2023 – Present"
location = "Madrid, Spain"
current = true
summary = "Contributed to the development and delivery of web applications to meet ESA's needs in the Galileo project. Galileo is Europe's global satellite navigation system."
bullets = [
  "Developed and maintained 5+ frontend applications using React, TypeScript and CSS, improving usability and consistency across Galileo applications.",
  "Built and deployed containerized applications across 2 Kubernetes environments using Docker, Helm and Kustomize, reducing manual deployment steps by moving configuration values into Helm.",
  "Automated monthly deployments of applications across environments using Jenkins.",
  "Contributed to backend services using Node and Java (Spring).",
  "Worked with ESA engineers to clarify requirements, gather feedback and translate operational needs into user stories and features.",
  "Improved maintainability through code reviews, pair programming, refactoring and clean code principles.",
  "Engaged in Agile events (stand-ups, planning, retrospectives) and defined project needs and user stories.",
]
tech = ["React", "TypeScript", "CSS", "Node", "PostgreSQL", "Docker", "Kubernetes", "Helm", "AWS", "Jenkins", "Git", "Scrum"]

[[extra.experience]]
company = "Seanchas Research"
role = "Junior Full Stack Developer"
period = "04/2023 – 07/2023"
location = "Cork, Ireland"
summary = "Very enriching Erasmus+ experience working full-time in English in Ireland."
bullets = [
  "Developed and updated 2 web applications: one full-stack application using Angular, TypeScript, CSS, Java and MySQL, and one WordPress-based website.",
  "Used Git and GitHub Actions to support version control and deployment workflows.",
]
tech = ["Angular", "TypeScript", "CSS", "Java", "MySQL", "WordPress", "Git", "GitHub Actions"]

# One company, two positions. `roles` must be declared last: in TOML every key
# after the first [[extra.experience.roles]] header belongs to that sub-table.
[[extra.experience]]
company = "Capgemini"
period = "04/2022 – 04/2023"
location = "Murcia, Spain"
tech = ["Angular", "TypeScript", "CSS", "Java (Spring)", "PostgreSQL", "Git", "Figma", "Scrum"]

[[extra.experience.roles]]
role = "Junior Full Stack Developer"
period = "07/2022 – 04/2023"
bullets = [
  "Developed web applications for ADIF railway infrastructure systems, supporting services related to Renfe trains and national rail operations, using Angular, TypeScript, CSS and Java (Spring).",
  "Built responsive interfaces from Figma designs and client requirements, aligning frontend implementation with business and usability needs.",
]

[[extra.experience.roles]]
role = "Full Stack Developer Intern"
period = "04/2022 – 07/2022"
bullets = [
  "Started with Angular and Java. Three months as an intern, then hired.",
]

[[extra.projects]]
name = "RabbitHole"
url = "https://rabbithole.cosmevalera.dev/"
repo = "https://github.com/CosmeValera/RabbitHole"
period = "2023 – Present"
note = "6+ months of focused work spread across the last 3 years"
featured = true
description = "Turns one prompt into a multi-page AI guide, explained through what you already know. Start anywhere, go as deep as you want."
bullets = [
  "Generates multi-page guides with lessons and exercises from a single prompt, anchored to the background knowledge the reader picks.",
  "Turns any guide into quizzes, flashcards or a podcast recap in one click, with an AI chat and web search to expand it on demand.",
  "Runs on the AI you choose: hosted, your own API key, or a local model on your machine.",
  "Turborepo monorepo with serverless API routes, covered by Vitest and Playwright.",
]
tech = ["React", "TypeScript", "AI", "Supabase", "Stripe", "Turborepo", "Playwright"]

[[extra.projects]]
name = "DevOps Lab"
url = "https://devopslab.cosmevalera.dev/"
repo = "https://github.com/CosmeValera/DevOpsLab"
description = "Complete DevOps pipeline with containerization, orchestration and CI/CD automation."
tech = ["Docker", "Kubernetes", "AWS", "Jenkins", "React", "Node"]

[[extra.projects]]
name = "Bitcoin Finance Lab"
url = "https://bitcoin-finance-lab.cosmevalera.dev/"
repo = "https://github.com/CosmeValera/bitcoin-finance-lab"
description = "Vue 3 financial comparison tool visualizing Bitcoin performance against treasury stocks and market indices."
tech = ["Vue", "TypeScript", "Charts"]

[[extra.projects]]
name = "Particle Universe"
url = "https://particle-universe.cosmevalera.dev/"
repo = "https://github.com/CosmeValera/particle-universe"
description = "Multi-framework Astro dashboard rendering interactive particle simulations with React, Vue and Angular side by side."
tech = ["Astro", "React", "Vue", "Angular"]

[[extra.skills]]
label = "Frontend"
items = ["React", "TypeScript", "JavaScript", "Angular", "Vue", "SCSS / CSS", "HTML"]

[[extra.skills]]
label = "Backend and data"
items = ["Node", "Java (Spring)", "PostgreSQL", "MySQL", "MongoDB", "REST APIs", "GraphQL"]

[[extra.skills]]
label = "DevOps and cloud"
items = ["Docker", "Kubernetes", "Helm", "Kustomize", "Jenkins", "GitHub Actions", "AWS"]

[[extra.skills]]
label = "AI tooling"
items = ["Claude Code", "Codex", "Cursor", "Agents", "Skills", "Rules", "MCP servers", "Prompt design"]

[[extra.skills]]
label = "Ways of working"
items = ["Clean Code", "Code Reviews", "Pair Programming", "Testing", "Scrum", "Agile"]

[[extra.education]]
title = "Technician in Development of Web Applications"
school = "CIFP Carlos III"
period = "2022 – 2023"
tech = ["JavaScript", "PHP", "Laravel", "MySQL", "Angular"]

[[extra.education]]
title = "Technician in Development of Cross-platform Applications"
school = "IES Ginés Pérez Chirinos"
period = "2020 – 2022"
tech = ["Java", "Android", "Python", "Oracle SQL", "MongoDB", "Firebase"]

[[extra.languages]]
name = "Spanish"
level = "Native"

[[extra.languages]]
name = "English"
level = "C1 (Cambridge)"

[[extra.languages]]
name = "French"
level = "B1"
+++
