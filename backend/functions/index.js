const functions = require('firebase-functions')

const express = require('express')

const routes = require('./src/routes')

const app = express()

app.use(express.json())

app.use(routes)

exports.api = functions.https.onRequest(app)