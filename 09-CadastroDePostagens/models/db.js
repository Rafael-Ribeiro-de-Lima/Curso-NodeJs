const Sequelize = require('sequelize')

//  CONEXÃO COM O BANCO DE DADOS POSTAPP
const sequelize = new Sequelize('postapp', 'root', '@Rafael123', {
    host: 'localhost',
    dialect: 'mysql',
    query:{raw:true}
})

var db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db