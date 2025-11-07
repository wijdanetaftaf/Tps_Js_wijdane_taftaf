require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('./models/User');
const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 3000;

/* --- MongoDB --- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => { console.error('Mongo error:', err); process.exit(1); });

/* --- Views & static --- */
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

/* --- Parsers --- */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* --- Sessions --- */
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { httpOnly: true, sameSite: 'lax', maxAge: 1000 * 60 * 60 * 24 }
}));

/* --- Passport (Local) --- */
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, pwd, done) => {
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return done(null, false, { message: 'Utilisateur introuvable' });
    const ok = await bcrypt.compare(pwd, user.password);
    if (!ok) return done(null, false, { message: 'Mot de passe invalide' });
    return done(null, user);
  } catch (e) { return done(e); }
}));
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try { done(null, await User.findById(id).select('-password')); }
  catch (e) { done(e); }
});

/* --- user dispo dans les vues --- */
app.use((req, res, next) => { res.locals.user = req.user; next(); });

/* --- Routes --- */
app.use('/', authRoutes);   // /register, /login, /logout
app.use('/', booksRoutes);  // /books (protégée)

app.get('/', (req, res) => res.redirect('/books'));

/* --- Start --- */
app.listen(PORT, () => console.log(`✅ Server on http://localhost:${PORT}`));
