import { Router } from 'express';
import { BookModel } from '../models/Book';

const router = Router();

// GET /api/books : liste tous les livres
router.get('/', async (_req, res) => {
  const books = await BookModel.find();
  res.json(books);
});

// POST /api/books : ajoute un livre
router.post('/', async (req, res) => {
  try {
    const book = new BookModel(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE /api/books/:id : supprime un livre
router.delete('/:id', async (req, res) => {
  await BookModel.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
