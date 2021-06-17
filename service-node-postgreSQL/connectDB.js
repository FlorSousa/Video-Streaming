const Sequelize = require('sequelize')

const sequelize = new Sequelize('videosDB','root','senha',{
    host:'localhost',
    dialect:'mysql'
})

const Videos = sequelize.define('videos', {
    titulo:{
        type:Sequelize.STRING(200)
    },
    data:{
        type: Sequelize.DATE
    },
    autor:{
        type: Sequelize.STRING(100)
    }
})

Videos.sync({force:true})

module.exports = {Sequelize, sequelize, Videos}