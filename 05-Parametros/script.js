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

app.get('/ola/:cargo/:nome', function(req, res){ // o /: cria um parametro
    res.send(`<h1>Ola, ${req.params.nome}</h1>
    <h2>Seu cargo e: ${req.params.cargo}</h2>`)
    
})

// rotas são os caminhos para a aplicação.
// parametro é um valor dinamico passado pelo usuário
// req é responsavel por receber dados de uma requisição
// req.params mostra json parametros
//Só pode mandar o send UMA vez dentro de uma função de uma rota
//Para rodar o nodemon, basta abrir o arquivo no cmd utilizando /nodemon "nome do arquivo"

app.listen(8081, function(){
    console.log('servidor rodando na url http://localhost:8081') //função de callback
}) // deve ser a última linha do código - localhost:8081