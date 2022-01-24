var http = require('http')

http.createServer(function(req, res){
    res.end('Hello, World! Welcome to my website') // envia mensagem
}).listen(8081) //porta do servidor

console.log('O Servidor está rodando.')
 