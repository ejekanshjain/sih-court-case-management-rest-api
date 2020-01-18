const express = require('express')
const bcrypt = require('bcryptjs')

const db = require('../db/db')
const utilities = require('../util/utilities')

const router = express.Router()


// Get all Lawyers
router.get('/', (req, res) => {
    db.query(`SELECT * FROM users`, (err, results) => {
        if (err) throw err
        res.status(200).json({ message: "", result: results })
    })
})

// Add lawyer
router.post('/', (req, res) => {
    bcrypt.genSalt(2, (err, salt) => {
        let pass = bcrypt.hashSync(req.body.password, salt)
        let data = {
            id: `lawyer-${utilities.randomID()}`,
            email: req.body.email,
            password: pass,
            role: `lawyer`
        }
        let sql = `INSERT INTO users SET ?`
        db.query(sql, data, (err, results) => {
            if (err) throw err
            res.status(201).json({ message: "Lawyer Added Successfully" })
        })
    })
})

module.exports = router