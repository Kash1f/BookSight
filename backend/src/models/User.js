import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  profileImage: {
    type: String,
    default: "",
  },
});

//hash password before savving user to the database

userSchema.pre("save", async function (next) {

  if (!this.isModified("password")) return next(); //if the password hasn't been modified, skip hashing
  
  const salt = await bcrypt.genSalt(10);   //if the password is modified, we will hash it
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;

//users collection will be created in the database

//we are gonna have our user model where every single user will have username, email, password and profile image
















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
// The next() function is called to proceed with the save operation. Here the newUser.save() wil run when the next() function is called.
// Finally, the user document (with the hashed password) is saved to the database.

// The server sends a success response back to the client, indicating that the user has been registered successfully.
