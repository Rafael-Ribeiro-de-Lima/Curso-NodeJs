// Verifica se um usuário está autenticado e é admin

module.exports = {
    eAdmin: function(req, res, next){
        if(req.isAuthenticated() && req.user.eAdmin == 1){ // verifica se o usuario está autenticado
            return next()
        }
        req.flash('error_msg', 'Você não tem permissões de administrador para acessar essa página!')
        res.redirect('/')
    }
}