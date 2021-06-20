const express = require('express')
const app = express()
const fs = require("fs");
const fetch = require('node-fetch')
var multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req,file,cb) =>{
      cb(null,'C:/Users/getui/Desktop/Videos')
  },
  filename: (req,file,cb)=>{
    cb(null,file.originalname + path.extname(file.originalname))
  }
})

let upload = multer({storage})



app.get('/videos/watch/:idVideo', async (req,res)=>{
  code = req.params.idVideo
  const response = await fetch(`http://localhost:3005/videos/check/${code}`)
  const path_do_video= await response.json()
  if(path_do_video=== "INVALID KEY"){
    res.json("TRY ANOTHER KEY")
  }
  else{
      /*
      -Abrir video/leitura
      -Criar CHUNK -> O que é um CHUNK, uma delimitador de tamanho para a response
      -Criar um cabeçalho -> Os protocolos HTTP tem um cabeçalho e um corpo, o cabeçalho tem informações sobre o conteudo do corpo:
        *Tamanho dos "pacotes" --> Tamanho da informação que está sendo mandada no body --> Content-Length : *tamanho*
        *Tipo do arquivo --> Se é um video, uma imagem e também sua formatação Ex: video/mp4, video/wmv --> Content-Type: *formato*
        *Partes dos arquivos --> Delimita os limites do arquivo --> Ex: 0-100 e 101 - 200  --> Content-Range: bytes start-end/tamanho total
        *Em qual formato está as partes dos arquivos --> Se a informação está em bytes ou outro --> Content-Ranges: *tipo*
    */

    //O cliente envia uma requisição e no headers delimita o espaço de bytes, esse campo é chamado range
    const rangeHttp = req.headers.range
    if(!rangeHttp){
      res.status(400).send("dkdk")
    }
    //Pega o tamanho total do arquivo
    const tamanho_total = fs.statSync(path_do_video).size

    //Evitar enviar 0 bytes --> 10**6 corresponde a 1 mb
    const CHUNK = 10**6

    //Transforma o valor em númerico e caso haja espaços vazios o replace o substitui
    const start = Number(rangeHttp.replace(/\D/g, ""))

    //Define qual dos dois é o menor valor, somar o CHUNK impede que o valor seja zero
    const end = Math.min(start + CHUNK, tamanho_total-1)

    //Define o tamanho do pacote a ser enviado
    const tamanho_pacote = end - start+1

    //cria um objeto do cabeçalho http
    const headers = {
        "Content-Range":`bytes ${start}-${end}/${tamanho_total}`,
        "Accept-Ranges":"bytes",
        "Content-Length": tamanho_pacote,
        "Content-Type":"video/mp4"
    }

    //writeHead escreve o cabeçalho do HTTP e passa o status  
    res.writeHead(206,headers)

    //createReadStream cria uma Stream que lê determinada parte do arquivo
    const video_out = fs.createReadStream(path_do_video,{start, end})

    //Envia por meio do pipe a parte do arquivo para o cliente
    video_out.pipe(res)
  }
})

app.post('/upload',upload.single("file"),async(req,res)=>{
     res.json("oi")
})

app.get('/', (req,res)=>{
  res.sendFile(__dirname+"/index.html")
})
app.listen(3000)