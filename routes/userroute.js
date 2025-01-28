import express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/authMiddleware.js';
import { register, check, login, logout, edit, users, deleteUser } from '../controllers/userController.js';

// Register a new user
router.post('/register', register);

// Get all users (Admin access)
// router.get('/users', authMiddleware, users);

// Edit user details by ID
router.put('/users/:id', authMiddleware, edit);

// Delete user by ID
router.delete('/users/:id', authMiddleware, deleteUser);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', logout);

// Check user authentication
router.get('/check', authMiddleware, check);

export default router;
