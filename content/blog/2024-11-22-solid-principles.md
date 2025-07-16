+++
title = "SOLID Principles"
template = "blog-post.html"
description = "Learn how SOLID principles can enhance your codebase by promoting maintainability, scalability, and clean design"
[taxonomies]
tags = ["architecture", "recommended"]
[extra]
cover_image = "/images/blog/2024-11-22-solid-principles/opt1.png"
+++

![blog-cover](/images/blog/2024-11-22-solid-principles/opt1.png)

<h4>🧐 Why SOLID Principles?</h4>

As software developers, we strive to create systems that are robust, maintainable, and easy to scale. The SOLID principles offer a foundation for writing clean, well-structured code by encouraging single-purpose classes, extensible designs, and minimal dependencies.

Here's a breakdown of each principle with examples and insights into their application:

> Each principle includes a difficulty rating (<code>Easy</code>, <code>Medium</code>, or <code>Hard</code>) to reflect its understanding complexity.

---

<h4>📜 1. Single Responsibility Principle (SRP) <code class="solid-principles-tag">Medium</code></h4>

**Definition:** A class should have only one reason to change, meaning it should have a single responsibility or purpose.

```ts
/** Violates SRP **/
class User {
  saveToDatabase() {}
  logUserActivity() {}
}
```

```ts
/** Follows SRP **/
class UserRepository {
  saveToDatabase(user: User) {}
}
class Logger {
  logUserActivity(user: User) {}
}
```

🚫 **Violates SRP:** Handles multiple responsabilities.   
✅ **Follows SRP:** Separate concerns into different classes like `UserRepository` and `Logger`.

---

<h4>📦 2. Open/Closed Principle (OCP) <code class="solid-principles-tag">Hard</code></h4>

**Definition:** Software entities (classes, modules, functions) should be open for extension but closed for modification.

```ts
/** Violates OCP **/
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
/** Follows OCP **/
abstract class Shape {
  abstract draw(): void;
}
class Circle extends Shape {
  draw() { /* draw circle */ }
}
class Square extends Shape {
  draw() { /* draw square */ }
}
```

**🚫 Violates OCP:** Modifying existing code for new behaviours.    
**✅ Follows OCP:** Add new behaviours without modifying existing code.

---

<h4>🔄 3. Liskov Substitution Principle (LSP) <code class="solid-principles-tag">Hard</code></h4>

**Definition:** Subtypes must be substitutable for their base types without altering the correctness of the program. In other words, a derived class must be able to replace its parent class without causing unexpected behavior.

**How to identify a violation:** If overriding a method in the subclass breaks assumptions about the parent class, this violates LSP. Subtypes must maintain the behavior expected by the base type.

```ts
/** Violates LSP **/
class Rectangle {
  setWidth(width: number) { this.width = width; }
  setHeight(height: number) { this.height = height; }
  getArea() { return this.width * this.height; }
}
class Square extends Rectangle {
  setWidth(width: number) {
    this.width = width;
    this.height = width; // Breaks LSP: unexpected behavior
  }
}
```

```ts
/** Follows LSP **/
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

**Regarding this example:** A `Square` class inheriting from `Rectangle` but behaving differently when setting its width or height. The base class assumes independent width and height, but the `Square` class enforces equal sides, leading to unexpected behavior.    

**🚫 Violates LSP:** When a derived class alters assumptions or expected behaviors defined in the base class, it breaks substitutability.    
**✅ Follows LSP:** Ensure that subtypes maintain consistent behavior and respect the expectations set by their base type.

---

<h4>🎛️ 4. Interface Segregation Principle (ISP) <code class="solid-principles-tag">Easy</code></h4>

**Definition:** A class should not be forced to implement interfaces it doesn't use. Instead, create specific, smaller interfaces.

```ts
/** Violates ISP **/
interface MultifunctionDevice {
  print(): void;
  scan(): void;
  fax(): void;
}
```

```ts
/** Follows ISP **/
interface Printer {
  print(): void;
}
interface Scanner {
  scan(): void;
}
```

**🚫 Violates ISP:** A single interface forcing implementations to include unused or irrelevant methods.    
**✅ Follows ISP:** Divide interfaces into smaller, specific ones to ensure implementations only include relevant methods.

---

<h4>🔗 5. Dependency Inversion Principle (DIP) <code class="solid-principles-tag">Medium</code></h4>

**Definition:** High-level modules should not depend on low-level modules. Both should depend on abstractions (e.g., interfaces).

```ts
/** Violates DIP **/
class EmailService {
  sendEmail() {
    /* email logic */
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
/** Follows DIP **/
interface MessageService {
  sendMessage(): void;
}
class EmailService implements MessageService {
  sendMessage() {
    /* email logic */
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

**🚫 Violates DIP:** High-level classes directly depend on low-level implementations.    
**✅ Follows DIP:** Use abstractions to decouple dependencies.

---

<!-- Visual break before conclusion - changes based on time of year -->
{{ seasonal_image() }}

<h4>Resources</h4>

- **"Nothing is Something":** A `highly` recommended video that introduces the Null Object Pattern in a clear and practical way. It also features an excellent example of how inheritance can go wrong and the transitioning from inheritance to composition, making it a must-watch for anyone looking to deepen their understanding of clean design principles. <a target="_blank" href="https://www.youtube.com/watch?v=OMPfEXIlTVE"><span class="fab fa-youtube"></span>Watch it here</a>
- **"Uncle Bob on SOLID Principles":** A video that covers object-oriented design concepts and touches on the SOLID principles near the end. A good watch for understanding the foundations of clean code. <a target="_blank" href="https://www.youtube.com/watch?v=zHiWqnTWsn4"><span class="fab fa-youtube"></span>Watch it here</a>

<h4>Conclusion</h4>

🥰 By following these principles, you can create software that is easier to maintain, scale, and extend. Whether you're building a small app or a complex system, SOLID principles serve as a guide to avoid technical debt and enhance code quality.

Start applying them today and watch your codebase transform! 🎉