const express = require('express');
const db = require('./db');
const app = express();

app.use(express.json());

app.get('/api/data', (req, res) => {
  const sql = 'SELECT * FROM your_table';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

const PORT = 3306;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
