# Users API Documentation

Complete REST API documentation for User CRUD operations with in-memory database.

---

## Base URL
```
http://localhost:3000/api/users
```

---

## User Object Schema

```json
{
  "id": "string (auto-generated)",
  "name": "string (required)",
  "email": "string (required)",
  "age": "number (required)"
}
```

---

## Endpoints

### 1. Get All Users

Retrieve all users from the database.

**Endpoint:** `GET /api/users`

**Request Headers:**
```
None required
```

**Request Body:**
```
None
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "All users fetched successfully",
  "data": [
    {
      "id": "1",
      "name": "Asad Khan",
      "email": "asad@example.com",
      "age": 25
    },
    {
      "id": "2",
      "name": "Ali Ahmed",
      "email": "ali@example.com",
      "age": 30
    }
  ]
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "success": false,
  "message": "Error fetching users",
  "error": "Error message details"
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:3000/api/users
```

---

### 2. Get User by ID

Retrieve a specific user by their ID.

**Endpoint:** `GET /api/users/:id`

**URL Parameters:**
- `id` (string, required) - User ID

**Request Headers:**
```
None required
```

**Request Body:**
```
None
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "User 1 fetched successfully",
  "data": {
    "id": "1",
    "name": "Asad Khan",
    "email": "asad@example.com",
    "age": 25
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "User with ID 999 not found"
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "success": false,
  "message": "Error fetching user",
  "error": "Error message details"
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:3000/api/users/1
```

---

### 3. Create User

Create a new user in the database.

**Endpoint:** `POST /api/users`

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Asad Khan",
  "email": "asad@example.com",
  "age": 25
}
```

**Field Validations:**
- `name` - Required, string
- `email` - Required, string
- `age` - Required, number

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "User Asad Khan created successfully",
  "data": {
    "id": "1",
    "name": "Asad Khan",
    "email": "asad@example.com",
    "age": 25
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Please provide name, email, and age"
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "success": false,
  "message": "Error creating user",
  "error": "Error message details"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Asad Khan",
    "email": "asad@example.com",
    "age": 25
  }'
```

---

### 4. Update User

Update an existing user's information.

**Endpoint:** `PUT /api/users/:id`

**URL Parameters:**
- `id` (string, required) - User ID to update

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Asad Khan Updated",
  "email": "asad.updated@example.com",
  "age": 26
}
```

**Note:** All fields are optional. Only provided fields will be updated.

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "User 1 updated successfully",
  "data": {
    "id": "1",
    "name": "Asad Khan Updated",
    "email": "asad.updated@example.com",
    "age": 26
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "User with ID 999 not found"
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "success": false,
  "message": "Error updating user",
  "error": "Error message details"
}
```

**cURL Example:**
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Asad Khan Updated",
    "email": "asad.updated@example.com",
    "age": 26
  }'
```

---

### 5. Delete User

Delete a user from the database.

**Endpoint:** `DELETE /api/users/:id`

**URL Parameters:**
- `id` (string, required) - User ID to delete

**Request Headers:**
```
None required
```

**Request Body:**
```
None
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "User 1 deleted successfully"
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "User with ID 999 not found"
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "success": false,
  "message": "Error deleting user",
  "error": "Error message details"
}
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

---

## HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request data |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

---

## Error Handling

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (optional)"
}
```

---

## Testing Notes

1. **Server must be running** on port 3000 before testing
2. **In-memory database** - Data will be lost when server restarts
3. **IDs are auto-generated** as strings
4. **All endpoints return JSON** responses
5. Use **Content-Type: application/json** header for POST and PUT requests

---

## Common Testing Scenarios

### Scenario 1: Create and Retrieve User
1. POST `/api/users` with user data
2. Note the returned user ID
3. GET `/api/users/:id` with the ID to verify

### Scenario 2: Update User Information
1. Create a user first
2. PUT `/api/users/:id` with updated data
3. GET `/api/users/:id` to verify changes

### Scenario 3: Delete User
1. Create a user first
2. DELETE `/api/users/:id`
3. GET `/api/users/:id` should return 404

### Scenario 4: Error Handling
1. Try GET `/api/users/999` (non-existent ID) - Should return 404
2. Try POST `/api/users` without required fields - Should return 400
3. Try PUT `/api/users/999` (non-existent ID) - Should return 404
