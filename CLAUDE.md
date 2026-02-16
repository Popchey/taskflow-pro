# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TaskFlow Pro is an enterprise task management system. It's a monorepo with an active NestJS backend and placeholder frontend apps. The backend provides JWT-authenticated REST APIs for user and task management.

## Commands

### Development
```bash
# Start Docker services (PostgreSQL, Redis, Kafka, MongoDB)
npm run docker:up

# Run backend in watch mode
npm run backend

# Or directly from backend workspace
npm run start:dev --workspace=apps/backend
```

### Build & Test
```bash
npm run backend:build                          # Build backend
npm run backend:test                           # Run all backend tests
npm run test --workspace=apps/backend          # Same as above
npm run test:watch --workspace=apps/backend    # Watch mode
npm run test:cov --workspace=apps/backend      # With coverage
npm run test:e2e --workspace=apps/backend      # E2E tests (uses test/jest-e2e.json)
```

To run a single test file:
```bash
cd apps/backend && npx jest src/path/to/file.spec.ts
```

### Lint & Format
```bash
npm run lint          # ESLint (root-level, all apps)
npm run lint:fix      # ESLint with auto-fix
npm run format        # Prettier (root-level, all apps)
```

## Architecture

**Monorepo layout** using npm workspaces. Only `apps/backend` is an active workspace.

### Backend (`apps/backend/`)

NestJS 11 application with modular architecture:

- **auth/** — JWT + Passport authentication (local and JWT strategies, guards). Google OAuth is stubbed but not implemented.
- **users/** — User entity (UUID PKs), CRUD controller and service.
- **tasks/** — Task entity with status/priority enums. Uses Repository pattern (`IRepository` interface in `common/`) and a dedicated `TaskRepository`. Has `TaskNotificationService` for separation of concerns.
- **common/** — Shared interfaces (e.g., `IRepository` abstraction).
- **notifications/** — Notification strategies (in progress).

**Entry point:** `src/main.ts` sets up Swagger at `/api/docs` and applies the API prefix from `API_PREFIX` env var (default `api/v1`).

### Database

PostgreSQL 15 via TypeORM. Entities auto-loaded (`autoLoadEntities: true`), schema auto-synced in development (`synchronize: true`).

**Entities:**
- `User` — email (unique), hashed password, profile fields, google OAuth fields
- `Task` — title, description, status (TODO/IN_PROGRESS/IN_REVIEW/DONE), priority (LOW/MEDIUM/HIGH/URGENT), dueDate, ManyToOne relationships to User (assignee with eager loading, createdBy)

### Auth Flow

Register → bcrypt hash → store user → Login → validate credentials → issue JWT → Protected routes use `@UseGuards(JwtAuthGuard)` → token payload contains `email` and `sub` (user ID).

### Docker Services

`docker-compose.yml` provides: PostgreSQL (5432), Redis (6379), Kafka (9092) + Zookeeper, MongoDB (27017).

## Key Configuration

- **TypeScript:** Decorators and decorator metadata enabled (required by NestJS). Backend uses `module: Node16`.
- **Path aliases:** `@backend/*` → `apps/backend/src/*`, `@shared/*` → `libs/shared/src/*` (defined in root tsconfig).
- **Prettier:** Single quotes, trailing commas, semicolons, 80 char width.
- **ESLint:** TypeScript + Prettier integration. `@typescript-eslint/no-explicit-any` is set to warn only.

## Environment Variables

Copy `.env.example` to `.env`. Required vars: `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`, `PORT`. See `.env.example` for all options including Redis, Kafka, and rate limiting.

## API

Base URL: `http://localhost:3000/api/v1`

- `POST /auth/register`, `POST /auth/login`, `GET /auth/profile` (JWT)
- `/users` CRUD (POST is public, rest require JWT)
- `/tasks` CRUD + `GET /tasks/my-tasks` (all require JWT)
- Swagger docs: `http://localhost:3000/api/docs`

## Validation

DTOs use `class-validator` decorators and `class-transformer` for input validation and transformation.
