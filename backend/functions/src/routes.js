const express = require('express')

const routes = express.Router()

const imovelController = require('./controllers/imovelController')

const usuarioConfigController = require('./controllers/usuarioConfigController')

const usuarioPerfilController = require('./controllers/usuarioPerfilController')

//Imovel
routes.get('/listaImoveis',imovelController.index)
routes.post('/cadastrarImovel',imovelController.create)
//Usuario 
routes.get('/usuarioConfig/:cpf',usuarioConfigController.index)
//Alterei aqui - mike
routes.put('/usuarioConfig/:cpf',usuarioConfigController.update)

routes.get('/usuarioPerfil/:cpf',usuarioPerfilController.index)

routes.put('/usuarioPerfil/:cpf',usuarioPerfilController.update)


//Testando yml
module.exports = routes