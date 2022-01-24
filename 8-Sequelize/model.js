//model é uma referencia da tabela dentro do sequelize

const Sequelize = require('sequelize')
const sequelize = new Sequelize('test', 'root', '@Rafael123', {
    host: 'localhost',
    dialect: 'mysql'
})

// Model para postagem 

/* 
const Postagem = sequelize.define('postagens', { // nome da tabela
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
})


Postagem.sync({force: true}) // sincroniza o model com o sql
*/

// Model para usuários

const Usuario = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome:{
        type: Sequelize.STRING
    }, 
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
})

//Usuario.sync({force: true}) // sincroniza o model com o sql e cria a tabela
