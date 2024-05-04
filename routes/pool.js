var mysql = require("mysql");
var pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "enter your username",
  password: "enter your password",
  database: "hirademy",
  connectionLimit: 100,
});

module.exports = pool;
