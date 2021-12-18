const express = require("express")
const authors = require("./routes/authors")
const books = require("./routes/books")

const app = express()

app.use(express.json())

app.use("/api/authors", authors)
app.use("/api/books", books)

const PORT = 5000
app.listen(PORT, () => console.log("Server listening on port", PORT))
