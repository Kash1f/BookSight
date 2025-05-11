import express from "express";

const router = express.Router();

router.post("/", async(req, res) => {
    try {
        const { title, caption, rating, image } = req.body;
        if (!title || !caption || !rating || !image) return res.status(400).json({ message: "All fields are required" });

        //upload the image to cloudinary

        const uploadResponse = await cloudinary.uploader.upload(image);
        const imageUrl = uploadResponse.secure_url;
        
        //save the book to the database



    } catch (error) {
        
    }
})


export default router;


//When we try to create a post, we need to save an image, we will have all the string values like title, caption, rating etc but we also want to store the images and we are going to upload these images to cloudinary

