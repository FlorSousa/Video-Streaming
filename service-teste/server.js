const express = require('express')
const app = express()
const fetch = require('node-fetch')


app.get('/', (req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.listen(80)