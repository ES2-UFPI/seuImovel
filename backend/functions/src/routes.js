const express = require('express')

const routes = express.Router()

const imovelController = require('./controllers/imovelController')

routes.get('/listaImoveis',imovelController.index)

module.exports = routes