import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";


//creating a new router instance
const router = express.Router();

//to create a token, we will define a sign method and this sign method will have different arguments, payload, secret key and options, in the token we need to have a unique identifier so that we know which user has this token, so we have added userId to understand which user has this token, to create this token we need to add a secret

const generateToken = (userId) => {
  return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "15d"}) //return the generated token,so it can be stored & sent to client
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
    
    //check if user already exists, check it by email or username, here User is our model, this code will check in User collection in the db using findOne method

    const existingEmail = await User.findOne({ email });
    if(existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingUsername = await User.findOne({ username });
    if(existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    //random profile image generation with user creation
    const profileImage =  `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

    const user = new User({
      username,
      email,
      password,
      profileImage
    });
    await user.save(); //save the user to the database

    //once the user has been created, we will generate a token using a userid and send it to the client
    const token = generateToken(user._id); 

    //201 means resource(user) is created in the backend, we will not send the user completely, instead we will send userid, username, email
    res.status(201).json({
      token,
      user: {
        id: user._id, //mongodb creates an id with _id
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      }
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server error" });
  }
});

router.post("/login", async (req, res) => {
try {

  const { email, password } = req.body;

  if(!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //check if user exists
  const user = await User.findOne({ email });
  if(!user) return res.status(400).json({ message : "Invalid Credentials" });
  
  //check if the password is correct
  const isMatch = await user.comparePassword(password); //compare the password with the hashed password in the database
  if(!isMatch) return res.status(400).json({ message: "Invalid Credentials" });
  
  const token = generateToken(user._id);

  res.status(200).json({
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
    }
  })

} catch (error){
  console.error(error);
  res.status(500).json({ message: "Internal Server error" });
}
});

export default router;



// Full Flow of the Code:
// Client sends a POST request to /api/auth/register with username, email, and password.

// The server validates the input:

// It checks if all required fields (username, email, password) are provided.
// It ensures the password meets the minimum length requirement.
// It checks if a user with the same email or username already exists in the database.
// If the input is valid and no duplicate user exists:

// A new user is created using the User model with the provided username, email, and password.
// The newUser.save() call initiates the save operation.

// Mongoose detects the pre('save') middleware and executes it:

// A salt is generated using bcrypt.genSalt(10).
// The plain-text password (this.password) is hashed using bcrypt.hash(this.password, salt).
// The hashed password replaces the plain-text password in the newUser object.
// If the password hasn't been modified, the middleware skips hashing and calls next() immediately.
// The next() function is called to proceed with the save operation. Here the user.save() wil run when the next() function is called.
// Finally, the user document (with the hashed password) is saved to the database.

// The server sends a success response back to the client, indicating that the user has been registered successfully.

//Once the user has been created, we will generate a token and send it to the client

// Flow of jwt token generation in register route:
// A sign method is used to create a token with a payload, secret key, and options.
// The token includes a unique userId to identify its owner and requires a secret to be created.
// The generated token is returned so it can be stored in a variable and sent to the client.
// After a user is successfully created, a token is generated and sent to the client.
// A 201 status code indicates resource creation; only public user details (ID, username, email, profile image) are sent, not the password.

//Login Route Flow and JWT Token Generation:

//compare the password with the hashed password in the database in the Users.js file