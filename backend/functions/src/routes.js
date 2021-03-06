const express = require('express')

const routes = express.Router()

const imovelController = require('./controllers/imovelController')

const usuarioConfigController = require('./controllers/usuarioConfigController')

const usuarioPerfilController = require('./controllers/usuarioPerfilController')

const usuarioTokenController = require('./controllers/UsuarioTokenController')

const imovelFavoritacaoController = require('./controllers/imovelFavoritacaoController')

const imovelUserController = require('./controllers/imovelUserController')

const allImovelUserController = require('./controllers/allImovelUserController')

//Imovel
routes.get('/listaImoveisUsuario',allImovelUserController.index)

routes.get('/listaImoveis',imovelController.index)

routes.post('/cadastrarImovel',imovelController.create)

routes.get('/listaImovel',imovelUserController.index)

routes.put('/cadastrarImovel/:cpfUsuario',imovelController.update)

routes.get('/imovelFavoritacao',imovelFavoritacaoController.index)

routes.post('/imovelFavoritacao',imovelFavoritacaoController.create)

routes.delete('/imovelFavoritacao',imovelFavoritacaoController.delete)

routes.get('/imovelFavoritacaoUnica',imovelFavoritacaoController.oneIndex)

routes.delete('/imovelDelecao',imovelUserController.delete)

//Usuario 

routes.get('/usuarioConfig2/:email',usuarioPerfilController.index2)

routes.get('/usuarioConfig/:cpf',usuarioConfigController.index)

routes.put('/updateToFreeAccount/:cpf',usuarioConfigController.updateToFreeAccount)

routes.put('/usuarioConfig/:cpf',usuarioConfigController.update)

routes.get('/usuarioPerfil/:cpf',usuarioPerfilController.index)

routes.post('/usuarioPerfil',usuarioPerfilController.create)

routes.put('/usuarioPerfil/:cpf',usuarioPerfilController.update)

routes.delete('/usuarioPerfil/:cpf',usuarioPerfilController.delete)

routes.get('/usuarioToken',usuarioTokenController.index)//retorna todos tokens e cada usuario correspondente

routes.post('/usuarioToken',usuarioTokenController.create)

//Testando yml
module.exports = routes
