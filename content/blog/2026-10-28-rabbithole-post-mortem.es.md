+++
title = "RabbitHole: el post-mortem"
template = "blog-post.html"
description = "Lo que aprendí sobre desarrollo de producto lanzando mi primer SaaS"
[taxonomies]
tags = ["product"]
[extra]
series = "rabbithole"
cover_image = "/images/blog/2026-10-25-rabbithole-post-mortem/cover.png"
+++

![blog-cover](/images/blog/2026-10-25-rabbithole-post-mortem/cover.png)

> **TL;DR**
> - Lancé RabbitHole en LinkedIn con una promoción de **35 €**. Llegó a **12.091** impresiones, algunas personas lo probaron y **nadie compró ni una zanahoria** (los créditos de la app).
> - El problema no fue la parte técnica, sino las decisiones de producto: un usuario objetivo difuso, un MVP de dos años, cero métricas de conversión y una validación que solo venía de amigos.
> - La próxima vez: un usuario, un problema, una hipótesis y medirlo todo desde el primer día.

---

<p>El día del lanzamiento tenía una cuenta de Stripe, tres planes de precios, un tráiler y un conejo con cascos.</p>

<p>Unas semanas después tenía doce mil impresiones y cero euros.</p>

<p>Si aún no lo has leído, en <a class="link-text" href="/es/blog/building-rabbithole/"><b>Cómo construí RabbitHole</b></a> cuento cómo nació el producto. Este post va de lo que pasó cuando se topó con el mundo real, y de los errores que solo veo ahora que ha terminado. Lo escribo porque un post-mortem solo vale lo que vale su honestidad, y porque prefiero no cometer ninguno de estos errores dos veces.</p>

---

<h4>El lanzamiento</h4>

<p>Anuncié RabbitHole en un post de LinkedIn: el problema (aprender en una ventana de chat infinita es un caos), la solución (guías estructuradas con analogías, flashcards, tests y pódcasts), el enlace y el tráiler de un minuto. Después pagué <b>35 €</b> para promocionarlo entre un público de habla inglesa en España.</p>

<figure class="post-figure post-figure--narrow">
  <img src="/images/blog/2026-10-25-rabbithole-post-mortem/linkedin-post.webp" alt="Post de LinkedIn que anuncia RabbitHole con el tráiler en vídeo" width="499" height="802">
</figure>

<p>Este fue el resultado:</p>

<figure class="post-figure">
  <img src="/images/blog/2026-10-25-rabbithole-post-mortem/linkedin-impressions.webp" alt="Estadísticas de LinkedIn: 10 reacciones, 3 comentarios, 2 veces compartido y 12.091 impresiones" width="496" height="206">
  <figcaption>12.091 impresiones, 10 reacciones, 3 comentarios, 2 veces compartido.</figcaption>
</figure>

<p>Doce mil personas vieron el post. Algunas abrieron la app. ¿Cuántas? No lo sé, y eso acabó siendo uno de los cuatro errores. <b>Nadie compró zanahorias.</b></p>

---

<h4>Lo que salió bien</h4>

<p>Empiezo por lo bueno, porque lo hay, y no es poco.</p>

<p><b>Construí un SaaS completo yo solo.</b> Cuentas, base de datos, tres modos de IA, pagos, pódcasts, una landing, una demo pública y una batería de tests. Hace dos años tenía un dashboard en React con botones tipo sonar. Por el camino aprendí más sobre integración de IA, UI/UX y pagos de lo que me habría enseñado cualquier curso, porque cada lección venía con un bug que tenía que arreglar yo.</p>

<p>Y ahora el proyecto está en mi CV, que no esta mal.</p>

---

<h4>Lo que salió mal</h4>

<p>Como producto, no funcionó. Lo cual, todo sea dicho, es lo que les pasa a casi todos los primeros productos. Lo interesante no es si fracasó, sino <b>por qué</b>, y, tras varias semanas dándole vueltas, siempre acabo en las mismas cuatro razones.</p>

<b>1. "Gente curiosa" no es un usuario objetivo</b>

<p>RabbitHole era para gente curiosa. Suena a público objetivo, pero es un estado de ánimo. Todo el mundo siente curiosidad por algo, así que nadie en concreto se levanta por la mañana pensando "necesito RabbitHole".</p>

<p>El producto estaba a medio camino entre <b>ChatGPT</b>, que es para todo el mundo, y <b>NotebookLM</b>, que es para estudiantes que trabajan con su propio material. Y a una persona normal le costaba imaginar el momento exacto en el que abriría RabbitHole en vez de preguntarle directamente a ChatGPT. Si yo no soy capaz de describir ese momento en una frase, alguien que está haciendo scroll en LinkedIn no lo va a adivinar por mí.</p>

<p>Lo irónico es que StudyMesh, la versión anterior, tenía un público mucho más claro: <b>un estudiante a una semana de un examen</b>. Eso es una persona, con una fecha límite y un problema. Quise hacer la idea más grande abriéndola a todo el mundo, y lo único que conseguí fue que nadie la necesitara.</p>

