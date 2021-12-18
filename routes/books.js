const express = require("express")
const sqlQuery = require("../mysql")
const router = express.Router()

router.get("/", async (req, res) => {
  const books = await sqlQuery("SELECT * FROM Books JOIN Authors ON Books.author_id = Authors.id")
  res.send(books)
})

module.exports = router
