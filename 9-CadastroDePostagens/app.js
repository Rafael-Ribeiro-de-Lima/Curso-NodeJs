const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const Sequelize = require('sequelize')



//  CONFIG
    //  TEMPLATE ENGINE  
    app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main.handlebars"}));
    app.set('view engine', 'handlebars');
    app.set("views", "./views");
    app.get('/', (req, res) => {
        res.render('home');
    });

    //  CONEXÃO COM O BANCO DE DADOS
    const sequelize = new Sequelize('test', 'root', '@Rafael123', {
        host: 'localhost',
        dialect: 'mysql'
    })

//  ROTAS

app.get('/cadastro', function(req, res){
    res.render('formulario')
})

app.listen(8090, function(){
    console.log('Servidor rodando na url http://localhost:8090')
});