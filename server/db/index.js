
const mysql = require('mysql2/promise');

const pool = mysql.createPool({

  /*
  host: ,
  user: ,
  password: ,
  database: ,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port: '3306',
  */

});

module.exports = pool;