+++
title = "Inyección de Dependencias"
template = "blog-post.html"
description = "Descubre cómo la Inyección de Dependencias desacopla tu código de sus dependencias, facilitando el testing y el intercambio de implementaciones"
[taxonomies]
tags = ["testing", "best-practices"]
[extra]
cover_image = "/images/blog/2026-03-03-dependency-injection/cover-image.webp"
+++

![blog-cover](/images/blog/2026-03-03-dependency-injection/cover-image.webp)

<h4>🧐 ¿Qué es la Inyección de Dependencias?</h4>

La Inyección de Dependencias (DI) es un patrón de diseño en el que una clase **recibe** sus dependencias desde fuera en lugar de **crearlas** internamente. En vez de que un servicio instancie directamente las clases concretas que necesita, recibe una **interfaz** (abstracción) a través de su constructor.

Esta simple técnica tiene un gran impacto en como de testeable, flexible y mantenible resulta tu código.

---

<h4>🚫 El Problema: Acoplamiento Fuerte</h4>

Imagina una clase `UserService` que necesita obtener usuarios de una base de datos. Sin DI, esta clase crea directamente su propio repositorio:

```ts
class UserRepository {
  findById(id: string): User {
    // Accede a la base de datos real
    return database.query(`SELECT * FROM users WHERE id = ${id}`);
  }
}

class UserService {
  private userRepo = new UserRepository(); // ❌ Dependencia hardcodeada

  getUser(id: string): User {
    return this.userRepo.findById(id);
  }
}
```

**¿Qué tiene de malo?**
- `UserService` está **fuertemente acoplado** a `UserRepository`
- **No puedes testear** `UserService` sin una conexión real a la base de datos
- Si quieres cambiar la fuente de datos (por ejemplo, de SQL a una API), tienes que **modificar** `UserService`

---

<h4>✅ La Solución: Depende de Interfaces, no de Implementaciones</h4>

La idea clave es:
1. Definir una **interfaz** para la dependencia
2. Hacer que el servicio dependa de la **interfaz**, no de la clase concreta
3. **Inyectar** la implementación concreta a través del constructor

```ts
/** Paso 1: Definir la interfaz **/
interface IUserRepository {
  findById(id: string): User;
}
```

```ts
/** Paso 2: El servicio depende de la interfaz **/
class UserService {
  constructor(private userRepo: IUserRepository) {} // 💡 Parameter properties

  getUser(id: string): User {
    return this.userRepo.findById(id);
  }
}
```

```ts
/** Paso 3: Crear la implementación real **/
class UserRepository implements IUserRepository {
  findById(id: string): User {
    return database.query(`SELECT * FROM users WHERE id = ${id}`);
  }
}
```

Ahora, a `UserService` le da igual **qué** implementación recibe. Solo conoce `IUserRepository`.

```ts
/** Uso en producción **/
const userRepo = new UserRepository();
const userService = new UserService(userRepo);
```

<details class="expandable-info">
    <summary><i class="fas fa-lightbulb"></i> Parameter Properties: el atajo explicado</summary>
    <div class="expandable-content">
        <p>Esto se conoce como <b>constructor parameter properties</b> en TypeScript. Es un atajo que declara una propiedad de clase y le asigna el valor del parámetro del constructor, todo en una sola línea.</p>
        <p>Estos dos ejemplos son equivalentes:</p>

```ts
/** Atajo (lo que usamos) **/
class UserService {
  constructor(private userRepo: IUserRepository) {}
}
```

```ts
/** Explícito (lo mismo, escrito al completo) **/
class UserService {
  private userRepo: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }
}
```
<p>Ambas versiones guardan el <code>userRepo</code> inyectado como propiedad de clase para que métodos como <code>getUser()</code> puedan acceder a él mediante <code>this.userRepo</code>. El atajo es simplemente la forma que tiene TypeScript de reducir código repetitivo manteniendo el mismo comportamiento. En PHP existe una funcionalidad similar llamada constructor property promotion, y otros lenguajes tienen funcionalidades parecidas.</p>
    </div>
</details>

---

<h4>🧪 Por Qué Importa: Testing</h4>

Aquí es donde la DI realmente brilla. Como `UserService` depende de una interfaz, podemos crear una **implementación mock** para los tests, sin necesidad de base de datos:

```ts
/** Implementación mock para tests **/
class UserRepositoryMock implements IUserRepository {
  findById(id: string): User {
    return { id, name: "Test User", email: "test@example.com" };
  }
}
```

```ts
/** Test unitario (¡sin base de datos!) **/
const mockRepo = new UserRepositoryMock();
const userService = new UserService(mockRepo);

const user = userService.getUser("123");
assert(user.name === "Test User"); // ✅ Rápido, aislado, fiable
```

**🚫 Sin DI:** Tus tests necesitan una base de datos real, haciéndolos lentos y difíciles de configurar.   
**✅ Con DI:** Los tests son rápidos, aislados y están completamente bajo tu control.

---

<h4>📊 Antes vs Después: Resumen Visual</h4>

**Sin DI (con acoplamiento):**

```
UserService ──────► UserRepository ──────► Database
   (no se puede         (concreto)
     cambiar)
```

**Con DI (sin acoplamiento):**

```
UserService ──────► IUserRepository (interfaz)
                         │
                    ┌────┴─────┐
                    ▼          ▼
             UserRepository  UserRepositoryMock
              (producción)      (testing)
```

La interfaz actúa como un **contrato**: cualquier clase que la implemente se puede conectar a `UserService`. Esto hace que tu código sea flexible y tus tests fiables.

---

<h4>💡 Puntos Clave</h4>

- **Depende de abstracciones (interfaces), no de implementaciones concretas**
- **Inyecta las dependencias** a través del constructor en lugar de crearlas internamente
- Esto hace que tus clases sean **fáciles de testear** intercambiando implementaciones reales por mocks
- También hace que tu código sea **más fácil de cambiar** (cambia un repositorio SQL por un cliente API sin tocar el servicio)

> Si conoces los <a class="link-text" target="_blank" href="https://cosmevalera.dev/es/blog/solid-principles/"><b>principios SOLID</b></a>, notarás que la Inyección de Dependencias es la aplicación práctica del **Principio de Inversión de Dependencias (DIP)**: _"Los módulos de alto nivel no deben depender de módulos de bajo nivel. Ambos deben depender de abstracciones."_

---

<!-- Visual break before conclusion - changes based on time of year -->
{{ seasonal_image() }}

<h4>Conclusión</h4>

La Inyección de Dependencias es uno de esos patrones que, una vez lo entiendes, querrás aplicar en todas partes. Mantiene tu código desacoplado, tus tests rápidos y fiables, y tu arquitectura flexible.

La próxima vez que escribas `new SomeDependency()` dentro de una clase, para y pregúntate: _¿debería inyectar esto?_ 🎯
