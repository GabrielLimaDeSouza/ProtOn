const mongoose = require("mongoose")

// dotEnv
require('dotenv').config()

const DB_USER = process.env.DB_USER
const DB_PASS = encodeURIComponent(process.env.DB_PASS)
const DB_STRING = `mongodb+srv://${DB_USER}:${DB_PASS}@infoodonto-tis4.rvwu9ro.mongodb.net/?retryWrites=true&w=majority`

async function main() {
    try {
        mongoose.set("strictQuery", true)
        await mongoose.connect(DB_STRING)
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

module.exports = main