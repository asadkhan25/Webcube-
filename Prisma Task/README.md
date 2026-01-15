# Prisma Task - PostgreSQL + Prisma ORM with Professional Architecture

A professional Node.js Express application demonstrating PostgreSQL database integration with Prisma ORM, featuring role-based access control (RBAC) and clean architecture.

## 🏗️ Professional Folder Structure

```
Prisma Task/
├── src/
│   ├── config/
│   │   └── database.js          # Enhanced Prisma Client with logging
│   ├── controllers/
│   │   ├── user.controller.js   # User HTTP request handlers
│   │   ├── role.controller.js   # Role HTTP request handlers
│   │   ├── post.controller.js   # Post HTTP request handlers
│   │   └── userRole.controller.js # User-Role assignment handlers
│   ├── services/
│   │   └── user.service.js      # User database operations layer
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
- ✅ **Service Layer Pattern**: Database operations separated from HTTP handlers
- ✅ **PostgreSQL Database**: Relational database with Prisma ORM
- ✅ **Enhanced Prisma Client**: Query logging, error handling, and connection management
- ✅ **Role-Based Access Control**: User and Role models with many-to-many relationship
- ✅ **RESTful API**: Clean API design with proper HTTP methods
- ✅ **Pagination & Filtering**: Built-in support for search, sorting, and pagination
- ✅ **Error Handling**: Centralized error handling middleware
- ✅ **Type-Safe Queries**: Prisma Client for type-safe database operations
- ✅ **Modular Code**: Separated routes, controllers, services, and configuration

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
- `GET /api/users` - Get all users (with pagination, search, and sorting)
  - **Query Parameters**:
    - `page` (default: 1) - Page number
    - `limit` (default: 10) - Items per page
    - `search` - Search by name or email
    - `sortBy` (default: 'createdAt') - Field to sort by
    - `sortOrder` (default: 'desc') - Sort order: 'asc' or 'desc'
  - **Example**: `/api/users?page=1&limit=5&search=john&sortBy=email&sortOrder=asc`

- `POST /api/users` - Create user (with optional role assignment)
  ```json
  {
    "email": "user@example.com",
    "name": "John Doe",
    "password": "password123",
    "roleIds": [1, 2]  // Optional
  }
  ```
  - **Response**: Returns created user with success message

- `GET /api/users/:id` - Get user by ID (with roles and posts)
  - **Response**: Returns user object with success flag

- `PATCH /api/users/:id` - Update user by ID (partial update)
  ```json
  {
    "email": "newemail@example.com",
    "name": "Updated Name",
    "password": "newpassword123"
  }
  ```
  - **Note**: All fields are optional, update only what you need
  - **Response**: Returns updated user with success message

- `DELETE /api/users/:id` - Delete user by ID
  - **Response**: Returns success message with deleted user info
  - **Note**: Cascade deletion removes related posts and roles

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

### 1. Create a Role
```bash
curl -X POST http://localhost:3000/api/roles \
  -H "Content-Type: application/json" \
  -d '{"roleName":"Admin","description":"Administrator"}'
```

### 2. Create a User (without roles)
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","name":"John Doe","password":"password123"}'
```

### 3. Create a User with Roles
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","name":"Admin User","password":"admin123","roleIds":[1]}'
```

### 4. Get All Users (with pagination)
```bash
# Get first page with 10 users
curl http://localhost:3000/api/users

# Get second page with 5 users per page
curl "http://localhost:3000/api/users?page=2&limit=5"
```

### 5. Search Users
```bash
# Search by name or email
curl "http://localhost:3000/api/users?search=john"

# Search with pagination
curl "http://localhost:3000/api/users?search=admin&page=1&limit=10"
```

### 6. Sort Users
```bash
# Sort by email ascending
curl "http://localhost:3000/api/users?sortBy=email&sortOrder=asc"

# Sort by creation date descending (default)
curl "http://localhost:3000/api/users?sortBy=createdAt&sortOrder=desc"
```

### 7. Get User by ID
```bash
curl http://localhost:3000/api/users/1
```

### 8. Update User
```bash
# Partial update (only name)
curl -X PATCH http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"John Updated"}'

# Full update
curl -X PATCH http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"email":"john.new@example.com","name":"John New","password":"newpass123"}'
```

### 9. Delete User
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

### 10. Assign Role to User
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

### Service Layer Pattern
- **Separation of Concerns**: Controllers handle HTTP, services handle database operations
- **Reusability**: Service methods can be used across multiple controllers
- **Testability**: Services can be unit tested independently without HTTP context
- **Maintainability**: Business logic centralized in one place
- **Single Responsibility**: Each layer has a clear, focused purpose

### Overall Architecture
- **Scalability**: Easy to add new features and endpoints
- **Modularity**: Code is organized into logical folders
- **Error Handling**: Centralized error handling with async wrapper
- **Type Safety**: Prisma provides type-safe database queries
- **Industry Standard**: Follows common Node.js/Express patterns

### Enhanced Error Handling
- **Prisma Errors**: Handles P2002 (unique constraint), P2025 (not found), and more
- **HTTP Status Codes**: Proper status codes (400, 404, 409, 500)
- **User-Friendly Messages**: Clear error messages for clients
- **Development Mode**: Detailed stack traces and error info

### Enhanced Prisma Client
- **Query Logging**: See all database queries in development mode
- **Error Tracking**: Automatic error logging for debugging
- **Connection Management**: Graceful connection handling and shutdown
- **Performance Monitoring**: Query duration tracking

## 🧪 Postman Testing

A comprehensive Postman collection is included: `Prisma_CRUD_APIs.postman_collection.json`

### Import Collection
1. Open Postman
2. Click **Import**
3. Select `Prisma_CRUD_APIs.postman_collection.json`
4. Collection includes 16 test scenarios with automated tests

### Test Scenarios Included
- ✅ Create user (valid, missing fields, duplicate email)
- ✅ Get all users (default, pagination, search, sorting)
- ✅ Get user by ID (valid, invalid)
- ✅ Update user (partial, full, invalid ID)
- ✅ Delete user (valid, invalid, verification)

### Running Tests
1. Ensure server is running: `npm start`
2. Run collection in Postman
3. View test results in Test Results tab
4. Verify database changes: `npx prisma studio`

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
