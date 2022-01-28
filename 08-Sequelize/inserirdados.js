const Sequelize = require('sequelize')
const sequelize = new Sequelize('test', 'root', '@Rafael123', {
    host: 'localhost',
    dialect: 'mysql'
})

// Model para postagem 


const Postagem = sequelize.define('postagens', { // nome da tabela
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
})

Postagem.create({
    titulo: 'Um titulo qualquer',
    conteudo: 'lorem lorem lorem loren'
})


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

Usuario.create({
    nome: 'Rafael',
    sobrenome: 'Ribeiro de Lima',
    idade: 24,
    email: 'ribeirodelimarafael@gmail.com'
})