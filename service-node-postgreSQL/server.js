const express = require('express')
const app = express()
const path_videos = "C:/Users/getui/Desktop/Videos"

let {Sequelize,sequelize, Videos} = require("./connectDB")

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))


//rota para upload de video
app.post('/videos/upload', async(req,res)=>{
    let code = req.body.code
    let titulo = req.body.titulo
    let path = path_videos+"/"+code
    let infos ={titulo:titulo, autor: req.body.autor, codeVideo: code,path:path}
    console.log(infos)
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

//rota exclui do db
app.get('/videos/delete/:idVideo', async(req,res)=>{
    let code = req.params.idVideo
    const options = {where:{codeVideo:code}}
    const results = await Videos.findOne({options})
    if(results !== null){
        try{
            await Videos.destroy(options)
            res.sendStatus(200).json("DELETED")
        }
        catch(err){
            res.sendStatus(500).json(err)
        }
        
    }
    else{
        res.json({MSG:"THIS VIDEO NOT EXIST"})
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
        let out = Result.dataValues.path
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