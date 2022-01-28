const express = require('express')
const router = express.Router() // componente utilizado para criar rotas em arquivos separados
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias') // Referencia do Model. Nome do model é o nome dado no arquivo Categoria.js



// ROTAS


router.get('/', function(req, res){
    res.render('admin/index') // views/admin/index
})

router.get('/posts', function(req, res){
    res.send('Página de posts')
})

router.get('/categorias', function(req, res){
    Categoria.find().lean().sort({date: 'desc'}).then(function(categorias){
        res.render('admin/categorias', {categorias: categorias})
    }).catch(function(err){
        req.flash('error_msg', 'Houve um erro ao listar as categorias!')
        res.redirect('/admin')
    })
})

router.get('/categorias/add', function(req, res){
    res.render('admin/addcategorias')
})

router.post('/categorias/nova', function(req, res){

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

router.get('/categorias/edit/:id', function(req, res){
    Categoria.findOne({_id:req.params.id}).lean().then(function(categoria){ // é .params porque estamos trabalhando com parametros e não com formulários
        res.render('admin/editCategorias', {categoria: categoria})
    }).catch(function(err){
        req.flash('error_msg', 'Esta categoria não existe!')
        res.redirect('/admin/categorias')
    }) // pesquisa o registro que tem id igual ao da url 
})

router.post('/categorias/edit', function(req, res){
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

router.post('/categorias/deletar', function(req, res){
    Categoria.deleteOne({_id: req.body.id}).then(function(){
        req.flash('success_msg', 'Categoria deletada com sucesso!')
        res.redirect('/admin/categorias')
    }).catch(function(err){
        req.flash('error_msg', 'Erro ao deletar categoria!')
        res.redirect('/admin/categorias')
    }) //id do campo input hidden 
})

module.exports = router