+++
title = "Principios SOLID"
template = "blog-post.html"
description = "Descubre cómo aplicar los principios SOLID para escribir un código más limpio, escalable y fácil de mantener"
[taxonomies]
tags = ["best-practices", "recommended"]
[extra]
cover_image = "/images/blog/2024-11-22-solid-principles/cover-webp.webp"
+++

![blog-cover](/images/blog/2024-11-22-solid-principles/cover-webp.webp)

<h4>🧐 ¿Por qué seguir los principios SOLID?</h4>

Como desarrolladores de software, nos esforzamos por crear sistemas robustos, mantenibles y fáciles de escalar. Los principios SOLID ofrecen una base para escribir código limpio y bien estructurado, priorizando clases de propósito único, diseños extensibles y dependencias mínimas.

Aquí tienes un desglose de cada principio con ejemplos e ideas sobre su aplicación:

> Cada principio incluye una calificación de dificultad (<code>Fácil</code>, <code>Medio</code> o <code>Difícil</code>) para reflejar su complejidad de comprensión.

---

<h4>📜 1. Principio de responsabilidad única (SRP) <code class="solid-principles-tag">Medio</code></h4>

**Definición:** Una clase debe tener solo una razón para cambiar, lo que significa que debe tener una única responsabilidad o propósito.
```ts
/** Viola SRP **/
class User {
  saveToDatabase() {}
  logUserActivity() {}
}
```
```ts
/** Sigue SRP **/
class UserRepository {
  saveToDatabase(user: User) {}
}
class Logger {
  logUserActivity(user: User) {}
}
```

🚫 **Viola SRP:** Maneja múltiples responsabilidades.   
✅ **Sigue SRP:** Separa las responsabilidades en diferentes clases como `UserRepository` y `Logger`.

---

<h4>📦 2. Principio abierto/cerrado (OCP) <code class="solid-principles-tag">Difícil</code></h4>

**Definición:** Las entidades de software (clases, módulos, funciones) deben estar abiertas para extensión pero cerradas para modificación.
```ts
/** Viola OCP **/
class Shape {
  draw(shapeType: string) {
    if (shapeType === 'circle') {
      drawCircle();
    } else if (shapeType === 'square') {
      drawSquare();
    }
  }
}
```
```ts
/** Sigue OCP **/
abstract class Shape {
  abstract draw(): void;
}
class Circle extends Shape {
  draw() { /* dibujar círculo */ }
}
class Square extends Shape {
  draw() { /* dibujar cuadrado */ }
}
```

🚫 **Viola OCP:** Modificar código existente para nuevos comportamientos.    
✅ **Sigue OCP:** Añadir nuevos comportamientos sin modificar código existente.

---

<h4>🔄 3. Principio de sustitución de Liskov (LSP) <code class="solid-principles-tag">Difícil</code></h4>

**Definición:** Los subtipos deben poder sustituir a sus tipos base sin alterar la corrección del programa. En otras palabras, una clase derivada debe poder reemplazar a su clase padre sin causar ningún comportamiento inesperado.

**Cómo identificar una violación:** Si al sobrescribir un método en la subclase cambias la lógica de tal forma que el código que usa la clase padre deja de funcionar, vas por mal camino. Las subclases deben respetar siempre el comportamiento que se espera de la clase base.
```ts
/** Viola LSP **/
class Rectangle {
  setWidth(width: number) { this.width = width; }
  setHeight(height: number) { this.height = height; }
  getArea() { return this.width * this.height; }
}
class Square extends Rectangle {
  setWidth(width: number) {
    this.width = width;
    this.height = width; // Rompe LSP: comportamiento inesperado
  }
}
```
```ts
/** Sigue LSP **/
abstract class Shape {
  abstract getArea(): number;
}
class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }
  getArea() { return this.width * this.height; }
}
class Square extends Shape {
  constructor(private side: number) {
    super();
  }
  getArea() { return this.side * this.side; }
}
```
**Sobre este ejemplo:** Tenemos una clase `Square` que hereda de `Rectangle`, pero que cambia su comportamiento al asignar el ancho o el alto. Mientras que la clase base asume que ambas dimensiones son independientes, la clase `Square` obliga a que los lados sean iguales, lo que provoca resultados inesperados.

