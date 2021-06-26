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

routes.get('/imovelFavoritacao',imovelFavoritacaoController.index)

routes.post('/imovelFavoritacao',imovelFavoritacaoController.create)

routes.delete('/imovelFavoritacao',imovelFavoritacaoController.delete)

routes.get('/imovelFavoritacaoUnica',imovelFavoritacaoController.oneIndex)

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
