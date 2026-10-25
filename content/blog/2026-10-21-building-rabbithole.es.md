+++
title = "Cómo construí RabbitHole"
template = "blog-post.html"
description = "Cómo construí en solitario un producto de aprendizaje con IA, del primer prototipo al lanzamiento: dos años, tres nombres y un conejo"
[taxonomies]
tags = ["product", "ai"]
[extra]
series = "rabbithole"
cover_image = "/images/blog/2026-10-18-building-rabbithole/cover.webp"
+++

![blog-cover](/images/blog/2026-10-18-building-rabbithole/cover.webp)

> **TL;DR**
> - **RabbitHole** es una wiki con IA para curiosos: escribes un tema y recibes una guía estructurada de varias páginas, explicada a partir de lo que **ya sabes**.
> - Cada guía termina con un quiz, flashcards, un podcast y unas cuantas madrigueras nuevas en las que meterte después.
> - Me costó unos **dos años y tres nombres** llegar hasta aquí: AquaMesh, luego StudyMesh y, al final, RabbitHole.
> - Puedes <a target="_blank" href="https://rabbithole.cosmevalera.dev/try">probar una guía de ejemplo</a> sin crearte una cuenta.

---

<p>RabbitHole empezó siendo un submarino.</p>

<p>No uno de verdad. Un dashboard verde oscuro lleno de botones de sónar y controles de profundidad, que hice en septiembre de 2024 por un único motivo: <b>quería demostrar que era capaz de construir algo serio con React</b>. No había usuarios, ni un problema que resolver, ni más plan que "que quede bonito".</p>

<p>Dos años después, ese mismo repositorio es un SaaS completo con guías generadas por IA, sistema de pagos, landing page, tráiler y un conejo con cascos que responde a tus preguntas. En este post te cuento cómo pasé de una cosa a la otra y qué ideas solo surgieron porque seguí construyendo.</p>

---

<h4>Qué es RabbitHole</h4>

<p>Si alguna vez has intentado aprender algo complejo en un chat, ya sabes cómo va. Haces una pregunta, te llega un muro de texto, preguntas otra cosa, te llega otro muro y, veinte minutos después, lo útil está enterrado en algún punto de la conversación. Yo llegaba a copiar las respuestas de la IA en mi app de notas solo para no perderlas.</p>

<p>RabbitHole recibe un prompt y te devuelve una <b>guía</b> en lugar de una respuesta: unas pocas páginas cortas, cada una apoyada en la anterior, con una barra lateral para moverte entre ellas y un chat de IA que solo habla de lo que hay en la página.</p>

<p>De lo que más orgulloso estoy es de un detalle pequeño que pasa fácilmente desapercibido. Antes de empezar, le cuentas a RabbitHole <b>lo que ya sabes</b>: Docker, cocina, fútbol, Java, lo que sea. A partir de ahí, cada tema nuevo se explica a través de eso.</p>

<figure class="post-figure post-figure--narrow">
  <img src="/images/blog/2026-10-18-building-rabbithole/what-you-already-know.webp" alt="El panel 'What you already know' con Docker, Node, Java y React añadidos" width="421" height="680">
  <figcaption>La lista de la que RabbitHole saca sus analogías.</figcaption>
</figure>

<p>Así, si sabes Docker y preguntas "¿Qué es Kubernetes?", la guía arranca con un <b>Quick Start</b> que parte de los contenedores que ya entiendes, y solo después explica qué cambia cuando por debajo hay todo un clúster de máquinas. Incluso te dice dónde cojea la analogía.</p>

<figure class="post-figure post-figure--wide">
  <img src="/images/blog/2026-10-18-building-rabbithole/quick-start-analogy.webp" alt="Quick Start de una guía de Kubernetes, explicado a través de Docker" width="1005" height="624">
  <figcaption>Kubernetes, explicado para alguien que conoce Docker.</figcaption>
</figure>

<p>La <b>Key idea</b> se lee en 20 segundos, el <b>Quick summary</b> en unos 60, y solo después vienen las páginas completas. Tú decides hasta dónde bajar.</p>

<p>Ese es el producto hoy. El camino hasta aquí fue bastante menos ordenado.</p>

---

<h4>AquaMesh: la época del submarino</h4>

