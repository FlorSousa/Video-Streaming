const express = require('express')
const app = express()
const fetch = require('node-fetch')


app.get('/', (req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
app.get('/watch/:id', async (req,res)=>{
    let code = req.params.id
    const response = await fetch(`http://localhost:3005/videos/check/${code}`)
    const path_do_video= await response.json()
    if(path_do_video === "INVALID KEY"){
        res.json("TRY ANOTHER KEY")
    }else{
        res.send(`<video id="videoPlayer" width="650" controls muted="muted" autoplay><source src="http://localhost:3000/videos/watch/${code} type="video/mp4" /></video>`)
    }
})

app.listen(8000)
