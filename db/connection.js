const mysql = require("mysql2");
 
const connection = mysql.createConnection({
 host: "localhost",
 // Your username
 user: "root",
 // Your password
 password: "1234",
 database: "company",
});

connection.connect(function (err) {
 if (err) throw err;
});
 
module.exports = connection;