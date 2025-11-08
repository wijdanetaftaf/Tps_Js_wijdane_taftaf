const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

/* GET register */
router.get('/register', (req, res) => {
  res.render('register');
});

/* POST register */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirm } = req.body;
    if (!name || !email || !password || !confirm)
      return res.status(400).render('register', { error: 'Tous les champs sont requis', name, email });
    if (password !== confirm)
      return res.status(400).render('register', { error: 'Les mots de passe ne correspondent pas', name, email });

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).render('register', { error: 'Email déjà utilisé', name, email });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email: email.toLowerCase(), password: hash });

    req.login(user, (err) => err ? res.redirect('/login') : res.redirect('/books'));
  } catch (e) {
    console.error(e);
    res.status(500).render('register', { error: 'Erreur serveur' });
  }
});

/* GET login */
router.get('/login', (req, res) => {
  res.render('login');
});

/* POST login */
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/books',
    failureRedirect: '/login'
  })
);

/* POST logout */
router.post('/logout', (req, res, next) => {
  req.logout(err => err ? next(err) : res.redirect('/login'));
});

module.exports = router;
