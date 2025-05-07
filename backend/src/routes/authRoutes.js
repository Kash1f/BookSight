import express from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

//creating a new router instance
const router = express.Router();

const generateToken = (id) => {
  
}


router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    if (password.length < 3) {
      return res.status(400).json({ message: "Password must be at least 3 characters long" });
    }
    
    //check if user already exists, we will check it by email or username, here User is our model, this code will check in User collection in the database using findOne method

    const existingEmail = await User.findOne({ email });
    if(existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingUsername = await User.findOne({ username });
    if(existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const user = new User({
      username,
      email,
      password,
    });
    await user.save(); //save the user to the database

    //once the user has been created, we will generate a token and send it to the client

    const token = generateToken(user._id); //generate a token using the user id, this function will be created in the utils folder

  } catch (error) {}
});

router.post("/login", async (req, res) => {
  res.send("Login route");
});

export default router;