<p>La primera versión se llamaba <b>AquaMesh</b>, y la temática acuática llegaba hasta el último rincón. La idea era una app de organización: tenías <b>Dashboards</b> y, dentro de cada uno, colocabas cajas llamadas <b>Widgets</b> que podías mover y redimensionar. En la captura de abajo, toda la pantalla es un dashboard y cada panel que hay dentro es un widget.</p>

<figure class="post-figure post-figure--wide">
  <img src="/images/blog/2026-10-18-building-rabbithole/aquamesh.webp" alt="AquaMesh: un dashboard con dos widgets, Control Flow y System Lens" width="1400" height="660">
  <figcaption>AquaMesh: un dashboard (1 en rojo) con dos widgets, Control Flow y System Lens (1 y 2 en morado).</figcaption>
</figure>

<p>Al principio solo había un par de widgets predefinidos, así que era más un escaparate que una herramienta. Así que en la segunda versión añadí un <b>Widget Editor</b>: una página de arrastrar y soltar donde podías montar tus propios widgets con textos, campos, botones, interruptores y gráficas. Algo así como HTML y CSS, pero sin código. Hasta había un login de mentira con distintos roles, porque una app de dashboards sin roles no me parecía lo bastante real.</p>

<figure class="post-figure post-figure--wide">
  <video class="post-video" src="/images/blog/2026-10-18-building-rabbithole/aquamesh-live-demo.mp4" aria-label="Creando un widget en el Widget Editor de AquaMesh" width="1600" height="754" autoplay loop muted playsinline></video>
  <figcaption>El Widget Editor: creas un widget una vez y lo colocas en cualquier dashboard.</figcaption>
</figure>

<p>Estaba contento con el resultado, así que se lo enseñé a unos amigos. Su veredicto fue educado y certero: <b>buena idea, poco práctica</b>. Nadie supo decirme para qué lo usaría de verdad, y yo tampoco.</p>

<p>Así que AquaMesh se quedó unos meses en un cajón.</p>

---

<h4>StudyMesh: llega la IA</h4>

<p>En septiembre de 2025 quise añadir el proyecto a mi CV, pero no tal y como estaba. Necesitaba una idea nueva que justificara volver a abrirlo. La candidata obvia era la IA: en lugar de construir cada widget a mano, <b>¿y si pudieras pedírselos?</b></p>

<p>Esa pregunta le dio al proyecto su primer usuario real, aunque solo existiera en mi cabeza: <b>un estudiante</b>. Un estudiante organiza sus asignaturas en carpetas (Matemáticas, Anatomía, Literatura), cada carpeta contiene dashboards y cada dashboard mezcla widgets con una imagen, un PDF, un vídeo de YouTube o unos apuntes. Encima de todo eso, dos botones nuevos: <b>Create Study Pack</b>, que generaba un dashboard a partir de una foto o un texto, y <b>Create Study Path</b>, que generaba varios en orden.</p>

<p>También pasé el diseño a blanco, sobre todo para que pareciera profesional. El logo seguía diciendo AquaMesh, pero en espíritu ya era StudyMesh.</p>

<figure class="post-figure post-figure--wide">
  <video class="post-video" src="/images/blog/2026-10-18-building-rabbithole/studymesh-first-ai.mp4" aria-label="Un dashboard de Matemáticas con widgets sobre derivadas generados por IA" width="1280" height="608" autoplay loop muted playsinline></video>
  <figcaption><b>Create Study Pack:</b> a partir de un texto o una imagen, genera markdown, datos clave y quizzes.</figcaption>
</figure>

<p>Funcionaba, pero era rudimentario. Recibías algo de markdown, unos cuantos datos clave y un quiz, metidos con calzador en widgets pensados para algo completamente distinto.</p>

<p>La siguiente iteración ya estrenó nombre y logo de verdad. Los dashboards pasaron a una <b>Library</b>, y la pantalla se asentó en tres columnas: lo que puedes crear a la izquierda, lo que has creado en el centro y, a la derecha, un chat de IA que solo responde sobre lo del centro. El study pack se dividió en cuatro opciones más rápidas (quiz, flashcards, apuntes en limpio y "crear a partir de material"), y lo que se estaba generando pasó a aparecer como pequeñas etiquetas en una cola, abajo del todo, para que pudieras seguir trabajando mientras la IA estaba ocupada.</p>

