# 🚀 Quick Start Guide - TaskFlow Pro

## Installation (First Time Only)

```bash
cd "/Users/stefanbogevski/Projects/TaskFlow Pro/taskflow-pro"
npm install
```

## Running the Project

### 1. Start Database (Choose One)

**Option A: With Docker** (Recommended)
```bash
# Start PostgreSQL
docker compose up -d postgres

# Check it's running
docker ps
```

**Option B: Local PostgreSQL**
```bash
# macOS - Install PostgreSQL
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb taskflow
```

### 2. Start Backend

```bash
# From project root
npm run backend

# Or from backend folder
cd apps/backend
npm run start:dev
```

### 3. Open Swagger API Docs

Open your browser: **http://localhost:3000/api/docs**

## Quick API Test

### 1. Register a User
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Copy the `access_token` from response.

### 3. Create a Task
```bash
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "My First Task",
    "description": "Testing the API",
    "priority": "HIGH",
    "status": "TODO"
  }'
```

### 4. Get All Tasks
```bash
curl -X GET http://localhost:3000/api/v1/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Useful Commands

```bash
# Stop database
docker compose down

# View logs
docker compose logs -f postgres

# Rebuild backend
npm run backend:build

# Run tests
npm run backend:test

# Format code
npm run format

# Lint code
npm run lint
```

## URLs

- **Backend API**: http://localhost:3000
- **Swagger Docs**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000/api/v1

## Troubleshooting

**Database won't connect?**
```bash
# Check if PostgreSQL is running
docker ps
# or
brew services list
```

**Port already in use?**
Edit `.env` file and change `PORT=3001`

**Module not found?**
```bash
npm install
```

## Project Structure

```
apps/backend/src/
├── auth/              # 🔐 Authentication & JWT
├── users/             # 👥 User management
├── tasks/             # ✅ Task management
├── app.module.ts      # Main module
└── main.ts            # Entry point
```

## What's Working

✅ User registration & login  
✅ JWT authentication  
✅ Task CRUD operations  
✅ PostgreSQL database  
✅ Swagger documentation  
✅ Input validation  
✅ Error handling  
✅ CORS enabled  

## What's Optional (Not Setup Yet)

⏭️ Redis caching  
⏭️ Kafka messaging  
⏭️ AWS services  
⏭️ Google OAuth  
⏭️ Frontend  

---

**Need more help?** Check `PROJECT_COMPLETE.md` or `apps/backend/SETUP.md`
