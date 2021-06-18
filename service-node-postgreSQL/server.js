const express = require('express')
const app = express()


let {Sequelize,sequelize, Videos} = require("./connectDB")

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

function codeGen(){
 //gerar codigo aleatorio para video   
}

app.post('/videos/add', async(req,res)=>{
    infos ={titulo:req.express.titulo, autor: req.express.auto, codeVideo: req.express.codeVideo}
    const dbRetorno = await Videos.findOne({where:{codeVideo:infos.codeVideo}})
   
    if(dbRetorno == null){
        const novo = Videos.build({titulo:infos.titulo,autor:infos.autor,codeVideo:infos.codeVideo})
        try{
            novo.save()
            console.log("A new data in postgreSQL DB")
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
    const Result = await Videos.findAll({where:{codeVideo:idVideo}})
    res.send(Result[0])
})

app.listen(3005)