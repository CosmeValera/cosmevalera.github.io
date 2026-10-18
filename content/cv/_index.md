+++
title = "CV"
template = "cv.html"
description = "CV of Cosme Valera Reales, software engineer at GMV on ESA's Galileo programme. Full stack with TypeScript, Node, Spring, Docker and AI tooling. Madrid, Spain."
# The projects page was folded into the CV; keep its old URL working.
aliases = ["/projects/"]

# All CV data lives here (and in _index.es.md) rather than in [translations],
# because it is content, not UI chrome. Section titles are the chrome and stay
# in config.toml as cv_* keys. templates/cv.html only loops over these tables.
[extra]
role = "Software Engineer"
location = "Madrid, Spain"
email = "cosmevalerareales@gmail.com"
linkedin = "https://www.linkedin.com/in/cosmevalera/"
linkedin_label = "linkedin.com/in/cosmevalera"
github = "https://github.com/CosmeValera"
github_label = "github.com/CosmeValera"
website = "https://cosmevalera.dev"
website_label = "cosmevalera.dev"
pdf = "assets/CV-Cosme_Valera_Reales-2026-10-18.pdf"
about = [
  "Over four years building web applications. Right now I work at GMV on Galileo, Europe's satellite navigation system, across the whole stack: React and TypeScript interfaces, the Node and Java (Spring) services behind them, and the Kubernetes releases that ship them.",
  "AI is part of how I work every day. I've built projects with Claude Code, Codex and Cursor, and I go well past the chat box into agents, skills, rules and MCP servers. I follow the space closely and keep whatever survives contact with a real project, which is also how RabbitHole got built.",
  "That raised the bar for the basics instead of lowering it. A lot of what I ship now starts as agent output, so reviews, tests and refactoring are what keep it honest, and a clear codebase is the one an agent gets right on the first try. The standard does not change because the author is not human.",
]

[[extra.experience]]
company = "GMV"
company_url = "https://www.gmv.com/en-es"
role = "Mid-Level Full Stack Engineer"
period = "10/2023 – Present"
location = "Madrid, Spain"
current = true
summary = "Contributed to the development and delivery of web applications to meet ESA's needs in the Galileo project. Galileo is Europe's global satellite navigation system."
bullets = [
  "Developed and maintained 5+ web applications using React, TypeScript, Node and Java (Spring), improving usability and consistency across Galileo applications.",
  "Designed and built from scratch, with my team, the backend of an internal web application in a Turborepo monorepo: Node, TypeScript, Express and Sequelize, with the data models and the REST endpoints its frontend consumes.",
  "Volunteered to lead the team's move to Kubernetes: learned Kubernetes, Kustomize and Helm, then moved our Dockerized apps to Helm releases across 2 environments, reducing manual steps.",
  "Automated monthly deployments of applications across environments using Jenkins.",
  "Worked with ESA engineers in a Scrum team to clarify requirements, gather feedback and turn operational needs into user stories and features.",
  "Improved maintainability through code reviews, pair programming, refactoring and clean code principles.",
]
tech = ["React", "TypeScript", "CSS", "Node", "Express", "Sequelize", "Java (Spring)", "PostgreSQL", "Docker", "Kubernetes", "Helm", "AWS", "Jenkins", "Claude Code", "Git", "Scrum"]

[[extra.experience]]
company = "Seanchas Research"
role = "Junior Full Stack Engineer"
period = "04/2023 – 07/2023"
location = "Cork, Ireland"
summary = "Very enriching Erasmus+ experience working full-time in English in Ireland."
bullets = [
  "Developed and updated 2 web applications: one full stack application using Angular, TypeScript, CSS, Java and MySQL, and one WordPress-based website.",
  "Used Git and GitHub Actions to support version control and deployment workflows.",
]
tech = ["Angular", "TypeScript", "CSS", "Java", "MySQL", "WordPress", "Git", "GitHub Actions"]

[[extra.experience]]
company = "Capgemini"
role = "Junior Full Stack Engineer"
period = "04/2022 – 04/2023"
location = "Murcia, Spain"
bullets = [
  "Developed web applications for ADIF railway infrastructure systems, supporting services related to Renfe trains and national rail operations, using Angular, TypeScript, CSS and Java (Spring).",
  "Built responsive interfaces from Figma designs and client requirements, aligning frontend implementation with business and usability needs.",
  "Started with Angular and Java. Three months as an intern, then hired.",
]
tech = ["Angular", "TypeScript", "CSS", "Java (Spring)", "PostgreSQL", "Git", "Figma", "Scrum"]

