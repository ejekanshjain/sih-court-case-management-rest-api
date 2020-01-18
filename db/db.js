require('dotenv').config()
const mysql = require('mysql')

const conn = mysql.createConnection({
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || '',
    database: process.env.DB || 'sih-ccm'
})

conn.connect(err => {
    if (err) throw err
})

module.exports = conn