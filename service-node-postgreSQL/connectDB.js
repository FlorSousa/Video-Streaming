const Sequelize = require('sequelize')
console.log("passou")
const sequelize = new Sequelize('videosDB','host','jfs123',{
    host:'container_banco',
    port:'5432',
    dialect:'postgres'
})

const Videos = sequelize.define('videos', {
    titulo:{
        type:Sequelize.STRING(200)
    },
    autor:{
        type: Sequelize.STRING(100)
    },
    codeVideo:{
        type: Sequelize.STRING(300)
    },
    path:{
        type: Sequelize.STRING(300)
    }
})

Videos.sync({force:true})

module.exports = {Sequelize, sequelize, Videos}