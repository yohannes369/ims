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













import express from 'express';
import mysql from 'mysql2/promise'; // Use the promise version of mysql2
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'multi_user_login'
});

// Define routes
app.use('/api/auth', authRoutes(db));

// Start server on port 5200
const PORT = process.env.PORT || 5200;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));







