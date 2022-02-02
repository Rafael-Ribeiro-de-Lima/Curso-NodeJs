//  MODEL DE POSTAGEM

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Postagem = new Schema({
    titulo:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        required: true
    },
    descricao:{
        type: String,
        required: true
    },
    conteudo:{
        type: String,
        required: true
    },
    categoria:{ // referenciada a uma categoria que já existe. A melhor maneira de fazer relacionamento entre dois documentos no mongo é utilizado o ObjectId
        type: Schema.Types.ObjectId,
        ref:  'categorias', // quando se cria um objeto desse tipo, deve-se fazer uma referencia. Nesse caso, ao tipo de objeto "categorias", conforme aparece no arquivo Categorias.js, em mongoose.model('categorias'), que é o nome dado ao model
        required: true,        
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('postagens', Postagem) // cria collection para o módulo com nome 'postagens'