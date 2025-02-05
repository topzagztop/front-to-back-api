const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const app = express()


app.use(express.json())
app.use(cors())
app.use(morgan())


//
app.listen("8080", ()=> console.log('Server is running on port 8080'))
