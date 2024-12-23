import dbconn from '../db/dbconfig.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Registration function
export const register = async (req, res) => {
    try {
        const { username, firstname, lastname, email, password } = req.body;

        if (!username || !firstname || !lastname || !email || !password) {
            return res.status(400).json({ msg: 'Please fill in all required fields.' });
        }

        // Check if user already exists
        const [existingUser] = await dbconn.query('SELECT username FROM users WHERE username = ? OR email = ?', [username, email]);
        
        if (existingUser.length > 0) {
            return res.status(400).json({ msg: "User already registered." });
        }

        // Validate password length
        if (password.length < 8) {
            return res.status(400).json({ msg: "Password length must be at least eight characters." });
        }

        // Hash password and insert user into database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await dbconn.execute(
            'INSERT INTO users (username, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)',
            [username, firstname, lastname, email, hashedPassword]
        );

        res.status(201).json({ msg: "User created successfully." });
             
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'An error occurred during registration.' });
    }
};

// Login function
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please provide both email and password.' });
    }

    try {
        const [user] = await dbconn.query('SELECT username, user_id, password FROM users WHERE email = ?', [email]);

        if (user.length === 0) {
            return res.status(401).json({ msg: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user[0].password);
        
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials." });
        }

        const token = jwt.sign({ username: user[0].username, user_id: user[0].user_id }, "your_jwt_secret", { expiresIn: '1h' });

        return res.json({ msg: "User logged in successfully.", token });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'An error occurred during login.' });
    }
};
// add user function
export const add = async (req, res) => {
    const { firstname, lastname } = req.body;
    if (!firstname || !lastname) {
        return res.status(400).json({ msg: 'First name and last name are required.' });
    }
    try {
        await dbconn.execute(
            'INSERT INTO ad (firstname, lastname) VALUES (?, ?)',
            [firstname, lastname]
        );
        res.status(200).json({ msg: 'Data inserted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'An error occurred during data insertion.' });
    }
};


// User check function
export const check = async (req, res) => {
   const { username, user_id } = req.user; // Assuming req.user is populated by middleware

   res.json({ msg: "Valid user", username, user_id });
};
