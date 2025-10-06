# TaskFlow Pro - Backend Setup Guide

## Quick Start

### 1. Prerequisites
- Node.js >= 18.0.0
- Docker and Docker Compose
- PostgreSQL (via Docker)

### 2. Installation

```bash
# Install dependencies
npm install
```

### 3. Environment Setup

The `.env` file has been created from `.env.example`. Update it if needed:

```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=taskflow

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION=7d

# API
PORT=3000
NODE_ENV=development
```

### 4. Start PostgreSQL Database

Using Docker Compose:
```bash
# Start PostgreSQL
npm run docker:up

# Check status
docker ps

# View logs
npm run docker:logs
```

Or use the dev-services script:
```bash
# Start services
npm run services:start

# Check status
npm run services:status

# Stop services
npm run services:stop
```

### 5. Run the Backend

```bash
# Development mode with hot-reload
npm run backend

# Build for production
npm run backend:build

# Run tests
npm run backend:test
```

### 6. Access the Application

- **API**: http://localhost:3000
- **API Documentation (Swagger)**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000/api/v1

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/profile` - Get current user profile (requires JWT)

### Users
- `GET /api/v1/users` - Get all users (requires JWT)
- `GET /api/v1/users/:id` - Get user by ID (requires JWT)
- `PATCH /api/v1/users/:id` - Update user (requires JWT)
- `DELETE /api/v1/users/:id` - Delete user (requires JWT)

### Tasks
- `POST /api/v1/tasks` - Create a task (requires JWT)
- `GET /api/v1/tasks` - Get all tasks (requires JWT)
- `GET /api/v1/tasks/my-tasks` - Get my tasks (requires JWT)
- `GET /api/v1/tasks/:id` - Get task by ID (requires JWT)
- `PATCH /api/v1/tasks/:id` - Update task (requires JWT)
- `DELETE /api/v1/tasks/:id` - Delete task (requires JWT)

## Project Structure

```
apps/backend/
├── src/
│   ├── auth/              # Authentication module
│   │   ├── dto/          # Data transfer objects
│   │   ├── guards/       # Auth guards
│   │   └── strategies/   # Passport strategies
│   ├── users/            # Users module
│   │   ├── dto/
│   │   └── entities/
│   ├── tasks/            # Tasks module
│   │   ├── dto/
│   │   └── entities/
│   ├── app.module.ts     # Main app module
│   └── main.ts           # Application entry point
├── test/                 # E2E tests
└── package.json
```

## Technologies Used

- **NestJS** - Progressive Node.js framework
- **TypeORM** - ORM for TypeScript
- **PostgreSQL** - Relational database
- **Passport** - Authentication middleware
- **JWT** - JSON Web Tokens
- **Swagger** - API documentation
- **Class Validator** - Validation decorators
- **bcrypt** - Password hashing

## Database Schema

### Users Table
- id (UUID, PK)
- email (unique)
- password (hashed)
- firstName
- lastName
- avatarUrl
- isActive
- isEmailVerified
- googleId
- createdAt
- updatedAt

### Tasks Table
- id (UUID, PK)
- title
- description
- status (TODO, IN_PROGRESS, IN_REVIEW, DONE)
- priority (LOW, MEDIUM, HIGH, URGENT)
- dueDate
- assigneeId (FK -> Users)
- createdById (FK -> Users)
- createdAt
- updatedAt

## Next Steps

1. ✅ Basic backend structure is complete
2. 🚀 Start the database and run the backend
3. 📝 Test the API using Swagger UI
4. 🔧 Customize as needed

## Testing with Swagger

1. Start the backend: `npm run backend`
2. Open Swagger UI: http://localhost:3000/api/docs
3. Register a user via `/auth/register`
4. Login via `/auth/login` to get JWT token
5. Click "Authorize" button and paste the token
6. Test other endpoints

## Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker ps

# View PostgreSQL logs
docker logs taskflow-postgres

# Restart database
npm run docker:down
npm run docker:up
```

### Port Already in Use
```bash
# Change PORT in .env file
PORT=3001
```

### Module Not Found Errors
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```
