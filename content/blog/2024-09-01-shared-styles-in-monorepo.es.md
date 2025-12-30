+++
title = "Estilos Compartidos en Monorepos"
template = "blog-post.html"
description = "Enfoques para mantener estilos consistentes entre múltiples proyectos en un entorno monorepo"
[taxonomies]
tags = ["frontend"]
[extra]
cover_image = "/images/blog/2024-09-01-shared-styles-in-monorepo/cover-webp.webp"
+++

![blog-cover](/images/blog/2024-09-01-shared-styles-in-monorepo/cover-webp.webp)

<h4><b>🤔 Resumen</b></h4>

En proyectos a gran escala, mantener estilos consistentes entre múltiples aplicaciones es crucial. Aquí hay dos enfoques clave para gestionar estilos compartidos:

1. 📦 Crear una librería de estilos compartida como un <b>paquete npm</b>.
2. 🔗 Importar estilos directamente desde <b>un directorio centralizado</b> dentro del monorepo.

---

<h4><b>📦 1. Crear una Librería de Estilos con npm</b></h4>

<b>Resumen:</b> Este enfoque implica crear una librería de estilos dedicada que se publica como un paquete npm. Los estilos pueden luego importarse en cualquier proyecto que los necesite.

<b>Implementación:</b> Por ejemplo, si estás trabajando con estilos de tema personalizados para PrimeReact, puedes crear tus estilos en una librería y exportarlos usando un archivo `index.js` así:


```sh
module.exports = {
  theme: require('./style/themes/my-theme/theme.scss'),
};
```

Después de publicar el paquete, puedes instalarlo en tus proyectos usando:

```sh
npm i my-theme
```

Luego, simplemente importa los estilos en tu punto de entrada JavaScript principal:

```sh
import 'my-theme';
```

<b>Ventajas:</b>
Control de versiones centralizado de estilos.
Fácil de actualizar y distribuir entre múltiples proyectos.

<b>Desventajas:</b>
Requiere publicar y versionar con cada cambio.

<h4><b>🔗 2. Importación Directa desde un Directorio Centralizado</b></h4>

<b>Resumen:</b> Si estás usando una configuración de monorepo, puedes almacenar tus estilos en un directorio central e importarlos directamente en cada proyecto.

<b>Implementación:</b> Coloca tus estilos en una carpeta a nivel raíz, paralela a tus apps, e impórtalos en tus proyectos:

```sh
import '../style/themes/my-theme/theme.scss';
```

<b>Ventajas:</b>
No es necesario publicar o gestionar versiones.
Acceso inmediato a los últimos estilos sin pasos adicionales.

<b>Desventajas:</b>
Potencial para cambios accidentales que rompan funcionalidad si los estilos se actualizan.
Necesitas tener una estructura de monorepo; no funciona si los proyectos están divididos en diferentes repositorios.

---
<!-- Visual break before conclusion - changes based on time of year -->
{{ seasonal_image() }}

<h4><b>❓ Qué elegir</b></h4>

- Usa un <b>paquete npm</b> si quieres tener control de versiones estricto o no tienes todos tus proyectos en la misma carpeta.
- Usa importación directa desde <b>un directorio centralizado</b> si prefieres una solución más simple y tu estructura de código lo permite.
