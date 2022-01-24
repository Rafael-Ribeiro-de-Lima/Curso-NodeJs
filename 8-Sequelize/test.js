//conectar banco de dados mysql com sequelize

const Sequelize = require('sequelize')
const sequelize = new Sequelize('test', 'root', '@Rafael123', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(function(){
    console.log('Conectado com sucesso!')
}).catch(function(erro){
    console.log('Falha ao se conectar: '+erro)
})

//then funciona como uma função de callback. É executada quando um evento acontece.

//nodemon test.js
