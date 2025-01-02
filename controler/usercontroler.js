// import dbconn from '../db/dbconfig.js'; 
// import bcrypt from 'bcrypt'; 
// import jwt from 'jsonwebtoken'; 

// // Registration function
// export const register = async (req, res) => {
//     try {
//         const { username, firstname, lastname, email, password } = req.body;

//         // Validate required fields
//         if (!username || !firstname || !lastname || !email || !password) {
//             return res.status(400).json({ msg: 'Please fill in all required fields.' });
//         }

//         // Check if user already exists
//         const [User] = await dbconn.query('SELECT username FROM users WHERE username = ? OR email = ?', [username, email]);
//         if (User.length > 0) {
//             return res.status(400).json({ msg: "User already registered." });
//         }

//         // Validate password length
//         if (password.length < 8) {
//             return res.status(400).json({ msg: "Password length must be at least eight characters." });
//         }

//         // Hash password and insert user into database
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
        
//         await dbconn.execute(
//             'INSERT INTO users (username, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)',
//             [username, firstname, lastname, email, hashedPassword]
//         );

//         res.status(201).json({ msg: "User created successfully." });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ msg: 'An error occurred during registration.' });
//     }
// };

// // Admin Login function
// export const login = async (req, res) => {
//     const { email, password } = req.body;

//     // Validate required fields
//     if (!email || !password) {
//         return res.status(400).json({ msg: 'Please provide both email and password.' });
//     }

//     try {
//         const [user] = await dbconn.query('SELECT username, user_id, password FROM users WHERE email = ?', [email]);
        
//         // Check if user exists
//         if (user.length === 0) {
//             return res.status(401).json({ msg: 'Invalid credentials.' });
//         }

//         // Compare passwords
//         const isMatch = await bcrypt.compare(password, user[0].password);
//         if (!isMatch) {
//             return res.status(401).json({ msg: "Invalid credentials." });
//         }

//         // Generate JWT token
//         const username = user[0].username;
//         const user_id = user[0].user_id;
        
//         const token = jwt.sign({ username, user_id }, 'your_jwt_secret', { expiresIn: '1h' }); // Use a secure secret

//         res.json({ msg: 'User is logged in', token });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ msg: 'An error occurred during login.' });
//     }
// };

// // User check function
// export const check = async (req, res) => {
//     const { username, user_id } = req.user; // Assuming req.user is populated by middleware
    
//     res.json({ msg: "Valid user", username, user_id });
// };
