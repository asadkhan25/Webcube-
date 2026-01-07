# Day 5: API Testing & Documentation Guide

Complete guide for testing the Users CRUD API using Postman and understanding the API documentation.

---

## 📋 Prerequisites

1. **Postman installed** - Download from [postman.com](https://www.postman.com/downloads/)
2. **Day 4 server running** - The API server must be active
3. **Node.js installed** - Required to run the server

---

## 🚀 Getting Started

### Step 1: Start the Server

Navigate to the Day_4 folder and start the development server:

```bash
cd "E:\CURSOR code programs\INTERNSHIP\Tasks\Day_4"
npm run dev
```

The server should start on `http://localhost:3000`

### Step 2: Import Postman Collection

1. Open **Postman** application
2. Click on **Import** button (top left)
3. Select **File** tab
4. Navigate to: `E:\CURSOR code programs\INTERNSHIP\Tasks\Day_5\postman\`
5. Select `Users_API_Collection.postman_collection.json`
6. Click **Import**

You should now see **"Users API - Day 4 CRUD Operations"** collection in your Postman workspace.

---

## 🧪 Testing Scenarios

### Scenario 1: Create a New User

**Endpoint:** POST `/api/users`

1. Open the **"Create User"** request from the collection
2. Check the request body (pre-filled with sample data):
   ```json
   {
     "name": "Asad Khan",
     "email": "asad@example.com",
     "age": 25
   }
   ```
3. Click **Send**
4. **Expected Result:**
   - Status: `201 Created`
   - Response contains user data with auto-generated ID
   - Success message displayed

**What to Verify:**
- ✅ Status code is 201
- ✅ Response has `success: true`
- ✅ User ID is generated
- ✅ All fields are returned correctly

---

### Scenario 2: Get All Users

**Endpoint:** GET `/api/users`

1. Open the **"Get All Users"** request
2. Click **Send**
3. **Expected Result:**
   - Status: `200 OK`
   - Array of all users (including the one you just created)

**What to Verify:**
- ✅ Status code is 200
- ✅ Response contains array of users
- ✅ Previously created user is in the list

---

### Scenario 3: Get Single User by ID

**Endpoint:** GET `/api/users/:id`

1. Open the **"Get User by ID"** request
2. Replace `:id` in the URL with an actual user ID (e.g., `1`)
   - URL should be: `http://localhost:3000/api/users/1`
3. Click **Send**
4. **Expected Result:**
   - Status: `200 OK`
   - Single user object returned

**What to Verify:**
- ✅ Status code is 200
- ✅ Correct user data returned
- ✅ User ID matches the requested ID

**Error Test:**
- Try with non-existent ID (e.g., `999`)
- Should return `404 Not Found`

---

### Scenario 4: Update User

**Endpoint:** PUT `/api/users/:id`

1. Open the **"Update User"** request
2. Replace `:id` with an existing user ID
3. Modify the request body:
   ```json
   {
     "name": "Asad Khan Updated",
     "email": "asad.updated@example.com",
     "age": 26
   }
   ```
4. Click **Send**
5. **Expected Result:**
   - Status: `200 OK`
   - Updated user data returned

**What to Verify:**
- ✅ Status code is 200
- ✅ User data is updated
- ✅ Changes are reflected in response

**Verify Update:**
- Use "Get User by ID" to confirm changes persisted

---

### Scenario 5: Delete User

**Endpoint:** DELETE `/api/users/:id`

1. Open the **"Delete User"** request
2. Replace `:id` with an existing user ID
3. Click **Send**
4. **Expected Result:**
   - Status: `200 OK`
   - Success message confirming deletion

**What to Verify:**
- ✅ Status code is 200
- ✅ Success message displayed
- ✅ User is removed from database

**Verify Deletion:**
- Try to GET the deleted user
- Should return `404 Not Found`

---

## 🔍 Automated Tests

The Postman collection includes **automatic test scripts** that run after each request.

### How to View Test Results

1. After sending a request, click on **Test Results** tab (below the response)
2. You'll see:
   - ✅ Green checkmarks for passed tests
   - ❌ Red X for failed tests

### What Tests Are Included?

**Get All Users:**
- Status code is 200
- Response has success field
- Data is an array

**Get User by ID:**
- Status code is 200 or 404
- Response has user data (if found)

**Create User:**
- Status code is 201
- User created successfully
- User ID is generated

**Update User:**
- Status code is 200 or 404
- User updated successfully

**Delete User:**
- Status code is 200 or 404
- Success message includes "deleted successfully"

---

## 📚 Complete Testing Flow

Follow this sequence for comprehensive testing:

```
1. GET All Users (should be empty initially)
   ↓
2. POST Create User #1
   ↓
3. POST Create User #2
   ↓
4. GET All Users (should show 2 users)
   ↓
5. GET User by ID (use ID from step 2)
   ↓
6. PUT Update User (modify user from step 2)
   ↓
7. GET User by ID (verify changes)
   ↓
8. DELETE User (remove user from step 3)
   ↓
9. GET All Users (should show 1 user)
   ↓
10. GET User by ID with deleted ID (should return 404)
```

---

## ❌ Error Testing

### Test 1: Missing Required Fields
- **Request:** POST `/api/users`
- **Body:** `{ "name": "Test" }` (missing email and age)
- **Expected:** `400 Bad Request`

### Test 2: Non-existent User
- **Request:** GET `/api/users/999`
- **Expected:** `404 Not Found`

### Test 3: Update Non-existent User
- **Request:** PUT `/api/users/999`
- **Expected:** `404 Not Found`

### Test 4: Delete Non-existent User
- **Request:** DELETE `/api/users/999`
- **Expected:** `404 Not Found`

---

## 📖 API Documentation

For detailed API documentation including:
- Request/Response formats
- Status codes
- cURL examples
- Error handling

**See:** [`docs/API_Documentation.md`](./docs/API_Documentation.md)

---

## 🎯 Learning Objectives

By completing this Day 5 task, you will:

✅ Understand how to use Postman for API testing  
✅ Know how to import and use Postman collections  
✅ Learn to test all CRUD operations  
✅ Understand API request/response formats  
✅ Know how to handle and test error scenarios  
✅ Learn to write and use automated test scripts  
✅ Understand API documentation best practices  

---

## 💡 Tips

1. **Save Responses:** Postman allows you to save example responses for future reference
2. **Environment Variables:** You can create a Postman environment to store the base URL
3. **Collection Runner:** Use Postman's Collection Runner to run all tests sequentially
4. **Console:** Check Postman Console (View → Show Postman Console) for detailed request/response logs
5. **Test Scripts:** Modify test scripts to add custom validations

---

## 🐛 Troubleshooting

### Issue: "Could not get any response"
**Solution:** Make sure the Day 4 server is running on port 3000

### Issue: "404 Not Found" for all requests
**Solution:** Check the base URL is correct: `http://localhost:3000/api/users`

### Issue: Tests failing
**Solution:** Check the response format matches the expected structure

### Issue: Server not starting
**Solution:** 
- Check if port 3000 is already in use
- Run `npm install` in Day_4 folder
- Check for any error messages in terminal

---

## ✅ Task Completion Checklist

- [ ] Postman installed and opened
- [ ] Collection imported successfully
- [ ] Server running on port 3000
- [ ] All 5 endpoints tested
- [ ] Automated tests passing
- [ ] Error scenarios tested
- [ ] API documentation reviewed
- [ ] Understanding of request/response formats

---

## 📝 Next Steps

After completing Day 5, you should be able to:
- Test any REST API using Postman
- Document APIs professionally
- Understand CRUD operations thoroughly
- Handle API errors gracefully

**Great job completing Day 5! 🎉**