<b>2. Un MVP que tardó dos años</b>

<p>Un MVP debería responder a una pregunta de la forma más barata posible: <i>¿alguien necesita esto?</i> El mío pasó dos años respondiendo a otra: <i>¿qué más puedo construir?</i></p>

<p>Nunca puse por escrito una hipótesis. Cada versión salía de la anterior, a base de experimentar y de la idea que me tuviera enganchado ese mes: widgets con IA, luego rutas de estudio, luego mascotas, luego pódcasts. Durante largas temporadas no tenía nada concreto que validar, así que construía la siguiente funcionalidad. Y así es como el desarrollo deja de ser iteración validada y se convierte en experimentación sin rumbo.</p>

<p>Todo lo que importa de RabbitHole (una guía explicada a partir de lo que ya sabes) se podría haber probado en <b>un par de meses</b>. Las zanahorias podían esperar.</p>

<b>3. Sin métricas no hay respuestas</b>

<p>Esta es la que más me duele, porque era muy fácil de evitar.</p>

<p>No medí el embudo de conversión: <b>visita a la landing → registro → primera guía creada</b>. Sin eso, 12.091 impresiones son solo un número. ¿La gente vio el post y no hizo clic? ¿Hizo clic, vio la landing y se fue? ¿Se registró y nunca creó una guía? ¿Creó una y no volvió? Cada caso tiene una solución completamente distinta, y <b>no tengo ni idea de cuál fue</b>.</p>

<figure class="post-figure">
  <img src="/images/blog/2026-10-25-rabbithole-post-mortem/funnel-es.svg" alt="Embudo con 12.091 impresiones arriba, 0 compras abajo y, entre medias, visitas a la landing, registros y primeras guías marcados como sin medir" width="640" height="376">
  <figcaption>Medí el principio y el final. Todo lo de en medio es una interrogación.</figcaption>
</figure>

<p>Doce mil impresiones, y lo único que he aprendido de ellas es que debería haberlas medido.</p>

<b>4. Validación a golpe de WhatsApp</b>

<p>Mi feedback venía de un grupo de WhatsApp: mis tres hermanos, todos desarrolladores, y seis o siete amigos. Son listos, sinceros y generosos con su tiempo. Pero <b>no eran el usuario objetivo</b>, y la gente que te quiere no es la más indicada para decirte que tu producto no hace falta.</p>

<p>Echando la vista atrás, el feedback más valioso que recibí fue el primero, sobre AquaMesh (la versión previa de todo esto): <i>buena idea, pero poco práctica</i>. Respondí cambiándole el nombre al producto y añadiéndole IA. Lo que debería haber hecho es sentarme con estudiantes de verdad, preguntarles cómo estudian realmente y construir lo mínimo que les ayudara con eso.</p>

---

<h4>Qué haría diferente</h4>

1. **Elegir un usuario concreto.** No "gente curiosa", sino alguien con nombre y apellidos, un momento concreto y un problema.
2. **Construir el MVP en semanas, no en años**, y que valide un único problema central.
3. **Escribir la hipótesis antes que el código.** Si no hay una hipótesis clara, la siguiente funcionalidad probablemente sea una apuesta a ciegas.
4. **Medir la conversión desde el primer día:** visitas a la landing, registros y la primera acción real.
5. **Validar con gente que encaje con el usuario objetivo**, no solo con amigos y familia.
6. **Preocuparme tanto por el "porqué" como por el "cómo".** ¿Por qué alguien usaría esto en lugar de lo que ya usa?

<p>Ese último punto es en el que estoy trabajando ahora. La ingeniería me enseñó <b>cómo</b> construir cosas; nunca me obligó a preguntarme <b>por qué</b> alguien las querría. Por eso me leí <a class="link-text" target="_blank" href="/es/readings/"><b>Escaping the Build Trap</b></a>, de Melissa Perri. La "build trap" es lo que pasa cuando un equipo mide el éxito por las funcionalidades que lanza en lugar de por el valor que aporta, y leerlo después de RabbitHole ha sido un poco incómodo, en el buen sentido. Yo era un equipo de una sola persona metido de lleno en esa trampa.</p>

---

<!-- Visual break before conclusion - changes based on time of year -->
{{ seasonal_image() }}

<p>RabbitHole no encontró a sus usuarios, pero a mí sí me ayudó a encontrar una forma mejor de trabajar: soy mejor desarrollador por haberlo construido, y tengo más visión de producto después de ver cómo no se vendía.</p>

<p>La app sigue online y el conejo sigue respondiendo preguntas. Si te pica la curiosidad, <a class="link-text" target="_blank" href="https://rabbithole.cosmevalera.dev/try"><b>prueba una guía</b></a>: no hace falta registrarte.</p>

<p>Y la próxima vez, lo primero que construya no será el producto. Será la pregunta.</p>
