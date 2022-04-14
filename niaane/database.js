const mysql = require('mysql')

const connection = mysql.createConnection({
  host: process.env.DATABASE_SERVER,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

connection.connect((err, result) => {
  if (err) {
    console.log(err)
    return err;
  }
  console.log("Database connected successfully");
});

module.exports = connection