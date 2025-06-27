# GitHub Copilot Instructions for NestJS Microservice

## 🧠 Project Context
This project is a **NestJS-based microservice** exposing a **REST API** using:

- **Node.js + TypeScript**
- **NestJS** (modular structure, decorators, providers)
- **Prisma ORM**
- **PostgreSQL** (via Docker)
- **Docker + Docker Compose** for local development and deployment

Copilot should generate code consistent with NestJS, TypeScript, and Prisma best practices.

---

## 🔧 Conventions and Best Practices

### ✅ Folder & File Structure (Modular)
Use the following standard NestJS structure per module:

```
src/
  └── <entity>/
      ├── <entity>.module.ts
      ├── <entity>.controller.ts
      ├── <entity>.service.ts
      ├── <entity>.repository.ts
      ├── dto/
      │   ├── create-<entity>.dto.ts
      │   └── update-<entity>.dto.ts
      └── entities/
          └── <entity>.entity.ts
```

### ✅ Naming Conventions

- Classes: `PascalCase` (e.g., `CustomerService`)
- Files: `kebab-case` (e.g., `customer.service.ts`)
- DTOs: `CreateXDto`, `UpdateXDto`
- Prisma models: `PascalCase` (e.g., `Customer`)
- REST endpoints: `/api/<plural-resource>` (e.g., `/api/customers`)

---

## 🔌 API Style
- RESTful routes with standard verbs: `GET`, `POST`, `PUT`, `DELETE`
- Use **DTOs** for all request bodies
- Use `@ApiTags`, `@ApiOperation`, etc. for **Swagger** support (via `@nestjs/swagger`)

---

## 🧱 Prisma ORM Guidelines

- Define models in `prisma/schema.prisma`
- Generate client via `npx prisma generate`
- Repositories should use the Prisma client directly
- Use `@Injectable()` `repository` classes to encapsulate database logic
- Use **typed input/output** (from DTOs)
- Use camel case for field names in Prisma models and map to the correct column names

---

## 🐳 Docker / Docker Compose

- `Dockerfile` builds app with `node:alpine`
- `docker-compose.yml` includes:
  - app service (`nestjs-app`)
  - db service (`postgres`)
- DB connection via `DATABASE_URL` env var

## 🛡 Error Handling & Validation

- Use `@UsePipes(new ValidationPipe())` globally
- Validate all inputs with `class-validator`
- Throw `HttpException` with proper status codes for error handling

---

## ✅ Unit Testing Best Practices (Jest)

- Use `jest` with `@nestjs/testing` utilities
- Test each service in isolation using mocks/stubs
- Use `jest-mock` or `ts-mockito` for mocking dependencies
- Follow this structure:
  ```
  src/
    └── <entity>/
        └── __tests__/
            └── <entity>.service.spec.ts
  ```
- Use `describe`, `beforeEach`, `it` blocks
- Test:
  - Service logic
  - Input validation
  - Repository calls (mocked)
  - Edge cases and errors

```ts
describe('CustomerService', () => {
  let service: CustomerService;
  let repo: MockType<CustomerRepository>;

  beforeEach(async () => {
    // setup Test module and mock repository
  });

  it('should create a customer', async () => {
    // test service.create()
  });
});
```

---

## 🔁 Suggested Copilot Tasks

- Generate a new module (controller, service, repository) for a Prisma model
- Generate `CRUD` endpoints using NestJS decorators
- Generate `CreateXDto` and `UpdateXDto` using `class-validator`
- Generate Dockerfile and docker-compose.yml for NestJS + PostgreSQL
- Generate a seed script using Prisma for mock data
- Generate a Jest test suite for a service with mocked repository
