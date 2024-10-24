const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./config/db');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const articleRoutes = require('./routes/articleRoutes');

app.use('/articles', articleRoutes);
app.use('/', authRoutes);
app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
