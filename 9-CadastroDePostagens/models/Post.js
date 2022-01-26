// Arquivo do model de posts. Para models, costuma-se usar a primeira letra maiúscula e no singular

const db = require('./db.js') // Importa o arquivo db.js

const Post = db.sequelize.define('postagens', {
    titulo: {
        type: db.Sequelize.STRING
    },
    conteudo: {
        type: db.Sequelize.TEXT
    }
}) // cria tabela postagens

//Post.sync({force: true}) Só executar uma única vez, quando criar a model, caso contrário ela vai apagar e recriar toda vez a tabela.

module.exports = Post
