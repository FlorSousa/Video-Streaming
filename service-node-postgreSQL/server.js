const express = require('express')
const app = express()

let {Sequelize,sequelize, Videos} = require("./connectDB")

app.get('/videos', async(req,res)=>{
    const Results = await Videos.findAll()
    res.send(Results)
})

app.listen(3005)