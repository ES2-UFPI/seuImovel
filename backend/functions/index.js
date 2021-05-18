const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require('express')

const app = express();
//Body parser
app.use(express.json())

const routes = express.Router();

routes.get('/', (req, res) => {
    res.status(200).json({success: true, msg: 'Listando todos os Imoveis'})
})

routes.get('/:id', (req, res) => {
    const {id} = req.params
    res.json({success: true, msg: `Buscando Imóvel com id = ${id}`})
})

routes.post('/', (req, res) => {
    
    // const {} = req.body; 
})

routes.put('/:id', (req, res) => {
    const {id} = req.params
    res.json({success: true, msg: `Atualizando Imóvel com id = ${id}`})
})

routes.delete('/:id', (req, res) => {
    const {id} = req.params
    res.json({success: true, msg: `Deleta Imóvel com id = ${id}`})
})


exports.api = functions.https.onRequest(routes)





