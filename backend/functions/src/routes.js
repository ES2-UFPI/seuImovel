const express = require('express')

const routes = express.Router()

const imovelController = require('./controllers/imovelController')

const usuarioConfigController = require('./controllers/usuarioConfigController')

//Imovel
routes.get('/listaImoveis',imovelController.index)
routes.post('/cadastrarImovel',imovelController.create)
//Usuario 
routes.get('/usuarioConfig/:cpf',usuarioConfigController.index)
routes.post('/usuarioConfig/:cpf',usuarioConfigController.update)

module.exports = routes