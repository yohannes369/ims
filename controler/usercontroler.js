import dbconn from '../db/dbconfig.js';
export const register = async (req, res ) => {
    try {
        const { username, firstname, lastname, email, password } = req.body;
        
        if (!username || !firstname || !lastname || !email || !password) {
            return res.status(400).json({ msg: 'Please fill in all required fields' });
        }

        // Simulate an asynchronous operation, such as a database query
        const [user] = await dbconn.execute(
            'INSERT INTO users (username, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)',
            [username, firstname, lastname, email, password]
        );

        res.status(201).json('Welcome to the registration page! Registration successful!');
    } catch (err) {
        res.status(500).json('An error occurred during registration.');
    }
};

      







export const login = async(req, res) => {
    res.send('Welcome to the login page!');
};

export const check = async(req, res) => {
    res.send('Welcome to the user check page!');
};
