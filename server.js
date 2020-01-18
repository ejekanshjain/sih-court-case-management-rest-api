require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const db = require('./db/db')

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.status(200).json({ "message": "Server Up and Running" })
})

app.get('/api', (req, res) => {
    res.status(200).json({ "message": "API Server Up and Running" })
})

const loginRouter = require('./routes/login')
app.use('/api/login', loginRouter)

const lawyerRouter = require('./routes/lawyer')
app.use('/api/lawyer', lawyerRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})