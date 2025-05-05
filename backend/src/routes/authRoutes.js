import express from 'express';

//creating a new router instance
const router = express.Router();

router.post('/register', async (req, res) => {
  res.send('Register route');
});

router.post('/login', async (req, res)=>{
  res.send('Login route');
})

export default router;