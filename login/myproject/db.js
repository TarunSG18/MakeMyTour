const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'TSG',
  user: 'root',
  password: '12345678',
  database: 'mmy'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database!');
});

module.exports = db;
