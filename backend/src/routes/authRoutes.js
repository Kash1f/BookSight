import express from 'express';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if(!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide all the required fields' });
  }

  if(password.length < 6) {
    res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }
});