<figure class="post-figure post-figure--wide">
  <div class="post-mosaic">
    <img src="/images/blog/2026-10-18-building-rabbithole/studymesh-three-panels.webp" alt="StudyMesh con tres paneles: menú de creación, contenido de estudio y chat de IA" width="1400" height="696">
    <video class="post-video post-video--tile" src="/images/blog/2026-10-18-building-rabbithole/studymesh-phone-video.mp4" poster="/images/blog/2026-10-18-building-rabbithole/studymesh-phone-poster.webp" data-label="Móvil" aria-label="StudyMesh en el móvil" width="382" height="850" preload="none" loop muted playsinline></video>
    <video class="post-video post-video--tile post-video--left" src="/images/blog/2026-10-18-building-rabbithole/studymesh-dark-video.mp4" poster="/images/blog/2026-10-18-building-rabbithole/studymesh-dark-poster.webp" data-label="Generando" data-sublabel="en modo oscuro" aria-label="StudyMesh en modo oscuro, con la cola de generación" width="1280" height="640" preload="none" loop muted playsinline></video>
  </div>
  <figcaption>StudyMesh: creas a la izquierda, lees en el centro y preguntas a la derecha. Toca las miniaturas para verlo en el móvil o generando material en modo oscuro.</figcaption>
</figure>

<p>Ojalá pudiera decirte que este diseño salió de un plan claro. Pues no. Iba aprendiendo mientras construía: probaba cosas, me quedaba con lo que funcionaba, borraba lo que no y comprobaba en el móvil todo el rato que nada se rompiera en una pantalla pequeña. Mucho de lo que hice en esa época ya no existe, y no pasa nada; así descubrí lo que el producto no debía ser.</p>

---

<h4>De proyecto a producto</h4>

<p>Hasta aquí, StudyMesh era una app. Lo que la convirtió en un <b>producto</b> fue todo el trabajo aburrido e invisible que la rodea:</p>

- **Cuentas reales**, con inicio de sesión con Google y los datos en Supabase.
- **Una landing page**, que tuvo una segunda versión completa unos meses después.
- **Tres modos de IA**: *Hosted*, en el que yo pago el modelo y tú me pagas con créditos; *Local*, que ejecuta un modelo en tu propio ordenador; y *BYOK* (bring your own key, "trae tu propia clave"), para quien ya paga una API key.
- **Pagos** con Stripe y una moneda propia, los Study Credits: una guía costaba 3, todo lo demás 1, y un pack de 2 € te daba 150.
- **Podcasts**, para escuchar una guía en el autobús.
- **Una mascota de IA**, porque, sin una cara, el chat resultaba frío. Empezó siendo un delfín y acabó convirtiéndose en un pequeño elenco entre el que elegir: una abeja, un delfín y un loro.

<div class="phone-images-row">
  <img class="phone-image" src="/images/blog/2026-10-18-building-rabbithole/studymesh-landing-phone.webp" alt="Landing page de StudyMesh en un móvil"></img>
  <img class="phone-image" src="/images/blog/2026-10-18-building-rabbithole/studymesh-pet-phone.webp" alt="Chat de IA de StudyMesh con la mascota delfín en un móvil"></img>
</div>

<p>Ninguna de estas funciones es lo que un usuario recuerda. Todas son lo que un usuario necesita antes de confiarte su email, y no digamos su tarjeta. Si solo has hecho proyectos personales, esta es la parte que te sorprende: <b>hacer la app me llevó meses, y convertirla en producto, otros tantos</b>.</p>

---

<h4>RabbitHole: la idea que lo cambió todo</h4>

<p>En junio de 2026, una sola función le dio la vuelta a todo lo demás: la lista de <b>"What you already know"</b> del principio de este post.</p>

<p>Cuando las guías pudieron explicarse a partir de lo que ya sabías, dejaron de ser material de estudio. Un desarrollador que aprende Kubernetes, un cocinero con curiosidad por la fermentación, un aficionado al fútbol leyendo sobre teoría de juegos: ninguno está estudiando para un examen. Están siguiendo su curiosidad, enlace a enlace. De repente, el nombre "StudyMesh" sonaba a deberes.</p>

