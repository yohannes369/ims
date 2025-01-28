import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

const authRoutes = (db) => {
  // Register User
  router.post('/register', async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ msg: 'Please fill in all required fields.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ msg: 'Password length must be at least eight characters.' });
    }

    try {
      const [existingUser] = await db.query('SELECT email FROM users WHERE email = ?', [email]);
      if (existingUser.length > 0) {
        return res.status(400).json({ msg: 'User already registered.' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await db.query('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [email, hashedPassword, role]);
      res.status(201).json({ msg: 'User created successfully.' });
    } catch (err) {
      console.error('Registration error:', err);
      res.status(500).json({ msg: 'An error occurred during registration.' });
    }
  });

  // Login User
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      if (results.length === 0) {
        return res.status(401).json({ msg: 'Invalid credentials.' });
      }

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ msg: 'Invalid credentials.' });
      }

      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, role: user.role });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ msg: 'An error occurred during login.' });
    }
  });

  // Logout User
  router.post('/logout', (req, res) => {
    res.json({ msg: 'User logged out successfully.' });
  });

  // Fetch All Users
  router.get('/users', async (req, res) => {
    try {
      const [users] = await db.query('SELECT id, email,role FROM users');
      res.status(200).json(users);
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ msg: 'An error occurred while fetching the users.' });
    }
  });

  // Update User
  router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { email, password, role } = req.body;

    if (!email || !role) {
      return res.status(400).json({ msg: 'Please provide email and role.' });
    }

    try {
      const [existingUser] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
      if (!existingUser.length) {
        return res.status(404).json({ msg: 'User not found.' });
      }

      let query = 'UPDATE users SET email = ?, role = ?';
      const params = [email, role];

      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        query += ', password = ?';
        params.push(hashedPassword);
      }

      query += ' WHERE id = ?';
      params.push(id);

      await db.query(query, params);
      res.status(200).json({ msg: 'User updated successfully.' });
    } catch (err) {
      console.error('Update error:', err);
      res.status(500).json({ msg: 'An error occurred during user update.' });
    }
  });

  // Delete User
  router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const [existingUser] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
      if (!existingUser.length) {
        return res.status(404).json({ msg: 'User not found.' });
      }

      await db.query('DELETE FROM users WHERE id = ?', [id]);
      res.status(200).json({ msg: 'User deleted successfully.' });
    } catch (err) {
      console.error('Delete error:', err);
      res.status(500).json({ msg: 'An error occurred during user deletion.' });
    }
  });

  return router;
};

export default authRoutes;
