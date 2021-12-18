const mysql = require("mysql2/promise")

const sqlQuery = async (query, values) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "booksDB",
  })
  const [rows, fields] = await connection.query(query, values)

  return rows
}

module.exports = sqlQuery
