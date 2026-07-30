+++
title = "CV"
template = "cv.html"
description = "CV de Cosme Valera Reales, desarrollador frontend en GMV trabajando en el programa Galileo de la ESA, construyendo con React, TypeScript e IA desde Madrid, España."

# Todo el contenido del CV vive aquí (y en _index.md) en lugar de en
# [translations], porque es contenido, no interfaz. Los títulos de sección sí
# son interfaz y siguen en config.toml como claves cv_*.
[extra]
role = "Desarrollador de Software"
location = "Madrid, España"
email = "cosmevalerareales@gmail.com"
linkedin = "https://www.linkedin.com/in/cosmevalera/"
linkedin_label = "linkedin.com/in/cosmevalera"
github = "https://github.com/CosmeValera"
github_label = "github.com/CosmeValera"
website = "https://cosmevalera.dev"
website_label = "cosmevalera.dev"
pdf = "assets/CV-Cosme_Valera_Reales-2026-04-30.pdf"
about = [
  "Cuatro años construyendo aplicaciones web. Ahora mismo trabajo en GMV en Galileo, el sistema de navegación por satélite de Europa, donde la mayor parte del día es React y TypeScript, y el resto es Node, Java y llevar las cosas hasta Kubernetes.",
  "La IA forma parte de mi día a día. He construido proyectos con Claude Code, Codex y Cursor, y voy bastante más allá del chat: agentes, skills, reglas y servidores MCP. Sigo el tema de cerca y me quedo con lo que aguanta el contacto con un proyecto real, que es también como salió RabbitHole.",
  "Eso ha subido el listón de lo básico en vez de bajarlo. Buena parte de lo que entrego ahora empieza siendo la salida de un agente, así que las revisiones, los tests y la refactorización son lo que mantiene el código honesto, y una base de código clara es la que un agente acierta a la primera. El estándar no cambia porque quien escribe no sea humano.",
]

[[extra.experience]]
company = "GMV"
company_url = "https://www.gmv.com/es-es"
role = "Desarrollador Frontend (Mid-Level)"
period = "10/2023 – Actualidad"
location = "Madrid, España"
current = true
summary = "Participo en el desarrollo y la entrega de aplicaciones web para cubrir las necesidades de la ESA en el proyecto Galileo, el sistema global de navegación por satélite de Europa."
bullets = [
  "Desarrollo y mantenimiento de más de 5 aplicaciones frontend con React, TypeScript y CSS, mejorando la usabilidad y la consistencia entre las aplicaciones de Galileo.",
  "Construcción y despliegue de aplicaciones contenerizadas en 2 entornos de Kubernetes con Docker, Helm y Kustomize, reduciendo pasos manuales de despliegue al mover la configuración a Helm.",
  "Automatización de los despliegues mensuales de aplicaciones entre entornos con Jenkins.",
  "Contribución a servicios de backend con Node y Java (Spring).",
  "Trabajo con ingenieros de la ESA para aclarar requisitos, recoger feedback y traducir necesidades operativas en historias de usuario y funcionalidades.",
  "Mejora de la mantenibilidad mediante revisiones de código, pair programming, refactorización y principios de código limpio.",
  "Participación en eventos ágiles (dailies, plannings, retrospectivas) y definición de las necesidades del proyecto y las historias de usuario.",
]
tech = ["React", "TypeScript", "CSS", "Node", "PostgreSQL", "Docker", "Kubernetes", "Helm", "AWS", "Jenkins", "Git", "Scrum"]

[[extra.experience]]
company = "Seanchas Research"
role = "Desarrollador Full Stack Junior"
period = "04/2023 – 07/2023"
location = "Cork, Irlanda"
summary = "Experiencia Erasmus+ muy enriquecedora, trabajando a jornada completa en inglés en Irlanda."
bullets = [
  "Desarrollo y actualización de 2 aplicaciones web: una aplicación full-stack con Angular, TypeScript, CSS, Java y MySQL, y un sitio basado en WordPress.",
  "Uso de Git y GitHub Actions para dar soporte al control de versiones y a los flujos de despliegue.",
]
tech = ["Angular", "TypeScript", "CSS", "Java", "MySQL", "WordPress", "Git", "GitHub Actions"]

# Una empresa, dos puestos. `roles` va al final: en TOML toda clave posterior a
# la primera cabecera [[extra.experience.roles]] pertenece a esa subtabla.
[[extra.experience]]
company = "Capgemini"
period = "04/2022 – 04/2023"
location = "Murcia, España"
tech = ["Angular", "TypeScript", "CSS", "Java (Spring)", "PostgreSQL", "Git", "Figma", "Scrum"]

