// import express from 'express';

// const app = express();
// const port = 5200;
// import cors from 'cors';
// app.use(cors());

// import userrouter from './routes/userroute.js';
// import dbconn from './db/dbconfig.js';

// app.use(express.static('public'));
// app.use(express.json());

// app.use('/api/user', userrouter);

// async function test() {
//     try {
//         const result = await dbconn.execute("select 'test' ");
//         console.log(result);
//     } catch (err) {
//         console.log(err.message);
//     }
// }

// app.listen(port, (err) => {
//     if (err) {
//         console.log(err.message);
//     } else {
//         console.log(`The server is listening on port ${port}`);
//     }
// });


// test();













// import express from 'express';
// import mysql from 'mysql2/promise'; // Use the promise version of mysql2
// import cors from 'cors';
// import dotenv from 'dotenv';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import authRoutes from './routes/auth.js';

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // MySQL connection
// const db = await mysql.createConnection({
//     host: process.env.DB_HOST || 'localhost',
//     user: process.env.DB_USER || 'root',
//     password: process.env.DB_PASS || '',
//     database: process.env.DB_NAME || 'multi_user_login'
// });

// // Define routes
// app.use('/api/auth', authRoutes(db));

// // Start server on port 5200
// const PORT = process.env.PORT || 5200;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));







// server.js
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import dotenv from "dotenv"

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "", // Replace with your MySQL password
  database: "inventory_system",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected");
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail email
    pass: process.env.EMAIL_PASS, // Your Gmail password
  },
});

// Create a new user
app.post("/create-user", (req, res) => {
  const { name, email, role } = req.body;
  const tempPassword = Math.random().toString(36).slice(-8); // Temporary password
  const verificationToken = require("crypto").randomBytes(32).toString("hex"); // Unique token

  // Hash the temporary password
  bcrypt.hash(tempPassword, 10, (err, hashedPassword) => {
    if (err) throw err;

    // Insert user into the database
    const sql = `
      INSERT INTO users (name, email, password, role, verification_token, is_verified)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [name, email, hashedPassword, role, verificationToken, false], (err, result) => {
      if (err) return res.status(500).send("Error creating user");

      // Send verification email to the new user
      const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify Your Account",
        text: `Hello ${name},\n\nYour temporary password is: ${tempPassword}\n\nPlease verify your account by clicking this link: http://localhost:3000/verify/${verificationToken}`,
      };

      transporter.sendMail(userMailOptions, (error, info) => {
        if (error) return res.status(500).send("Error sending verification email");

        // Send notification email to you (yohhanesyenakal@gmail.com)
        const adminMailOptions = {
          from: process.env.EMAIL_USER,
          to: "yohhanesyenakal@gmail.com", // Your email
          subject: "New Account Created",
          text: `A new account has been created with the following details:\n\nName: ${name}\nEmail: ${email}\nRole: ${role}`,
        };

        transporter.sendMail(adminMailOptions, (error, info) => {
          if (error) return res.status(500).send("Error sending notification email");
          res.status(200).send("User created and emails sent");
        });
      });
    });
  });
});

// Verify user account
app.get("/verify/:token", (req, res) => {
  const { token } = req.params;

  // Check if the token exists in the database
  const sql = "SELECT * FROM users WHERE verification_token = ?";
  db.query(sql, [token], (err, result) => {
    if (err || result.length === 0) return res.status(400).send("Invalid token");

    // Activate the user's account
    const userId = result[0].id;
    const updateSql = "UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE id = ?";
    db.query(updateSql, [userId], (err, result) => {
      if (err) return res.status(500).send("Error verifying account");
      res.status(200).send("Account verified successfully");
    });
  });
});

// User login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err || result.length === 0) return res.status(400).send("Invalid email or password");

    const user = result[0];

    // Check if the account is verified
    if (!user.is_verified) return res.status(400).send("Account not verified");

    // Compare passwords
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) return res.status(400).send("Invalid email or password");

      res.status(200).send("Login successful. Please change your password.");
    });
  });
});

// Change password
app.post("/change-password", (req, res) => {
  const { email, newPassword } = req.body;

  // Validate input
  if (!email || !newPassword) {
    return res.status(400).send("Email and new password are required");
  }

  // Hash the new password
  bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).send("Error changing password");
    }

    // Update the user's password in the database
    const sql = "UPDATE users SET password = ? WHERE email = ?";
    db.query(sql, [hashedPassword, email], (err, result) => {
      if (err) {
        console.error("Error updating password:", err);
        return res.status(500).send("Error changing password");
      }

      if (result.affectedRows === 0) {
        return res.status(404).send("User not found");
      }

      res.status(200).send("Password changed successfully");
    });
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));