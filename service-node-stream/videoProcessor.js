const fs = require('fs')
function videoProcessor(path,range,res){
    size = fs.statSync(path).size
    CHUNK_SIZE = 10**6
    start = Number(range.replace(/\D/g, ""))
    end = Math.min(start + CHUNK_SIZE, size-1)
    tamanho = end - start+1
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${tamanho}`,
        'Accept-Ranges': "bytes",
        "Content-Length": tamanho,
        "Content-Type": "video/mp4"
    }
    this.res.writeHead(206,headers)
    const video = fs.createReadStream(path, {start, end})
    video.pipe(res)
}



module.exports = {videoProcessor}