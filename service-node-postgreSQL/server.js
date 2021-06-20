const express = require('express')
const app = express()
const path_videos = "C:/Users/getui/Desktop/Videos"

let {Sequelize,sequelize, Videos} = require("./connectDB")

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

//gerar codigo aleatorio para video   
function codeGen(){
    
    caract = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q',
    'r','s','t','u','v','w','x','y','z',1,2,3,4,5,6,7,8,9,0,'#','$','@','!']
    
    key =''
    
    for(let cont = 0;cont<11;cont++){
        number = Math.floor(Math.random() * caract.length);
        key+= caract[number]
    }
    return key
}

//rota para upload de video
app.post('/videos/upload', async(req,res)=>{
    code = codeGen()
    titulo = req.body.titulo
    path = path_videos+"/"+code+titulo
    infos ={titulo:titulo, autor: req.body.autor, codeVideo: code,path:path}
    const dbRetorno = await Videos.findOne({where:{codeVideo:infos.codeVideo}})
    const dbRetorno_titulo = await Videos.findOne({where:{titulo:infos.titulo}})
   
    if(dbRetorno == null && dbRetorno_titulo == null){
        const novo = Videos.build({titulo:infos.titulo,autor:infos.autor,codeVideo:infos.codeVideo,path:path})
        try{
            novo.save()
            res.json({"MSG":"OK"})
            
        }catch(err){
            console.log(err)
            res.json({"MSG":"Something are wrong"})
        }
    }
    else{
        res.json({"MSG":"Try again"})
    }

})

//retorna todos os videos do db
app.get('/videos', async(req,res)=>{
    const Results = await Videos.findAll()
    res.send(Results)
})

//verifica se o video existe no banco de dados
app.get('/videos/check/:idVideo', async(req,res)=>{
    const code = req.params.idVideo
    const Result = await Videos.findOne({where:{codeVideo:code}})
    if(Result !== null){
        out = Result.dataValues.path
        res.json(out)
    }
    else{
        res.json("INVALID KEY")
    }

})

//retorna os detalhe do video
app.get('/videos/details/:idVideo', async(req,res)=>{
    const idVideo = req.params.idVideo
    console.log(idVideo)
    const Result = await Videos.findOne({where:{codeVideo:idVideo}})
    res.send(Result[0])
})

app.listen(3005)