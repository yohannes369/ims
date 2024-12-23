import express from 'express';

const app = express();
const port = 5200;
import cors from 'cors';
app.use(cors());

import userrouter from './routes/userroute.js';
import dbconn from './db/dbconfig.js';

app.use(express.static('public'));
app.use(express.json());

app.use('/api/user', userrouter);

async function test() {
    try {
        const result = await dbconn.execute("select 'test' ");
        console.log(result);
    } catch (err) {
        console.log(err.message);
    }
}

app.listen(port, (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log(`The server is listening on port ${port}`);
    }
});

// Call the test function to execute the query
test();