[[extra.experience.roles]]
role = "Desarrollador Full Stack Junior"
period = "07/2022 – 04/2023"
bullets = [
  "Desarrollo de aplicaciones web para los sistemas de infraestructura ferroviaria de ADIF, dando soporte a servicios relacionados con los trenes de Renfe y la operación ferroviaria nacional, con Angular, TypeScript, CSS y Java (Spring).",
  "Construcción de interfaces responsive a partir de diseños de Figma y requisitos de cliente, alineando la implementación frontend con las necesidades de negocio y usabilidad.",
]

[[extra.experience.roles]]
role = "Desarrollador Full Stack en prácticas"
period = "04/2022 – 07/2022"
bullets = [
  "Empecé con Angular y Java. Tres meses de prácticas y después contratado.",
]

[[extra.projects]]
name = "RabbitHole"
url = "https://rabbithole.cosmevalera.dev/"
repo = "https://github.com/CosmeValera/RabbitHole"
period = "2023 – Actualidad"
note = "Más de 6 meses de trabajo intenso repartidos en los últimos 3 años"
featured = true
description = "Convierte un prompt en una guía de IA de varias páginas, explicada a través de lo que ya sabes. Empieza donde quieras y profundiza tanto como quieras."
bullets = [
  "Genera guías de varias páginas con lecciones y ejercicios a partir de un solo prompt, ancladas a los conocimientos previos que elige quien lee.",
  "Convierte cualquier guía en tests, flashcards o un pódcast con un clic, con un chat de IA y búsqueda web para ampliarla cuando quieras.",
  "Funciona con la IA que elijas: alojada, tu propia clave de API o un modelo local en tu máquina.",
  "Monorepo con Turborepo y rutas de API serverless, cubierto con Vitest y Playwright.",
]
tech = ["React", "TypeScript", "IA", "Supabase", "Stripe", "Turborepo", "Playwright"]

[[extra.projects]]
name = "DevOps Lab"
url = "https://devopslab.cosmevalera.dev/"
repo = "https://github.com/CosmeValera/DevOpsLab"
description = "Pipeline DevOps completo con contenedorización, orquestación y automatización CI/CD."
tech = ["Docker", "Kubernetes", "AWS", "Jenkins", "React", "Node"]

[[extra.projects]]
name = "Bitcoin Finance Lab"
url = "https://bitcoin-finance-lab.cosmevalera.dev/"
repo = "https://github.com/CosmeValera/bitcoin-finance-lab"
description = "Herramienta de comparación financiera en Vue 3 que visualiza el rendimiento de Bitcoin frente a acciones e índices de mercado."
tech = ["Vue", "TypeScript", "Gráficas"]

[[extra.projects]]
name = "Particle Universe"
url = "https://particle-universe.cosmevalera.dev/"
repo = "https://github.com/CosmeValera/particle-universe"
description = "Dashboard multi-framework con Astro que renderiza simulaciones interactivas de partículas con React, Vue y Angular a la vez."
tech = ["Astro", "React", "Vue", "Angular"]

[[extra.skills]]
label = "Frontend"
items = ["React", "TypeScript", "JavaScript", "Angular", "Vue", "SCSS / CSS", "HTML"]

[[extra.skills]]
label = "Backend y datos"
items = ["Node", "Java (Spring)", "PostgreSQL", "MySQL", "MongoDB", "APIs REST", "GraphQL"]

[[extra.skills]]
label = "DevOps y cloud"
items = ["Docker", "Kubernetes", "Helm", "Kustomize", "Jenkins", "GitHub Actions", "AWS"]

[[extra.skills]]
label = "Herramientas de IA"
items = ["Claude Code", "Codex", "Cursor", "Agentes", "Skills", "Reglas", "Servidores MCP", "Diseño de prompts"]

[[extra.skills]]
label = "Forma de trabajar"
items = ["Código limpio", "Revisiones de código", "Pair programming", "Testing", "Scrum", "Agile"]

[[extra.education]]
title = "Técnico Superior en Desarrollo de Aplicaciones Web"
school = "CIFP Carlos III"
period = "2022 – 2023"
tech = ["JavaScript", "PHP", "Laravel", "MySQL", "Angular"]

[[extra.education]]
title = "Técnico Superior en Desarrollo de Aplicaciones Multiplataforma"
school = "IES Ginés Pérez Chirinos"
period = "2020 – 2022"
tech = ["Java", "Android", "Python", "Oracle SQL", "MongoDB", "Firebase"]

[[extra.languages]]
name = "Español"
level = "Nativo"

[[extra.languages]]
name = "Inglés"
level = "C1 (Cambridge)"

[[extra.languages]]
name = "Francés"
level = "B1"
+++
