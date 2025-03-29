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
  if(username.length < 3) {
    res.status(400).json({ message: 'Username must be at least 3 characters long' });
  }

  //check if user already exists

  await UserActivation.findOne({ email });
  if(!user) return res.status(400).json({ message: 'Invalid credentials' });

  //check if password is correct
  const isPasswordCorrect = await user.comparePassword(password);s
  if(!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });


});