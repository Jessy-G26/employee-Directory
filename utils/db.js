const mysql = require("mysql2/promise");
async function getConnection() {
  // create the connection
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password123!",
    database: "employeeDirectory",
  });
  // console.log(connection)
  return connection;
}

module.exports = getConnection;