**🚫 Viola LSP:** Si una clase derivada altera la lógica o el comportamiento esperado de la clase base, rompe la capacidad de sustitución.    
**✅ Sigue LSP:** Garantiza que los subtipos mantengan un comportamiento coherente y respeten las reglas establecidas por el tipo base.

---

<h4>🎛️ 4. Principio de segregación de interfaces (ISP) <code class="solid-principles-tag">Fácil</code></h4>

**Definición:** Una clase no debe verse forzada a implementar interfaces que no usa. En su lugar, crea interfaces específicas y más pequeñas.
```ts
/** Viola ISP **/
interface MultifunctionDevice {
  print(): void;
  scan(): void;
  fax(): void;
}
```
```ts
/** Sigue ISP **/
interface Printer {
  print(): void;
}
interface Scanner {
  scan(): void;
}
```

**🚫 Viola ISP:** Una única interfaz que obliga a las implementaciones a incluir métodos no utilizados o irrelevantes.    
**✅ Sigue ISP:** Divide las interfaces en unas más pequeñas y específicas para asegurar que las implementaciones solo incluyan métodos relevantes.

---

<h4>🔗 5. Principio de inversión de dependencias (DIP) <code class="solid-principles-tag">Medio</code></h4>

**Definición:** Los módulos de alto nivel no deben depender de módulos de bajo nivel. Ambos deben depender de abstracciones (por ejemplo, interfaces).
```ts
/** Viola DIP **/
class EmailService {
  sendEmail() {
    /* lógica de email */
  }
}
class Notification {
  private emailService = new EmailService();
  notify() {
    this.emailService.sendEmail();
  }
}
```
```ts
/** Sigue DIP **/
interface MessageService {
  sendMessage(): void;
}
class EmailService implements MessageService {
  sendMessage() {
    /* lógica de email */
  }
}
class Notification {
  private messageService: MessageService;
  constructor(private messageService: MessageService) {
    this.messageService = messageService;
  }
  notify() {
    this.messageService.sendMessage();
  }
}
```

🚫 **Viola DIP:** Las clases de alto nivel dependen directamente de implementaciones de bajo nivel.    
✅ **Sigue DIP:** Usa abstracciones para desacoplar dependencias.

---

<!-- Visual break before conclusion - changes based on time of year -->
{{ seasonal_image() }}

<h4>Recursos</h4>

- **"Nothing is Something":** Un vídeo `altamente` recomendado que introduce el patrón Null Object de manera clara y práctica. También presenta un excelente ejemplo de cómo la herencia puede fallar y la transición de herencia a composición, haciéndolo imprescindible para cualquiera que busque profundizar su comprensión de los principios de diseño limpio. <a target="_blank" href="https://www.youtube.com/watch?v=OMPfEXIlTVE"><span class="fab fa-youtube"></span>Míralo aquí</a>
- **"Uncle Bob on SOLID Principles":** Un vídeo que cubre conceptos de diseño orientado a objetos y toca los principios SOLID cerca del final. Una buena opción para entender los fundamentos del código limpio. <a target="_blank" href="https://www.youtube.com/watch?v=zHiWqnTWsn4"><span class="fab fa-youtube"></span>Míralo aquí</a>
- **"Inyección de Dependencias":** Si quieres profundizar en el Principio de Inversión de Dependencias (DIP) y ver cómo se aplica en la práctica, echa un vistazo a mi post sobre la Inyección de Dependencias. <a target="_blank" class="link-text" href="https://cosmevalera.dev/es/blog/dependency-injection/"><b>Léelo aquí</b></a>

<h4>Conclusión</h4>

🥰 Siguiendo estos principios, puedes crear software más fácil de mantener, escalar y extender. Ya sea que estés construyendo una pequeña aplicación o un sistema complejo, los principios SOLID sirven como guía para evitar deuda técnica y mejorar la calidad del código.

¡Comienza a aplicarlos hoy y observa cómo se transforma tu código! 🎉