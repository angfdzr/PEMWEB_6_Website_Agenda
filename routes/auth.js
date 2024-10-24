const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) throw err;
    
    if (result.length && bcrypt.compareSync(password, result[0].password)) {
      req.session.user = result[0];
      res.redirect('/index');
    } else {
      res.render('login', { error: 'Invalid email or password' });
    }
  });
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
    if (err) throw err;
    res.redirect('/login');
  });
});

router.get('/index', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('index', { user: req.session.user });
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return res.redirect('/');
      }
      res.clearCookie('connect.sid');
      res.redirect('/login');
    });
  });

module.exports = router;
