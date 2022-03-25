const util = require("util");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  // username
  user: "root",
  // password
  password: "password",
  database: "employees"
});

// callback function for error
connection.connect(error => {
  if (error) throw error;
  console.log('connection established')
});



//Using a promise
// allowing the use the async/await syntax
connection.query = util.promisify(connection.query);

module.exports = connection;
