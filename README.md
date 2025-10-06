# 🚀 TaskFlow Pro

A modern, full-stack task management application built with NestJS, PostgreSQL, and Next.js.

## ✨ Features

- 🔐 **JWT Authentication** - Secure login and registration
- 👥 **User Management** - Profile management and user operations
- ✅ **Task Management** - Create, assign, and track tasks
- 🎯 **Priority System** - LOW, MEDIUM, HIGH, URGENT priorities
- 📊 **Status Tracking** - TODO, IN_PROGRESS, DONE statuses
- 📚 **API Documentation** - Interactive Swagger UI
- 🐘 **PostgreSQL Database** - Robust data persistence
- 🔄 **Real-time Updates** - Task assignments and updates

## 🏗️ Project Structure

```
taskflow-pro/
├── apps/
│   ├── backend/          # NestJS API server
│   │   ├── src/
│   │   │   ├── auth/     # Authentication module
│   │   │   ├── users/    # User management
│   │   │   ├── tasks/    # Task management
│   │   │   └── main.ts   # Application entry
│   │   └── package.json
│   └── frontend/         # Next.js app (coming soon)
├── docs/                 # Documentation
├── .env                  # Environment variables
└── package.json          # Workspace config
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL 15+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Popchey/taskflow-pro.git
cd taskflow-pro

# Install dependencies
npm install

# Set up environment variables
cp apps/backend/.env.example apps/backend/.env
# Edit apps/backend/.env with your database credentials

# Start PostgreSQL (if using Docker)
docker compose up -d postgres

# Or create database manually
createdb taskflow
```

### Running the Application

```bash
# Start the backend
npm run backend

# Backend will be available at:
# 🚀 API: http://localhost:3000
# 📚 Swagger Docs: http://localhost:3000/api/docs
```

## 📖 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:3000/api/docs
- **API Base URL**: http://localhost:3000/api/v1

### Available Endpoints

#### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login and get JWT token

#### Users
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `GET /api/v1/users/profile` - Get current user profile
- `PATCH /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

#### Tasks
- `POST /api/v1/tasks` - Create new task
- `GET /api/v1/tasks` - Get all tasks
- `GET /api/v1/tasks/:id` - Get task by ID
- `GET /api/v1/tasks/my-tasks` - Get current user's tasks
- `PATCH /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task

## 🧪 Testing the API

### 1. Register a User
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
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
    "email": "user@example.com",
    "password": "password123"
  }'
```

### 3. Create a Task (use JWT token from login)
```bash
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My First Task",
    "description": "Testing the API",
    "priority": "HIGH",
    "status": "TODO"
  }'
```

## 🛠️ Technology Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe development
- **PostgreSQL** - Relational database
- **TypeORM** - ORM for database operations
- **Passport.js** - Authentication middleware
- **JWT** - Secure token-based auth
- **Bcrypt** - Password hashing
- **Swagger** - API documentation

### Frontend (Coming Soon)
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Query** - Data fetching

## 📁 Environment Variables

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=taskflow

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION=7d

# Application
PORT=3000
NODE_ENV=development
```

## 🧪 Development

```bash
# Run in development mode (with hot-reload)
npm run backend

# Build for production
npm run build

# Run tests
npm test

# Run linter
npm run lint
```

## 📚 Additional Documentation

- [Quick Start Guide](./QUICKSTART.md) - Fast reference for daily use
- [Complete Project Guide](./PROJECT_COMPLETE.md) - Comprehensive overview
- [Backend Setup](./apps/backend/SETUP.md) - Detailed backend configuration

## 🗂️ Database Schema

### Users Table
- `id` - UUID (Primary Key)
- `email` - Unique email address
- `password` - Hashed password
- `firstName` - User's first name
- `lastName` - User's last name
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

### Tasks Table
- `id` - UUID (Primary Key)
- `title` - Task title
- `description` - Task description
- `status` - TODO | IN_PROGRESS | DONE
- `priority` - LOW | MEDIUM | HIGH | URGENT
- `assigneeId` - Foreign Key (User)
- `createdById` - Foreign Key (User)
- `dueDate` - Optional deadline
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Stefan Bogevski**
- GitHub: [@Popchey](https://github.com/Popchey)

## 🙏 Acknowledgments

- NestJS Team for the amazing framework
- PostgreSQL Community
- Open source contributors

---

**Built with ❤️ using NestJS and PostgreSQL**