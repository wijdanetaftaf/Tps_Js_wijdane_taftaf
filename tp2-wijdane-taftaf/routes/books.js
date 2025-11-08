const express = require('express');
const router = express.Router();

/* Livres en mémoire (variable locale) */
const books = [
  { title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry', format: 'Ebook', status: 'Reading', pages: 120, pagesRead: 90 },
  { title: '1984', author: 'George Orwell', format: 'Paper', status: 'Read', pages: 328, pagesRead: 328 },
  { title: 'Clean Code', author: 'Robert C. Martin', format: 'Paper', status: 'Paused', pages: 464, pagesRead: 120 },
  { title: 'Introduction to Algorithms', author: 'Cormen et al.', format: 'Ebook', status: 'Reading', pages: 1312, pagesRead: 300 }
];
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.redirect('/login');
}

router.get('/books', ensureAuthenticated, (req, res) => {
  res.render('books', { books });
});
// routes/books.js


module.exports = router;
