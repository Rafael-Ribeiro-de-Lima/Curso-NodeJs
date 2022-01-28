const express = require('express')
const app = express()

app.get('/', function(req, res){ //get cria rota. Req é requisição que recebe e res é a mensagem enviada ao cliente
    res.send('Seja bem-vindo ao meu app!')
})

app.get('/sobre', function(req, res){
    res.send('Minha pagina sobre')
})

app.get('/blog', function(req, res){
    res.send('Bem-vindo ao meu blog')
})

// rotas são os caminhos para a aplicação.


app.listen(8081, function(){
    console.log('servidor rodando na url http://localhost:8081') //função de callback
}) // deve ser a última linha do código - localhost:8081