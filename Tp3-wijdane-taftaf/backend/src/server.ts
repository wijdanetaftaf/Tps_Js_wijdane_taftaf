import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import booksRouter from './routes/books';

const app = express();
app.use(cors());
app.use(express.json());

// connexion MongoDB
mongoose.connect('mongodb://localhost:27017/book_tracker')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('Mongo error:', err));

// routes
app.use('/api/books', booksRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
