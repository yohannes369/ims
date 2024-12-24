// server.js
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'i'
});

// Connect to the database
db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Login endpoint
app.post('/login', (req, res) => {
    const { acc_type, txt_userid, txt_password } = req.body;

    // Validate input fields
    if (!acc_type || !txt_userid || !txt_password) {
        return res.status(400).json({ error: "Please fill in all fields." });
    }

    // Query to find the user
    const query = 'SELECT * FROM users WHERE Account_type = ? AND Emp_id = ?';
    db.execute(query, [acc_type, txt_userid], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error." });

        if (results.length > 0) {
            const user = results[0];
            // Verify password
            if (bcrypt.compareSync(txt_password, user.Password)) {
                if (user.Status === 1) {
                    // Successful login
                    return res.json({ message: "Login successful", accountType: acc_type });
                } else {
                    return res.status(403).json({ error: "Your account is deactivated." });
                }
            } else {
                return res.status(401).json({ error: "User ID or Password is incorrect." });
            }
        } else {
            return res.status(404).json({ error: "Account Type or User ID is incorrect." });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
