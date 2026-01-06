// In-memory database (array)
let users = [
    { id: 1, name: "Muhammad Asad", email: "muhammad.asad@example.com", age: 20 },
    { id: 2, name: "Waqar", email: "waqar@example.com", age: 29 },
    { id: 3, name: "Qaiser", email: "qaiser@example.com", age: 24 },
    { id: 4, name: "Hanzila Ahmed", email: "hanzila.ahmed@example.com", age: 22 },
    { id: 5, name: "Malik Abdullah", email: "malik.abdullah@example.com", age: 26 },
    { id: 6, name: "Ibrahim", email: "ibrahim@example.com", age: 28 },
    { id: 7, name: "Mehroz Ali", email: "mehroz.ali@example.com", age: 28 },
];
let nextId = 8; // Next user ID
// Get all users
export const getAllUsersService = () => {
    return users;
};
// Get user by ID
export const getUserByIdService = (id) => {
    const user = users.find(u => u.id === parseInt(id));
    return user;
};
// Create new user
export const createUserService = (userData) => {
    const newUser = {
        id: nextId++,
        name: userData.name,
        email: userData.email,
        age: userData.age
    };
    users.push(newUser);
    return newUser;
};
// Update user
export const updateUserService = (id, userData) => {
    const index = users.findIndex(u => u.id === parseInt(id));
    
    if (index === -1) {
        return null;
    }
    
    // Update user data
    users[index] = {
        ...users[index],
        name: userData.name || users[index].name,
        email: userData.email || users[index].email,
        age: userData.age || users[index].age
    };
    
    return users[index];
};
// Delete user
export const deleteUserService = (id) => {
    const index = users.findIndex(u => u.id === parseInt(id));
    
    if (index === -1) {
        return false;
    }
    
    users.splice(index, 1);
    return true;
};