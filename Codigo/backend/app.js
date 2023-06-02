const express = require("express")
const path = require('path');
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

// DB Connection
const conn = require("./db/conn")

conn() 

//* Routes
const routes = require("./routes/router")
app.use("/api", routes)

app.use(express.static(path.join(__dirname, '../../frontend/infoodonto/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/infoodonto/build', 'index.html'));
});

app.listen(3000, () => console.log("Servidor ONLINE"))