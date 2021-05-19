const express = require('express')

const routes = express.Router()

const imovelController = require('./controllers/imovelController')

const usuarioConfigController = require('./controllers/usuarioConfigController')

routes.get('/listaImoveis',imovelController.index)

routes.get('/usuarioConfig/:cpf',usuarioConfigController.index)

routes.post('/usuarioConfig/:cpf',usuarioConfigController.setPlano)

module.exports = routes