const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

// DB Connection
const conn = require("./db/conn")

conn()

app.listen(3000, () => console.log("Servidor ONLINE"))