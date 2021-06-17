const express = require('express')

const routes = express.Router()

const imovelController = require('./controllers/imovelController')

const usuarioConfigController = require('./controllers/usuarioConfigController')

const usuarioPerfilController = require('./controllers/usuarioPerfilController')

const usuarioTokenController = require('./controllers/UsuarioTokenController')

const imovelFavoritacaoController = require('./controllers/imovelFavoritacaoController')

//Imovel
routes.get('/listaImoveis',imovelController.index)

routes.post('/cadastrarImovel',imovelController.create)

routes.get('/imovelFavoritacao/:cpf',imovelFavoritacaoController.index)

routes.post('/imovelFavoritacao',imovelFavoritacaoController.createAndDelete)

//Usuario 
routes.get('/usuarioConfig/:cpf',usuarioConfigController.index)
//Alterei aqui - mike
routes.put('/usuarioConfig/:cpf',usuarioConfigController.update)

routes.get('/usuarioPerfil/:cpf',usuarioPerfilController.index)

routes.put('/usuarioPerfil/:cpf',usuarioPerfilController.update)

routes.get('/usuarioToken',usuarioTokenController.index)//retorna todos tokens e cada usuario correspondente

routes.post('/usuarioToken',usuarioTokenController.create)

//Testando yml
module.exports = routes
