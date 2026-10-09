+++
title = "CV"
template = "cv.html"
description = "CV de Cosme Valera Reales, desarrollador de software en GMV en el programa Galileo de la ESA. Full-stack con TypeScript, Node, Spring, Docker e IA. Madrid, España."
# La página de proyectos se integró en el CV; su URL antigua sigue funcionando.
aliases = ["/es/projects/"]

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
pdf = "assets/CV-Cosme_Valera_Reales-2026-08-01.pdf"
about = [
  "Más de cuatro años construyendo aplicaciones web. Ahora mismo trabajo en GMV en Galileo, el sistema de navegación por satélite de Europa, donde la mayor parte del día es React y TypeScript, y el resto es Node, Java y llevar las cosas hasta Kubernetes.",
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

# Los proyectos viven solo aquí (y en _index.md): el CV los muestra todos y la
# home enseña los marcados con `home = true`, así que no hay una segunda copia.
#   tagline      una línea, también es el texto de la tarjeta en la home
#   description  dos párrafos: qué hace y cómo está hecho
#   screenshots  rutas dentro de static/; la primera es la imagen de la home
#   video        vídeo demo opcional dentro de static/, primero en el carrusel;
#                video_poster es su miniatura (la home sigue usando la primera captura)
#   url          web en vivo, opcional: sin url no hay enlace "Visitar web"
#   flagship     opcional, la insignia + la tarjeta grande de la home
[[extra.projects]]
name = "RabbitHole"
tagline = "Aprende cualquier cosa a través de lo que ya sabes."
url = "https://rabbithole.cosmevalera.dev/"
repo = "https://github.com/CosmeValera/RabbitHole"
period = "2023 – 2026"
flagship = true
home = true
description = [
  "Mi producto estrella, diseñado, construido y mantenido por mí en más de 6 meses de trabajo intenso repartidos en los últimos tres años. Un prompt se convierte en una guía de varias páginas con lecciones y ejercicios, explicada a través de los conocimientos previos que elige quien lee, y sigue creciendo cuando quieras con un chat de IA con fuentes web. Cualquier guía se convierte en un test, flashcards o un pódcast a dos voces con un clic.",
  "Es un monorepo con Turborepo: un cliente en React y TypeScript sobre rutas de API serverless, Supabase para autenticación y datos, y Stripe para los pagos. Funciona con la IA que elijas (alojada, tu propia clave de API o un modelo local en tu máquina), y Vitest y Playwright lo cubren desde tests unitarios hasta flujos end-to-end.",
]
video = "videos/projects/rabbithole-demo.mp4"
video_poster = "images/projects/rabbithole-demo-poster.webp"
screenshots = ["images/projects/rabbithole-subjunctive.webp", "images/projects/rabbithole-quiz.webp"]

[[extra.projects]]
name = "DevOps Lab"
tagline = "Una app full-stack desplegada con Docker, Kubernetes y un pipeline de Jenkins en AWS."
url = "https://devopslab.cosmevalera.dev/"
repo = "https://github.com/CosmeValera/DevOpsLab"
home = true
description = [
  "Un laboratorio práctico que lleva la misma aplicación full-stack por las formas habituales de desplegarla: Docker Compose, Kubernetes con Kustomize y Helm, y un pipeline de CI/CD en Jenkins. Cada método tiene su propio tutorial, así que la web también sirve de guía para hacerlo por tu cuenta.",
  "La versión en vivo corre en AWS: el frontend en React y TypeScript se sirve desde S3 y CloudFront, la API en Node y Express corre en Lambda y Jenkins vive en EC2, con IAM limitando el acceso de cada pieza. El frontend muestra el estado real del pipeline de Jenkins, obtenido a través de esa API en Lambda.",
]
video = "videos/projects/devopslab-demo.mp4"
video_poster = "images/projects/devopslab-demo-poster.webp"
screenshots = ["images/projects/devopslab-jenkins.webp", "images/projects/devopslab-tutorials.webp"]

[[extra.projects]]
name = "Sympho"
tagline = "Compón, guarda y reproduce partituras, en la web o como app de escritorio."
url = "https://sympho.cosmevalera.dev/"
repo = "https://github.com/CosmeValera/Sympho"
home = true
description = [
  "Un editor de partituras: escribe notas y silencios de cualquier duración, añade alteraciones y puntillos, define título, instrumento y tempo, y reprodúcela. Inicia sesión con Google para guardar partituras en un repositorio privado o publicarlas en uno público que cualquiera puede explorar.",
  "Hecho con JavaScript y Node, con VexFlow renderizando la notación. Funciona en el navegador o como app de escritorio con Electron, tiene tres temas (oscuro, claro y solar) y se despliega en Kubernetes.",
]
video = "videos/projects/sympho-demo.mp4"
video_poster = "images/projects/sympho-demo-poster.webp"
screenshots = ["images/projects/sympho-editor.webp", "images/projects/sympho-library.webp"]

[[extra.projects]]
name = "Bitcoin Finance Lab"
tagline = "Bitcoin frente a las acciones e índices que lo tienen, en gráficas."
url = "https://bitcoin-finance-lab.cosmevalera.dev/"
repo = "https://github.com/CosmeValera/bitcoin-finance-lab"
home = true
description = [
  "Una herramienta financiera que pone Bitcoin junto a empresas con Bitcoin en tesorería como Strategy y Metaplanet, las acciones preferentes de Strategy, índices amplios como SPY y QQQ, o cualquier ticker que añadas. El constructor de carteras combina pesos en rentabilidad, volatilidad y caída máxima, la vista de benchmark normaliza rentabilidades en una tabla de métricas ordenable, y un simulador de DCA muestra qué habría pasado comprando de forma periódica.",
  "Hecha con Vue 3, TypeScript y Pinia, con gráficas en Chart.js y empaquetada con Vite, sobre datos de mercado de Yahoo Finance.",
]
video = "videos/projects/bitcoin-finance-lab-demo.mp4"
video_poster = "images/projects/bitcoin-finance-lab-demo-poster.webp"
screenshots = ["images/projects/bitcoin-finance-lab-benchmark.webp", "images/projects/bitcoin-finance-lab-portfolio.webp"]

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
