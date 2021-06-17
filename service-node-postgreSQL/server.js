const express = require('express')
const app = express()

let {Sequelize,sequelize, Videos} = require("./connectDB")

app.get('/videos', async(req,res)=>{
    const Results = await Videos.findAll()
    res.send(Results)
})

app.get('/videos/details/:idVideo', async(req,res)=>{
    const idVideo = req.params.idVideo
    const Result = await Videos.findAll({where:{codeVideo:idVideo}})
    res.send(Result)
})

app.listen(3005)