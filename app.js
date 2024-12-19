import express from 'express';
const app = express();
const port = 5200;

// Corrected the import statement to use ES6 syntax
import userrouter from './routes/userroute.js';

// Corrected the path in app.use
app.use('/api/user', userrouter);

app.listen(port, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log(`The server is listening on port ${port}`);
    }
});
