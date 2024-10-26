// app.js
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use(express.static('views'));
connectDB();

// Token verification middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) return res.status(500).json({ message: 'Token authentication failed' });
    req.userId = decoded.id;
    next();
  });
};

// Routes
app.use('/auth', require('./routes/auth'));

// Serve dashboard.html only if logged in
app.get('/dashboard.html', verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
