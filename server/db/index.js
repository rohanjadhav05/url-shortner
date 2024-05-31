
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  
  host : process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  waitForConnections: process.env.waitForConnections,
  connectionLimit: process.env.connectionLimit,
  queueLimit: process.env.queueLimit,
  port: process.env.port,
});

module.exports = pool;