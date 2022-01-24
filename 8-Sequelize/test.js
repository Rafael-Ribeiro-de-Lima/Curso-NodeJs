//conectar banco de dados mysql com sequelize

const Sequelize = require('sequelize')
const sequelize = new Sequelize('teste', 'root', '@Rafael123', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate()

