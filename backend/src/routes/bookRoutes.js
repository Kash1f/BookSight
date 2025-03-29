import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  try {
    const { title, author, description, price, image } = req.body;

    if(!title || !author || !description || !price || !image) {
      return res.status(400).json({ message: 'Please provide all the required fields' });
    }

    const book = new Book({
      title,
      author,
      description,
      price,
      isbn,
      image,
    });
    book.save();

    res.status(201).json(book);
  } catch(err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});