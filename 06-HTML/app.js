const express = require('express')
const app = express()

app.get('/', function(req, res){ 
    res.sendFile(__dirname+"/index.html")
}) //dirname é o nome da pasta do arquivo Js

app.get('/sobre', function(req, res){
    res.sendFile(__dirname + '/sobre.html')
})

app.get('/blog', function(req, res){
    res.send('Bem-vindo ao meu blog')
})

app.get('/ola/:cargo/:nome', function(req, res){ // o /: cria um parametro
    res.send(`<h1>Ola, ${req.params.nome}</h1>
    <h2>Seu cargo e: ${req.params.cargo}</h2>`)
    
})

app.listen(8081, function(){
    console.log('servidor rodando na url http://localhost:8081') 
}) // deve ser a última linha do código - localhost:8081