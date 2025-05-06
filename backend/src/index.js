import express from 'express';
import "dotenv/config";

import { connectDB } from "./lib/db.js"
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); //middleware to parse JSON bodies

//mounts the authRoutes router as middleware to handle requests starting with "/api/auth"
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});