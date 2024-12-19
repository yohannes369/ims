import mysql2 from 'mysql2';

const dbconn = mysql2.createPool({
    user: 'jo',
    database: 'ims',
    host: 'localhost',
    password: '1234'
});

dbconn.execute("SELECT 'vv'", (err, data) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log(data);
    }
});
