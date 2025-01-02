
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

const authRoutes = (db) => {
    // Register route
    router.post('/register', async (req, res) => {
        const { email, password, role } = req.body;

        // Validate input
        if (!email || !password || !role) {
            return res.status(400).json({ msg: 'Please fill in all required fields.' });
        }

        try {
            // Check if user already exists
            const [existingUser] = await db.query('SELECT email FROM users WHERE email = ?', [email]);
            if (existingUser.length > 0) {
                return res.status(400).json({ msg: "User already registered." });
            }

            // Validate password length
            if (password.length < 8) {
                return res.status(400).json({ msg: "Password length must be at least eight characters." });
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Insert new user into the database
            await db.query('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [email, hashedPassword, role]);

            res.status(201).json({ msg: "User created successfully." });
        } catch (err) {
            console.error('Registration error:', err);
            res.status(500).json({ msg: 'An error occurred during registration.' });
        }
    });

    // Login route
    router.post('/login', async (req, res) => {
        const { email, password } = req.body;

        try {
            const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
            if (results.length === 0) {
                console.error('No user found with this email:', email);
                return res.status(401).json({ msg: "Invalid credentials" });
            }

            const user = results[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                console.error('Invalid password for user:', email);
                return res.status(401).json({ msg: "Invalid credentials" });
            }

            // Generate token including user ID and role
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            
            // Return token and role in response
            res.json({ token, role: user.role });
        } catch (err) {
            console.error('Error during login:', err);
            res.status(500).json({ msg: 'An error occurred during login.' });
        }
    });

    // Logout route 
    router.post('/logout', (req, res) => { 
        res.json({ msg: 'User logged out successfully.' }); 
    });

    return router;
};

export default authRoutes;
