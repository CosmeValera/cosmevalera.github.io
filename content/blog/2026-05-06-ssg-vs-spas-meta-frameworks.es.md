+++
title = "SPAs vs SSGs vs Meta frameworks"
template = "blog-post.html"
description = "Cuándo usar React, Vue, Zola, Astro, Next o Nuxt, y el coste de elegir la herramienta equivocada"
[taxonomies]
tags = ["frontend", "architecture"]
[extra]
cover_image = "/images/blog/2026-05-06-ssg-vs-spas-vs-meta-frameworks/cover-image.webp"
+++

![blog-cover](/images/blog/2026-05-06-ssg-vs-spas-vs-meta-frameworks/cover-image.webp)

> **TL;DR**
> * **SPAs / aplicaciones interactivas** construidas con React, Vue y Angular encajan mejor en interfaces con bastante estado.
> * **SSGs** como Zola y Astro encajan mejor en sitios con mucho contenido: blogs, portfolios y landing pages.
> * **Meta frameworks** como Next.js y Nuxt encajan mejor cuando necesitas interactividad y páginas de contenido en el mismo proyecto.
> * **SSGs de documentación** como VitePress y Docusaurus son SSGs especializados en documentación.
> * La herramienta equivocada puede funcionar, pero normalmente te cuesta rendimiento, simplicidad o experiencia de desarrollo.

Alguien pasó tres semanas construyendo un flujo de contenido en React: parseo de Markdown, frontmatter, generación de rutas, RSS... antes de darse cuenta de que Astro ya trae todo eso de serie. El código funcionaba. Simplemente no hacía falta que existiera.

La pregunta no es *qué framework es mejor*.

La pregunta real es: **qué tipo de web estoy construyendo**.

---

<h4>Los grupos prácticos</h4>

Hay tres grandes familias: SSGs, SPAs y meta frameworks. Las herramientas de documentación merecen una nota aparte porque están pensadas para un tipo de web muy distinto a un blog o portfolio.

**1. Static Site Generators (SSGs):** Astro, Zola, Hugo, Jekyll

Toman contenido, normalmente Markdown, más plantillas, y con un comando de build generan HTML/CSS/JS plano. Las páginas generadas se guardan en una carpeta tipo `dist` o `public`. En producción, la página ya existe como archivo; el navegador solo la descarga. Encajan muy bien en sitios con mucho contenido.

Herramientas como VitePress, Docusaurus y Nextra también son SSGs, pero vienen ya orientadas a documentar una librería o producto: barras laterales, búsqueda y navegación centrada en código. Para un blog o portfolio, suele encajar mejor Astro o Zola.

**2. SPAs / aplicaciones interactivas:** React, Vue, Angular, Svelte

React, Vue, Angular y Svelte se usan a menudo para construir *SPAs*: aplicaciones interactivas donde JavaScript gestiona las rutas, el estado y las actualizaciones de la UI en el navegador. Encajan bien en interfaces con mucho estado detrás de un login, donde el SEO suele importar menos. Angular, en concreto, se usa mucho en proyectos empresariales orientados a aplicación; tiene soporte para SSR, pero no un meta framework ampliamente adoptado equivalente a Next o Nuxt.

**3. Meta frameworks:** Next.js, Nuxt, SvelteKit

Se construyen encima de React/Vue/Svelte y añaden rutas, SSG, SSR, carga de datos y convenciones de despliegue. Úsalos cuando páginas estáticas de contenido y páginas tipo aplicación necesiten vivir en la misma base de código: comercio electrónico con páginas de producto estáticas y carrito interactivo, SaaS con marketing estático y dashboard completo, o una plataforma de blog con posts generados y editor interactivo. Si tus necesidades están claramente en un lado u otro, un meta framework suele ser demasiado.

![Tabla comparativa de SSGs, SPAs, SSGs de documentación y meta frameworks](/images/blog/2026-05-06-ssg-vs-spas-vs-meta-frameworks/table.jpeg)

---

<h4>El coste de elegir mal</h4>

Puedes usar cualquiera de estas herramientas para casi cualquier caso, pero pagas un precio cuando la herramienta no encaja con el problema.

*Usar React para un blog:*
* Construyes tu propio flujo de contenido desde cero: parseo de Markdown, frontmatter, generación de rutas, resaltado de sintaxis, RSS... Los SSGs ya te dan todo esto.
* Normalmente envías mucho más JavaScript del que un sitio de contenido necesita.
* El SEO y la carga inicial pueden sufrir si el contenido depende demasiado del renderizado en cliente.

*Usar Zola para una aplicación interactiva:*
* No tienes modelo de componentes integrado, renderizado declarativo ni sistema de reactividad.
* Gestionar estado con JavaScript plano se complica rápido cuando hay más de un par de piezas interactuando.
* Empiezas a reconstruir cosas que React/Vue ya resuelven bien.

*Usar Next.js cuando Astro o Zola bastan:*
* Añades más conceptos, dependencias y preocupaciones de despliegue de las que el proyecto necesita.
* Puedes acabar dedicando tiempo a modos de renderizado y convenciones del framework en lugar de avanzar con la web.

---

<h4>Astro: el SSG moderno</h4>

Si hoy empezara un sitio de contenido y quisiera funcionalidades modernas de frontend, **Astro** probablemente sería mi opción por defecto:

* Puedes escribir componentes de *React/Vue/Svelte*, y Astro los compila a HTML plano durante el build.
* *Islands architecture*: solo los componentes que marcas como interactivos envían JS al navegador.
* Muy buen soporte para MDX, Markdown con componentes embebidos.
* Un ecosistema grande de integraciones y temas.

Si quieres algo más simple, *Zola* es excelente: sin Node.js, sin npm, solo un binario de Rust.

---

<!-- Visual break before conclusion - changes based on time of year -->
{{ seasonal_image() }}

No hay un único mejor framework web, sino la herramienta adecuada para lo que estás construyendo.

Si el proyecto es principalmente contenido, empieza con un SSG. Si es principalmente estado e interacción, empieza con un framework de SPA. Si necesita ambas cosas, usa un meta framework.

Antes de empezar un proyecto nuevo, pregúntate: ¿es una página de contenidos, una aplicación interactiva, o ambas cosas?

Esas respuestas eligen la categoría. La categoría elige la herramienta.
