const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DATABASE_URL,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  multipleStatements: true,
});

connection.connect((err) => {
  if (!err) {
    console.log('Connected to MYSQL');
  } else {
    console.log('Connection Failed');
  }
});

module.exports = connection;
