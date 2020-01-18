const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const db = require('../db/db')

router.post('/', (req, res) => {
    if (!req.body.email || !req.body.password || req.body.password == '' || req.body.email == '') return res.status(400).json({ message: "Enter email and password" })
    let sql = `SELECT * FROM users WHERE email = '${req.body.email}'`
    db.query(sql, (err, results) => {
        if (err) throw err
        if (results.length == 0) return res.status(400).send('Invalid email or password')
        bcrypt.compare(req.body.password, results[0].password).then(b => {
            if (b) {
                let userObj = {
                    id: results[0].id,
                    email: results[0].email,
                    role: results[0].role
                }
                res.status(200).json({ message: 'Login Successfull', result: userObj })
            } else {
                res.status(400).json({ message: 'Invalid email or password' })
            }
        }).catch(reason => {
            res.status(500).json({ message: 'Internal Server Error' })
        })
    })
})

module.exports = router