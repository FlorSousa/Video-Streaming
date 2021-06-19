const express = require('express')
const app = express()
const path_videos = "C:/Users/getui/Desktop/Videos"

let {Sequelize,sequelize, Videos} = require("./connectDB")

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

function codeGen(){
 //gerar codigo aleatorio para video   
    
    caract = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q',
    'r','s','t','u','v','w','x','y','z',1,2,3,4,5,6,7,8,9,0,'#','%','$','@','!']
    
    key =''
    
    for(let cont = 0;cont<11;cont++){
        number = Math.floor(Math.random() * caract.length);
        key+= caract[number]
    }
    return key
}

app.post('/videos/add', async(req,res)=>{
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
            res.send({"MSG":"OK"})
            
        }catch(err){
            console.log(err)
            res.send({"MSG":"Something are wrong"})
        }
    }
    else{
        res.send({"MSG":"Try again"})
    }

})


app.get('/videos', async(req,res)=>{
    const Results = await Videos.findAll()
    res.send(Results)
})

app.get('/videos/details/:idVideo', async(req,res)=>{
    const idVideo = req.params.idVideo
    const Result = await Videos.findOne({where:{codeVideo:idVideo}})
    res.send(Result[0])
})

app.listen(3005)