# Projects live only here (and in _index.es.md): the CV renders all of them and
# the home page shows the ones marked `home = true`, so there is no second copy.
#   tagline      one line, also used as the home-page card text
#   description  one paragraph: what it does and what makes it worth a look
#   tech         the stack, shown as tags under the description
#   screenshots  paths under static/; the first is the home-page card image
#   video        optional demo video under static/, shown first in the carousel;
#                video_poster is its thumbnail (the home page keeps the first screenshot)
#   url          live site, optional: no url, no "Visit site" link
#   flagship     optional, the badge + big card on the home page
[[extra.projects]]
name = "RabbitHole"
tagline = "Learn anything through what you already know."
url = "https://rabbithole.cosmevalera.dev/"
repo = "https://github.com/CosmeValera/RabbitHole"
period = "2023 – 2026"
flagship = true
home = true
description = [
  "My flagship product, designed, built and run by me over 6+ months of focused work spread across the last three years. One prompt becomes a multi-page guide with lessons and exercises, explained through the background knowledge the reader picks, and it keeps growing on demand through an AI chat with web sources. Any guide turns into a quiz, flashcards or a two-voice podcast in one click, and it all runs on the AI you choose: hosted, your own API key, or a local model on your machine.",
]
tech = ["React", "TypeScript", "Turborepo", "Serverless", "Supabase", "Stripe", "Vitest", "Playwright"]
video = "videos/projects/rabbithole-demo.mp4"
video_poster = "images/projects/rabbithole-demo-poster.webp"
screenshots = ["images/projects/rabbithole-subjunctive.webp", "images/projects/rabbithole-quiz.webp"]

[[extra.projects]]
name = "DevOps Lab"
tagline = "One full stack app, deployed with Docker, Kubernetes and a Jenkins pipeline on AWS."
url = "https://devopslab.cosmevalera.dev/"
repo = "https://github.com/CosmeValera/DevOpsLab"
home = true
description = [
  "A hands-on lab that takes the same full stack application through every common way of shipping it: Docker Compose, Kubernetes with Kustomize and Helm, and a Jenkins CI/CD pipeline, each with its own tutorial. The live version runs on AWS (S3 and CloudFront for the frontend, Lambda for the API, Jenkins on EC2) and shows the real status of its Jenkins pipeline.",
]
tech = ["React", "TypeScript", "Node", "Express", "Docker", "Kubernetes", "Helm", "Kustomize", "Jenkins", "AWS"]
video = "videos/projects/devopslab-demo.mp4"
video_poster = "images/projects/devopslab-demo-poster.webp"
screenshots = ["images/projects/devopslab-jenkins.webp", "images/projects/devopslab-tutorials.webp"]

[[extra.projects]]
name = "Sympho"
tagline = "Compose, save and play sheet music, on the web or as a desktop app."
url = "https://sympho.cosmevalera.dev/"
repo = "https://github.com/CosmeValera/Sympho"
home = true
description = [
  "A score editor that runs in the browser or as a desktop app: write notes and rests of any duration, add accidentals and dots, set the title, instrument and tempo, then play the score back. Sign in with Google to save scores to a private repository, or publish them to a public one that everyone can browse.",
]
tech = ["JavaScript", "Node", "VexFlow", "Electron", "Kubernetes"]
video = "videos/projects/sympho-demo.mp4"
video_poster = "images/projects/sympho-demo-poster.webp"
screenshots = ["images/projects/sympho-editor.webp", "images/projects/sympho-library.webp"]

[[extra.projects]]
name = "Bitcoin Finance Lab"
tagline = "Bitcoin against the stocks and indices that hold it, charted."
url = "https://bitcoin-finance-lab.cosmevalera.dev/"
repo = "https://github.com/CosmeValera/bitcoin-finance-lab"
home = true
description = [
  "A finance tool that puts Bitcoin side by side with Bitcoin treasury companies such as Strategy and Metaplanet, Strategy's preferred shares, broad indices like SPY and QQQ, or any ticker you add. The portfolio builder blends weights into returns, volatility and maximum drawdown, the benchmark view normalises returns into a sortable metrics table, and a DCA simulator shows what buying on a schedule would have done.",
]
tech = ["Vue 3", "TypeScript", "Pinia", "Chart.js", "Vite", "Yahoo Finance"]
video = "videos/projects/bitcoin-finance-lab-demo.mp4"
video_poster = "images/projects/bitcoin-finance-lab-demo-poster.webp"
screenshots = ["images/projects/bitcoin-finance-lab-benchmark.webp", "images/projects/bitcoin-finance-lab-portfolio.webp"]

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
