import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

//this route creates the post but it will be a protected route, we will show the server our identity means we are authenticated
router.post("/", async (req, res) => {
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
    });

    await newBook.save();

    //201 means the book has been created and newBook object has been returned back to the client
    res.status(201).json(newBook);
  } catch (error) {
    console.log("Error creating book", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;

//When we try to create a post, we need to save an image, we will have all the string values like title, caption, rating etc but we also want to store the images and we are going to upload these images to cloudinary

