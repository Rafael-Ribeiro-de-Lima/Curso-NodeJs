const mongoose = require('mongoose')


// Configurando Mongoose
mongoose.connect('mongodb://localhost/aprendendo').then(() => {
    console.log('Conectado com sucesso!')
}).catch((err) =>{
    console.log('Houve um erro ao se conectar ao MongoDB: ' + err)
})

// mesmo que o banco não exista, ele vai criar

// DEFINIR MODEL - USUÁRIOS

const UsuarioSchema = mongoose.Schema({
    nome: {
        type: String, //Number, Date, Object,... mesmos do JS
        require: true // Obrigatoridade do campo
    },
    sobrenome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    idade: {
        type: Number,
        require: true
    },
    pais: {
        type: String // sem require = opcional
    }
})


//  COLLECTION
mongoose.model('usuarios', UsuarioSchema) // Nome da collection (conjunto de dados, como se fosse a ""tabela"")

const Rafael = mongoose.model('usuarios')

new Rafael({ // Cria novo usuário 
    nome: 'Ayra',
    sobrenome: 'Ramon Rodrigues',
    email: 'ayra@gmail.com',
    idade: 23,
    pais: 'Brasil' 
}).save().then(() => {
    console.log('Usuário criado com sucesso')
}).catch((err) => {
    console.log('Houve um erro ao cadastrar o usuário' +err)
})
