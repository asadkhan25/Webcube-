# Prisma Task - PostgreSQL + Prisma ORM with Professional Architecture

A professional Node.js Express application demonstrating PostgreSQL database integration with Prisma ORM, featuring role-based access control (RBAC) and clean architecture.

## 🏗️ Professional Folder Structure

```
Prisma Task/
├── src/
│   ├── config/
│   │   └── database.js          # Prisma Client instance
│   ├── controllers/
│   │   ├── user.controller.js   # User business logic
│   │   ├── role.controller.js   # Role business logic
│   │   ├── post.controller.js   # Post business logic
│   │   └── userRole.controller.js # User-Role assignment logic
│   ├── routes/
│   │   ├── index.js             # Main router
│   │   ├── user.routes.js       # User routes
│   │   ├── role.routes.js       # Role routes
│   │   ├── post.routes.js       # Post routes
│   │   └── userRole.routes.js   # User-Role routes
│   ├── middleware/
│   │   └── errorHandler.js      # Global error handling
│   ├── utils/
│   │   └── asyncHandler.js      # Async error wrapper
│   └── app.js                   # Express app configuration
├── prisma/
│   └── schema.prisma            # Database schema
├── index.js                     # Server entry point
├── package.json
├── .env
├── .env.example
└── README.md
```

## ✅ Features

- ✅ **Professional Architecture**: MVC-like pattern with separation of concerns
- ✅ **PostgreSQL Database**: Relational database with Prisma ORM
- ✅ **Role-Based Access Control**: User and Role models with many-to-many relationship
- ✅ **RESTful API**: Clean API design with proper HTTP methods
- ✅ **Error Handling**: Centralized error handling middleware
- ✅ **Type-Safe Queries**: Prisma Client for type-safe database operations
- ✅ **Modular Code**: Separated routes, controllers, and configuration

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database (Local or Cloud: Neon, Supabase, etc.)

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@hostname:5432/database_name?schema=public"
```

**Local PostgreSQL:**
```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/prisma_task?schema=public"
```

**Cloud Options:**
- **Neon**: `postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`
- **Supabase**: `postgresql://postgres:pass@db.xxx.supabase.co:5432/postgres`

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. Sync Database Schema

```bash
npx prisma db push
```

This creates the User, Role, UserRole, and Post tables.

### 5. Start the Server

```bash
npm start
```

Server runs on `http://localhost:3000`

## 📊 Database Schema

### User Model
- **Fields**: id, email (unique), name, password, createdAt, updatedAt
- **Relations**: Has many Posts, Has many Roles (via UserRole)

### Role Model
- **Fields**: id, roleName (unique), description, createdAt, updatedAt
- **Relations**: Has many Users (via UserRole)

### UserRole (Junction Table)
- **Fields**: userId, roleId, assignedAt
- **Purpose**: Many-to-many relationship between Users and Roles

### Post Model
- **Fields**: id, title, content, published, authorId, createdAt, updatedAt
- **Relations**: Belongs to User (author)

## 🔌 API Endpoints

All API endpoints are prefixed with `/api`

### Database Connection
- `GET /` - Test database connection

### Users
- `GET /api/users` - Get all users (with roles and posts)
- `POST /api/users` - Create user (with optional role assignment)
  ```json
  {
    "email": "user@example.com",
    "name": "John Doe",
    "password": "password123",
    "roleIds": [1, 2]  // Optional
  }
  ```
- `GET /api/users/:id` - Get user by ID (with roles and posts)

### Roles
- `GET /api/roles` - Get all roles (with users)
- `POST /api/roles` - Create role
  ```json
  {
    "roleName": "Admin",
    "description": "Administrator with full access"
  }
  ```
- `GET /api/roles/:id` - Get role by ID (with users)
- `DELETE /api/roles/:id` - Delete role

### User-Role Assignment
- `POST /api/users/:id/roles` - Assign role(s) to user
  ```json
  {
    "roleIds": [1, 2]
  }
  ```
- `GET /api/users/:id/roles` - Get user's roles
- `DELETE /api/users/:id/roles/:roleId` - Remove role from user

### Posts
- `GET /api/posts` - Get all posts (with author)
- `POST /api/posts` - Create post
  ```json
  {
    "title": "My First Post",
    "content": "Post content here",
    "published": true,
    "authorId": 1
  }
  ```
- `GET /api/posts/:id` - Get post by ID (with author)

## 🧪 Testing Examples

### Create a Role
```bash
curl -X POST http://localhost:3000/api/roles \
  -H "Content-Type: application/json" \
  -d '{"roleName":"Admin","description":"Administrator"}'
```

### Create a User with Role
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","name":"Admin User","password":"admin123","roleIds":[1]}'
```

### Get All Users
```bash
curl http://localhost:3000/api/users
```

### Assign Role to User
```bash
curl -X POST http://localhost:3000/api/users/1/roles \
  -H "Content-Type: application/json" \
  -d '{"roleIds":[2]}'
```

## 🛠️ Useful Commands

```bash
# Generate Prisma Client
npx prisma generate

# Sync schema with database
npx prisma db push

# Open Prisma Studio (Database GUI)
npx prisma studio

# Create migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset

# Format schema file
npx prisma format
```

## 🏛️ Architecture Benefits

- **Separation of Concerns**: Routes, controllers, and config are separated
- **Scalability**: Easy to add new features and endpoints
- **Maintainability**: Code is organized and easy to navigate
- **Testability**: Controllers can be unit tested independently
- **Reusability**: Middleware and utilities can be reused
- **Industry Standard**: Follows common Node.js/Express patterns

## 📚 Learn More

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Express.js Documentation](https://expressjs.com/)

## 🔐 Security Notes

> **⚠️ Important**: This is a development setup. For production:
> - Hash passwords using bcrypt before storing
> - Implement JWT authentication
> - Add input validation (e.g., using Joi or Zod)
> - Enable CORS properly
> - Use environment variables for sensitive data
> - Enable SSL for database connections

## 📝 License

ISC
