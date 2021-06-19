const Sequelize = require('sequelize')

const sequelize = new Sequelize('videosDB','postgres','jfs123',{
    host:'localhost',
    port:'5000',
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