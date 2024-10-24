const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, users) => {
    if (err) throw err;
    res.render('users', { users });
  });
});

router.post('/edit/:id', (req, res) => {
  const { username, email, bio } = req.body;
  const { id } = req.params;
  
  db.query('UPDATE users SET username = ?, email = ?, bio = ? WHERE id = ?', [username, email, bio, id], (err, result) => {
    if (err) throw err;
    res.redirect('/login');
  });
});

router.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  
  db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.redirect('/login');
  });
});

module.exports = router;
