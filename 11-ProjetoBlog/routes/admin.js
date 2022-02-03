const { Router } = require('express')
const express = require('express')
const { rmSync } = require('fs')
const router = express.Router() // componente utilizado para criar rotas em arquivos separados
const mongoose = require('mongoose')
require('../models/Categoria') // carrega model de categoria
const Categoria = mongoose.model('categorias') // Referencia do Model. Nome do model é o nome dado no arquivo Categoria.js
require('../models/Postagem') // carrega model de postagem
const Postagem = mongoose.model('postagens')
const {eAdmin} = require('../helpers/eAdmin') // {} pega apenas a função eAdmin. Para proteger as rotas, basta colocar o eAdmin ao lado do endereço



// ROTAS


router.get('/', eAdmin, function(req, res){
    res.render('admin/index') // views/admin/index
})

router.get('/posts', eAdmin, function(req, res){
    res.send('Página de posts')
})

router.get('/categorias', eAdmin, function(req, res){
    Categoria.find().lean().sort({date: 'desc'}).then(function(categorias){
        res.render('admin/categorias', {categorias: categorias})
    }).catch(function(err){
        req.flash('error_msg', 'Houve um erro ao listar as categorias!')
        res.redirect('/admin')
    })
})

router.get('/categorias/add', eAdmin, function(req, res){
    res.render('admin/addcategorias')
})

router.post('/categorias/nova', eAdmin, function(req, res){

    var erros = []
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido!"})
    }
    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: "Slug inválido!"})
    } 
    if(req.body.nome.length < 2){
        erros.push({texto: 'Nome da categoria muito pequeno!'})
    }

    if(erros.length > 0){
        res.render('admin/addcategorias', {erros: erros})
    } else{
        const novaCategoria = {
            nome: req.body.nome, // segundo 'nome' e 'slug' são os names da tag no arquivo addCategoria.hbs
            slug: req.body.slug
        }
    
        new Categoria(novaCategoria).save().then(function(){
            req.flash('success_msg', 'Categoria criada com sucesso!')
            res.redirect('/admin/categorias')
        }).catch(function(err){
            req.flash('error_msg', 'Houve um erro ao salvar a categoria, tente novamente!')
            res.redirect('/admin')
        })
    }
})

router.get('/categorias/edit/:id', eAdmin, function(req, res){
    Categoria.findOne({_id:req.params.id}).lean().then(function(categoria){ // é .params porque estamos trabalhando com parametros e não com formulários
        res.render('admin/editCategorias', {categoria: categoria})
    }).catch(function(err){
        req.flash('error_msg', 'Esta categoria não existe!')
        res.redirect('/admin/categorias')
    }) // pesquisa o registro que tem id igual ao da url 
})

router.post('/categorias/edit', eAdmin, function(req, res){
    Categoria.findOne({_id: req.body.id}).then(function(categoria){// pega o id do input hidden 
        categoria.nome = req.body.nome
        categoria.slug = req.body.slug // recebe os valores digitados
        categoria.save().then(function(){
            req.flash('success_msg', 'Categoria editada com sucesso!')
            res.redirect('/admin/categorias')
        }).catch(function(err){
            req.flash('error_msg', 'Houve um erro ao salvar a edição da categoria!')
            res.redirect('/admin/categorias')
        })
    }).catch(function(err){
        req.flash('error_msg', 'Houve um erro ao editar a categoria!')
        res.redirect('/admin/categorias')
    })   
}) // Essa rota aplica as edições feitas em uma categoria

router.post('/categorias/deletar', eAdmin, function(req, res){
    Categoria.deleteOne({_id: req.body.id}).then(function(){
        req.flash('success_msg', 'Categoria deletada com sucesso!')
        res.redirect('/admin/categorias')
    }).catch(function(err){
        req.flash('error_msg', 'Erro ao deletar categoria!')
        res.redirect('/admin/categorias')
    }) //id do campo input hidden 
})

router.get('/postagens', eAdmin, function(req, res){
    Postagem.find().lean().populate('categoria').sort({data: 'desc'}).then(function(postagens){ // 
        res.render('admin/postagens', {postagens: postagens}) // renderiza a pagina com as postagens
    }).catch(function(err){
        req.flash('error_msg', 'Houve um erro ao listar as postagens')
        res.redirect('/admin')
    })
})

// O populate permite que você referencie documentos de uma collection em outra. Pra você usar informações da collection "categorias" dentro da collection "postagens", você chama "categorias" através do populate

router.get('/postagens/add', eAdmin, function(req, res){
    Categoria.find().lean().sort({nome: 'asc'}).then(function(categorias){ // find retorna todas as categorias
        res.render('admin/addpostagem', {categorias: categorias})
    }).catch(function(err){
        req.flash('error_msg', 'Houve um erro ao carregar o formulário.')
        res.redirect('/admin')
    })
})

router.post('/postagens/nova', eAdmin, function(req, res){
    var erros = []
    if(req.body.categoria == '0'){ // esse 0 foi definido no value do html
        erros.push({texto: 'Categoria Inválida! Registre uma categoria.'})
    }

    if (erros.length>0){
        res.render('/admin/addpostagem', {erros: erros})
    } else{
        const novaPostagem = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria,
            slug: req.body.slug
        }
        new Postagem(novaPostagem).save().then(function(){
            req.flash('success_msg', 'Postagem criada com sucesso!')
            res.redirect('/admin/postagens')
        }).catch(function(err){
            req.flash('error_msg', 'Houve um erro durante o salvamento da postagem!')
            res.redirect('/admin/postagens')
        })
    }
})

router.get('/postagens/edit/:id', eAdmin, function(req, res){
    Postagem.findOne({_id: req.params.id}).lean().then(function(postagem){// Pesquisa por uma POSTAGEM. É params pq o id foi passado como parametro ali em cima no /:id. 
        Categoria.find().lean().sort({nome: 'asc'}).then(function(categorias){
            res.render('admin/editPostagens', {categorias: categorias, postagem: postagem}) // Pesquisa pela CATEGORIA
        }).catch(function(err){
            req.flash('error_msg', 'Houve um erro ao carregar as categorias!')
            res.redirect('/admin/postagens')
        })
    }).catch(function(err){
        req.flash('error_msg', 'Houve um erro ao carregar o formulário de edição!')
        res.redirect('/admin/postagens')
    })  
})

router.post('/postagem/edit', eAdmin, function(req, res){ // url é a action do formulário nesse caso
    Postagem.findOne({_id: req.body.id}).then(function(postagem){ // esse id é o id do input hidden. Nesse caso, esse método busca uma postagem que possui o _id igual ao id='id'
        postagem.titulo = req.body.titulo
        postagem.slug = req.body.slug
        postagem.descricao = req.body.descricao
        postagem.conteudo = req.body.conteudo
        postagem.categoria = req.body.categoria
        postagem.data = Date.now()

        postagem.save().then(function(){
            req.flash('success_msg', 'Postagem editada com sucesso!')
            res.redirect('/admin/postagens')
        })
    }).catch(function(err){
        console.log(err)
        req.flash('error_msg', 'Houve um erro ao editar a postagem!')
        res.redirect('/admin/postagens')
    })
})

router.get('/postagens/deletar/:id', eAdmin, function(req, res){
    Postagem.remove({_id: req.params.id}).then(function(){
        req.flash('success_msg', 'Postagem deletada com sucesso!')
        res.redirect('/admin/postagens')
    }).catch(function(err){
        req.flash('error_msg', 'Houve um erro interno.')
        res.redirect('/admin/postagens')
    })
})

module.exports = router