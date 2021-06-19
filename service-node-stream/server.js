const express = require('express')
const app = express()
const fs = require("fs");
const fetch = require('node-fetch')

app.get('/videos/assistir/:idVideo', async (req,res)=>{
  code = req.params.idVideo
  const response = await fetch(`http://localhost:3005/videos/check/${code}`)
  const videoPath = await response.json()
  if(videoPath === "INVALID KEY"){
    res.json("TRY ANOTHER KEY")
  }
  else{
    //process video
  }
})


app.listen(3000)