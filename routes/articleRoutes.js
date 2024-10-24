const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Menampilkan Semua Artikel
router.get('/', (req, res) => {
    db.query('SELECT * FROM articles', (err, results) => {
        if (err) throw err;
        res.render('articles', { articles: results }); // file views/articles.ejs
    });
});

// Menampilkan Form Tambah Artikel
router.get('/add', (req, res) => {
    res.render('add-article'); // file views/add-article.ejs
});

// Proses Menambah Artikel
router.post('/add', (req, res) => {
    const { title, content } = req.body;
    db.query('INSERT INTO articles (title, content) VALUES (?, ?)', [title, content], (err, result) => {
        if (err) throw err;
        res.redirect('/articles'); // Arahkan kembali ke halaman artikel
    });
});

// Menampilkan Form Edit Artikel
router.get('/edit/:id', (req, res) => {
    const articleId = req.params.id;
    db.query('SELECT * FROM articles WHERE id = ?', [articleId], (err, results) => {
        if (err) throw err;
        res.render('edit-article', { article: results[0] }); // file views/edit-article.ejs
    });
});

// Proses Mengedit Artikel
router.post('/edit/:id', (req, res) => {
    const articleId = req.params.id;
    const { title, content } = req.body;
    db.query('UPDATE articles SET title = ?, content = ? WHERE id = ?', [title, content, articleId], (err, result) => {
        if (err) throw err;
        res.redirect('/articles'); // Arahkan kembali ke halaman artikel
    });
});

// Menghapus Artikel
router.get('/delete/:id', (req, res) => {
    const articleId = req.params.id;
    db.query('DELETE FROM articles WHERE id = ?', [articleId], (err, result) => {
        if (err) throw err;
        res.redirect('/articles'); // Arahkan kembali ke halaman artikel
    });
});

module.exports = router;
