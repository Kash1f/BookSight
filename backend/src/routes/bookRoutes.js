import express from "express";
import Book from "../models/Book.js";
import protectRoute from "../middleware/auth.middleware.js";

const router = express.Router();

//this will be a protected route, we will show the server our identity means we are authenticated, req has the user object, this will now be used to create the post
router.post("/", protectRoute, async (req, res) => {
  try {
    const { title, caption, rating, image } = req.body;
    if (!title || !caption || !rating || !image)
      return res.status(400).json({ message: "All fields are required" });

    //upload the image to cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url;

    //save the book to the database
    const newBook = new Book({
      title,
      caption,
      rating,
      image: imageUrl,
      user: req.user._id, //this is the user id from the token, req of this route has the user object
    });

    await newBook.save();

    //201 means the book has been created and newBook object has been returned back to the client
    res.status(201).json(newBook);
  } catch (error) {
    console.log("Error creating book", error);
    res.status(500).json({ message: error.message });
  }
});

//get all books
router.get("/", async (req,res)=>{
  try {
    
  } catch (error) {
    
  }
})

export default router;

//When we try to create a post, we need to save an image, we will have all the string values like title, caption, rating etc but we also want to store the images and we are going to upload these images to cloudinary

