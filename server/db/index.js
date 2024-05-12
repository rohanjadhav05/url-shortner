
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'database-1.cn28qiwest16.eu-north-1.rds.amazonaws.com',
  user: 'admin',
  password: 'rohan123',
  database: 'url_shortner',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port: '3306'
});

module.exports = pool;