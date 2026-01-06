// import {
//     getAllUser,
//     getUser,
//     createUser,
//     deleteUser,
//     updateUser
// } from "../services/userServices.js";


// //  GET ALL USERS
// export const getAllUser = (req, res) => {
//     try {
//         const users = getAllUser();
//         res.status(200).json({
//             success:true,
//             message:"All User Fetched Sucessfully",
//             data:users
//         })
//     } catch (error) {
//         res.status(500).json({
//             success:false,
//             message: "Internal Server Error",
//             error:error.message
//         })
//     }
// }

// //  GET SINGLE USER
// export const getUser = (req, res) => {
//     try{
//         const user = getUserById()
//         res.status(200).json({
//             success:true,
//             message:`User ${req.params.id} Fetched Sucessfully`,
//             data:users
//         })

//     } catch(error){
//         res.status(500).json({
//             success:false,
//             message:"Internal Server Error",
//             error:error.message
//         })
//     }

// }

// //  CREATE USER
// export const createUser = (req, res) => {
//     res.json({
//         message: `User ${req.body.name} created Successfully`
//     })
// }

// //  DELETE USER
// export const deleteUser = (req, res) => {
//     res.json({
//         message: `User ${req.params.id} Deleted Sucessfully`
//     })
// }

// export const updateUser = (req, res) => {
//     res.json({
//         message: `User ${req.params.id} Updated Sucessfully`

//     })
// }


import {
    getAllUsersService,
    getUserByIdService,
    createUserService,
    updateUserService,
    deleteUserService
} from "../services/userServices.js";


// Get all users
export const getAllUser = (req, res) => {
    try {
        const users = getAllUsersService();
        res.status(200).json({
            success: true,
            message: "All users fetched successfully",
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching users",
            error: error.message
        });
    }
};


// Get single user by ID
export const getUser = (req, res) => {
    try {
        const user = getUserByIdService(req.params.id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User with ID ${req.params.id} not found`
            });
        }
        
        res.status(200).json({
            success: true,
            message: `User ${req.params.id} fetched successfully`,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching user",
            error: error.message
        });
    }
};
// Create new user
export const createUser = (req, res) => {
    try {
        const { name, email, age } = req.body;
        
        // Validation
        if (!name || !email || !age) {
            return res.status(400).json({
                success: false,
                message: "Please provide name, email, and age"
            });
        }
        
        const newUser = createUserService({ name, email, age });
        
        res.status(201).json({
            success: true,
            message: `User ${req.body.name} created successfully`,
            data: newUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating user",
            error: error.message
        });
    }
};
// Update user
export const updateUser = (req, res) => {
    try {
        const updatedUser = updateUserService(req.params.id, req.body);
        
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: `User with ID ${req.params.id} not found`
            });
        }
        
        res.status(200).json({
            success: true,
            message: `User ${req.params.id} updated successfully`,
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating user",
            error: error.message
        });
    }
};
// Delete user
export const deleteUser = (req, res) => {
    try {
        const deleted = deleteUserService(req.params.id);
        
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: `User with ID ${req.params.id} not found`
            });
        }
        
        res.status(200).json({
            success: true,
            message: `User ${req.params.id} deleted successfully`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting user",
            error: error.message
        });
    }
};