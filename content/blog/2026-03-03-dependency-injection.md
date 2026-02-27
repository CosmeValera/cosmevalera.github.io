+++
title = "Dependency Injection"
template = "blog-post.html"
description = "What is dependency injection and why you should use it"
[taxonomies]
tags = ["testing", "best-practices"]
[extra]
cover_image = "/images/blog/2026-03-03-dependency-injection/cover-image.webp"
+++

![blog-cover](/images/blog/2026-03-03-dependency-injection/cover-image.webp)

<h4>🧐 What is Dependency Injection?</h4>

Dependency Injection (DI) is a design pattern where a class **receives** its dependencies from the outside instead of **creating** them internally. Instead of a service instantiating the concrete classes it needs, it receives an **interface** (abstraction) through its constructor.

This simple technique has a massive impact on how testable, flexible, and maintainable your code becomes.

---

<h4>🚫 The Problem: Without Dependency Injection</h4>

Imagine a `UserService` that needs to fetch users from a database. Without DI, it directly creates its own repository:

```ts
class UserRepository {
  findById(id: string): User {
    // Hits the real database
    return database.query(`SELECT * FROM users WHERE id = ${id}`);
  }
}

class UserService {
  private userRepo = new UserRepository(); // ❌ Hardcoded dependency

  getUser(id: string): User {
    return this.userRepo.findById(id);
  }
}
```

**What's wrong here?**
- `UserService` is **tightly coupled** to `UserRepository`
- You **cannot test** `UserService` without a real database connection
- If you want to swap the data source (e.g., from SQL to an API), you have to **modify** `UserService`

---

<h4>✅ The Solution: Dependency Injection with Interfaces</h4>

The key idea is:
1. Define an **interface** for the dependency
2. Have the service depend on the **interface**, not the concrete class
3. **Inject** the concrete implementation through the constructor

```ts
/** Step 1: Define the interface **/
interface IUserRepository {
  findById(id: string): User;
}
```

```ts
/** Step 2: Service depends on the interface **/
class UserService {
  constructor(private userRepo: IUserRepository) {}

  getUser(id: string): User {
    return this.userRepo.findById(id);
  }
}
```

```ts
/** Step 3: Create the real implementation **/
class UserRepository implements IUserRepository {
  findById(id: string): User {
    return database.query(`SELECT * FROM users WHERE id = ${id}`);
  }
}
```

Now, `UserService` doesn't know or care **which** implementation it receives. It only knows about `IUserRepository`.

```ts
/** Usage in production **/
const userRepo = new UserRepository();
const userService = new UserService(userRepo);
```

---

<h4>🧪 Why It Matters: Testing</h4>

This is where DI truly shines. Since `UserService` depends on an interface, we can create a **mock implementation** for testing, no database required:

```ts
/** Mock implementation for tests **/
class UserRepositoryMock implements IUserRepository {
  findById(id: string): User {
    return { id, name: "Test User", email: "test@example.com" };
  }
}
```

```ts
/** Unit test (no database needed!) **/
const mockRepo = new UserRepositoryMock();
const userService = new UserService(mockRepo);

const user = userService.getUser("123");
assert(user.name === "Test User"); // ✅ Fast, isolated, reliable
```

**🚫 Without DI:** Your tests need a real database, making them slow, fragile, and hard to set up.   
**✅ With DI:** Tests are fast, isolated, and fully under your control.

---

<h4>📊 Before vs After: A Visual Summary</h4>

**Without DI (tight coupling):**

```
UserService ──────► UserRepository ──────► Database
   (cannot swap)        (concrete)
```

**With DI (loose coupling):**

```
UserService ──────► IUserRepository (interface)
                         │
                    ┌────┴─────┐
                    ▼          ▼
             UserRepository  UserRepositoryMock
              (production)      (testing)
```

The interface acts as a **contract**: any class that implements it can be plugged into `UserService`. This makes your code flexible and your tests reliable.

---

<h4>💡 Key Takeaways</h4>

- **Depend on abstractions (interfaces), not concrete implementations**
- **Inject dependencies** through the constructor instead of creating them internally
- This makes your classes **easy to test** by swapping real implementations with mocks
- It also makes your code **easier to change** (swap a SQL repository for an API client without touching the service)

> If you're familiar with <a class="link-text" target="_blank" href="https://cosmevalera.dev/blog/solid-principles/"><b>SOLID principles</b></a>, you'll notice that Dependency Injection is the practical application of the **Dependency Inversion Principle (DIP)**: _"High-level modules should not depend on low-level modules. Both should depend on abstractions."_

---

<!-- Visual break before conclusion - changes based on time of year -->
{{ seasonal_image() }}

<h4>Conclusion</h4>

Dependency Injection is one of those patterns that, once you understand it, you'll want to apply everywhere. It keeps your code decoupled, your tests fast and reliable, and your architecture flexible.

Next time you write `new SomeDependency()` inside a class, stop and ask yourself: _should I inject this instead?_ 🎯