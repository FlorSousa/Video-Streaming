const express = require('express')
const app = express()
const fs = require("fs");
const fetch = require('node-fetch')
var multer  = require('multer');
const path = require('path');

//variavel global que guarda o codigo gerado no multer
let atual


//informações para o multer
const storage = multer.diskStorage({
  destination: (req,file,cb) =>{
      cb(null,'C:/Users/getui/Desktop/Videos')
  },
  filename: (req,file,cb)=>{
    cb(null,geraCodigo()+'.mp4')
  }
})

//instancia do multer
let upload = multer({storage})

//função que gera codigo aleatorio
function geraCodigo(){    
    caract = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q',
    'r','s','t','u','v','w','x','y','z',1,2,3,4,5,6,7,8,9,0,'#','$','@','!']
    
    key =''
    
    for(let cont = 0;cont<11;cont++){
        number = Math.floor(Math.random() * caract.length);
        key+= caract[number]
    }
    atual = key
    return key

}
//rota de excluir
app.get('/videos/delete/:idVideo', async (req,res)=>{
    let code = req.params.idVideo
    const response = await fetch(`http://localhost:3005/videos/check/${code}`)
    const path = await response.json()
    if(path !== "INVALID KEY"){
        //apaga o video usando fs
        try{
          //apaga
          res.status(200).json("OK")
        }catch(err){
          res.status(500).json(err)
        }
    }else{
      res.status(500).json("ERROR")
    }
  })

//rota de streaming
app.get('/videos/watch/:idVideo', async (req,res)=>{
  let str = req.params.idVideo.split(" ")
  let code = str[0]
  //verifica se o video existe
  const response = await fetch(`http://localhost:3005/videos/check/${code}`)
  const path_do_video= await response.json() + ".mp4"
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


//rota de upload
//a requisição passa pelo middlewware multer e passa o codigo gerado para o service ligado ao postgres
app.post('/upload',upload.single("file"),async(req,res)=>{
  let titulo = req.body.titulo
  let autor = req.body.autor
  let code = atual
  atual = ''
  const response = await fetch(`http://localhost:3005/videos/upload`,{
    method: 'POST',
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json',
    },
    body: JSON.stringify({titulo:titulo,autor:autor,code:code})
  })
  const json = await response.json()
  if(json.MSG == "OK"){
      res.status(200).json({MSG:"WORKING",LINK:`/watch/${code}`})
  }
  else{
    res.json("Bug")
  }

})

app.listen(3000)