<p>Así fue como pasó a llamarse <b>RabbitHole</b> (en inglés, <i>caer en un rabbit hole</i> es perderse durante horas en un tema, saltando de uno a otro). Y el nombre colocó la última pieza que faltaba: qué pasa cuando termina una guía. Ahora la última página te pone un quiz y, después, un puñado de <b>nuevas madrigueras</b>: temas que parten del que acabas de terminar. Un botón más, <b>Add to what I know</b>, añade el tema a tu lista, para que la siguiente guía pueda usarlo como analogía.</p>

<figure class="post-figure post-figure--wide">
  <img src="/images/blog/2026-10-18-building-rabbithole/end-of-guide.webp" alt="Resultados del quiz con 'Add to what I know' y guías sugeridas para seguir" width="1117" height="872">
  <figcaption>El final de una guía es el principio de la siguiente.</figcaption>
</figure>

<p>Ese ciclo es el producto entero en una sola imagen. <b>Cada guía que terminas hace que la siguiente sea más fácil de entender.</b></p>

<p>El resto vino con el nombre, como suele pasar. La interfaz se rediseñó, el delfín se convirtió en un conejo con cascos y pañuelo verde, y los Study Credits pasaron a ser <b>zanahorias</b>.</p>

<figure class="post-figure">
  <img src="/images/blog/2026-10-18-building-rabbithole/carrots.webp" alt="Saldo de zanahorias, el coste de cada acción y tres packs de zanahorias" width="931" height="728">
  <figcaption>La tienda de zanahorias. Un par de guías al día son gratis; a partir de ahí, zanahorias.</figcaption>
</figure>

<figure class="post-figure post-figure--wide">
  <img src="/images/blog/2026-10-18-building-rabbithole/rabbithole-workspace.webp" alt="Espacio de trabajo de RabbitHole con páginas, una guía de Kubernetes y el chat de IA del conejo" width="1400" height="666">
  <figcaption>RabbitHole hoy: las páginas a la izquierda, la guía en el centro y el conejo a la derecha.</figcaption>
</figure>

---

<h4>Bajo el capó</h4>

<p>Para los desarrolladores que estéis leyendo: RabbitHole es una app de <b>React + TypeScript</b> dentro de un monorepo con <b>Turborepo</b>, con funciones serverless en <b>Vercel</b> como backend. <b>Supabase</b> guarda los datos y las cuentas, <b>Stripe</b> se encarga de las zanahorias, y las guías las escriben modelos de <b>OpenAI</b>, <b>Gemini</b> y <b>Cerebras</b>. Los tests van con <b>Vitest</b> para la lógica y <b>Playwright</b> para los E2E.</p>

<details class="expandable-info">
    <summary><i class="fas fa-info-circle"></i> Todos los servicios externos que usa RabbitHole</summary>
    <div class="expandable-content">
        <p><b>Vercel</b>: hosting y funciones serverless.<br/>
        <b>Supabase</b>: base de datos y autenticación.<br/>
        <b>Google Auth</b>: inicio de sesión con un clic.<br/>
        <b>Stripe</b>: pagos de los packs de zanahorias.<br/>
        <b>OpenAI, Gemini y Cerebras</b>: los modelos detrás de las guías, los quizzes, las flashcards y el chat.<br/>
        <b>Unreal Speech</b>: las voces de los podcasts.<br/>
        <b>Tavily</b>: búsqueda web dentro del chat de IA.</p>
        <p>El código es público en <a class="link-text" target="_blank" href="https://github.com/CosmeValera/RabbitHole"><b>GitHub</b></a>.</p>
    </div>
</details>

---

<!-- Visual break before conclusion - changes based on time of year -->
{{ seasonal_image() }}

<p>AquaMesh nació para demostrar que sabía programar en React. RabbitHole me demostró algo más útil: que soy capaz de llevar un repositorio vacío hasta un producto con cuentas, pagos, landing page y una idea propia.</p>

<p>Si fue un <b>buen</b> producto ya es otra historia, y los números lo tienen bastante claro. Eso queda para el próximo post: <a class="link-text" href="/es/blog/rabbithole-post-mortem/?mode=series"><b>RabbitHole: el post-mortem</b></a>.</p>

<p>Mientras tanto, el conejo sigue respondiendo preguntas. <a class="link-text" target="_blank" href="https://rabbithole.cosmevalera.dev/try"><b>Elige un tema y métete en la madriguera</b></a>.</p>
