const express = require('express')
const app = express()
const pathvideos = "C:/Users/getui/Desktop/videos"
const videoProcessor = require("./videoProcessor")

app.get('/videos/assistir/:idVideo', (req,res)=>{
    idVideo = req.params.idVideo
    videoPath = pathvideos+idVideo
    VideoProcessor = new videoProcessor(videoPath)
    
})

app.listen(3000)