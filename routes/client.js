const express= require('express')
const bcrypt = require('bcryptjs')

const db=require('../db/db')
const utilities = require('../util/utilities')

const router=express.Router()

//To get all clients
router.get('/',(req,res)=>{
    db.query(`SELECT * from users WHERE role = 'client'`,(err,results)=>{
        if (err) throw err 
        res.status(200).json({message: "",result: results})
    })
})

// To add a client 
router.post('/',(req,res)=>{
    bcrypt.genSalt(2,(err,salt)=>{
        let pass = bcrypt.hashSync(req.body.password,salt)
        let data ={
            id:`client-${utilities.randomID()}`,
            email: req.body.email,
            password: pass ,
            role: `client`
        }

        let sql=`INSERT INTO users SET ?`
        db.query(sql,data,(err,results)=>{
            if(err) throw err
            res.status(201).json({message:"Client added successfully"})
        })
    })
})

module.exports = router

