const express = require("express")
const sqlQuery = require("../mysql")

const router = express.Router()

router.get("/", async (req, res) => {
  const authors = await sqlQuery("SELECT * FROM Authors")
  res.json(authors)
})

router.post("/", async (req, res) => {
  const { firstName, lastName, photo } = req.body
  try {
    await sqlQuery("INSERT INTO Authors (first_name, last_name, photo) VALUES (?, ?, ?)", [firstName, lastName, photo])
    res.send("author is added")
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.put("/:id", async (req, res) => {
  const { firstName, lastName, photo } = req.body
  try {
    let query = "UPDATE Authors SET"
    const values = []
    if (firstName) {
      query += " first_name = ?,"
      values.push(firstName)
    }
    if (lastName) {
      query += " last_name = ?,"
      values.push(lastName)
    }
    if (photo) {
      query += " photo = ?,"
      values.push(photo)
    }
    query = query.slice(0, -1)
    query += " WHERE id = ?"
    values.push(req.params.id)

    await sqlQuery(query, values)
    res.json("author modified")
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const rows = await sqlQuery("DELETE FROM Authors WHERE id = ?", [req.params.id])
    if (rows.affectedRows === 0) return res.status(404).send("author not found")
    res.send("author is deleted")
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router
